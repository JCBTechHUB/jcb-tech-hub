import type { Metadata } from "next";
import Link from "next/link";
import services from "../../../content/services.json";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI automation services: workflow automation, AI chatbots, content automation, and custom AI integrations.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="section-padding text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          Our <span className="gradient-text">Services</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Each service is a self-contained solution designed to solve specific
          business challenges with AI automation.
        </p>
      </section>

      {/* Services Detail */}
      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12"
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-start">
                {/* Icon + Title */}
                <div className="flex-1">
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <div
                      className="h-7 w-7 rounded-lg"
                      style={{ backgroundColor: service.color }}
                    />
                  </div>
                  <div className="mb-1 text-sm font-medium text-gray-500">
                    Service {String(index + 1).padStart(2, "0")}
                  </div>
                  <h2 className="text-2xl font-bold text-white md:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-gray-400">{service.description}</p>
                </div>

                {/* Features */}
                <div className="flex-1">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-gray-300"
                      >
                        <span
                          className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: service.color }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-8">
                <Link
                  href="/contact"
                  className="btn-primary inline-block text-sm"
                >
                  Discuss This Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
