# Virtual Experts — Infrastructure & Account Map

Single source of truth for *where things live*. Update this file whenever an
account, project ID, domain, or environment changes.

## Accounts

| Service        | Account / Owner                | Notes                                                            |
| -------------- | ------------------------------ | ---------------------------------------------------------------- |
| GitHub repo    | `workifyph/virtualexperts`     | Default branch: `main`                                           |
| Cloudflare     | `Workify.ph.hq@gmail.com`      | **Not** under `aisaiah.platform@gmail.com` — that's a different account |
| Domain (DNS)   | Cloudflare (same account)      | `virtualexperts.ph`                                              |

> **Important:** Cloudflare deploys (Pages projects, secrets, DNS) live under
> the **`Workify.ph.hq@gmail.com`** Cloudflare account. Do not run `wrangler`
> commands while logged into a different account — they will silently target
> the wrong account or fail with auth errors.

### Switching `wrangler` to the right Cloudflare account

You have two options. The token approach is preferred for CI; the OAuth login
is preferred locally.

**Option 1 — local OAuth login (interactive):**

```bash
npx wrangler logout
npx wrangler login          # browser opens; sign in with Workify.ph.hq@gmail.com
npx wrangler whoami         # confirm the account name shown is "Workify.ph.hq@gmail.com's Account"
```

**Option 2 — API token (works in CI and locally):**

1. Sign in to <https://dash.cloudflare.com> as `Workify.ph.hq@gmail.com`.
2. Go to **My Profile → API Tokens → Create Token**.
3. Use the **Edit Cloudflare Workers** template (or create custom with scopes:
   `Account.Cloudflare Pages: Edit`, `Account.Account Settings: Read`,
   `Zone.DNS: Edit` if you also manage DNS here).
4. Save as `CLOUDFLARE_API_TOKEN` (and the account ID as `CLOUDFLARE_ACCOUNT_ID`)
   in:
   - GitHub Actions repo secrets (for CI deploys).
   - Local shell only when needed: `export CLOUDFLARE_API_TOKEN=...`.

Once the token is set in env, `wrangler` skips OAuth entirely.

### Common gotcha: stale wrangler cache

`node_modules/.cache/wrangler/` caches the last-used account ID. If you switch
accounts and start seeing `Authentication error [code: 10000]`, clear it:

```bash
rm -rf node_modules/.cache/wrangler
```

## Environments

The site has **two environments**, served from two different Cloudflare Pages
projects. Content changes reach **dev only**; prod is gated behind an
approved branch merge.

| Environment | Branch | Cloudflare Pages project   | Domain                     |
| ----------- | ------ | -------------------------- | -------------------------- |
| Development | `dev`  | `virtualexperts-preview`   | `dev.virtualexperts.ph`    |
| Production  | `main` | `virtualexperts`           | `virtualexperts.ph`, `www.virtualexperts.ph` |

> The dev project is named `virtualexperts-preview` for historical reasons —
> Cloudflare Pages does not support renaming projects. Its production-branch
> field is set to `dev`, so the custom-domain alias `dev.virtualexperts.ph`
> serves dev-branch deploys.

> Content lives in the repo, so an environment shows exactly what its branch
> contains — `dev` shows the `dev` branch, prod shows `main`. Editors stage by
> keeping a folder's name prefixed with `_` (a draft). To get content from dev
> to prod, someone with approval rights merges `dev → main`.

## Deploy triggers

| Trigger                              | Workflow                          | Result                          |
| ------------------------------------ | --------------------------------- | ------------------------------- |
| `git push` to `dev`                  | `.github/workflows/deploy-dev.yml`  | Build + deploy to `virtualexperts-dev` |
| PR merged: `dev → main`              | `.github/workflows/deploy-prod.yml` | Approval-gated; deploys to `virtualexperts` |

The **production** workflow uses a GitHub **Environment** named `production`
with **required reviewers**. Even though `main` triggers the workflow, the
deploy step waits until a reviewer approves it.

## What the VA / content editor sees

VAs and content editors **never touch Cloudflare or any deploy machinery.**
All content is folders of text files and images in this repo, edited through
the GitHub website. The deploy chain runs server-side in GitHub Actions and
reaches Cloudflare via secrets the VA cannot see.

```
VA browser → github.com/workifyph/virtualexperts (branch: dev)
   → edit a folder under content/blog, content/case-studies,
     public/talent, or public/leadership
   → Commit to dev
   → (server-side) GitHub Actions → wrangler pages deploy
   → dev.virtualexperts.ph updates
   → VA refreshes the tab to see their content
   → to go live: open a PR dev → main and merge (approval-gated)
```

**What the VA needs:** a browser and write access to the GitHub repo.

**What the VA never needs:** Cloudflare login, wrangler, Node, SSH, VPN,
terminal access, or any infrastructure credentials.

The step-by-step procedure is in [`editing-content.md`](./editing-content.md).

### Keep the dev site publicly viewable

The Cloudflare Pages projects (`virtualexperts-dev`, `virtualexperts`) must be
left **default-public** so VAs can view their work without Cloudflare auth.
By default, `*.pages.dev` URLs and any attached custom domain are readable
by anyone.

> **Do not** attach a Cloudflare Access policy to the dev Pages project.
> Doing so would gate the site behind a Cloudflare login, breaking the VA
> workflow. If you later want to keep the dev URL out of search engines, use
> a `noindex` header / robots.txt rule instead — *not* an Access policy.

If you ever need to password-protect dev temporarily (e.g., before a launch),
prefer a basic-auth header in `_headers` or a Cloudflare Worker, not Access.
That way you can hand the password to VAs without giving them Cloudflare
accounts.

## Rollback runbook

Content lives in git alongside the code, so **rollback is a git operation** —
there is no separate CMS state that can drift out of sync with a deploy.

### What git gives you

1. **Drafts.** A folder prefixed with `_` is invisible on both environments.
   Editors stage work by leaving the underscore on until it is ready.
2. **Full history.** Every version of every article, profile, and photo is in
   the repo forever. On GitHub: open the file → **History** → pick a version.
3. **Atomic rollback.** Reverting a commit reverts the text *and* its images
   together. A deploy is reproducible from its commit — rebuilding the same
   commit always produces the same site.

### What Cloudflare gives you

Every Pages deploy is preserved, so you can **promote a previous deployment**
from the Pages dashboard for an instant fix. Unlike the old CMS setup this is
now safe to leave in place: the next deploy rebuilds from the repo, so as long
as you also revert the commit, the two agree.

### Rollback playbooks

**Bad change caught on dev (preferred case):**

1. Bad content is pushed to `dev` → `dev` rebuilds → visible on
   `dev.virtualexperts.ph`.
2. **Do not merge `dev → main`.**
3. Fix it forward with another commit to `dev`, or revert the bad commit:
   `git revert <sha> && git push origin dev`.
4. `dev` rebuilds → verify.
5. Once green, approve the `dev → main` merge.

**Bad change reached prod:**

1. **Immediate stopgap:** Cloudflare dashboard → Pages → `virtualexperts` →
   Deployments → previous green deployment → "Rollback to this deployment".
   Live within seconds.
2. **Permanent fix:** revert the commit on `dev`
   (`git revert <sha> && git push origin dev`), verify on dev, then merge
   `dev → main`.
3. Prod rebuilds from the reverted commit and now matches the stopgap.

**Editor wants to stage without affecting dev:**

Prefix the folder with `_`. It stays in the repo, fully editable, and never
appears on either environment. For blog and case studies the draft's *images
are not published either* — `content/` is outside `public/`, and only
published articles' images are copied into the deploy.

## Project IDs and IDs at a glance

| Thing                         | Value                                      |
| ----------------------------- | ------------------------------------------ |
| Cloudflare account            | `Workify.ph.hq@gmail.com`                  |
| Cloudflare account ID         | `8989d421b40e5722753ce9378579c5ff`         |
| Cloudflare zone ID            | `c4c53c15e255d0ed3bf6b83e262317a8` (virtualexperts.ph) |
| Prod Pages project            | `virtualexperts`                           |
| Dev Pages project             | `virtualexperts-preview` (production_branch = `dev`) |
| GitHub repo                   | `workifyph/virtualexperts`                 |
| Default branch                | `main`                                     |
| Dev branch                    | `dev`                                      |
| GitHub Environment (prod gate)| `production` — approvers: `workifyph`, `aisaiah-ai`, `riohuelartechsupport-art`, `carmeladawn` (any one can approve) |

## CI secrets in GitHub Actions

Set under **Repo → Settings → Secrets and variables → Actions**:

| Secret                            | Source                          |
| --------------------------------- | ------------------------------- |
| `CLOUDFLARE_API_TOKEN`            | Custom token: Pages:Edit, DNS:Edit, Zone:Read |
| `CLOUDFLARE_ACCOUNT_ID`           | `8989d421b40e5722753ce9378579c5ff` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`   | `r44epy9f`                      |
| `NEXT_PUBLIC_SANITY_DATASET`      | `production`                    |
| `NEXT_PUBLIC_SANITY_API_VERSION`  | `2025-01-01`                    |

To rotate the Cloudflare token: create new at <https://dash.cloudflare.com/profile/api-tokens>, then
`gh secret set CLOUDFLARE_API_TOKEN -R workifyph/virtualexperts --body <new>`, then delete the old token in CF dashboard.

## Decommissioned

**Sanity CMS** (project `r44epy9f`, dataset `production`, org
`Workify.ph.hq@gmail.com`) backed blog posts and case studies until August
2026. All 82 documents — 12 published and 70 unpublished drafts — were
exported into `content/` folders and the integration was removed from the
codebase.

Still to do, outside this repo:

- Delete the Sanity webhook `DPfgDL3jB525Rcxu` ("Deploy to dev on publish").
  The `repository_dispatch` trigger it fired is gone, so it now fails silently.
- Remove the `NEXT_PUBLIC_SANITY_*` and `SANITY_API_READ_TOKEN` GitHub Actions
  secrets — the workflows no longer read them.
- Close the Sanity project once you are satisfied nothing else depends on it.
  **The dataset is the only remaining copy of the original Portable Text and
  the full-resolution images**, so keep it until the folder content has been
  live for a while.
