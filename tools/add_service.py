"""
Tool: Add Service
Adds a new service to the website's services.json.

Usage:
    python tools/add_service.py \
        --title "New Service" \
        --description "What this service does" \
        --features "Feature 1" "Feature 2" "Feature 3" \
        --color "#FF6B6B"
"""

import argparse
import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
SERVICES_FILE = PROJECT_ROOT / "website" / "content" / "services.json"


def add_service(title: str, description: str, features: list[str], color: str):
    """Add a new service to the services JSON file."""

    service_id = title.lower().replace(" ", "-").replace("'", "")

    services = json.loads(SERVICES_FILE.read_text())

    # Check for duplicate
    if any(s["id"] == service_id for s in services):
        print(f"Service '{service_id}' already exists. Skipping.")
        return

    new_service = {
        "id": service_id,
        "title": title,
        "description": description,
        "icon": service_id.split("-")[0],
        "features": features,
        "color": color,
    }

    services.append(new_service)
    SERVICES_FILE.write_text(json.dumps(services, indent=2))

    print(f"Added service: {title}")
    print(f"Total services: {len(services)}")
    print(f"File updated: {SERVICES_FILE}")


def main():
    parser = argparse.ArgumentParser(description="Add a new service to the website")
    parser.add_argument("--title", required=True, help="Service title")
    parser.add_argument("--description", required=True, help="Service description")
    parser.add_argument("--features", nargs="+", required=True, help="List of features")
    parser.add_argument("--color", default="#6366F1", help="Hex color for the service card")

    args = parser.parse_args()
    add_service(
        title=args.title,
        description=args.description,
        features=args.features,
        color=args.color,
    )


if __name__ == "__main__":
    main()
