import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Director",
    company: "TechFlow Inc.",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=200&h=200", // updated
    rating: 5,
    content:
      "ProConnect transformed how we hire freelancers. The quality of talent is exceptional, and the escrow system gives us peace of mind on every project.",
  },
  {
    name: "James Rodriguez",
    role: "Freelance Developer",
    company: "Self-employed",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&w=200&h=200", // updated
    rating: 5,
    content:
      "As a seller, I've tripled my income since joining ProConnect. The platform fee is fair, and clients here actually pay on time!",
  },
  {
    name: "Emily Chen",
    role: "Startup Founder",
    company: "GreenLeaf Studios",
    image:
      "https://st2.depositphotos.com/1011382/10984/i/450/depositphotos_109847860-stock-photo-caucasian-business-woman-portrait.jpg",
    rating: 5,
    content:
      "We built our entire brand identity through ProConnect sellers. The messaging system made collaboration seamless across time zones.",
  },
  {
    name: "Michael Okonkwo",
    role: "UX Designer",
    company: "DesignHub Pro",
    image:
      "https://st.depositphotos.com/1905901/1876/i/450/depositphotos_18765417-stock-photo-african-american-male.jpg",
    rating: 5,
    content:
      "The verification badge really helps me stand out. Clients trust verified sellers more, and I've seen a 40% increase in order requests.",
  },
  {
    name: "Lisa Thompson",
    role: "E-commerce Owner",
    company: "StyleBox",
    image:
      "https://st2.depositphotos.com/3489481/7015/i/450/depositphotos_70159165-stock-photo-woman-sitting-at-desk-in.jpg",
    rating: 5,
    content:
      "From logo design to website development, I found everything I needed on ProConnect. The review system helps identify top talent quickly.",
  },
  {
    name: "David Park",
    role: "Content Writer",
    company: "WordCraft Agency",
    image:
      "https://photo-cdn2.icons8.com/1FO-Fb9X0qaTm9428-M7LqLF8OPcwgNwcWz0SPXKfdU/rs:fit:576:864/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvNjY2LzM2M2Y5/NjZkLWJlZmQtNDY1/Yi05MDYzLTU1M2Y3/ZGQyOTFhMy5qcGc.webp",
    rating: 5,
    content:
      "ProConnect's low commission rates mean I keep more of what I earn. Plus, the withdrawal process is fast and hassle-free.",
  },
];
export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Loved by Thousands Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See what our community of clients and sellers have to say about
            their ProConnect experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
