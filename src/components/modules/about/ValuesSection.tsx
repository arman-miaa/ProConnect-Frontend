import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Zap, Globe, Users, Award } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "Every transaction is protected with escrow payments and verified profiles to ensure peace of mind.",
  },
  {
    icon: Heart,
    title: "People First",
    description:
      "We believe in fair pay, respectful collaboration, and putting the needs of our community first.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We constantly evolve our platform with cutting-edge technology to make work easier and more efficient.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Opportunity shouldn't be limited by geography. We connect talent worldwide without borders.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "More than a marketplace, we're a community of professionals supporting each other's growth.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "We maintain high standards through verification, reviews, and continuous quality assurance.",
  },
];

export function ValuesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Core Values
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These principles guide everything we do and shape the culture of our
            platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((value) => (
            <Card
              key={value.title}
              className="bg-card border-border hover:border-primary/30 transition-colors group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
