"""
Tool: Add Blog Post
Creates a new blog post entry for the website.

Usage:
    python tools/add_blog_post.py \
        --title "Post Title" \
        --category "Company Update" \
        --excerpt "Brief summary of the post"
"""

import argparse
import json
from datetime import datetime
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
BLOG_DIR = PROJECT_ROOT / "website" / "content" / "blog"


def add_blog_post(title: str, category: str, excerpt: str, content: str = ""):
    """Create a new blog post file."""

    BLOG_DIR.mkdir(parents=True, exist_ok=True)

    date_str = datetime.now().strftime("%Y-%m-%d")
    post_id = title.lower().replace(" ", "-").replace("'", "")

    post = {
        "id": post_id,
        "title": title,
        "date": datetime.now().strftime("%B %d, %Y"),
        "category": category,
        "excerpt": excerpt,
        "content": content,
    }

    filename = f"{date_str}-{post_id}.json"
    post_file = BLOG_DIR / filename
    post_file.write_text(json.dumps(post, indent=2))

    print(f"Created blog post: {filename}")
    print(f"Location: {post_file}")

    return post


def main():
    parser = argparse.ArgumentParser(description="Add a new blog post")
    parser.add_argument("--title", required=True, help="Post title")
    parser.add_argument("--category", default="Company Update",
                       help="Post category (e.g., Company Update, Project Spotlight, Learning)")
    parser.add_argument("--excerpt", required=True, help="Brief summary")
    parser.add_argument("--content", default="", help="Full post content (markdown)")

    args = parser.parse_args()
    add_blog_post(
        title=args.title,
        category=args.category,
        excerpt=args.excerpt,
        content=args.content,
    )


if __name__ == "__main__":
    main()
