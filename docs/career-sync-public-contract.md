# Career Sync — Public Portfolio Contract (MVP)

This repository is **public**. It must never receive the private career-profile data source, full resume, publishing credentials, private-only project details or private job-platform packs.

## Generated / managed public outputs

- `content/data/profile.public.json`: allowlisted name, headline, public bio and HTTPS links; used for site metadata and the About page.
- `content/data/experience.json` and `content/data/skills.json`: already public; generated versions must preserve the existing component contracts.
- `content/projects/tollgate.mdx`: new public project case study (no private repository URL). Existing hand-authored MDX remains editorially owned unless explicitly migrated.
- `public/Ng-Lih-Sheng-Resume.pdf`: must be created from a public projection independently of the full resume. Do not copy the full resume or visually black out text.

## Safe workflow

1. In the **private** career-profile repository, owner-review career changes.
2. Generate full and public PDF/DOCX outputs, and run privacy checks against generated public artifacts.
3. Generate public JSON and selected MDX into a staging tree.
4. Create a portfolio PR with **only** approved public files; run `node --test tests/career-public-profile.test.mjs`.
5. Review PDF text and metadata, URL visibility, PR diff, portfolio build and Vercel preview.
6. Merge to the actual production branch only after user approval. Verify live site and resume URL.

Do not rely solely on this repository's validator to detect confidential content. Only the **private source pipeline** knows the sensitive values that must not leak.

## Deliberate limits

- No OAuth tokens, GitHub App private keys, JobStreet or LinkedIn credentials.
- No automatic LinkedIn/JobStreet logins or candidate-profile modifications.
- No Google Drive replacement until authenticated scoped access, backups and read-back checks are implemented in private workflows.
- The existing production GitHub workflow contains a disabled deployment step; independently verify Vercel branch integration before merging.
- If the private generator produces a path not explicitly managed, stop rather than overwrite hand-maintained content.
