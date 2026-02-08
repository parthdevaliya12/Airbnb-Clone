# Security & Secrets Remediation

This file lists recommended steps to remediate exposed secrets and harden the app before re-deploying.

1) Immediately rotate compromised secrets
   - Cloudinary: Log into https://cloudinary.com, open your account settings -> Security -> API Keys. Revoke existing API secret and generate a new one.
   - JWT secret: Generate a new strong secret and update your app environment.

2) Remove `server/.env` from the repository and history
   - Ensure you have local backup of any values you need.
   - Recommended (BFG):
     - Install BFG: https://rtyley.github.io/bfg-repo-cleaner/
     - Run:
       ```bash
       bfg --delete-files server/.env
       git reflog expire --expire=now --all
       git gc --prune=now --aggressive
       git push --force
       ```
   - Or using `git filter-repo` (safer):
       ```bash
       git filter-repo --invert-paths --paths server/.env
       git push --force
       ```

3) Add secrets to your hosting provider (Render)
   - On Render: Dashboard → Your Service → Environment → Add the environment variables (`JWT_SECRET_KEY`, `CLOUD_*` keys).
   - Remove `server/.env` from the codebase before pushing any changes.

4) Check for unauthorized activity
   - Inspect Cloudinary for unknown uploads and delete any malicious files.
   - Check Render logs for unexpected requests or file uploads.

5) Re-deploy and verify
   - After rotating secrets and updating env variables in Render, trigger a new deploy.
   - Test TLS and site access:
       ```bash
       curl -Iv https://your-domain.example
       ```

6) Request removal from Google Safe Browsing (if blacklisted)
   - Use the Google Search Console or this form to request a review after the site is fixed:
     https://search.google.com/search-console/about
   - Or check the Safe Browsing status here:
     https://transparencyreport.google.com/safe-browsing/search?url=your-domain.example

7) Prevent future leaks
   - Keep `server/.env` out of commits. `server/.gitignore` already exists with `.env`.
   - Use `.env.example` (this repo) for documentation only.
   - Use per-environment secrets in Render or other secret managers.

If you want, I can prepare the required commits (remove `server/.env`, add `.env.example`, update README) and draft the exact Render dashboard values to paste.
