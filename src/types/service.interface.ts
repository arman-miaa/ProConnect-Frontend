// src/types/service.interface.ts

// =======================================================
// ১. সার্ভিস স্ট্যাটাস এনুম
// =======================================================
export enum ServiceStatus {
  LIVE = "LIVE",
  DRAFT = "DRAFT",
  PAUSED = "PAUSED",
}

// =======================================================
// ২. সার্ভিস ক্যাটাগরি এনুম
// =======================================================
export enum ServiceCategory {
  WEB_DEVELOPMENT = "Web Development",
  UI_UX_DESIGN = "UI/UX Design",
  DIGITAL_MARKETING = "Digital Marketing",
  SOFTWARE_TESTING = "Software Testing",
  CONTENT_WRITING = "Content Writing",
  CYBER_SECURITY = "Cyber Security",
  MOBILE_DEVELOPMENT = "Mobile App Development",
  DATA_SCIENCE = "Data Science & AI",
}

// =======================================================
// ৩. IService (Frontend)
// =======================================================
export interface IService {
  _id?: string;
  title: string;
  description: string;
  price: number;
  deliveryTime: number;
  category: string;
  tags: string[];
  image: string;
  sellerId:
    | {
        _id: string;
        name: string;
        email: string;
        profilePicture: string;
      }
    | string; // কখনো populate না থাকলে string
  averageRating: number;
  reviewCount: number;
  status: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

