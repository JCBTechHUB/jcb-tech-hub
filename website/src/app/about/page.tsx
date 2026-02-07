import type { Metadata } from "next";
import Link from "next/link";
import roadmap from "../../../content/roadmap.json";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind JCB Tech Hub — our mission, our journey, and our learning roadmap.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="section-padding text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          About <span className="gradient-text">JCB Tech Hub</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Building the future of business automation, one workflow at a time.
        </p>
      </section>

      {/* Story */}
      <section className="px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white">Our Story</h2>
            <div className="mt-6 space-y-4 text-gray-400">
              <p>
                JCB Tech Hub was born from a simple observation: most businesses
                spend too much time on tasks that machines could handle better
                and faster.
              </p>
              <p>
                After a challenging year, we came back with a clear mission —
                to help businesses harness the power of AI automation. Not
                with buzzwords and hype, but with practical, reliable systems
                that actually work.
              </p>
              <p>
                We built the WAT framework (Workflows, Agents, Tools) as our
                foundation. It separates AI reasoning from deterministic
                execution, which means your automations are consistent,
                testable, and reliable.
              </p>
              <p>
                We&apos;re not just building automations — we&apos;re building
                a company that learns in public, shares knowledge freely, and
                grows alongside our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            What We Stand For
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Pragmatism Over Hype",
                description:
                  "We focus on what works, not what sounds impressive. Every automation we build solves a real problem.",
              },
              {
                title: "Transparency",
                description:
                  "Our learning roadmap is public. Our newsletter teaches openly. We believe trust is built through visibility.",
              },
              {
                title: "Continuous Improvement",
                description:
                  "Every failure makes our system stronger. We document, learn, and iterate — and our clients benefit from every lesson.",
              },
            ].map((value) => (
              <div key={value.title} className="card">
                <h3 className="text-lg font-semibold text-white">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section id="roadmap" className="scroll-mt-24 px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              Our <span className="gradient-text">Learning Roadmap</span>
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-400">
              Current focus: {roadmap.currentFocus}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {roadmap.skills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{skill.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {skill.description}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      skill.status === "proficient"
                        ? "bg-green-500/20 text-green-400"
                        : skill.status === "learning"
                          ? "bg-primary-500/20 text-primary-400"
                          : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {skill.status}
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Future Goals */}
          <div className="mt-12">
            <h3 className="mb-4 text-center text-lg font-semibold text-white">
              Future Goals
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {roadmap.futureGoals.map((goal) => (
                <div
                  key={goal}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-accent-400" />
                  <span className="text-sm text-gray-300">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <h2 className="text-2xl font-bold">
          Want to <span className="gradient-text">Work With Us</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Whether you need automation for your business or want to learn
          alongside us, we&apos;d love to connect.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact" className="btn-primary">
            Start a Project
          </Link>
          <Link href="/newsletter" className="btn-secondary">
            Follow Our Journey
          </Link>
        </div>
      </section>
    </>
  );
}
