// src/components/services/ServiceCard.tsx
"use client"; // Client Component for interactivity

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import Image from "next/image";
import { IService } from "@/types/service.interface";

interface ServiceCardProps {
  service: IService;
  onClick?: (serviceId: string) => void;
}

export function ServiceCard({ service, onClick }: ServiceCardProps) {
  return (
    <Card
      onClick={() => onClick && service._id && onClick(service._id.toString())}
      className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors"
    >
      <div className="relative aspect-3/2 overflow-hidden">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur-sm">
          {service.category}
        </Badge>
      </div>
      <CardContent className="p-4">
        {/* Seller Info */}
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={
              typeof service.sellerId === "string"
                ? "/placeholder.svg"
                : service.sellerId.profilePicture
            }
            alt={
              typeof service.sellerId === "string"
                ? "Seller"
                : service.sellerId.name
            }
            width={32}
            height={32}
            className="rounded-full object-cover w-10 h-10"
          />
          <span className="text-sm font-medium text-foreground">
            {typeof service.sellerId === "string"
              ? "Unknown Seller"
              : service.sellerId.name || "Unknown Seller"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-medium text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm font-medium text-foreground">
            {service.averageRating.toFixed(1)} ({service.reviewCount})
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{service.deliveryTime}d delivery</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">From </span>
            <span className="text-lg font-bold text-foreground">
              ${service.price}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
