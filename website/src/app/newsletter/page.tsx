import type { Metadata } from "next";
import Link from "next/link";
import seriesData from "../../../content/newsletter/series.json";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Weekly deep-dives into AI automation. Four weeks per topic, teaching A-to-Z. No fluff — real knowledge.",
};

export default function NewsletterPage() {
  return (
    <>
      {/* Header */}
      <section className="section-padding text-center">
        <div className="inline-block rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-sm text-accent-400">
          Weekly Deep-Dives
        </div>
        <h1 className="mt-6 text-4xl font-bold md:text-5xl">
          The AI Automation <span className="gradient-text">Academy</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Every week, we pick one AI automation topic and teach it from the
          ground up. Four weeks per niche, A-to-Z. Like a teaching book, but
          delivered to you weekly.
        </p>
      </section>

      {/* How It Works */}
      <section className="px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Pick a Niche",
                description:
                  "Each series focuses on one specific AI automation topic.",
              },
              {
                step: "02",
                title: "4 Weeks Deep",
                description:
                  "We cover the topic from fundamentals to advanced implementation.",
              },
              {
                step: "03",
                title: "Move On",
                description:
                  "Series complete? We pick the next niche. You get a complete education.",
              },
            ].map((item) => (
              <div key={item.step} className="card text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/20 text-sm font-bold text-accent-400">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Series */}
      <section className="px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Current & Upcoming Series
          </h2>

          <div className="space-y-6">
            {seriesData.map((series) => (
              <div
                key={series.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      series.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {series.status === "active" ? "Currently Active" : "Coming Soon"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {series.weeks} weeks
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-white">
                  {series.title}
                </h3>
                <p className="mt-2 text-gray-400">{series.description}</p>

                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Weekly Breakdown
                  </h4>
                  <div className="space-y-2">
                    {series.topics.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                      >
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500/20 text-xs font-bold text-primary-400">
                          {i + 1}
                        </span>
                        <span className="text-sm text-gray-300">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="section-padding">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-accent-900/30 to-primary-900/30 p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold text-white">
            Get It In Your Inbox
          </h2>
          <p className="mt-2 text-gray-400">
            Subscribe and never miss an issue. Published every week.
          </p>
          <div className="mt-6">
            <Link href="/contact" className="btn-primary">
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
