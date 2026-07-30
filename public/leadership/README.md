# Leadership — how to manage the executive photos and profiles

The **Leadership** section on the About page
(https://virtualexperts.ph/about) builds itself from the folders in this
directory (`public/leadership/`). **No code changes are ever needed** —
you swap a photo or edit a text file, then push.

```
public/leadership/
  dulce-chiongson/    ← one folder = one executive
    profile.md        ← her name, role, order, and bio
    photo.jpg         ← her portrait photo
  chep-elvas/
  _example/           ← template to copy — folders starting with "_" are
                        NEVER shown on the site
```

This is the same format as `public/talent/` (the Talent Pool). If you
have added a VA before, this will look familiar — there are just fewer
fields. See `public/talent/README.md` for the longer walkthrough.

---

## Changing an executive's photo

This is the most common job, and it is two clicks:

1. Open their folder, e.g. `public/leadership/dulce-chiongson/`.
2. Delete the old image, then **Add file → Upload files** and drop in
   the new one.
3. Commit to `dev`, check https://dev.virtualexperts.ph/about, then open
   a pull request to `main` to publish.

The filename doesn't matter — any image in the folder is used. Name it
`photo.jpg` to match the others.

> **Important:** if you upload a new photo *without* deleting the old
> one, the folder now has two images and the **first one alphabetically
> wins**. `new-photo.jpg` would beat `photo.jpg`, but `photo.jpg` would
> beat `updated.jpg`. Delete the old file to avoid guessing.

## The profile.md format

```
---
name: Dulce Chiongson
role: CEO & Co-Founder
order: 1
---

Co-founded VEX in 2017 and leads the company with a long-term focus on
service quality, professionalism, and dependable execution.
```

| Field   | Example              | Where it shows                 | If you leave it out           |
| ------- | -------------------- | ------------------------------ | ----------------------------- |
| `name`  | `Dulce Chiongson`    | Under the portrait             | The folder name is used       |
| `role`  | `CEO & Co-Founder`   | The gold line under the name   | Nothing shows                 |
| `order` | `1`                  | Left-to-right position         | Sorted last, then A→Z by name |
| *(bio)* | text after the `---` | Held for future use            | Nothing shows                 |

Keep both `---` lines exactly as they are.

**About `order`:** lower numbers come first, so `order: 1` is the
left-most card. To swap two people, swap their numbers. Anyone without
an `order` line is placed after everyone who has one.

**About the bio:** the About page currently shows only the photo, name,
and role — the bio is read and kept ready, but not displayed. Writing
one now is harmless and means it's there if the section is expanded.

## Adding someone new

1. Copy the `_example` folder and rename it to their name in lowercase
   with dashes, e.g. `juana-dela-cruz`.
2. Edit `profile.md` with their details and give them an `order`.
3. Upload their portrait into the same folder.
4. Commit to `dev` and check the staging site.

No photo yet? Their card still appears, showing their initials until you
add one.

## Removing someone

Rename their folder to start with an underscore (`_chep-elvas`) to hide
them while keeping the files, or delete the folder to remove them
permanently. Either way the remaining cards close the gap automatically.

## Photo prep

- Portrait orientation. The frame is roughly 4:5 and crops from the top,
  so leave a little headroom and keep the face in the upper-middle.
- Resize to **~800px wide** and aim for **under ~300KB**.
- Prefer `.jpg` or `.webp`. Large files make the About page slow — the
  site serves these images exactly as uploaded, with no automatic
  shrinking.

## Publishing your changes

```bash
git checkout dev
git pull
# …swap photos / edit profile.md…
git add public/leadership
git commit -m "Update leadership photos"
git push origin dev
```

- Pushing to **`dev`** auto-deploys in ~2 minutes to
  **https://dev.virtualexperts.ph/about** — check it there first.
- To publish to the **live site**, open a pull request from `dev` →
  `main` on GitHub and merge it.

**No terminal?** Do it all on GitHub's website: open the repo, switch
the branch dropdown to `dev`, navigate to `public/leadership/`, and use
**Upload files** or the pencil icon to edit. Committing there triggers
the same auto-deploy.

## Troubleshooting

**The new photo isn't showing.** Allow ~2 minutes for the rebuild, then
hard-refresh the page. If it still shows the old one, check whether the
old image is still sitting in the folder — see the warning above about
two images.

**The name is wrong.** The `name:` line is missing or misspelled, so the
folder name is being used instead.

**They're in the wrong position.** Fix the `order:` numbers — lower is
further left.

**Their card is blank / details show as plain text.** One of the two
`---` lines was changed or deleted. There must be exactly one `---` on
the first line and one on its own line after the last detail.

**I want to undo something.** Every change is in the repo's history.
Open the file on GitHub, click **History**, and copy back the earlier
version. Nothing is ever really lost.
