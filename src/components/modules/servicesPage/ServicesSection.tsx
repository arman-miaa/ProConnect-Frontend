// src/components/services/ServicesSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { IService } from "@/types/service.interface";

import { useRouter } from "next/navigation";
import { ServiceCard } from "@/components/servicesPage/ServiceCard";
import ServiceHeader from "./ServiceHeader";

interface ServicesSectionProps {
  services: IService[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const router = useRouter();
 console.log(services);
  const handleCardClick = (serviceId: string) => {
    router.push(`/services/${serviceId}`);
  };

  return (
    <section className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header  */}
  
        <ServiceHeader/>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for services..."
              className="pl-12 pr-4 py-6 bg-card border-border text-foreground placeholder:text-muted-foreground rounded-xl"
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90">
              Search
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <Button
            variant="outline"
            className="border-border text-foreground hover:bg-secondary bg-transparent"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Badge
            variant="secondary"
            className="bg-secondary text-secondary-foreground cursor-pointer hover:bg-secondary/80"
          >
            All Categories
          </Badge>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground cursor-pointer hover:border-primary/50"
          >
            Price: Low to High
          </Badge>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground cursor-pointer hover:border-primary/50"
          >
            Top Rated
          </Badge>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground cursor-pointer hover:border-primary/50"
          >
            Fastest Delivery
          </Badge>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <ServiceCard
              key={service._id?.toString()}
              service={service}
              onClick={handleCardClick}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-border text-foreground hover:bg-secondary px-8 bg-transparent"
          >
            Load More Services
          </Button>
        </div>
      </div>
    </section>
  );
}
