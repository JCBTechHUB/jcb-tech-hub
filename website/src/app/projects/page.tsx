import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and projects showcasing our AI automation work.",
};

const sampleProjects = [
  {
    id: "internal-website-automation",
    title: "JCB Tech Hub Website",
    client: "Internal Project",
    category: "workflow-automation",
    challenge:
      "Build a self-updating website that can be managed entirely through automation — no manual updates needed.",
    solution:
      "Built with Next.js and the WAT framework. Content is data-driven from JSON and MDX files. Python tools auto-update the site by committing content changes, and Vercel auto-deploys on every push.",
    results: [
      "Zero-touch content updates",
      "Automated newsletter publishing",
      "Dynamic service and project pages",
    ],
    status: "In Progress",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Header */}
      <section className="section-padding text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          Our <span className="gradient-text">Projects</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Real projects, real results. Each case study shows the challenge,
          our approach, and the outcomes.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl space-y-8">
          {sampleProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary-500/20 px-3 py-1 text-xs text-primary-400">
                  {project.status}
                </span>
                <span className="text-sm text-gray-500">
                  {project.client}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white">
                {project.title}
              </h2>

              <div className="mt-8 grid gap-8 md:grid-cols-3">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Challenge
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Solution
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {project.solution}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Results
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {project.results.map((result) => (
                      <li
                        key={result}
                        className="flex items-start gap-2 text-sm text-gray-400"
                      >
                        <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Coming Soon */}
          <div className="rounded-3xl border border-dashed border-white/20 p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-400">
              More Projects Coming Soon
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              As we complete client projects, they&apos;ll appear here
              automatically.
            </p>
            <Link href="/contact" className="btn-primary mt-6 inline-block text-sm">
              Be Our Next Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
