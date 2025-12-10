/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search,  } from "lucide-react";

import { IService, ServiceCategory } from "@/types/service.interface";
import { ServiceCard } from "@/components/servicesPage/ServiceCard";
import ServiceHeader from "./ServiceHeader";
import { Pagination } from "@/components/shared/Pagination";

export function ServicesSection() {
  const [services, setServices] = useState<IService[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Generate category filters from ENUM
  const categories = Object.values(ServiceCategory);

  // ----------------------------
  // FETCH SERVICE DATA
  // ----------------------------
  const fetchServices = async () => {
    setLoading(true);

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) params.append("searchTerm", search);
    if (category) params.append("category", category);
    if (sort) params.append("sort", sort);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/service?${params.toString()}`,
        { cache: "no-store" }
      );

      const json = await res.json();
     
      setServices(json?.data?.data || []);
      setTotalPage(json?.data?.meta?.totalPage || 1);
    } catch (err) {
      console.log("Fetch error:", err);
    }

    setLoading(false);
  };

  // REACT 19 SAFE LOADER
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      await fetchServices();
      if (cancelled) return;
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [search, category, sort, page]);

  return (
    <section className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <ServiceHeader />

        {/* SEARCH FIELD */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

            <Input
              placeholder="Search for services..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="pl-12 pr-4 py-6 bg-card border-border rounded-xl"
            />
          </div>
        </div>

        {/* FILTERS */}
        {/* FILTERS */}
        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="font-semibold text-slate-700">Category:</span>
          <Badge
            onClick={() => {
              setPage(1);
              setCategory("");
            }}
            className={`cursor-pointer ${
              category === ""
                ? "bg-primary text-white"
                : "bg-accent text-foreground"
            }`}
          >
            All
          </Badge>

          {categories.map((cat) => (
            <Badge
              key={cat}
              onClick={() => {
                setPage(1);
                setCategory(cat);
              }}
              className={`cursor-pointer ${
                category === cat
                  ? "bg-primary text-white"
                  : "bg-accent text-foreground"
              }`}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* SORT OPTIONS */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="font-semibold text-slate-700">Sort By:</span>
          <Badge
            onClick={() => {
              setSort("price");
              setPage(1);
            }}
            className={`cursor-pointer ${
              sort === "price"
                ? "bg-primary text-white"
                : "bg-accent text-foreground"
            }`}
          >
            Price: Low to High
          </Badge>

          <Badge
            onClick={() => {
              setSort("rating");
              setPage(1);
            }}
            className={`cursor-pointer ${
              sort === "rating"
                ? "bg-primary text-white"
                : "bg-accent text-foreground"
            }`}
          >
            Top Rated
          </Badge>
        </div>

        {/* SERVICE LIST */}
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : services.length === 0 ? (
          <p className="text-center py-10 text-muted-foreground">
            No services found
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {/* <div className="flex justify-center items-center gap-4 mt-10">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          <span className="px-4">
            Page {page} of {totalPage}
          </span>

          <Button
            variant="outline"
            disabled={page >= totalPage}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div> */}
        <Pagination
          page={page}
          totalPage={totalPage}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </section>
  );
}
