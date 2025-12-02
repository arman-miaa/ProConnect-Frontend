import { Badge } from "@/components/ui/badge";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="outline"
            className="mb-6 border-primary/30 text-primary"
          >
            About ProConnect
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Empowering Freelancers,{" "}
            <span className="text-primary">Connecting Talent</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We re building the future of work by creating meaningful connections
            between talented professionals and businesses that need them.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { number: "2019", label: "Founded" },
            { number: "50K+", label: "Freelancers" },
            { number: "120+", label: "Countries" },
            { number: "$25M+", label: "Paid Out" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
