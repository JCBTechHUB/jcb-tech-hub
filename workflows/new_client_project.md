# Workflow: New Client Project

## Objective
Document and publish a client project/case study to the website's Projects page.

## Required Inputs
- **Project title**: Name of the project
- **Client name**: Client or company name (can be anonymized)
- **Service category**: Which of our 4 services was used
- **Challenge**: What problem the client had
- **Solution**: How we solved it
- **Results**: Measurable outcomes (3-5 bullet points)
- **Status**: Completed / In Progress

## Tools Used
- `tools/add_project.py` — Creates the project data file

## Steps
1. Gather all required inputs from the project documentation
2. Run the add project tool:
   ```
   python tools/add_project.py \
     --title "Project Name" \
     --client "Client Name" \
     --category "workflow-automation" \
     --challenge "The problem description" \
     --solution "How we solved it" \
     --results "Result 1" "Result 2" "Result 3" \
     --status "Completed"
   ```
3. Verify the project file was created in `website/content/projects/`
4. Optionally create a blog post about the project:
   ```
   python tools/add_blog_post.py \
     --title "Project Spotlight: Project Name" \
     --category "Project Spotlight" \
     --excerpt "Brief summary of what we built"
   ```
5. Commit and push changes to trigger auto-deploy

## Expected Output
- A JSON file in `website/content/projects/` with the case study
- The Projects page updates automatically on next deploy

## Edge Cases & Notes
- Always get client approval before publishing (use anonymized name if needed)
- Include quantifiable results where possible (time saved, cost reduction, etc.)
- Take before/after screenshots if applicable
- Link to related services on the Services page
