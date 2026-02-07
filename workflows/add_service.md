# Workflow: Add New Service

## Objective
Add a new service offering to the website's Services page.

## Required Inputs
- **Service title**: Name of the service
- **Description**: What the service does (2-3 sentences)
- **Features**: List of 3-5 specific capabilities included
- **Color**: Hex color for the service card (match brand guidelines)

## Tools Used
- `tools/add_service.py` — Adds the service to `services.json`

## Steps
1. Define the service clearly — what problem does it solve? Who is it for?
2. Write 3-5 specific features (not vague — "Custom API development" not "We do tech stuff")
3. Pick a color that doesn't conflict with existing services:
   - Workflow Automation: `#3B82F6` (blue)
   - AI Chatbots: `#8B5CF6` (purple)
   - Content Automation: `#10B981` (green)
   - Custom AI Integrations: `#F59E0B` (amber)
4. Run the tool:
   ```
   python tools/add_service.py \
     --title "New Service Name" \
     --description "What this service does" \
     --features "Feature 1" "Feature 2" "Feature 3" \
     --color "#HEX"
   ```
5. Verify `website/content/services.json` was updated
6. Build and check the Services page renders correctly
7. Commit and push

## Expected Output
- Updated `services.json` with the new service
- Services page auto-updates on deploy

## Edge Cases & Notes
- Duplicate service IDs are rejected automatically
- Keep descriptions concise — the features list handles the details
- If you need to update an existing service, edit `services.json` directly
