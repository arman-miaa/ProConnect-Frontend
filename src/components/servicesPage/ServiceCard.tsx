"use client";

import { useRouter } from "next/navigation"; // App Router এর জন্য
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import Image from "next/image";
import { IService } from "@/types/service.interface";

interface ServiceCardProps {
  service: IService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (service._id) {
      router.push(`/services/${service._id}`);
    }
  };

  return (
    <Card
      onClick={handleClick}
      className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors"
    >
      <div className="relative aspect-3/2 overflow-hidden">
  
        <Image
          width={400}
          height={300}
          src={service?.image || "/placeholder.svg"}
          alt={service.title}
          quality={80}
         
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-accent text-foreground backdrop-blur-sm">
          {service.category}
        </Badge>
      </div>
      <CardContent className="p-4">
        {/* Seller Info */}
        {/* Seller Info */}
        <div className="flex items-center gap-3 mb-3">
          {typeof service.sellerId === "string" ||
          !service.sellerId.profilePicture ? (
            // যদি ছবি না থাকে
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {typeof service.sellerId === "string"
                  ? "U" // Unknown Seller এর প্রথম অক্ষর
                  : service.sellerId.name.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            // যদি ছবি থাকে
            <Image
              src={service.sellerId.profilePicture}
              alt={service.sellerId.name}
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10"
            />
          )}
          <span className="text-sm font-medium text-foreground">
            {typeof service.sellerId === "string"
              ? "Unknown Seller"
              : service.sellerId.name || "Unknown Seller"}
          </span>
        </div>

        <h3 className="font-medium text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm font-medium text-foreground">
            {service.averageRating.toFixed(1)} ({service.reviewCount})
          </span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{service.deliveryTime}d delivery</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Price </span>
            <span className="text-lg font-bold text-foreground">
              ${service.price}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
