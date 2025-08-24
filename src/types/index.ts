export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Manual' | 'Automatic' | 'CVT';
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Wagon' | 'Coupe' | 'Truck' | 'Van';
  color: string;
  engineSize: number;
  description: string;
  features: string[];
  images: string[];
  status: 'Available' | 'Sold' | 'Pending' | 'Reserved';
  location: string;
  chassisNumber?: string;
  registrationYear?: number;
  condition: 'New' | 'Used' | 'Excellent' | 'Good' | 'Fair';
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string[];
  featuredImage: string;
  status: 'Published' | 'Draft';
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  carId?: string;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: string;
}

export interface SearchFilters {
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceFrom?: number;
  priceTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  condition?: string;
  location?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'Admin' | 'User';
  name: string;
  createdAt: string;
}

export interface DashboardStats {
  totalCars: number;
  availableCars: number;
  soldCars: number;
  pendingInquiries: number;
  totalInquiries: number;
  blogPosts: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'car_added' | 'car_sold' | 'inquiry_received' | 'blog_published';
  description: string;
  timestamp: string;
}

export interface Newsletter {
  id: string;
  subject: string;
  content: string;
  recipients: string[];
  sentAt?: string;
  status: 'Draft' | 'Sent' | 'Scheduled';
  createdAt: string;
}