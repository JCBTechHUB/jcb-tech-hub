import Link from "next/link";
import services from "../../content/services.json";

const stats = [
  { label: "Services Offered", value: "4+" },
  { label: "Automations Built", value: "Growing" },
  { label: "Response Time", value: "24h" },
];

const whyUs = [
  {
    title: "Reliability First",
    description:
      "We use the WAT framework — separating AI reasoning from deterministic execution. This means your automations work consistently, every time.",
  },
  {
    title: "Transparent Growth",
    description:
      "We share our learning roadmap publicly. You always know what we're building, learning, and improving.",
  },
  {
    title: "Education-Driven",
    description:
      "Our weekly newsletter teaches AI automation from the ground up. We believe informed clients make the best partners.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-900/20 via-transparent to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="inline-block rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm text-primary-400">
            AI Automation Services
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Automate Your Business
            <br />
            <span className="gradient-text">With Intelligence</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            We build AI-powered automations that eliminate repetitive work,
            scale your operations, and free you to focus on what matters.
            From workflow automation to custom AI integrations.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary text-lg">
              Start Your Project
            </Link>
            <Link href="/services" className="btn-secondary text-lg">
              Explore Services
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              What We <span className="gradient-text">Build</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Four core service areas, each designed to solve real business
              problems with AI automation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="card group"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <div
                    className="h-6 w-6 rounded-lg"
                    style={{ backgroundColor: service.color }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {service.description}
                </p>
                <div className="mt-4 text-sm text-primary-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why JCB Tech Hub */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Why <span className="gradient-text">JCB Tech Hub</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {whyUs.map((item) => (
              <div key={item.title} className="card text-center">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-primary-900/30 to-accent-900/30 p-8 text-center md:p-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            Learn AI Automation
            <br />
            <span className="gradient-text">From the Ground Up</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Every week, we deep-dive into one AI automation topic. Four weeks
            per niche, teaching A-to-Z. No fluff — real knowledge you can
            apply.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/newsletter" className="btn-primary">
              Read the Newsletter
            </Link>
            <Link href="/contact" className="btn-secondary">
              Subscribe via Email
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to <span className="gradient-text">Automate</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Tell us about your business and the tasks you want to automate.
          We&apos;ll design a solution that fits.
        </p>
        <div className="mt-8">
          <Link href="/contact" className="btn-primary text-lg">
            Get Started Today
          </Link>
        </div>
      </section>
    </>
  );
}
