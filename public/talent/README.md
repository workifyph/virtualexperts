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

---

## 1. Adding a new VA

1. Copy the `_example` folder and rename the copy (e.g. `maria-santos`).
2. Open `profile.md` inside it and fill in the details.
3. Drop in a portrait photo (any of `.jpg` `.jpeg` `.png` `.webp` `.avif`).
   If the folder has several images, the first one alphabetically is used.
4. Commit and push (see "Publishing" below).

No photo yet? The profile still shows, with the VA's initials as a
placeholder — you can add the photo later.

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
auto-deploy.
