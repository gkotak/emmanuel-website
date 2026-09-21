#!/usr/bin/env node
/*
 * Guard against malformed Nunjucks templates reaching a build.
 *
 * The CloudCannon visual editor used to re-serialise .njk files as HTML,
 * which mangled template tags in the page body and took the site down with
 * an opaque "parseIf: expected elif, else, or endif" stack trace. The visual
 * editor is now disabled, but this check stays as a backstop: it fails fast
 * with a readable message naming the file and line.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '_templates');

// Tags that open a block, and the tag that closes each.
const OPENS = { if: 'endif', for: 'endfor', block: 'endblock', macro: 'endmacro' };
const CLOSES = new Set(Object.values(OPENS));

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.njk')) out.push(full);
  }
  return out;
}

const errors = [];

for (const file of walk(ROOT)) {
  const src = fs.readFileSync(file, 'utf8');
  const rel = path.relative(path.join(__dirname, '..'), file);

  // 1. Mangled closing tags, e.g. `</p{% if loop.first %}` — the exact
  //    corruption the visual editor produced.
  src.split('\n').forEach((line, i) => {
    const m = line.match(/<\/[a-zA-Z]+\s*\{%/);
    if (m) {
      errors.push(`${rel}:${i + 1}  mangled closing tag: ${line.trim().slice(0, 80)}`);
    }
  });

  // 2. Unbalanced block tags.
  const stack = [];
  const re = /\{%-?\s*(\w+)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const tag = m[1];
    const line = src.slice(0, m.index).split('\n').length;
    if (OPENS[tag]) {
      stack.push({ tag, line });
    } else if (CLOSES.has(tag)) {
      const top = stack.pop();
      if (!top) {
        errors.push(`${rel}:${line}  stray {% ${tag} %} with no matching opening tag`);
      } else if (OPENS[top.tag] !== tag) {
        errors.push(
          `${rel}:${line}  {% ${tag} %} closes {% ${top.tag} %} opened at line ${top.line}`
        );
      }
    }
  }
  for (const left of stack) {
    errors.push(`${rel}:${left.line}  {% ${left.tag} %} is never closed with {% ${OPENS[left.tag]} %}`);
  }
}

if (errors.length) {
  console.error('\nTemplate check failed:\n');
  for (const e of errors) console.error('  ' + e);
  console.error(
    `\n${errors.length} problem(s) found. The site will not build until these are fixed.\n`
  );
  process.exit(1);
}

console.log('Template check passed.');
