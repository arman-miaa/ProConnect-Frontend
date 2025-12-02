import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/cta.png"
              alt="Join ProConnect"
              width={600}
              height={500}
              className="object-cover w-full h-[400px]"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-primary text-sm font-medium uppercase tracking-wider">
              Join us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
              Ready to grow your business?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              ProConnect brings together talented professionals and businesses
              looking for quality services. Whether you&apos;re a freelancer
              looking to showcase your skills or a client searching for the
              perfect match, our platform has everything you need to succeed.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Join thousands of professionals who trust ProConnect for secure
              payments, verified profiles, and seamless communication.
            </p>
            <Link href="/register">
              {" "}
              <Button className="bg-primary text-background  mt-4">
                Join the marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
