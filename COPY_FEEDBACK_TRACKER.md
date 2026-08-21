# Website Feedback Tracker (local copy)

Source: [Website Feedback June 10 onwards](https://docs.google.com/document/d/1RAkUr7JQPNPlFMmrmBZtPAKmV4Kb2G66O69dLYgtGAc/edit?usp=sharing)

**Rules used**
- One combined feedback table (unique rows only): T3 wording kept on overlaps; T2-only rows appended
- Ignore “Hakuna matata” title row
- Nav restructure / new pages → **Phase 2** (not built)
- Photos without an obvious slot → **Phase 3** (downloaded where possible)

**How to review locally** (with `cd site && npm run dev`): base URL
`http://localhost:8080/ui_kits/website/`

**URL columns:** Page/screen and Review point at the same pages. Page/screen uses the staging URL from the feedback doc; Review uses the local review URL. In the PDF both appear as clickable “link” labels.

The **Original feedback** column quotes the customer wording from the Google Doc.

---

## Review checklist (pages to open)

| Page | Local URL | Why |
|------|-----------|-----|
| Home | [index.html](http://localhost:8080/ui_kits/website/index.html) | Welcome copy, newsletter weekly, no “am”, no Volunteer tile, hero italics toned down |
| I'm New | [im-new.html](http://localhost:8080/ui_kits/website/im-new.html) | New welcome/accessibility/vicar meeting copy; no “11”; Joyful Noise summer holidays; access cards; clergy → vicar@ |
| Service times | [service-times.html](http://localhost:8080/ui_kits/website/service-times.html) | School worship Thursday; Contemplative description; no “find your place” phrasing |
| Contact | [contact.html](http://localhost:8080/ui_kits/website/contact.html) | Lady Chapel / open 9–7; office hours; travel wording; no “11” in map |
| Safeguarding | [safeguarding.html](http://localhost:8080/ui_kits/website/safeguarding.html) | Office hours + urgent vicar number; clergy mailto |
| Community Outreach | [food-bank.html](http://localhost:8080/ui_kits/website/food-bank.html) | Reordered projects; FoodCycle/Repair/Gardening; photos; lend-a-hand removed |
| Emmanuel School | [emmanuel-school.html](http://localhost:8080/ui_kits/website/emmanuel-school.html) | First Thursday; 6×/quarter wording; school photo |
| History | [history.html](http://localhost:8080/ui_kits/website/history.html) | Lady Chapel rewrite; MA PhD byline |
| Calendar | [calendar.html](http://localhost:8080/ui_kits/website/calendar.html) | New deck copy |
| Donations | [donations.html](http://localhost:8080/ui_kits/website/donations.html) | Volunteer block replaced with newsletter signup |
| Funerals | [funerals.html](http://localhost:8080/ui_kits/website/funerals.html) | Added photo |
| Room Hire | [room-hire.html](http://localhost:8080/ui_kits/website/room-hire.html) | Extra gallery photo |
| Baptisms | [baptisms.html](http://localhost:8080/ui_kits/website/baptisms.html) | Different photos (not history font) |
| Who's Who | [whos-who.html](http://localhost:8080/ui_kits/website/whos-who.html) | Clemency / Claire / Antony bios via Sanity |

---

## Table 1 — Mark items

| # | Page | Original feedback (from doc) | Gaurav comments (from doc) | Status | Review |
|---|------|------------------------------|----------------------------|--------|--------|
| T1-1 | [link](https://emmanuel-website-sepia.vercel.app/ui_kits/website/im-new.html) | The DONATE buttom top right take to another page and then a bit of scrolling to find a link.    Should we make it easier…..maybe at the top of: https://emmanuel-website-sepia.vercel.app/ui_kits/website/donations.html   <br> We should have the buttons to make life easier | Good feedback. Done. pls check | ✅ Already done (prior) | [donations.html](http://localhost:8080/ui_kits/website/donations.html) |
| T1-2 | [link](https://emmanuel-website-sepia.vercel.app/ui_kits/website/annual-reports.html) | Should we not just link to a specific document and not a folder? <br> For example accounts would hit this document: <br> https://drive.google.com/drive/folders/14A74nipr9J063KBBS8ChooKW--FkoCOt <br><br> Earlier years can be made available to add | We do link to the annual report. And i see link to folder for finance statement. Happy to have multiple links to prior statements. What are they vicar@emmanuelnw6.com ? | ⏸️ Needs decision<br>*Waiting on prior-year statement links from vicar@* | [annual-reports.html](http://localhost:8080/ui_kits/website/annual-reports.html) |
| T1-3 | [link](https://emmanuel-website-sepia.vercel.app/ui_kits/website/donations.html) | Add additional methods to donate, say under how to donate have “other ways” <br><br> By monthly standing order - email treasurer@emmanuelnw6.com  for bank details and a gift aid form. Via the givealittle.co  platform where you can select a specific date in monthly for a payment. <br><br> Both Parish Giving and givealittle offer monthly and one-off donations | Good feedback. Done. pls check | ✅ Already done (prior) | [donations.html](http://localhost:8080/ui_kits/website/donations.html) |

---

## Table 2 — Combined feedback (unique T2 + T3)

Duplicates between the original Table 2 and Table 3 are omitted; the **T3** wording is kept (usually more detail). **T2-** rows below are items that only appeared in Table 2.

| # | Original feedback (from doc) | Status | Review |
|---|------------------------------|--------|--------|
| T3-01 | Change title to  <br>  <br>  Hakuna matata  <br>  <br>  Change photo to https://drive.google.com/file/d/11smZQkvJUecJInxr-ZZyxNkP6YetS3aq/view?usp=sharing | ⏭️ Ignored (placeholder — per Gaurav) | — |
| T3-02 | Take out italics and different colour font? | ✅ Changed<br>*`site/components.css`; `index.njk`* | [index.html](http://localhost:8080/ui_kits/website/index.html) |
| T3-03 | From Setpember this will be thursday | ✅ Changed<br>*Sanity `serviceTime` via `studio/apply-feedback-june10.js`* | [service-times.html](http://localhost:8080/ui_kits/website/service-times.html), [index.html](http://localhost:8080/ui_kits/website/index.html) |
| T3-04 | It’s weekly, not fortnightly | ✅ Changed<br>*`footer.njk`, `index.njk`, Sanity contact intro* | [index.html](http://localhost:8080/ui_kits/website/index.html), [contact.html](http://localhost:8080/ui_kits/website/contact.html) |
| T3-05 | Delete “a vibrant part of north London” | ✅ Changed<br>*Sanity `sitePage-home`* | [index.html](http://localhost:8080/ui_kits/website/index.html) |
| T3-06 | delete | ⏸️ Needs decision<br>*Screenshot-only “delete” — confirm target section* | — |
| T3-07 | Not ‘term time only’ but doesn’t meet in the summer holidays (I think this could be in the detail in ‘more about Sundays’) | ✅ Changed<br>*Sanity `im-new` cards* | [im-new.html](http://localhost:8080/ui_kits/website/im-new.html) |
| T3-08 | I like step free access and hearing loop. Think the other two are a bit random. Worth replacing with ‘disabled access bathroom’? Or not necessary? | ✅ Changed<br>*Sanity `im-new` access cards* | [im-new.html](http://localhost:8080/ui_kits/website/im-new.html) |
| T3-09 | Flip these two paragraphs | ⏸️ Needs decision<br>*Need confirmation which two paragraphs* | — |
| T3-10 | Delete 11 from Lyncroft Gardens. And Morning Prayer 9:00 Monday-Thursday | ✅ Changed<br>*`im-new.njk`, `contact.njk` map* | [im-new.html](http://localhost:8080/ui_kits/website/im-new.html), [contact.html](http://localhost:8080/ui_kits/website/contact.html) |
| T3-11 | Add Monday 18:30 Contemplative Eucharist  <br>  Thursday 14:30 Emmanuel School Service | ✅ Changed<br>*Sanity services (description refreshed)* | [service-times.html](http://localhost:8080/ui_kits/website/service-times.html) |
| T3-12 | Take away () from after noisy. So it reads: and Joyful Noise more noisy! | ✅ Changed<br>*Sanity `im-new` intro* | [im-new.html](http://localhost:8080/ui_kits/website/im-new.html) |
| T3-13 | Delete AAA | ✅ Already gone in CMS<br>*Ensured clean Catriona bio in Sanity* | [whos-who.html](http://localhost:8080/ui_kits/website/whos-who.html) |
| T3-14 | Add Citizens logo to our list at the bottom | ⏸️ Phase 3 / design<br>*Footer has text badges; need logo image assets + placement* | — |
| T3-15 | Add this logo | ⏸️ Phase 3 / design<br>*Footer has text badges; need logo image assets + placement* | — |
| T3-16 | Add this logo | ⏸️ Phase 3 / design<br>*Footer has text badges; need logo image assets + placement* | — |
| T3-17 | The Lady Chapel  <br>  In 2024 the vestry was restored to its original state as a side chapel to the south of the High Altar.  <br>  <br>  The vestry was returned to its former location replacing what had been the vicar’s study and then the Nazareth Chapel. The Lady Chapel houses the statue of the Blessed Virgin Mary, donated by the sisters of Edgware Abbey in 2011, along with other images and statues of our Lady. The chapel is open all day every day and offers a place for silent prayer and contemplation. | ✅ Changed<br>*`history.njk`* | [history.html](http://localhost:8080/ui_kits/website/history.html) |
| T3-18 | Let’s find a different baptism photo because we have this one in the history page. | ✅ Changed<br>*`baptisms.njk` → feedback photos* | [baptisms.html](http://localhost:8080/ui_kits/website/baptisms.html) |
| T3-19 | *(screenshot only / empty text cell in export)* | ⏸️ Needs decision<br>*Empty / screenshot-only in export* | — |
| T3-20 | Replace with: Everything happening at Emmanuel: our regular services, weekly bookings in the church, as well as concerts, special events and services. | ✅ Changed<br>*`calendar.njk`* | [calendar.html](http://localhost:8080/ui_kits/website/calendar.html) |
| T3-21 | Remove random colours and italices | ✅ Partial<br>*Hero + welcome heading emphasis toned down* | [index.html](http://localhost:8080/ui_kits/website/index.html) |
| T3-22 | Think we should take off youtube. | ✅ Changed<br>*`header.njk`* | any page |
| T3-23 | delete | ⏸️ Needs decision<br>*Screenshot-only “delete” — confirm target section* | — |
| T3-24 | Add: the church is open from 9am-7pm every day. We know that it can be hard to find peace and stillness in the busyness of life. At Emmanuel there are spaces set aside for you to light a candle or offer private prayer whenever you would like to and a member of the clergy will always be happy to pray or speak with you, if that is helpful. | ✅ Changed<br>*Sanity `sitePage-contact`* | [contact.html](http://localhost:8080/ui_kits/website/contact.html) |
| T3-25 | All text in white. | ⏸️ Needs decision<br>*Which section? screenshot-dependent* | — |
| T3-26 | Add MA, PhD | ✅ Changed<br>*`history.njk` byline* | [history.html](http://localhost:8080/ui_kits/website/history.html) |
| T3-27 | Change ‘will need to have been attending twice a month since January 2026’ to ‘will need to have been attending 6 times each quarter since January 2026’. | ✅ Changed<br>*`emmanuel-school.njk`* | [emmanuel-school.html](http://localhost:8080/ui_kits/website/emmanuel-school.html) |
| T3-28 | Add photo of school christingle service  <br>  Correct Eucharist first Thursday of the month | ✅ Partial<br>*Thursday done; Christingle photo → Phase 3* | [emmanuel-school.html](http://localhost:8080/ui_kits/website/emmanuel-school.html) |
| T3-31 | This should go to vicar@emmanuelnw6.com | ✅ Changed<br>*`im-new.njk`, `safeguarding.njk`* | [im-new.html](http://localhost:8080/ui_kits/website/im-new.html), [safeguarding.html](http://localhost:8080/ui_kits/website/safeguarding.html) |
| T3-33 | Delete ‘close to the village green’ and Add: ‘well served by bus, rail and undergound’. | ✅ Changed<br>*`contact.njk`* | [contact.html](http://localhost:8080/ui_kits/website/contact.html) |
| T3-34 | delete | ⏸️ Needs decision<br>*Screenshot-only “delete” — confirm target section* | — |
| T3-35 | Needs photos of rooms. Emma to supply | ⏸️ Phase 3<br>*One Drive room photo placed; more still needed from Emma* | [room-hire.html](http://localhost:8080/ui_kits/website/room-hire.html) |
| T3-37 | Replace this photo | ⏸️ Phase 3<br>*Screenshot-dependent which photo* | — |
| T3-38 | Add something about home communions | ✅ Changed<br>*Sanity contact intro* | [contact.html](http://localhost:8080/ui_kits/website/contact.html) |
| T3-39 | These need expanding a bit I think. Get rid of ‘get involved’ and Across the top In addition to what we have, can we add: 1) Worship & Music (and then all the music stuff goes in there)  <br>  2) Children & Youth (and all the kids stuff goes in there - church, school, youth group, seasonal workshops, scouts)  <br>  3) Community Outreach:  <br>  From get involved - electoral roll can go in ‘about us’ and volunteer gets deleted. | ⏸️ Phase 2<br>*Nav restructure — not implemented* | — |
| T3-40 | Take service and prayer times out of what’s on and have a separate tab called Worship and Music which includes Service times and all the info about the choirs.  <br>  <br>  And I think ‘room hire’ should also be a separate one at the top so it’s easy to find. | ⏸️ Phase 2<br>*Nav restructure — not implemented* | — |
| T3-41 | Take out ‘find your place at the table’ | ✅ Changed<br>*Sanity im-new + service-times* | [im-new.html](http://localhost:8080/ui_kits/website/im-new.html), [service-times.html](http://localhost:8080/ui_kits/website/service-times.html) |
| T3-42 | Delete final sentence | ⏸️ Needs decision<br>*Which final sentence? (screenshot)* | — |
| T3-43 | Community Organising should be in big and blue like the other outreach projects.  <br>  Add this picture to Community Organising bit  <br>  <br>  https://drive.google.com/file/d/1LEN1Pq_08Amu-vonqd-qd4B1k1RSsf11/view?usp=sharing  <br>  <br>  Add    <br>  <br>  Put the foodhub at the bottom of this list. Then a sentence at the end: to find out more about how you can get involved, contact the parish office. Add this picture  <br>  <br>  https://drive.google.com/file/d/1ZKTY6dYRQq5CX_7-G8xXwOQfI6QmDbcM/view?usp=sharing | ✅ Changed<br>*`food-bank.njk` + `/assets/feedback/community-organising.jpg`* | [food-bank.html](http://localhost:8080/ui_kits/website/food-bank.html) |
| T3-44 | *(screenshot only / empty text cell in export)* | ⏸️ Needs decision<br>*Empty / screenshot-only in export* | — |
| T3-45 | FoodCycle Lunch  <br>  A weekly FoodCycle Lunch is held at St Cuthbert’s on Saturdays at 1pm. This gives us the privilege of welcoming many from the surrounding communities into our building to share in food and fellowship. The friendly and homely atmosphere has proved extremely popular, and our lunch is now the largest FoodCycle lunch in London!  <br>  <br>  Repair Club  <br>  On the first and third Mondays of each month, the Kilburn Community Repair Club is held at 6:30pm at St  Cuthbert’s. This club allows the local community to bring small appliances to the group to learn how to get them repaired. This is a wonderful initiative which both saves money and helps stop more appliances going to landfill.  <br>  <br>  Gardening Club Saturday mornings at St Cuthbert’s and at Emmanuel | ✅ Changed<br>*`food-bank.njk`* | [food-bank.html](http://localhost:8080/ui_kits/website/food-bank.html) |
| T3-46 | After the first sentence, add:  <br>  <br>  The vicar aims to meet new members of the congregation for a 1-1 meeting within six months of their arrival.  <br>  <br>  Delete ‘we aim to respond as soon as we are able….whole sentence.  <br>  <br>  Delete current final para and replace with:  <br>  <br>  The Church is open daily from 9am-7pm and you are always welcome to come in for prayer, to light a candle or leave a prayer request. When the main church is busy with other activites, the Lady Chapel (to the right of the Jesus statue as you come in) is always available as a quiet place to pray, read and reflect. | ✅ Changed<br>*Sanity contact + `contact.njk` office card* | [contact.html](http://localhost:8080/ui_kits/website/contact.html) |
| T3-47 | Delete this and replace with an extra bit in the box above it which says:  <br>  <br>  Office Hours Monday-Wednesday & Friday 9am-2pm  <br>  <br>  The Safeguarding email address is checked regularly. However, if you have an urgent pastoral or safeguarding concern please call the vicar: 07729951935. | ✅ Changed<br>*`safeguarding.njk` (+ contact office card)* | [safeguarding.html](http://localhost:8080/ui_kits/website/safeguarding.html) |
| T3-48 | Delete lend a hand box. Delete this photo and add better community outreach photo. | ✅ Changed<br>*`food-bank.njk`* | [food-bank.html](http://localhost:8080/ui_kits/website/food-bank.html) |
| T3-49 | Add photo above to this page - fundraising event | ⏸️ Phase 3<br>*Need page slot direction* | — |
| T3-50 | I don’t think this works at the bottom of the giving page or as a link from ‘volunteer’. I think we scrap it completely and it may be we add something about this in due course. It’s not really what we mean by volunteering (which is more about community outreach stuff). | ✅ Changed<br>*Removed home Volunteer tile; donations other-ways → newsletter* | [index.html](http://localhost:8080/ui_kits/website/index.html), [donations.html](http://localhost:8080/ui_kits/website/donations.html) |
| T3-51 | Replace with: Sign up to receive our newsletter  <br>  <br>  If you’d like to receive our weekly newsletter, please click here. | ✅ Changed<br>*`donations.njk` + contact CMS* | [donations.html](http://localhost:8080/ui_kits/website/donations.html) |
| T3-52 | Above’ whilst we are proud of our anglican identity para’....Add: we hope you will find a warm welcome when you first attend Emmanuel - whether in the week or on Sundays. Please do introduce yourself to one of the welcomers or clergy, we’ll be happy to tell you more about our congregation and community life.  <br>  <br>  we are working hard to make Emmanuel an inclusive and welcoming space. The Church is accessible to wheelchair and mobility scooter uses via the Bell Porch entrance. Disabled toilets are located at the back of the church. The Church has a hearing aid loop installed.  <br>  <br>  Repeat: The vicar aims to meet new members of the congregation for a 1-1 meeting within six months of their arrival. Please contact her if you’d like to arrange a meeting. | ✅ Changed<br>*Sanity `sitePage-im-new`* | [im-new.html](http://localhost:8080/ui_kits/website/im-new.html) |
| T3-53 | Originally from Birmingham, Mthr Clemency discerned her call to ordained ministry while at university. She began her ministry in West Hampstead in May 2026, with a particular responsibility for the life and ministry of St Cuthbert’s Church, alongside a focus on developing passion for social justice and community outreach across our two churches. Mthr Clemency is currently training as a spiritual director in the Ignatian tradition and has a particular love for contemplative prayer. Outside of ministry, she enjoys reading good books and watching bad television, and can usually be drawn into a conversation about tennis or hymns. | ✅ Changed<br>*Sanity person (Clemency)* | [whos-who.html](http://localhost:8080/ui_kits/website/whos-who.html) |
| T3-54 | St Cuthbert’s  <br>  <br>  St Cuthbert’s is a church entering an exciting new chapter. After a period where regular worship was paused, we are preparing to re-root ourselves in regular prayer and worship. Like Emmanuel, we seek to make the Eucharist at the heart of everything we do: a shared meal which reflects our shared lives together.  <br>  We hope for services at St Cuthbert’s to take a more informal shape, bringing together ancient traditions of worship with a warm and accessible atmosphere.  <br>  Alongside this, St Cuthbert’s has become a thriving centre of community life. A growing range of projects and events make the church building a place of welcome throughout the week, including Saturday’s FoodCycle community lunches (the largest in London!), our local Scouts group, a repair café, and other social outreach initiatives. At St Cuthbert’s, worship and community life grow side by side. | ⏸️ Phase 2<br>*New St Cuthbert’s page + nav — not implemented* | — |
| T3-55 | A lifelong resident of West Hampstead, Claire has been a familiar face in our community for years, having taught Sunday school for over 18 years. As Children’s Champion, she brings a deep understanding of our local families, especially since many of the children attend the church-connected school where she also works. Claire loves seeing the children grow in confidence and faith across both school and church life. In her rare moments of free time, she enjoys relaxing with friends, getting lost in a good book, or catching a live concert. | ✅ Changed<br>*Sanity person (Claire)* | [whos-who.html](http://localhost:8080/ui_kits/website/whos-who.html) |
| T3-56 | Antony Edwards  <br>  Antony has lived in West Hampstead with his family for over 20 years having previously lived in Australia, New York, and Switzerland. As one of the churchwardens, he helps oversee the practical and financial aspects of parish life, while also supporting the Church’s mission and ministry. He has a particular interest in the rich variety of Christian traditions, interfaith engagement, and how faith can shape everyday life for the better. He’s also always happy to talk about cricket. | ✅ Changed<br>*Sanity person (Antony; was “To be confirmed”)* | [whos-who.html](http://localhost:8080/ui_kits/website/whos-who.html) |
| T3-57 | https://drive.google.com/file/d/1-Rlqjwlp08YpM4XDH-riphd48jDTn_8W/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-58 | https://drive.google.com/file/d/1_ngwAmSihu1GPNaliGl-WWz55HCfgijY/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-59 | https://drive.google.com/file/d/1pmnwbfImKC7DDq5RctUOtH4j1JfXmGqL/view?usp=sharing  <br>  <br>  https://drive.google.com/file/d/1BHKAcV7VkYFck5qnNqhaeeRA3EZUG_UL/view?usp=sharing  <br>  <br>  https://drive.google.com/file/d/1KL2db0CsDBZUx70FD0QyIwc_Vt4BarR9/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-60 | https://drive.google.com/file/d/1BHKAcV7VkYFck5qnNqhaeeRA3EZUG_UL/view?usp=sharing  <br>  <br>  https://drive.google.com/file/d/1WmlS14ZN8jcwzmToQehWNqbrmOH56PhL/view?usp=sharing  <br>  <br>  https://drive.google.com/file/d/1Pb6hPHvsyZiqv5JDZvOibdAuMIX4PtZ3/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-61 | https://drive.google.com/file/d/19FzAmEs9JILmeKDoLkFRJJKhCjTV0ntZ/view?usp=sharing  <br>  <br>  https://drive.google.com/file/d/11smZQkvJUecJInxr-ZZyxNkP6YetS3aq/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-62 | https://drive.google.com/file/d/1kZfMMbScYM1Oj2eNerqjMvXoJnp4VD-N/view?usp=sharing  <br>  <br>  https://drive.google.com/file/d/1WwhLw-ip4ngkX0DCkda6nlZKTPHOgdgk/view?usp=sharing  <br>  <br>  https://drive.google.com/file/d/13Nkv1Df94kM57j0GyrPvryHLnUO0Ox4z/view?usp=sharing  <br>  (or this one can go by children adn youth page) | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-63 | https://drive.google.com/file/d/11ZTLsScv4KU78bBsKMZ9vUtJvsJnI1a6/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-64 | https://drive.google.com/file/d/1Pb6hPHvsyZiqv5JDZvOibdAuMIX4PtZ3/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-65 | https://drive.google.com/file/d/1N2zWldP2u8h4kcPGIOD0VAl8xxpM9U9U/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-66 | https://drive.google.com/file/d/1KDq9XRL2E9i-LKdv3nMQENfP0fKFfhY8/view?usp=sharing  <br>  <br>  https://drive.google.com/file/d/1Liy5tMTw2wiF54KgBobHLNR5m3Jbvrzw/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-67 | https://drive.google.com/file/d/1JV8U1eTRCrNsNV8JXRxkJ8gRt7HBUBdh/view?usp=sharing  <br>  <br>  https://drive.google.com/file/d/1ieIi2JmZozdgW2OpknI5vvNe4ubdd8WG/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-68 | https://drive.google.com/file/d/144dsndsp6-e8HTMgHXcSV-fhh3BD4nRx/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-69 | https://drive.google.com/file/d/1nG0c5n4hG6BC1hfyUQxClyUeTbnLMwQI/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-70 | https://drive.google.com/file/d/1sjCznOmEdgfdLU9-2xIV1MFUr6SCSi-H/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-71 | https://drive.google.com/file/d/1FfD1iVr5VcWPAxjPs8u2Ndriwy0M80d9/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T3-72 | https://drive.google.com/file/d/1vi9mvfP8SgXzWWNGP4P_A8oAOTt3rui5/view?usp=sharing | ⏸️ Phase 3<br>*Downloaded under `site/assets/feedback/` where possible; need placement direction* | — |
| T2-19 | *(screenshot only / empty text cell in export)* | ⏸️ Needs decision / Phase 3 | — |
| T2-36 | Add: The flower team, Community organising activities, Youthwork, Tea & Coffee at 10:30, Sacristy Team | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-39 | Logos like this | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-40 | All italics in headings e.g ‘meet the team ’ removed | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-41 | Put ‘Church’ next to ‘Emmanuel’ also in blue | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-42 | Either remove the ‘Welcome to’ or make it bigger; easy to miss  <br>  <br>  Also: either replace image in the background or tilt so it doesn’t look askew | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-43 | Clicking on these links just brings you to the top of the page; doesn’t need to be links I think? | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-44 | I think we don’t need the 15k thing twice? | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-45 | Maybe remove “from the parish”? Don’t think it’s needed | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-46 | As Trin mentioned logos here and/or links? | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-47 | Fix logo at the bottom of the page | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-48 | Link doesn’t take you anywhere | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-50 | I think let’s not have the individual services as links as they are right now if they just take you to all service times. | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-51 | Remove the am so we stick to 24h consistently | ✅ Changed<br>*Removed am suffixes on home (template)* | [index.html](http://localhost:8080/ui_kits/website/index.html) |
| T2-52 | Remove the ‘I am new’  <br>  Also maybe a different picture in the back? | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-54 | It’s a bit confusing that you get to this page via Home>About Us>Our Team and then this says “who’s who” and “meet the team”  <br>  I suggest just sticking with what you clicked on | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-55 | Needs to be bigger, same as the other headers  <br>  <br>  Also the images feel giant? I think a bit smaller would be okay but it takes ages to scroll and it should at least include an email address where the team can be reached | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-56 | I think it’d be better if we have one of these that stay consistent. | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-57 | Include info@emmanuelnw6.com | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-59 | Doesn’t Blaise have an email for volunteering or am I making things up? | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-60 | Make it more obvious that you can actually click on the plus cuz I thought it was a typo haha  <br>  and fix colouring | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-61 | I would remove “the hope we hold” | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-62 | Not a fan of the moving when you hover over it, makes it a bit hard to read and makes me dizzy | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-63 | Remove the subtitle, it feels a bit silly | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-64 | These are all happening on Sunday for some reason?  <br>  Maybe include if it’s Children & Youth / All Age / Forest Church | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-65 | This is two buttons that lead to the same page | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-66 | I think we can remove the other service times because they’re not all for kids  <br>  Also add scouts and youth group? | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-67 | I think (considering we’re focussing on children) these two deserve a similar box to Children’s and Youth Church.  <br>  I think it’s good we mention our child bishop but it feels a bit useless, @Trin maybe a picture on our board rather than online? | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-68 | Maybe add a picture? | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-69 | Maybe include a link to the events page here  <br>  And maybe info about children’s choir and the youth club? | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-70 | Deserves to be bigger!! | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-71 | I think Joe should move to the “Our Team” page and this could maybe be a link? Feels silly to have them double | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-72 | Specify adult choir and add children? | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-73 | I read “Both church entrances” first and was a bit confused; maybe switch around and have food donation bigger | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-74 | Once again same page | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-75 | Could be bigger; ChurchSuite login doesn’t work | ⏸️ Phase 2<br>*Fix ChurchSuite login link* | — |
| T2-76 | Maybe have a page dedicated to ChurchSuite since it always causes so much confusion | ⏸️ Phase 2<br>*Dedicated ChurchSuite help page* | — |
| T2-82 | Turn phone number and email address into a link at the bottom of the page | ⏸️ T2-only — needs reviewNo clear T3 equivalent; not auto-merged | — |
| T2-83 | https://drive.google.com/file/d/1ZKTY6dYRQq5CX_7-G8xXwOQfI6QmDbcM/view?usp=sharing | ⏸️ Needs decision / Phase 3 | — |

---

## Phase 2 — new pages / nav (do not build yet)

- Top-level **Worship & Music** (service times + choirs)
- Top-level **Children & Youth**
- Top-level **Community Outreach** (vs buried under Get Involved)
- Top-level **Room Hire**
- Top-level **St Cuthbert’s** page (copy already in feedback doc)
- Dedicated ChurchSuite help page (from Table 2 comments)
- Rename Get Involved → Community; move Electoral Roll to About Us

---

## Phase 3 — photos needing placement direction

Downloaded to `site/assets/feedback/` (web JPEG):

| File | Suggested by feedback | Status |
|------|----------------------|--------|
| `community-organising.jpg` | Community Organising | ✅ Placed on food-bank.html |
| `foodhub-outreach.jpg` | Outreach / foodhub | ✅ Placed on food-bank aside |
| `funerals.jpg` | Funerals page | ✅ Placed |
| `room-hire.jpg` | Room hire gallery | ✅ Placed as gallery #2 |
| `emmanuel-school.jpg` | School page | ✅ Placed |
| `first-communion.jpg` | First Holy Communion | ✅ Placed on baptisms |
| `confirmation.jpg` | Confirmations | ✅ Placed on baptisms |
| `forest-church.jpg` | Next to Forest Church | ⏸️ Phase 3 — children page slot |
| (other Drive IDs in later T3 rows) | Rolling / seasonal / choir / I’m New | ⏸️ Phase 3 — need layout direction |

Also still needed from parish: Emma room photos; school Christingle; baptism photo swap if these aren’t right; footer logo files (Inclusive Church, Diocese, Living Wage, Citizens).

---

## Sanity note

CMS updates applied via `studio/apply-feedback-june10.js`. Re-run Eleventy (`npm run dev` / `npm run build`) so the site refetches.
