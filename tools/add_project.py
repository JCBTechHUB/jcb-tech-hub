"""
Tool: Add Project
Adds a new project/case study to the website.
Creates a project entry in the projects page data.

Usage:
    python tools/add_project.py \
        --title "Project Name" \
        --client "Client Name" \
        --category "workflow-automation" \
        --challenge "The problem we solved" \
        --solution "How we solved it" \
        --results "Result 1" "Result 2" "Result 3" \
        --status "Completed"
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
WEBSITE_DIR = PROJECT_ROOT / "website"


def add_project(title: str, client: str, category: str, challenge: str,
                solution: str, results: list[str], status: str = "Completed"):
    """Add a new project entry to the projects page."""

    # Generate ID from title
    project_id = title.lower().replace(" ", "-").replace("'", "")

    project = {
        "id": project_id,
        "title": title,
        "client": client,
        "category": category,
        "challenge": challenge,
        "solution": solution,
        "results": results,
        "status": status,
    }

    # Read current projects page and inject the new project
    projects_file = WEBSITE_DIR / "src" / "app" / "projects" / "page.tsx"
    content = projects_file.read_text()

    # Find the sampleProjects array and add the new project
    # This is a simple approach; for production, use a JSON data file
    print(f"Project data prepared:")
    print(json.dumps(project, indent=2))
    print(f"\nTo add this project, add the above JSON object to the")
    print(f"sampleProjects array in: {projects_file}")
    print(f"\nAlternatively, create a content file at:")
    print(f"  website/content/projects/{project_id}.json")

    # Save to content directory
    content_dir = WEBSITE_DIR / "content" / "projects"
    content_dir.mkdir(parents=True, exist_ok=True)

    project_file = content_dir / f"{project_id}.json"
    project_file.write_text(json.dumps(project, indent=2))
    print(f"\nSaved project data to: {project_file}")

    return project


def main():
    parser = argparse.ArgumentParser(description="Add a new project to the website")
    parser.add_argument("--title", required=True, help="Project title")
    parser.add_argument("--client", required=True, help="Client name")
    parser.add_argument("--category", required=True,
                       choices=["workflow-automation", "ai-chatbots",
                               "content-automation", "custom-ai-integrations"],
                       help="Service category")
    parser.add_argument("--challenge", required=True, help="The challenge/problem")
    parser.add_argument("--solution", required=True, help="The solution implemented")
    parser.add_argument("--results", nargs="+", required=True, help="List of results")
    parser.add_argument("--status", default="Completed", help="Project status")

    args = parser.parse_args()
    add_project(
        title=args.title,
        client=args.client,
        category=args.category,
        challenge=args.challenge,
        solution=args.solution,
        results=args.results,
        status=args.status,
    )


if __name__ == "__main__":
    main()
