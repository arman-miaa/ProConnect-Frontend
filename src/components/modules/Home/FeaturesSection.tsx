import { Card, CardContent } from "@/components/ui/card";
import {
  // MessageSquare,
  CreditCard,
  ShieldCheck,
  Zap,
  Users,
  BarChart3,
  Rocket, 
} from "lucide-react";

const features = [
  // {
  //   icon: MessageSquare,
  //   title: "Built-in Messaging",
  //   description:
  //     "Communicate directly with clients or sellers before and after placing orders.",
  // },
  {
    icon: Rocket, // Changed Zap to Rocket for a better visual representation of 'Onboarding'
    title: "Quick Onboarding",
    description:
      "Get started quickly and easily with our intuitive setup process.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Integrated payment processing with Stripe & SSLCommerz for safe transactions.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description:
      "All sellers go through our verification process to ensure quality service.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "Track orders in real-time with status updates from pending to completion.",
  },
  {
    icon: Users,
    title: "Multi-Role System",
    description:
      "Dedicated dashboards for Clients, Sellers, and Admins with role-based access.",
  },
  {
    icon: BarChart3,
    title: "Earnings Dashboard",
    description:
      "Sellers can track earnings, request withdrawals, and manage finances easily.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-28 bg-background border-t border-b border-border">
      {" "}
      {/* Changed bg-card to bg-background for contrast if card is light */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-snug">
            Our platform spans every stage of the{" "}
            <span className="text-primary">service process</span>{" "}
            {/* Highlight primary color */}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Explore how we help businesses and freelancers connect and thrive
            with ease and security.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border border-border transition-all duration-300
                         group hover:border-primary/50 
                         hover:shadow-2xl hover:shadow-primary/10 
                         hover:-translate-y-1" // Subtle lift on hover
            >
              <CardContent className="p-8 flex flex-col h-full">
                {" "}
                {/* Increased padding slightly */}
                {/* Icon Container with Enhanced Shadow/Color */}
                <div
                  className="w-14 h-14 rounded-xl 
                                bg-primary/10 flex items-center justify-center mb-5 
                                transition-all duration-300 
                                shadow-md shadow-primary/5 
                                group-hover:bg-primary/20"
                >
                  {" "}
                  {/* Subtle background change on hover */}
                  <feature.icon
                    className="h-6 w-6 text-primary 
                                          transition-all duration-300 
                                          group-hover:scale-110"
                  />{" "}
                  {/* Icon slightly scales up on hover */}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {" "}
                  {/* Title font size increased */}
                  {feature.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed grow">
                  {" "}
                  {/* Description font size increased */}
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
