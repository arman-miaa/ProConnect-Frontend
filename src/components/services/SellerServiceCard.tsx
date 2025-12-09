/* eslint-disable @typescript-eslint/no-explicit-any */
// ServiceCard.tsx
"use client";
import React from "react";
import { Star, Trash2, Pencil } from "lucide-react";
import Image from "next/image";

interface ServiceCardProps {
  service: any;
  onDelete: (id: string) => void;
  onEdit: (service: any) => void;
}

const statusColors: Record<string, string> = {
  LIVE: "bg-green-500 text-white",
  DRAFT: "bg-yellow-500 text-black",
  PAUSED: "bg-red-500 text-white",
};

export const SellerServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onDelete,
  onEdit,
}) => {
  const statusClass = statusColors[service.status] || "bg-gray-500 text-white";

  return (
    <div className="bg-card rounded-2xl  relative  border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors">
      <Image
        width={200}
        height={300}
        src={service.image || "/placeholder.png"}
        alt={service.title}
        className=" w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* STATUS BADGE */}
      <span
        className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}
      >
        {service.status || "UNKNOWN"}
      </span>

      {/* BUTTONS CONTAINER - Right Top */}
      <div className="absolute top-3 right-3 flex gap-2">
        {/* EDIT BUTTON */}
        <button
          onClick={() => onEdit(service)}
          className="bg-primary  cursor-pointer text-white p-2 rounded-full transition-colors"
          title="Edit Service"
        >
          <Pencil className="w-4 h-4" />
        </button>

        {/* DELETE BUTTON */}
        <button
          onClick={() => onDelete(service._id)}
          className="bg-red-600 hover:bg-red-700 cursor-pointer text-white p-2 rounded-full transition-colors"
          title="Delete Service"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-foreground">{service.title}</h2>
        <p className="text-foreground text-sm line-clamp-3">
          {service.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-muted-foreground font-bold">${service.price}</span>
          <span className="flex items-center ">
            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />{" "}
            {service.averageRating || 0} ({service.reviewCount || 0})
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {service.tags?.map((tag: string) => (
            <span
              key={tag}
              className="bg-slate-700 text-gray-300 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-700 text-xs mt-2">
          Category: {service.category} | Delivery: {service.deliveryTime} days
        </p>
      </div>
    </div>
  );
};
