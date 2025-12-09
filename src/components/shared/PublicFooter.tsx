import Link from "next/link";

const footerLinks = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "services" },
    { label: "How it Works", href: "how-it-work" },
    { label: "Pricing", href: "pricing" },
    { label: "About", href: "about" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Help Center", href: "help-center" },
    { label: "Community", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "privacy-policy" },
    { label: "Terms of Service", href: "terms-of-service" },
    { label: "Cookie Policy", href: "cookie-policy" },
  ],
  contact: {
    email: "hello@proconnect.com",
    phone: "+1 (555) 123-4567",
  },
};

export function PublicFooter() {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  P
                </span>
              </div>
              <span className="text-foreground font-semibold text-lg">
                ProConnect
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              ProConnect is a modern, scalable online marketplace connecting
              clients with service providers (Sellers). Our goal is to create a
              transparent, secure platform for digital service transactions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${footerLinks.contact.email}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {footerLinks.contact.email}
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  {footerLinks.contact.phone}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 ProConnect. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


