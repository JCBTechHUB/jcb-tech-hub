"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const serviceOptions = [
  "Workflow Automation",
  "AI Chatbots & Assistants",
  "Content Automation",
  "Custom AI Integrations",
  "Not sure yet — help me decide",
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("https://formsubmit.co/ajax/jcbtechhub@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          business: data.business || "Not specified",
          service: data.service,
          message: data.message,
          _subject: `New Lead: ${data.service}`,
          _template: "table",
        }),
      });

      const result = await res.json();
      if (result.success === "true") {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section className="section-padding text-center">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <span className="text-3xl text-green-400">&#10003;</span>
            </div>
            <h1 className="text-3xl font-bold text-white">
              Message Received!
            </h1>
            <p className="mt-4 text-gray-400">
              Thank you for reaching out. We&apos;ll review your project details
              and get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="section-padding pb-8 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          Let&apos;s <span className="gradient-text">Talk</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Tell us about your business and the challenges you want to solve.
          We&apos;ll design an automation solution that fits.
        </p>
      </section>

      {/* Form */}
      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors focus:border-primary-500"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors focus:border-primary-500"
                placeholder="john@company.com"
              />
            </div>

            {/* Business Type */}
            <div>
              <label
                htmlFor="business"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Business / Industry
              </label>
              <input
                type="text"
                id="business"
                name="business"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors focus:border-primary-500"
                placeholder="e.g., E-commerce, Real Estate, Marketing Agency"
              />
            </div>

            {/* Service Interest */}
            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Service Interest
              </label>
              <select
                id="service"
                name="service"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-primary-500"
              >
                <option value="" className="bg-gray-900">
                  Select a service...
                </option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option} className="bg-gray-900">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Description */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Tell Us About Your Project
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors focus:border-primary-500"
                placeholder="What tasks do you want to automate? What problems are you trying to solve? Any specific tools or platforms you use?"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "error" && (
              <p className="text-center text-sm text-red-400">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
