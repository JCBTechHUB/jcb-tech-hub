"""
Tool: Update Roadmap
Updates the company learning roadmap displayed on the About page.

Usage:
    python tools/update_roadmap.py --skill "Skill Name" --progress 75 --status learning
    python tools/update_roadmap.py --add-goal "New future goal"
"""

import argparse
import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
ROADMAP_FILE = PROJECT_ROOT / "website" / "content" / "roadmap.json"


def update_skill(name: str, progress: int = None, status: str = None,
                 description: str = None):
    """Update an existing skill or add a new one."""

    roadmap = json.loads(ROADMAP_FILE.read_text())

    # Find existing skill
    skill = next((s for s in roadmap["skills"] if s["name"] == name), None)

    if skill:
        if progress is not None:
            skill["progress"] = min(100, max(0, progress))
        if status:
            skill["status"] = status
        if description:
            skill["description"] = description
        print(f"Updated skill: {name}")
    else:
        # Add new skill
        roadmap["skills"].append({
            "name": name,
            "status": status or "learning",
            "progress": progress or 0,
            "description": description or f"Learning {name}",
        })
        print(f"Added new skill: {name}")

    ROADMAP_FILE.write_text(json.dumps(roadmap, indent=2))
    print(f"Roadmap updated: {ROADMAP_FILE}")


def add_goal(goal: str):
    """Add a new future goal."""

    roadmap = json.loads(ROADMAP_FILE.read_text())

    if goal not in roadmap["futureGoals"]:
        roadmap["futureGoals"].append(goal)
        ROADMAP_FILE.write_text(json.dumps(roadmap, indent=2))
        print(f"Added goal: {goal}")
    else:
        print(f"Goal already exists: {goal}")


def main():
    parser = argparse.ArgumentParser(description="Update the learning roadmap")
    parser.add_argument("--skill", help="Skill name to update or add")
    parser.add_argument("--progress", type=int, help="Progress percentage (0-100)")
    parser.add_argument("--status", choices=["planned", "learning", "proficient"],
                       help="Skill status")
    parser.add_argument("--description", help="Skill description")
    parser.add_argument("--add-goal", help="Add a new future goal")

    args = parser.parse_args()

    if args.skill:
        update_skill(args.skill, args.progress, args.status, args.description)
    elif args.add_goal:
        add_goal(args.add_goal)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
