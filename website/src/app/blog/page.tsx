import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Company updates, progress reports, and insights from JCB Tech Hub.",
};

const posts = [
  {
    id: "welcome-to-jcb-tech-hub",
    title: "Welcome to JCB Tech Hub",
    date: "February 7, 2026",
    category: "Company Update",
    excerpt:
      "We're launching JCB Tech Hub — an AI automation services company built on transparency, reliability, and continuous learning. Here's what we're building and why.",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <section className="section-padding text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          <span className="gradient-text">Blog</span> & Updates
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Company news, project progress, future goals, and lessons learned
          along the way.
        </p>
      </section>

      {/* Posts */}
      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-full bg-primary-500/20 px-3 py-1 text-xs text-primary-400">
                  {post.category}
                </span>
                <span className="text-gray-500">{post.date}</span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-400">{post.excerpt}</p>
              <div className="mt-4 text-sm text-primary-400">
                Read more &rarr;
              </div>
            </article>
          ))}

          {/* More coming */}
          <div className="rounded-2xl border border-dashed border-white/20 p-8 text-center">
            <p className="text-gray-500">
              More posts are added automatically as we grow. Check back soon or{" "}
              <Link href="/contact" className="text-primary-400 hover:underline">
                subscribe to our newsletter
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
