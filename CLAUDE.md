# baresignals.co: where data lives and how an update flows (rules set 20 Nov 2026)

Every chat that edits this site follows this file. Two chats edit the repo: always `git pull` first and build the
next version on top of whatever is live.

## 1. One master per kind of data

| Data | The master (edit only here) | Live address every page must read |
|---|---|---|
| Research (sources, reports, numbers, dates) | Bare Signals Research Log, Google Sheet `17HmkSXeQM2O6KEKwZgt8U2DGB3ftn-L8eUheXT_cPLM` | n/a (feeds the Library) |
| Compounds: dose, how often, cycle, route, summary, what it does, who shouldn't, synergies, studies | The Library: `library/vN/data.js` (card headline) + `page.js` (full read, dose tiers) + patch files (`mix.js` once mixed, `pw.js` powder, `rx*.js`, `take.js`, ...) | `/library/data.js`, `/library/page.js`, `/library/merge.js` (+ the patch file the page needs) |
| Blood tests | `blood/vN/` (`data.js`, `lib.js`, `supp.js`, `suppx.js`) | `/blood/lib.js` etc. |
| Supplements | `supplements/vN/data.js` | `/supplements/data.js` |
| Words the search understands | `tools/search_words_lists.py` -> `tools/search_words.py` writes `/search.js` | `/search.js` |

A page never keeps its own copy of compound facts. A `<script src="/library/v101/...">` (any version number)
in a live page is a bug: it freezes that page in the past. Use the plain address.

## 2. Where a research update goes (in this order)

1. **Research Log first.** New finding, with source, date and confidence, in the compound's tab. Never on the site first.
2. **Show Cece before and after** for any number that changes, with the raw data. Nothing new goes live without her OK.
3. **Library next version** (`library/vN+1/`, old version kept): change the field in data.js / page.js / the patch file.
   The Library's full page is the master; everything else flows down from it.
4. **Publish:** copy the version's files into `library/` (the build does this), run `python3 tools/publish_live.py`
   and `python3 tools/versions_page.py`.
5. **Cascade check:** `python3 tools/cascade_check.py` must print ALL ALIGNED. It opens Dosage, Protocol, How it's made
   and the Guide and compares every compound against the Library.
6. **Push.**

## 3. What one Library change reaches automatically

Library card + Full read, Library search (`library/sx.js` index, rebuilt by the Library build), Dosage, Protocol and Plan,
How it's made, the Guide's doses (Guide v92+ reads `/library/data.js`), every search bar (`/search.js` reads `/library/sx.js`).

Still written by hand, so check them when a compound's facts change: the Guide's body labels and summaries (`C` list in
`home/vN/index.html`), Case and Goal pages (`library/goals/`, `library/aims/`), Supplements cards, Blood work pairings.

## 4. Known pins left to remove (each needs its page's next version)

- Library pins `/blood/v21/lib.js` and `/supplements/v16/data.js` (same content as live today).
- Supplements pins `/blood/v27/supp.js`, `/supplements/v16/data.js`; Blood pins `/blood/v20/data.js`, `/blood/v20/core.js`.

## 5. Versions

Every edit is a new version folder; old ones are never overwritten. Version notes go in the first HTML comment.
No version numbers in reader-facing URLs.
