import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Search,
  MessageSquare,
  CreditCard,
  CheckCircle,
  Star,
  FileText,
  Settings,
  Send,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const clientSteps = [
  {
    step: 1,
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up for free in seconds. Add your profile details and preferences to get personalized service recommendations.",
  },
  {
    step: 2,
    icon: Search,
    title: "Browse Services",
    description:
      "Explore thousands of services across categories. Filter by price, rating, delivery time, and more to find the perfect match.",
  },
  {
    step: 3,
    icon: MessageSquare,
    title: "Contact Sellers",
    description:
      "Have questions? Message sellers directly before ordering. Discuss requirements, timelines, and custom requests.",
  },
  {
    step: 4,
    icon: CreditCard,
    title: "Place Your Order",
    description:
      "Choose a service package and complete secure payment. Your funds are held safely in escrow until work is delivered.",
  },
  {
    step: 5,
    icon: CheckCircle,
    title: "Receive Delivery",
    description:
      "Track progress and receive your completed work. Request revisions if needed until you're fully satisfied.",
  },
  {
    step: 6,
    icon: Star,
    title: "Leave a Review",
    description:
      "Share your experience to help other clients. Your feedback helps maintain quality across the marketplace.",
  },
];

const sellerSteps = [
  {
    step: 1,
    icon: UserPlus,
    title: "Register as Seller",
    description:
      "Create your seller account and complete verification. Add your skills, portfolio, and professional details.",
  },
  {
    step: 2,
    icon: FileText,
    title: "Create Services",
    description:
      "List your services with clear descriptions, pricing tiers, and delivery times. Add images to showcase your work.",
  },
  {
    step: 3,
    icon: Settings,
    title: "Set Your Rates",
    description:
      "Define your pricing structure with base rates and add-ons. Offer packages for different client needs.",
  },
  {
    step: 4,
    icon: MessageSquare,
    title: "Receive Inquiries",
    description:
      "Get notified when clients message you. Respond promptly to build trust and convert leads into orders.",
  },
  {
    step: 5,
    icon: Send,
    title: "Deliver Quality Work",
    description:
      "Complete orders within the agreed timeline. Communicate progress and deliver exceptional results.",
  },
  {
    step: 6,
    icon: DollarSign,
    title: "Get Paid",
    description:
      "Receive your earnings directly to your account. Fast payouts with multiple withdrawal methods available.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            How It Works
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Getting Started is Simple
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Whether you&apos;re looking to hire talent or offer your services,
            ProConnect makes it easy to connect and transact securely.
          </p>
        </div>

        {/* For Clients */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xl font-semibold text-foreground px-4">
              For Clients
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-card rounded-2xl border border-border p-6 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {step.step.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < clientSteps.length - 1 && index % 3 !== 2 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-border -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* For Sellers */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xl font-semibold text-foreground px-4">
              For Sellers
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sellerSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-card rounded-2xl border border-border p-6 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {step.step.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < sellerSteps.length - 1 && index % 3 !== 2 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-border -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of professionals already using ProConnect to grow
            their business or find the perfect service provider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-12">
                Find Services
              </Button>
            </Link>

            <Link href="/register" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-border text-foreground hover:bg-secondary bg-transparent h-12"
              >
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
