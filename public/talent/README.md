# Talent — how to manage VA profiles

The Hire-a-VA page (https://virtualexperts.ph/talent) builds itself from the
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
available: yes
experience: 6 years
location: Iloilo, Philippines
skills: Calendar Management, Email Handling, Travel Planning, CRM Updates
tools: Google Workspace, HubSpot, Slack, Canva
---

Everything after the second --- line is the bio. Write normal
paragraphs, separated by a blank line.
```

- **name** and **role** — shown on the card and profile page.
- **available** — `yes` or `no` (see next section).
- **experience**, **location**, **skills**, **tools** — optional; leave a
  line out and it simply won't show. `skills` and `tools` are
  comma-separated lists.
- Keep the two `---` lines exactly as they are.

## 3. Marking a VA available / not available

Edit one line in their `profile.md`:

```
available: yes   ← green "Available" badge + hire form on their page
available: no    ← gray "Currently Placed" badge, hire form replaced
                   with a "contact us" prompt
```

Profiles with `available: yes` are listed first. To remove a VA from the
site entirely, delete their folder (or rename it to start with `_`, e.g.
`_maria-santos`, to keep it on file but hidden).

## 4. What happens when a client clicks "I'm Interested"

The client fills in their name, email, company, and an optional message on
the VA's profile page. That sends an email to **contact@virtualexperts.ph**
containing the client's details plus the VA's name, role, and profile
link. Replying to that email goes straight to the client.

## 5. Photo prep

- Portrait orientation looks best (the frame is roughly 4:5, cropped from
  the top).
- Resize to **~800px wide**, aim for **under ~300KB**.
- Prefer `.jpg` or `.webp`.

## 6. Publishing your changes

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
