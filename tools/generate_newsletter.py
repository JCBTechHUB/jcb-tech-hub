"""
Tool: Generate Newsletter (AI-Powered)
Uses the Groq API (free) to write a newsletter issue based on
the current series topic plan.

Usage:
    python tools/generate_newsletter.py

Requires:
    GROQ_API_KEY environment variable
    pip install groq
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
NEWSLETTER_DIR = PROJECT_ROOT / "website" / "content" / "newsletter"
SERIES_FILE = NEWSLETTER_DIR / "series.json"


def get_current_series():
    """Find the active series and determine which week we're on."""
    series_list = json.loads(SERIES_FILE.read_text())
    active = [s for s in series_list if s["status"] == "active"]
    if not active:
        print("No active newsletter series found.")
        sys.exit(1)
    return active[0]


def count_published_issues(series_id: str) -> int:
    """Count how many issues have been published for this series."""
    count = 0
    for f in NEWSLETTER_DIR.glob("*.json"):
        if f.name == "series.json":
            continue
        try:
            data = json.loads(f.read_text())
            if data.get("series") == series_id:
                count += 1
        except (json.JSONDecodeError, KeyError):
            continue
    return count


def generate_content(series: dict, week: int, topic: str) -> str:
    """Use Groq (Llama 3.3) to generate the newsletter content."""
    try:
        from groq import Groq
    except ImportError:
        print("Installing groq package...")
        os.system(f"{sys.executable} -m pip install groq")
        from groq import Groq

    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        print("ERROR: GROQ_API_KEY not set.")
        sys.exit(1)

    client = Groq(api_key=api_key)

    prompt = f"""Write a newsletter issue for JCB Tech Hub's AI Automation Academy.

Series: {series['title']}
Series Description: {series['description']}
This is Week {week} of {series['weeks']}: {topic}

Write the newsletter in this structure:
1. **Opening hook** (2-3 sentences) — Why this topic matters right now
2. **Core teaching** (800-1200 words) — The main lesson, broken into clear sections with practical examples. Use headers for each section.
3. **Practical takeaway** — One specific thing the reader can do today
4. **Next week preview** — What's coming next (if not the final week, tease the next topic)

Guidelines:
- Write for business owners who are NOT technical
- Use simple language, avoid jargon
- Include real-world examples
- Be practical, not theoretical
- Tone: knowledgeable but approachable, like a smart friend explaining things

Output the content in clean markdown format."""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=2000,
        temperature=0.7,
    )

    return response.choices[0].message.content


def main():
    series = get_current_series()
    published = count_published_issues(series["id"])
    week = published + 1

    if week > series["weeks"]:
        print(f"Series '{series['title']}' is complete ({series['weeks']} weeks).")
        print("Update series.json to start a new series.")
        sys.exit(0)

    topic = series["topics"][week - 1] if week <= len(series["topics"]) else f"Week {week}"

    print(f"Generating newsletter: {topic}")
    print(f"Series: {series['title']} (Week {week}/{series['weeks']})")

    content = generate_content(series, week, topic)

    # Save the newsletter issue
    date_str = datetime.now().strftime("%Y-%m-%d")
    issue_id = topic.lower().replace(" ", "-").replace(":", "").replace("'", "")

    issue = {
        "id": issue_id,
        "title": topic,
        "series": series["id"],
        "week": week,
        "date": datetime.now().strftime("%B %d, %Y"),
        "content": content,
    }

    filename = f"{date_str}-{issue_id}.json"
    issue_file = NEWSLETTER_DIR / filename
    issue_file.write_text(json.dumps(issue, indent=2))

    print(f"\nNewsletter saved: {filename}")
    print(f"Content preview:\n{content[:200]}...")

    return filename


if __name__ == "__main__":
    main()
