import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const team = [
  {
    name: "Abdullah",
    role: "CEO & Co-Founder",
    image: "/member1.png",
    bio: "Former VP at Upwork, 15+ years in marketplace tech.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Marcus Johnson",
    role: "CTO & Co-Founder",
    image: "/member2.png",
    bio: "Ex-Google engineer, passionate about scalable platforms.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Abdur Rahman",
    role: "Head of Product",
    image: "/member3.png",
    bio: "Product leader with 10+ years at top tech companies.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "David Kim",
    role: "Head of Operations",
    image: "/member4.png",
    bio: "Operations expert focused on community growth.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
];

export function TeamSection() {
  return (
    <section className="py-24 bg-card/40 backdrop-blur-sm border-t border-border/40">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Meet Our Leadership
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate team dedicated to transforming how the world works
            together.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member) => (
            <Card
              key={member.name}
              className="bg-background/60 border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all rounded-xl overflow-hidden group"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-muted/30">
                <Image
                  width={300}
                  height={300}
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {member.role}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Socials */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground" />
                  </a>

                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
