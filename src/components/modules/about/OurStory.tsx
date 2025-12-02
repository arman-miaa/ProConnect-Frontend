import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import Image from "next/image";

export function OurStory() {
  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-secondary">
              <Image
                              src="/about.png"
                              width={300}
                              height={300}
                alt="ProConnect team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <Card className="absolute -bottom-6 -right-6 md:right-6 bg-card border-border shadow-xl max-w-xs">
              <CardContent className="p-4">
                <Quote className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground italic">
                  Our mission is to democratize opportunity and make quality
                  talent accessible to everyone.
                </p>
                <p className="text-sm font-medium mt-2">— Sarah Chen, CEO</p>
              </CardContent>
            </Card>
          </div>

          {/* Content side */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                ProConnect was born in 2019 from a simple observation: the
                traditional hiring process was broken. Talented freelancers
                struggled to find quality clients, while businesses wasted
                countless hours searching for the right talent.
              </p>

              <p>
                Our founders, having experienced these frustrations firsthand as
                both freelancers and business owners, decided to build something
                different. A platform that puts trust, transparency, and quality
                at its core.
              </p>

              <p>
                Today, ProConnect has grown into a global marketplace serving
                over 50,000 freelancers and thousands of businesses across 120+
                countries. But our mission remains the same: to create
                meaningful connections that help people do their best work.
              </p>
            </div>

            {/* Timeline */}
            <div className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Our Journey</h3>
              <div className="space-y-3">
                {[
                  {
                    year: "2019",
                    event: "ProConnect founded in San Francisco",
                  },
                  {
                    year: "2020",
                    event: "Reached 10,000 registered freelancers",
                  },
                  { year: "2022", event: "Expanded to 100+ countries" },
                  {
                    year: "2024",
                    event: "Launched AI-powered matching system",
                  },
                ].map((item) => (
                  <div key={item.year} className="flex items-center gap-4">
                    <span className="text-primary font-bold w-12">
                      {item.year}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">
                      {item.event}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
