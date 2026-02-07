import Link from "next/link";

const footerLinks = {
  Services: [
    { href: "/services#workflow-automation", label: "Workflow Automation" },
    { href: "/services#ai-chatbots", label: "AI Chatbots" },
    { href: "/services#content-automation", label: "Content Automation" },
    { href: "/services#custom-ai-integrations", label: "Custom Integrations" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/projects", label: "Our Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  Learn: [
    { href: "/newsletter", label: "Newsletter" },
    { href: "/about#roadmap", label: "Our Roadmap" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                <span className="text-lg font-bold text-white">J</span>
              </div>
              <span className="text-xl font-bold text-white">
                JCB <span className="gradient-text">Tech Hub</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              AI automation services that help businesses work smarter, not
              harder.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} JCB Tech Hub. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
