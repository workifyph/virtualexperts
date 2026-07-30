# Talent — how to manage VA profiles

The Talent Pool page (https://virtualexperts.ph/talent) builds itself from the
folders in this directory (`public/talent/`). **No code changes are ever
needed** — you edit a text file and a photo, then push.

```
public/talent/
  maria-santos/       ← one folder = one VA profile
    profile.md        ← her details (see below)
    photo.jpg         ← her portrait photo
  juan-dela-cruz/
  _example/           ← template to copy — folders starting with "_" are
                        NEVER shown on the site
```

The folder name becomes the profile's web address:
`maria-santos` → `virtualexperts.ph/talent/maria-santos`.
Use only lowercase letters, numbers, and dashes.

**Contents**

1. [Adding a new VA](#1-adding-a-new-va)
2. [The profile.md format](#2-the-profilemd-format)
3. [Categories (the buttons at the top of the page)](#3-categories-the-buttons-at-the-top-of-the-page)
4. [Marking a VA available / not available](#4-marking-a-va-available--not-available)
5. [What happens when a client clicks "I'm Interested"](#5-what-happens-when-a-client-clicks-im-interested)
6. [Photo prep](#6-photo-prep)
7. [Publishing your changes](#7-publishing-your-changes)
8. [Worked example: adding Rosa from scratch](#8-worked-example-adding-rosa-from-scratch)
9. [Field reference](#9-field-reference)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Adding a new VA

1. Copy the `_example` folder and rename the copy (e.g. `maria-santos`).
2. Open `profile.md` inside it and fill in the details.
3. Drop in a portrait photo (any of `.jpg` `.jpeg` `.png` `.webp` `.avif`).
   If the folder has several images, the first one alphabetically is used.
4. Commit and push (see [section 7](#7-publishing-your-changes)).

No photo yet? The profile still shows, with the VA's initials as a
placeholder — you can add the photo later.

Never done this before? Jump to the
[worked example](#8-worked-example-adding-rosa-from-scratch), which walks
through one profile end to end using only the GitHub website.

## 2. The profile.md format

```
---
name: Maria Santos
role: Executive Virtual Assistant
category: Virtual Assistants
specialization: Executive VA
available: yes
experience: 6 years
location: Iloilo, Philippines
languages: Filipino, English
skills: Calendar Management, Email Handling, Travel Planning, CRM Updates
tools: Google Workspace, HubSpot, Slack, Canva
---

Everything after the second --- line is the bio. Write normal
paragraphs, separated by a blank line.
```

- **name** and **role** — shown on the card and profile page.
- **category** — which button on the Talent page they appear under
  (see section 3).
- **available** — `yes` or `no` (see section 4).
- **specialization** — the short gold badge under their name, e.g.
  `Tier 2 Technical Support`. Leave it out and their category is used.
- **experience**, **location**, **languages**, **skills**, **tools** —
  optional; leave a line out and that row simply won't show.
  `languages`, `skills` and `tools` are comma-separated lists.
  The card shows the first 6 skills and the first 6 tools; the full
  list is on their profile page.
- Keep the two `---` lines exactly as they are.

## 3. Categories (the buttons at the top of the page)

The Talent page opens with a row of category buttons. Clicking one
shows only the VAs in that category. The `category:` line in a VA's
`profile.md` decides which button they sit under.

The categories that already have taglines and icons are:

| Type this in `category:` | Button that appears     |
| ------------------------ | ----------------------- |
| `Customer Support`       | Customer Support Agents |
| `Virtual Assistants`     | Virtual Assistants      |
| `Technical Support`      | Technical Support       |
| `Bookkeeping & Admin`    | Bookkeeping & Admin     |
| `Creative & Marketing`   | Creative & Marketing    |

Things worth knowing:

- **Spelling is forgiving.** `Customer Support`, `customer service`
  and `Customer Support Agents` all land on the same button.
- **A button only appears if someone is in it.** Add the first
  technical support VA and the Technical Support button shows up on
  its own. Move the last one out and it disappears. No code change.
- **You can invent a category.** Type something not in the table —
  `category: Sales Development` — and it gets its own button using
  exactly that wording. It won't have a tagline or a custom icon
  until a developer adds one, but it works straight away.
- **Forgot the line?** The category is guessed from their `role:`
  instead, so nobody ever falls off the page.

A developer edits `src/config/talentCategories.ts` to add a tagline,
an icon, or to change the left-to-right order of the buttons.

## 4. Marking a VA available / not available

Edit one line in their `profile.md`:

```
available: yes   ← green pulsing "Available" badge + hire form on their page
available: no    ← gray "On Duty" badge, hire form replaced
                   with a "contact us" prompt
```

Profiles with `available: yes` are listed first. To remove a VA from the
site entirely, delete their folder (or rename it to start with `_`, e.g.
`_maria-santos`, to keep it on file but hidden).

## 5. What happens when a client clicks "I'm Interested"

The client fills in their name, email, company, and an optional message on
the VA's profile page. That sends an email to **contact@virtualexperts.ph**
containing the client's details plus the VA's name, role, and profile
link. Replying to that email goes straight to the client.

## 6. Photo prep

- Portrait orientation looks best. The Talent page crops it to a small
  circle centred near the top, and the profile page uses a taller 4:5
  frame — so keep the face in the upper-middle of the shot.
- Resize to **~800px wide**, aim for **under ~300KB**.
- Prefer `.jpg` or `.webp`.

## 7. Publishing your changes

```bash
git checkout dev
git pull
# …add/edit profile folders…
git add public/talent
git commit -m "Update talent profiles"
git push origin dev
```

- Pushing to **`dev`** auto-deploys in ~2 minutes to
  **https://dev.virtualexperts.ph/talent** — check your changes there first.
- To publish to the **live site** (virtualexperts.ph), open a pull request
  from `dev` → `main` on GitHub and merge it. Prod deploys automatically
  from `main`.

**No terminal?** You can do everything on GitHub's website: open the repo
on the `dev` branch, navigate to `public/talent/`, and use **Add file →
Create new file** (type `maria-santos/profile.md` as the name to create the
folder) or **Upload files** for photos. Committing there triggers the same
auto-deploy. The next section walks through exactly that.

## 8. Worked example: adding Rosa from scratch

Say you're adding **Rosa Villanueva**, a technical support agent with
3 years of experience. No terminal needed — this is all on github.com.

**Step 1 — open the folder on the `dev` branch.**
Go to the repo, click the branch dropdown (it says `main` by default) and
pick **dev**. Then click into `public` → `talent`.

> Always work on `dev`. It deploys to the staging site where you can
> check your work before anything reaches real clients.

**Step 2 — create her profile file.**
Click **Add file → Create new file**. In the filename box type:

```
rosa-villanueva/profile.md
```

Typing the `/` is what creates the folder — GitHub turns it into a
folder as soon as you type the slash. The folder name becomes her web
address, so keep it lowercase with dashes and no spaces.

**Step 3 — paste her details.** In the big text box:

```
---
name: Rosa Villanueva
role: Technical Support Agent
category: Technical Support
specialization: Tier 2 Technical Support
available: yes
experience: 3 years
location: Davao, Philippines
languages: Filipino, English, Cebuano
skills: Troubleshooting, Ticket Triage, Remote Support, Documentation
tools: Jira, Freshdesk, TeamViewer, Confluence
---

Rosa spent three years on the escalation desk of a US software company,
handling the tickets that Tier 1 could not close. She is comfortable
reading logs, reproducing bugs, and writing up clean handoffs for
engineering.

She has also rewritten a help centre from scratch and mentors new hires
on tone and escalation etiquette.
```

Two things to watch: keep both `---` lines exactly as they are, and put
a blank line between paragraphs of the bio.

**Step 4 — save it.** Scroll down, leave the default commit message or
type something like `Add Rosa Villanueva`, make sure **Commit directly
to the dev branch** is selected, and click **Commit new file**.

**Step 5 — add her photo.** You should now be inside the
`rosa-villanueva` folder. Click **Add file → Upload files**, drag in her
portrait (named anything — `photo.jpg` is the convention), and commit
again. See [section 6](#6-photo-prep) for sizing.

**Step 6 — check it.** Wait about two minutes, then open
<https://dev.virtualexperts.ph/talent>. You should see:

- a new **Technical Support** button at the top, because Rosa is the
  first person in that category
- her card under it, with a green pulsing **Available** badge
- her full profile at `/talent/rosa-villanueva` via **View CV**

**Step 7 — publish to the live site.** On GitHub click **Pull requests →
New pull request**, set it to merge `dev` into `main`, create it, and
merge. The live site updates a couple of minutes later.

**Editing her later** is the same but shorter: open her `profile.md`,
click the pencil icon, change a line, commit to `dev`.

## 9. Field reference

Every line is optional except `name` — but a profile with only a name
looks bare, so fill in what you can.

| Field            | Example                          | Where it shows                                    | If you leave it out                          |
| ---------------- | -------------------------------- | ------------------------------------------------- | -------------------------------------------- |
| `name`           | `Rosa Villanueva`                | Card heading (first name bold) and profile page    | The folder name is used instead               |
| `role`           | `Technical Support Agent`        | The **Role** row on the card                       | Shows "Virtual Assistant"                     |
| `category`       | `Technical Support`              | Which button she sits under                        | Guessed from `role`                           |
| `specialization` | `Tier 2 Technical Support`       | Gold badge under her name                          | Her category name is used                     |
| `available`      | `yes` / `no`                     | Green "Available" or gray "On Duty" badge          | Treated as `yes`                              |
| `experience`     | `3 years`                        | The **Experience** row                             | Row is hidden                                 |
| `location`       | `Davao, Philippines`             | The **Based In** row                               | Row is hidden                                 |
| `languages`      | `Filipino, English, Cebuano`     | The **Languages** row                              | Row is hidden                                 |
| `skills`         | `Troubleshooting, Ticket Triage` | **Key Skills** chips (first 6 on the card)         | Row is hidden                                 |
| `tools`          | `Jira, Freshdesk`                | **Tools** chips (first 6 on the card)              | Row is hidden                                 |
| *(bio)*          | text after the closing `---`     | The "About" section of her profile page            | Section is hidden                             |

`skills`, `tools` and `languages` are comma-separated — one line each,
not a bulleted list. The card shows the first six skills and tools; her
profile page shows all of them, so it's fine to list more.

## 10. Troubleshooting

**My changes aren't showing on the site.**
The site is rebuilt on each push, so allow ~2 minutes. Then check you
committed to the right branch: `dev` updates dev.virtualexperts.ph,
`main` updates the live site. If it's still missing, open the repo's
**Actions** tab — a red ✗ on the latest run means the build failed.

**The profile shows but the name is wrong** (e.g. "Rosa Villanueva 2").
The `name:` line is missing or misspelled, so the folder name is being
used instead. Check the line starts with `name:` and a space.

**A row is missing from the card.**
That field is missing, empty, or misspelled. `experience:` with nothing
after it counts as missing. Compare against
[the field reference](#9-field-reference).

**Everything after the details block turned into one big paragraph.**
Bio paragraphs need a completely blank line between them. A line break
alone isn't enough.

**The whole profile looks broken / details are showing as text.**
One of the two `---` lines was changed or deleted. There must be exactly
one `---` on the first line and one on its own line after the last
detail.

**She's in the wrong category.**
Add or correct the `category:` line — see
[section 3](#3-categories-the-buttons-at-the-top-of-the-page). Without
it the category is guessed from her `role:`, which can land her in the
wrong bucket.

**Her photo isn't showing.**
Check the file is actually inside her folder (not next to it), and that
it ends in `.jpg` `.jpeg` `.png` `.webp` or `.avif`. If the folder has
more than one image, the first one alphabetically wins — delete the
others or rename the one you want to sort first.

**I need to hide someone temporarily.**
Rename their folder to start with an underscore (`_rosa-villanueva`).
It keeps the files but removes them from the site. Rename it back to
restore. Deleting the folder removes them permanently.

**I broke something and want to undo it.**
Every change is saved in the repo's history. Open the file on GitHub,
click **History**, find the version from before your change, and copy
the old text back in. Nothing is ever really lost.

**Something else is wrong.**
Send the VA's folder name and what you expected to see to whoever
maintains the site — the page itself is built from these files, so
almost every problem is a typo in `profile.md`.
