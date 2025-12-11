// components/servicesPage/ServiceDetailsSection.tsx
"use client";


import { Star, Clock, Tag } from "lucide-react";
import OrderButton from "../modules/orders/OrderButton";
import { IService } from "@/types/service.interface";
import Image from "next/image";

interface Props {
  service: IService;
  user?: {
    isLoggedIn: boolean;
    role?: string; // এটা add করুন
  };
}

export function ServiceDetailsSection({ service, user }: Props) {

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
        {/* Left - Full Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl h-full relative group">
          <Image
            width={300}
            height={300}
            src={service.image || "https://via.placeholder.com/800x450"}
            alt={service.title}
            className="w-full h-full object-fit transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Right - Details */}
        <div className="space-y-6 flex flex-col justify-start">
          {/* Title & Rating */}
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              {service.title}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-slate-600">
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">
                  {service.averageRating.toFixed(1)}
                </span>
                <span className="text-xs">({service.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {service.deliveryTime} days
                </span>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          {/* Seller Info */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow border border-slate-200">
            {typeof service.sellerId === "string" ||
            !service.sellerId.profilePicture ? (
              // যদি ছবি না থাকে
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center ring-2 ring-slate-100 shadow">
                <span className="text-xl font-semibold text-slate-900">
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

            <div>
              <p className="font-semibold text-slate-900">
                {typeof service.sellerId === "string"
                  ? "Unknown Seller"
                  : service.sellerId.name}
              </p>
              <p className="text-sm text-slate-600">
                {typeof service.sellerId === "string"
                  ? ""
                  : service.sellerId.email}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold text-slate-900 mb-2 text-lg">
              About This Service
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Tags */}
          {service.tags && service.tags.length > 0 && (
            <div className="bg-white p-4 rounded-2xl shadow">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-600" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 cursor-pointer transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price & Order */}
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <p className="text-sm text-slate-500">Price</p>
              <p className="text-3xl font-bold text-slate-900">
                ${service.price}
              </p>
            </div>

            <OrderButton
              serviceId={service._id!}
              isLoggedIn={user?.isLoggedIn}
              userRole={user?.role}
            />

            <p className="text-center text-slate-400 text-xs">
              100% satisfaction guaranteed or money back
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
