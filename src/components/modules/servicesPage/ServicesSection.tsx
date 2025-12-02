import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  Clock,
  Filter,
  Code,
  Palette,
  PenTool,
  Video,
  Megaphone,
  FileText,
  Music,
  Globe,
} from "lucide-react";
import Image from "next/image";

const categories = [
  { name: "Development", icon: Code, count: 1240 },
  { name: "Design", icon: Palette, count: 890 },
  { name: "Writing", icon: PenTool, count: 650 },
  { name: "Video", icon: Video, count: 420 },
  { name: "Marketing", icon: Megaphone, count: 780 },
  { name: "Business", icon: FileText, count: 540 },
  { name: "Music", icon: Music, count: 320 },
  { name: "Translation", icon: Globe, count: 410 },
];

const services = [
  {
    id: 1,
    title: "I will build a modern React website with Next.js",
    seller: "Alex Chen",
    sellerImage: "/professional-developer-portrait.png",
    rating: 4.9,
    reviews: 234,
    price: 150,
    deliveryDays: 3,
    category: "Development",
    image: "/modern-website-design-preview.jpg",
    verified: true,
  },
  {
    id: 2,
    title: "Professional logo design with unlimited revisions",
    seller: "Sarah Miller",
    sellerImage: "/female-designer-portrait.png",
    rating: 5.0,
    reviews: 189,
    price: 75,
    deliveryDays: 2,
    category: "Design",
    image: "/logo-design-portfolio.png",
    verified: true,
  },
  {
    id: 3,
    title: "SEO-optimized blog articles and content writing",
    seller: "James Wright",
    sellerImage: "/male-writer-portrait.png",
    rating: 4.8,
    reviews: 156,
    price: 50,
    deliveryDays: 1,
    category: "Writing",
    image: "/blog-writing-content.jpg",
    verified: false,
  },
  {
    id: 4,
    title: "Engaging promotional video for your business",
    seller: "Emma Davis",
    sellerImage: "/female-video-editor.png",
    rating: 4.9,
    reviews: 98,
    price: 200,
    deliveryDays: 5,
    category: "Video",
    image: "/video-production-preview.jpg",
    verified: true,
  },
  {
    id: 5,
    title: "Complete social media marketing strategy",
    seller: "Michael Brown",
    sellerImage: "/male-marketing-expert-portrait.jpg",
    rating: 4.7,
    reviews: 142,
    price: 120,
    deliveryDays: 4,
    category: "Marketing",
    image: "/social-media-dashboard.png",
    verified: true,
  },
  {
    id: 6,
    title: "Mobile app UI/UX design with prototypes",
    seller: "Lisa Park",
    sellerImage: "/female-ux-designer-portrait.jpg",
    rating: 5.0,
    reviews: 87,
    price: 250,
    deliveryDays: 7,
    category: "Design",
    image: "/mobile-app-ui-design.png",
    verified: true,
  },
];

export function ServicesSection() {
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Marketplace
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Discover Professional Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Browse thousands of services from verified professionals. Find the
            perfect match for your project needs.
          </p>
        </div>

        {/* Search Bar */}
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

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Browse Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <category.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {category.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {category.count.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
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
            <Card
              key={service.id}
              className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
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
                  <div className="relative">
                    <Image
                      src={service.sellerImage || "/placeholder.svg"}
                      alt={service.seller}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    {service.verified && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
                        <svg
                          className="w-2 h-2 text-primary-foreground"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {service.seller}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-medium text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-medium text-foreground">
                    {service.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({service.reviews})
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {service.deliveryDays}d delivery
                    </span>
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
          ))}
        </div>

        {/* Load More */}
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
