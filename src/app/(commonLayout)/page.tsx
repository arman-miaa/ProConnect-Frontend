
import  { FeaturesSection } from "@/components/modules/Home/FeaturesSection";
import  { StatsSection } from "@/components/modules/Home/StatsSection";
import { CTASection } from "@/components/modules/Home/CTASection";

import Head from "next/head";
import { Hero } from "@/components/modules/Home/Hero";
import { TestimonialsSection } from "@/components/modules/Home/TestimonialsSection";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <FeaturesSection />
      
        <StatsSection />
        <TestimonialsSection/>
        <CTASection />
      </main>
    </>
  );
}
