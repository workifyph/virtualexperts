# Virtual Experts — Infrastructure & Account Map

Single source of truth for *where things live*. Update this file whenever an
account, project ID, domain, or environment changes.

## Accounts

| Service        | Account / Owner                | Notes                                                            |
| -------------- | ------------------------------ | ---------------------------------------------------------------- |
| GitHub repo    | `workifyph/virtualexperts`     | Default branch: `main`                                           |
| Sanity         | `Workify.ph.hq@gmail.com` org  | Project: **Virtual Experts** (`r44epy9f`), dataset: `production` |
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
projects. Sanity content reaches **dev only**; prod is gated behind an
approved branch merge.

| Environment | Branch | Cloudflare Pages project   | Domain                     | Sanity dataset |
| ----------- | ------ | -------------------------- | -------------------------- | -------------- |
| Development | `dev`  | `virtualexperts-preview`   | `dev.virtualexperts.ph`    | `production`   |
| Production  | `main` | `virtualexperts`           | `virtualexperts.ph`, `www.virtualexperts.ph` | `production`   |

> The dev project is named `virtualexperts-preview` for historical reasons —
> Cloudflare Pages does not support renaming projects. Its production-branch
> field is set to `dev`, so the custom-domain alias `dev.virtualexperts.ph`
> serves dev-branch deploys.

> Both environments currently read the **same** Sanity dataset (Option A in
> the rollback notes below). Editors stage with **drafts** in Sanity; only
> *published* docs reach either environment. To get content from dev to prod,
> someone with approval rights merges `dev → main`.

## Deploy triggers

| Trigger                              | Workflow                          | Result                          |
| ------------------------------------ | --------------------------------- | ------------------------------- |
| `git push` to `dev`                  | `.github/workflows/deploy-dev.yml`  | Build + deploy to `virtualexperts-dev` |
| Sanity webhook (`sanity-publish`)    | `.github/workflows/deploy-dev.yml`  | Same — picks up new content     |
| PR merged: `dev → main`              | `.github/workflows/deploy-prod.yml` | Approval-gated; deploys to `virtualexperts` |

The **production** workflow uses a GitHub **Environment** named `production`
with **required reviewers**. Even though `main` triggers the workflow, the
deploy step waits until a reviewer approves it.

## What the VA / content editor sees

VAs and content editors **never touch Cloudflare, GitHub, or any deploy
machinery.** Their entire workflow is browser → Sanity Studio. The publish →
deploy chain runs server-side in GitHub Actions and reaches Cloudflare via
secrets the VA cannot see.

```
VA browser → /studio
   → log in to SANITY (invite-only)
   → edit blog post or case study
   → click Publish
   → (server-side) Sanity webhook → GitHub Actions → wrangler pages deploy
   → dev.virtualexperts.ph updates
   → VA refreshes the tab to see their content
```

**What the VA needs:** a browser, a Sanity account invite, and the URL of the
embedded Studio.

**What the VA never needs:** Cloudflare login, GitHub access, wrangler, Node,
SSH, VPN, terminal access, or any infrastructure credentials.

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

## Rollback runbook (Option A — single dataset)

We use one Sanity dataset (`production`) for both site environments. Rollback
is **per-document**, not snapshot-based. Read this carefully — it changes how
you respond to a bad change in prod.

### What Sanity gives you

1. **Drafts vs published.** All edits start as drafts. The site uses
   `perspective: "published"`, so drafts never appear on dev or prod.
   *Editors should stage as drafts and only publish when ready.*
2. **Document history.** Every published version of every document is kept
   (~30 days on free plan, longer on paid). Studio → ⋯ menu → "History" →
   "Restore" reverts a single doc to a prior version.
3. **No automatic atomic snapshots** on the free plan. Sanity Releases
   (paid) groups changes for atomic publish/rollback; we do not have it.

### What Cloudflare gives you

- Every Pages deploy is preserved. From the Pages dashboard you can
  **promote a previous deployment** as the live one — but this is a
  **temporary fix only**. The next prod deploy will rebuild from current
  Sanity state and the bad change comes back unless you also revert in
  Sanity.

### Rollback playbooks

**Bad change caught on dev (preferred case):**

1. Editor publishes a bad doc → Sanity webhook → `dev` rebuilds → bad
   content visible on `dev.virtualexperts.ph`.
2. **Do not merge `dev → main`.**
3. Editor reverts the doc via Studio → History → Restore.
4. Webhook fires again → `dev` rebuilds → verify.
5. Once green, approve the `dev → main` merge.

**Bad change reached prod:**

1. **Immediate stopgap:** in Cloudflare dashboard → Pages → `virtualexperts`
   → Deployments → click the previous green deployment → "Rollback to this
   deployment". Site is reverted within seconds.
2. **Permanent fix:** revert the affected doc(s) in Sanity Studio → History
   → Restore.
3. Webhook fires → `dev` rebuilds → verify on `dev.virtualexperts.ph`.
4. Approve `dev → main` merge → prod rebuilds with restored content.
5. The Cloudflare-level rollback is now redundant — the latest prod
   deployment matches the restored state.

**Editor wants to test changes without affecting dev:**

- Use **drafts**. Save changes but do not click Publish. Drafts are visible
  to logged-in editors in Studio but invisible to the public site.
- For larger experiments, consider migrating to Option B (separate dataset).

### When to migrate from Option A → Option B (two datasets)

Migrate when any of these become true:
- More than 2–3 editors working concurrently.
- Compliance requires a deterministic prod content snapshot.
- You routinely need to test multi-doc changes without exposing them on dev.

Migration is roughly:
1. `npx sanity datasets create development`
2. Export prod → import into development (`sanity dataset export production` /
   `sanity dataset import`).
3. Set `NEXT_PUBLIC_SANITY_DATASET=development` in `virtualexperts-dev` env.
4. Add a "promote" GitHub workflow that runs `sanity dataset import` from
   `development` to `production` on `main` deploys.

## Project IDs and IDs at a glance

| Thing                         | Value                                      |
| ----------------------------- | ------------------------------------------ |
| Sanity project ID             | `r44epy9f`                                 |
| Sanity dataset                | `production`                               |
| Sanity API version            | `2025-01-01`                               |
| Sanity org                    | `Workify.ph.hq@gmail.com`                  |
| Sanity webhook id             | `DPfgDL3jB525Rcxu` — "Deploy to dev on publish" |
| Cloudflare account            | `Workify.ph.hq@gmail.com`                  |
| Cloudflare account ID         | `8989d421b40e5722753ce9378579c5ff`         |
| Cloudflare zone ID            | `c4c53c15e255d0ed3bf6b83e262317a8` (virtualexperts.ph) |
| Prod Pages project            | `virtualexperts`                           |
| Dev Pages project             | `virtualexperts-preview` (production_branch = `dev`) |
| GitHub repo                   | `workifyph/virtualexperts`                 |
| Default branch                | `main`                                     |
| Dev branch                    | `dev`                                      |
| GitHub Environment (prod gate)| `production` — required reviewer: `workifyph` |

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

## Sanity webhook → GitHub Actions

The Sanity webhook `DPfgDL3jB525Rcxu` fires on `create | update | delete` of any
`post` or `caseStudy` document. It POSTs to:
`https://api.github.com/repos/workifyph/virtualexperts/dispatches`
with `event_type: "sanity-publish"`, which triggers `deploy-dev.yml`.

**Important note about its auth:** The webhook currently uses a token extracted
from the `gh` CLI session (`gho_…`). It works but is tied to a CLI session
that could expire or be rotated. **Action item:** replace with a dedicated
fine-grained PAT scoped to `repo` (Actions: Write) on this repo only.
Update with:

```bash
SANITY_TOKEN=$(node -e "console.log(require(process.env.HOME+'/.config/sanity/config.json').authToken)")
NEW_GH_PAT=ghp_…
curl -X PATCH "https://r44epy9f.api.sanity.io/v2025-01-01/hooks/projects/r44epy9f/DPfgDL3jB525Rcxu" \
  -H "Authorization: Bearer $SANITY_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"headers\":{\"Authorization\":\"Bearer $NEW_GH_PAT\",\"Accept\":\"application/vnd.github+json\"}}"
```
