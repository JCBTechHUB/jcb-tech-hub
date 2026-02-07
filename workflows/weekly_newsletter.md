# Workflow: Weekly Newsletter

## Objective
Publish one newsletter issue per week as part of a 4-week deep-dive series on a specific AI automation topic.

## Required Inputs
- **Series ID**: Which series this issue belongs to (from `content/newsletter/series.json`)
- **Week number**: Which week of the series (1-4)
- **Topic**: The specific topic for this week
- **Content**: The full newsletter content (markdown)

## Tools Used
- `tools/publish_newsletter.py` — Creates the newsletter JSON file and optionally emails it

## Steps
1. Check `content/newsletter/series.json` for the current active series
2. Determine which week we're on (based on existing published issues)
3. Write the newsletter content following this structure:
   - **Opening hook** — Why this topic matters (2-3 sentences)
   - **Core teaching** — The main lesson, broken into clear sections with examples
   - **Practical takeaway** — One thing the reader can do today
   - **Next week preview** — What's coming in the next issue
4. Run `tools/publish_newsletter.py` with `--send` flag to publish and email:
   ```
   python tools/publish_newsletter.py \
     --title "Week X: Topic Title" \
     --series "series-id" \
     --week X \
     --content "Newsletter content here" \
     --send
   ```
5. Verify the issue file was created in `content/newsletter/`

## Expected Output
- A JSON file in `website/content/newsletter/` with the issue data
- Emails sent to all subscribers (if `--send` flag used and Resend is configured)
- The newsletter page on the website updates automatically on next deploy

## 4-Week Series Structure
- **Week 1**: Introduction — What is [topic] and why it matters
- **Week 2**: Building blocks — Core concepts and components
- **Week 3**: Implementation — How to actually build/use it
- **Week 4**: Advanced — Optimization, edge cases, and next steps

## Edge Cases & Notes
- If the Resend API key isn't configured, the tool will still save the file but skip email
- Keep each issue under 1500 words for readability
- After completing a 4-week series, update `series.json` to mark it complete and add the next series
- Always preview the content before using `--send` (run without `--send` first)
