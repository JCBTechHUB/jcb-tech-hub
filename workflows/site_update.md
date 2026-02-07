# Workflow: General Site Update

## Objective
Update any section of the website content through the WAT automation layer.

## Required Inputs
- **What to update**: Which section (services, projects, blog, roadmap, newsletter)
- **New content**: The specific changes to make

## Tools Used
- `tools/add_service.py` — For service updates
- `tools/add_project.py` — For new projects
- `tools/add_blog_post.py` — For blog posts
- `tools/update_roadmap.py` — For learning roadmap changes
- `tools/publish_newsletter.py` — For newsletter issues

## Steps

### Option A: Content File Update
1. Identify which content file needs updating
2. Use the appropriate tool (see above)
3. Verify the change locally with `npm run build`
4. Commit and push to trigger Vercel auto-deploy

### Option B: Direct File Edit
For changes that don't have a dedicated tool:
1. Edit the relevant file directly:
   - Services: `website/content/services.json`
   - Roadmap: `website/content/roadmap.json`
   - Newsletter series: `website/content/newsletter/series.json`
2. Run `npm run build` in the `website/` directory to verify
3. Commit and push

### Deployment Flow
```
Edit content → npm run build (verify) → git commit → git push → Vercel auto-deploys
```

## Expected Output
- Updated content files
- Successful build verification
- Auto-deployment via Vercel (once connected)

## Edge Cases & Notes
- Always run `npm run build` before pushing to catch errors
- The site is statically generated — content changes require a rebuild/redeploy
- Vercel automatically rebuilds on every push to the main branch
- If a build fails, check the error output — usually it's a JSON syntax error or missing field
