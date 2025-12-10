"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Star, Users, Briefcase, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


import VideoModal from "@/components/shared/VideoModel";

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const handleCloseModal = () => {
    setIsPlaying(false);
  };
  return (
    <section className="relative min-h-screen md:pt-24 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge
              variant="secondary"
              className="bg-secondary text-secondary-foreground border border-border px-4 py-2 text-sm"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
              Trusted by 50,000+ professionals
            </Badge>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Where talent meets{" "}
                <span className="text-primary">opportunity</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                ProConnect is a modern service marketplace connecting clients
                with professional sellers. Built-in messaging, secure payments,
                and verified professionals.
              </p>
            </div>

            {/* CTA Buttons */}
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12"
                >
                  Find Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Button
                onClick={() => setIsPlaying(true)}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-border text-foreground hover:bg-secondary h-12 bg-transparent"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-secondary overflow-hidden"
                  >
                    <Image
                      src="/avatar.png" // query string সরানো
                      alt={`User ${i}`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.9/5 from 10,000+ reviews
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Cards */}
          <div className="relative">
            {/* Main Hero Image */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
              <Image
                src="/hero2.png"
                alt="Professional freelancer"
                width={600}
                height={500}
                className="object-cover w-full h-[400px] lg:h-[500px]"
              />

              {/* Overlay Cards */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
                {/* Stats Card */}
                <div className="bg-background/95 backdrop-blur-md rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          New Project Posted
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Web Development • $2,500
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-0">
                      Just now
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card - Top Right */}
            <div className="absolute -top-4 -right-4 lg:top-8 lg:-right-8 bg-card border border-border rounded-xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Verified Sellers
                  </p>
                  <p className="text-xs text-muted-foreground">100% Secure</p>
                </div>
              </div>
            </div>

            {/* Floating Card - Bottom Left */}
            <div className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 bg-card border border-border rounded-xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12K+</p>
                  <p className="text-xs text-muted-foreground">
                    Active Freelancers
                  </p>
                </div>
              </div>
            </div>

            {isPlaying && <VideoModal onClose={handleCloseModal} />}
          </div>
        </div>
      </div>
    </section>
  );
}
