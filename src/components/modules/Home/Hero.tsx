"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-purple-300 opacity-20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Build Faster With
            <span className="text-primary"> Modern Web Tools</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-5 text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Launch beautiful, scalable products using a modern tech stack
            designed for speed, consistency, and developer happiness.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Button size="lg" className="px-7">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button size="lg" variant="outline" className="px-7">
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
