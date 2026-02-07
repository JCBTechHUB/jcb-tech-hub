"""
Tool: Publish Newsletter
Creates a newsletter issue and (when Resend is configured) sends it to subscribers.

Usage:
    python tools/publish_newsletter.py \
        --title "Week 1: What Is AI Automation" \
        --series "ai-automation-fundamentals" \
        --week 1 \
        --content "Full newsletter content in markdown"

    Add --send to also email it to subscribers (requires RESEND_API_KEY in .env)
"""

import argparse
import json
import os
from datetime import datetime
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
NEWSLETTER_DIR = PROJECT_ROOT / "website" / "content" / "newsletter"
SUBSCRIBERS_FILE = PROJECT_ROOT / ".tmp" / "subscribers.json"


def publish_newsletter(title: str, series_id: str, week: int, content: str,
                       send_email: bool = False):
    """Publish a newsletter issue to the website and optionally email it."""

    NEWSLETTER_DIR.mkdir(parents=True, exist_ok=True)

    date_str = datetime.now().strftime("%Y-%m-%d")
    issue_id = title.lower().replace(" ", "-").replace(":", "").replace("'", "")

    issue = {
        "id": issue_id,
        "title": title,
        "series": series_id,
        "week": week,
        "date": datetime.now().strftime("%B %d, %Y"),
        "content": content,
    }

    # Save newsletter issue
    filename = f"{date_str}-{issue_id}.json"
    issue_file = NEWSLETTER_DIR / filename
    issue_file.write_text(json.dumps(issue, indent=2))
    print(f"Published newsletter: {filename}")

    # Send email if requested
    if send_email:
        send_newsletter_email(title, content)

    return issue


def send_newsletter_email(title: str, content: str):
    """Send newsletter to all subscribers via Resend."""

    # Load environment
    env_file = PROJECT_ROOT / ".env"
    api_key = None
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            if line.startswith("RESEND_API_KEY="):
                api_key = line.split("=", 1)[1].strip()

    if not api_key:
        print("RESEND_API_KEY not found in .env — skipping email send.")
        print("To enable email, add RESEND_API_KEY=re_xxxxx to .env")
        return

    # Load subscribers
    if not SUBSCRIBERS_FILE.exists():
        print("No subscribers yet.")
        return

    subscribers = json.loads(SUBSCRIBERS_FILE.read_text())
    if not subscribers:
        print("No subscribers yet.")
        return

    try:
        import requests
        for email in subscribers:
            response = requests.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "from": "JCB Tech Hub <newsletter@jcbtechhub.com>",
                    "to": email,
                    "subject": f"JCB Tech Hub Newsletter: {title}",
                    "html": f"<h1>{title}</h1><div>{content}</div>",
                },
            )
            if response.status_code == 200:
                print(f"Sent to: {email}")
            else:
                print(f"Failed to send to {email}: {response.text}")

    except ImportError:
        print("'requests' package not installed. Run: pip install requests")


def main():
    parser = argparse.ArgumentParser(description="Publish a newsletter issue")
    parser.add_argument("--title", required=True, help="Newsletter title")
    parser.add_argument("--series", required=True, help="Series ID")
    parser.add_argument("--week", type=int, required=True, help="Week number in series")
    parser.add_argument("--content", required=True, help="Newsletter content (markdown)")
    parser.add_argument("--send", action="store_true", help="Also send via email")

    args = parser.parse_args()
    publish_newsletter(
        title=args.title,
        series_id=args.series,
        week=args.week,
        content=args.content,
        send_email=args.send,
    )


if __name__ == "__main__":
    main()
