import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  ArrowRight,
  DollarSign,
  Users,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";

// --- ডেটা সেট: কমিশন ও সুবিধা ---
const COMMISSION_RATE = "15%"; // আপনার নির্ধারিত একক কমিশন রেট
const PAYOUT_PERIOD = "7-Day"; // সমস্ত সেলারদের জন্য পেমেন্ট আউট সাইকেল

const sellerBenefits = [
  {
    icon: Shield,
    title: "Zero Monthly Fees",
    description:
      "You only pay when you earn. No subscription or recurring charges.",
  },
  {
    icon: DollarSign,
    title: "Flat Commission Rate",
    description: `A simple, flat ${COMMISSION_RATE} fee is deducted only upon order completion.`,
  },
  {
    icon: Zap,
    title: "Built-in Client Acquisition",
    description:
      "Access our pool of ready-to-buy clients searching for your services.",
  },
  {
    icon: Check,
    title: "Secure Payouts",
    description: `Reliable ${PAYOUT_PERIOD} clearing period for secure fund withdrawal.`,
  },
  {
    icon: Users,
    title: "Unlimited Services",
    description: "Create and manage as many service listings as you need.",
  },
  {
    icon: ArrowRight,
    title: "Marketing & Analytics",
    description:
      "Get access to tools to track your performance and grow your business.",
  },
];

const clientBenefits = [
  {
    title: "No Subscription Required",
    description:
      "Clients browse and purchase services without any monthly fees.",
  },
  {
    title: "Price Transparency",
    description:
      "You only pay the price set by the seller. No markup fees from the platform.",
  },
  {
    title: "Protected Transactions",
    description:
      "All payments are held in escrow until you approve the final delivery.",
  },
  {
    title: "Free Dispute Resolution",
    description:
      "Our support team mediates any issues completely free of charge.",
  },
];

export function PricingSection() {
  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Simple, Transparent Pricing for Everyone
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            We operate on a pure commission model. No hidden fees, no monthly
            subscriptions, only pay when you succeed.
          </p>
        </div>

        {/* --- সেকশন ১: সেলারদের জন্য কমিশন মডেল --- */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">
            For Sellers: Our Simple Commission Structure
          </h2>

          <Card className="bg-card border-border shadow-xl shadow-primary/5">
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-xl text-primary uppercase tracking-wider">
                Platform Commission Fee
              </CardTitle>
              <CardDescription className="text-muted-foreground max-w-2xl mx-auto text-base">
                This single fee covers payment processing, platform maintenance,
                security, and access to our global client base.
              </CardDescription>
            </CardHeader>

            <CardContent className="py-8 border-b border-border">
              <p className="text-6xl md:text-8xl font-extrabold text-foreground text-center mb-4">
                {COMMISSION_RATE}
              </p>
              <p className="text-xl text-muted-foreground text-center">
                Deducted **only** upon successful order completion.
              </p>
            </CardContent>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
              {sellerBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border"
                >
                  <benefit.icon className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <CardFooter className="justify-center pt-0 pb-8">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8">
                  Join as a Seller
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* --- সেকশন ২: ক্লায়েন্টদের জন্য সুবিধা --- */}
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 mt-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            For Clients: Completely Free to Use
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
            Clients pay **zero** subscription fees. You only pay for the
            services you purchase from the seller.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {clientBenefits.map((benefit) => (
              <div key={benefit.title} className="text-center p-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

     
      </div>
    </section>
  );
}
