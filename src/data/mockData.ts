import { Car, BlogPost, Inquiry, DashboardStats } from '@/types';

export const mockCars: Car[] = [
{
  id: '1',
  make: 'Toyota',
  model: 'Harrier',
  year: 2018,
  price: 35000000,
  mileage: 45000,
  fuelType: 'Hybrid',
  transmission: 'Automatic',
  bodyType: 'SUV',
  color: 'Pearl White',
  engineSize: 2.0,
  description: 'Excellent condition Toyota Harrier with premium features. Low mileage, well maintained, perfect for family use.',
  features: [
  'Navigation System',
  'Backup Camera',
  'Heated Seats',
  'Bluetooth Connectivity',
  'Cruise Control',
  'Leather Interior',
  'Sunroof',
  'LED Headlights'],

  images: [
  'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop'],

  status: 'Available',
  location: 'Kampala',
  chassisNumber: 'ACU30-1234567',
  registrationYear: 2018,
  condition: 'Excellent',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
},
{
  id: '2',
  make: 'Honda',
  model: 'Vezel',
  year: 2019,
  price: 28000000,
  mileage: 35000,
  fuelType: 'Hybrid',
  transmission: 'CVT',
  bodyType: 'SUV',
  color: 'Silver',
  engineSize: 1.5,
  description: 'Fuel-efficient Honda Vezel in pristine condition. Perfect compact SUV for city driving.',
  features: [
  'Honda SENSING',
  'Smart Entry',
  'Push Start',
  'Dual Climate Control',
  'Rearview Camera',
  'LED Lights',
  'Smart Key'],

  images: [
  'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'],

  status: 'Available',
  location: 'Kampala',
  chassisNumber: 'RU3-9876543',
  registrationYear: 2019,
  condition: 'Excellent',
  createdAt: '2024-01-14T10:00:00Z',
  updatedAt: '2024-01-14T10:00:00Z'
},
{
  id: '3',
  make: 'Mazda',
  model: 'CX-5',
  year: 2020,
  price: 32000000,
  mileage: 25000,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  bodyType: 'SUV',
  color: 'Deep Red',
  engineSize: 2.0,
  description: 'Stylish Mazda CX-5 with SKYACTIV technology. Low mileage and excellent performance.',
  features: [
  'SKYACTIV Technology',
  'Mazda Connect',
  'Blind Spot Monitoring',
  'Premium Sound System',
  'Leather Seats',
  'Smart City Brake',
  'Lane Keep Assist'],

  images: [
  'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&h=600&fit=crop'],

  status: 'Available',
  location: 'Kampala',
  chassisNumber: 'KF2P-5555555',
  registrationYear: 2020,
  condition: 'Excellent',
  createdAt: '2024-01-13T10:00:00Z',
  updatedAt: '2024-01-13T10:00:00Z'
},
{
  id: '4',
  make: 'Nissan',
  model: 'X-Trail',
  year: 2017,
  price: 25000000,
  mileage: 55000,
  fuelType: 'Petrol',
  transmission: 'CVT',
  bodyType: 'SUV',
  color: 'Black',
  engineSize: 2.0,
  description: 'Reliable Nissan X-Trail with spacious interior. Great for family adventures.',
  features: [
  '7-Seater',
  'All-Wheel Drive',
  'Intelligent Key',
  'Around View Monitor',
  'Dual Climate Control',
  'Roof Rails',
  'Fog Lights'],

  images: [
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop'],

  status: 'Sold',
  location: 'Kampala',
  chassisNumber: 'T32-7777777',
  registrationYear: 2017,
  condition: 'Good',
  createdAt: '2024-01-12T10:00:00Z',
  updatedAt: '2024-01-16T15:30:00Z'
},
{
  id: '5',
  make: 'Subaru',
  model: 'Forester',
  year: 2019,
  price: 30000000,
  mileage: 40000,
  fuelType: 'Petrol',
  transmission: 'CVT',
  bodyType: 'SUV',
  color: 'Blue',
  engineSize: 2.0,
  description: 'Adventure-ready Subaru Forester with excellent safety features and all-wheel drive.',
  features: [
  'Symmetrical AWD',
  'EyeSight Safety',
  'X-Mode',
  'Panoramic Sunroof',
  'Keyless Access',
  'Hill Descent Control',
  'Power Tailgate'],

  images: [
  'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop'],

  status: 'Available',
  location: 'Kampala',
  chassisNumber: 'SK9-3333333',
  registrationYear: 2019,
  condition: 'Excellent',
  createdAt: '2024-01-11T10:00:00Z',
  updatedAt: '2024-01-11T10:00:00Z'
},
{
  id: '6',
  make: 'Toyota',
  model: 'Prius',
  year: 2018,
  price: 22000000,
  mileage: 38000,
  fuelType: 'Hybrid',
  transmission: 'CVT',
  bodyType: 'Hatchback',
  color: 'White',
  engineSize: 1.8,
  description: 'Eco-friendly Toyota Prius with exceptional fuel economy. Perfect for daily commuting.',
  features: [
  'Hybrid Technology',
  'Toyota Safety Sense',
  'Smart Entry',
  'LED Headlights',
  'Touch Screen',
  'Backup Camera',
  'Eco Mode'],

  images: [
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&h=600&fit=crop'],

  status: 'Available',
  location: 'Kampala',
  chassisNumber: 'ZVW30-1111111',
  registrationYear: 2018,
  condition: 'Good',
  createdAt: '2024-01-10T10:00:00Z',
  updatedAt: '2024-01-10T10:00:00Z'
},
{
  id: '1',
  make: 'Toyota',
  model: 'Harrier',
  year: 2018,
  price: 35000000,
  mileage: 45000,
  fuelType: 'Hybrid',
  transmission: 'Automatic',
  bodyType: 'SUV',
  color: 'Pearl White',
  engineSize: 2.0,
  description: 'Excellent condition Toyota Harrier with premium features. Low mileage, well maintained, perfect for family use.',
  features: [
  'Navigation System',
  'Backup Camera',
  'Heated Seats',
  'Bluetooth Connectivity',
  'Cruise Control',
  'Leather Interior',
  'Sunroof',
  'LED Headlights'],

  images: [
  'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop'],

  status: 'Available',
  location: 'Kampala',
  chassisNumber: 'ACU30-1234567',
  registrationYear: 2018,
  condition: 'Excellent',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
},
{
  id: '1',
  make: 'Toyota',
  model: 'Harrier',
  year: 2018,
  price: 35000000,
  mileage: 45000,
  fuelType: 'Hybrid',
  transmission: 'Automatic',
  bodyType: 'SUV',
  color: 'Pearl White',
  engineSize: 2.0,
  description: 'Excellent condition Toyota Harrier with premium features. Low mileage, well maintained, perfect for family use.',
  features: [
  'Navigation System',
  'Backup Camera',
  'Heated Seats',
  'Bluetooth Connectivity',
  'Cruise Control',
  'Leather Interior',
  'Sunroof',
  'LED Headlights'],

  images: [
  'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop'],

  status: 'Available',
  location: 'Kampala',
  chassisNumber: 'ACU30-1234567',
  registrationYear: 2018,
  condition: 'Excellent',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
},
{
  id: '1',
  make: 'Toyota',
  model: 'Harrier',
  year: 2018,
  price: 35000000,
  mileage: 45000,
  fuelType: 'Hybrid',
  transmission: 'Automatic',
  bodyType: 'SUV',
  color: 'Pearl White',
  engineSize: 2.0,
  description: 'Excellent condition Toyota Harrier with premium features. Low mileage, well maintained, perfect for family use.',
  features: [
  'Navigation System',
  'Backup Camera',
  'Heated Seats',
  'Bluetooth Connectivity',
  'Cruise Control',
  'Leather Interior',
  'Sunroof',
  'LED Headlights'],

  images: [
  'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop'],

  status: 'Available',
  location: 'Kampala',
  chassisNumber: 'ACU30-1234567',
  registrationYear: 2018,
  condition: 'Excellent',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
},
{
  id: '1',
  make: 'Toyota',
  model: 'Harrier',
  year: 2018,
  price: 35000000,
  mileage: 45000,
  fuelType: 'Hybrid',
  transmission: 'Automatic',
  bodyType: 'SUV',
  color: 'Pearl White',
  engineSize: 2.0,
  description: 'Excellent condition Toyota Harrier with premium features. Low mileage, well maintained, perfect for family use.',
  features: [
  'Navigation System',
  'Backup Camera',
  'Heated Seats',
  'Bluetooth Connectivity',
  'Cruise Control',
  'Leather Interior',
  'Sunroof',
  'LED Headlights'],

  images: [
  'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop'],

  status: 'Available',
  location: 'Kampala',
  chassisNumber: 'ACU30-1234567',
  registrationYear: 2018,
  condition: 'Excellent',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
}];



export const mockBlogPosts: BlogPost[] = [
{
  id: '1',
  title: 'Why Japanese Cars Are the Best Choice for Uganda',
  content: 'Japanese vehicles have earned a reputation for reliability, fuel efficiency, and durability that makes them particularly well-suited for Ugandan roads and conditions. The combination of advanced engineering, rigorous quality control, and practical design philosophy has made Japanese automakers leaders in the global automotive industry. For Ugandan drivers, these characteristics translate into vehicles that can handle the diverse terrain and climate challenges of East Africa while providing excellent value for money. Japanese cars are engineered to last, with many models easily reaching 200,000+ kilometers with proper maintenance. The availability of spare parts and the widespread knowledge of Japanese vehicle mechanics in Uganda further enhances their appeal. Additionally, Japanese manufacturers have consistently focused on fuel efficiency, which is crucial given the fluctuating fuel prices in Uganda. Models like the Toyota Prius, Honda Vezel, and Nissan Note offer exceptional fuel economy without sacrificing performance or comfort.',
  excerpt: 'Discover why Japanese cars are the ideal choice for Ugandan drivers, from reliability to fuel efficiency and long-term value.',
  author: '3SK Investment Team',
  publishedAt: '2024-01-15T10:00:00Z',
  tags: ['Japanese Cars', 'Uganda', 'Reliability'],
  featuredImage: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=400&fit=crop',
  status: 'Published',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
},
{
  id: '2',
  title: 'Complete Guide to Importing Cars from Japan',
  content: 'Importing a car from Japan can seem complex, but with the right guidance and partner, it becomes a straightforward process that can save you significant money while getting a higher quality vehicle. The Japanese used car market is known for its exceptional standards, with vehicles undergoing rigorous inspections and maintenance programs. At 3SK Investment, we handle the entire import process for our clients, from vehicle selection at Japanese auctions to final delivery in Uganda. The process begins with identifying your requirements and budget, followed by sourcing the right vehicle from reputable Japanese dealers and auction houses. We conduct thorough inspections, handle all documentation including export certificates, arrange shipping through reliable freight companies, and manage all customs clearance procedures in Uganda. Our team also ensures compliance with URA requirements and UNBS standards. The entire process typically takes 6-8 weeks from purchase to delivery, and we provide regular updates throughout. We also offer financing options and comprehensive after-sales support to ensure your imported vehicle serves you well for years to come.',
  excerpt: 'Everything you need to know about importing vehicles from Japan to Uganda, including the complete process and requirements.',
  author: '3SK Investment Team',
  publishedAt: '2024-01-12T10:00:00Z',
  tags: ['Import', 'Japan', 'Guide'],
  featuredImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=400&fit=crop',
  status: 'Published',
  createdAt: '2024-01-12T10:00:00Z',
  updatedAt: '2024-01-12T10:00:00Z'
},
{
  id: '3',
  title: 'Top 5 Hybrid Cars for 2024',
  content: 'As fuel prices continue to rise, hybrid vehicles offer an excellent solution for cost-effective transportation without compromising on performance or comfort. The hybrid technology has matured significantly over the past decade, with modern hybrid vehicles offering seamless transitions between electric and gasoline power, improved battery life, and impressive fuel economy figures. Our top 5 hybrid cars for 2024 include: 1. Toyota Prius - The pioneer of hybrid technology continues to lead with exceptional fuel efficiency of up to 25km/L and a spacious interior. 2. Honda Vezel - A compact SUV hybrid that combines style, efficiency, and practicality, perfect for both city driving and weekend adventures. 3. Toyota Harrier Hybrid - A luxury SUV that offers premium features while maintaining excellent fuel economy. 4. Nissan Note e-Power - Features an innovative electric motor drive system with a gasoline engine serving as a generator. 5. Honda Insight - A sleek sedan that rivals traditional gasoline cars in performance while offering superior fuel efficiency. These vehicles are available through our import service, and we can help you choose the right hybrid based on your specific needs, budget, and driving patterns.',
  excerpt: 'Explore the best hybrid vehicles available in 2024 for maximum fuel efficiency and environmental responsibility.',
  author: '3SK Investment Team',
  publishedAt: '2024-01-10T10:00:00Z',
  tags: ['Hybrid', '2024', 'Fuel Efficiency'],
  featuredImage: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=400&fit=crop',
  status: 'Published',
  createdAt: '2024-01-10T10:00:00Z',
  updatedAt: '2024-01-10T10:00:00Z'
}];


export const mockInquiries: Inquiry[] = [
{
  id: '1',
  name: 'John Mukasa',
  email: 'john.mukasa@email.com',
  phone: '+256 701 234567',
  message: 'I am interested in the Toyota Harrier. Can we schedule a viewing?',
  carId: '1',
  status: 'New',
  createdAt: '2024-01-16T08:30:00Z'
},
{
  id: '2',
  name: 'Sarah Nambi',
  email: 'sarah.nambi@email.com',
  phone: '+256 702 345678',
  message: 'What is your best price for the Honda Vezel?',
  carId: '2',
  status: 'Contacted',
  createdAt: '2024-01-15T14:20:00Z'
},
{
  id: '3',
  name: 'David Okello',
  email: 'david.okello@email.com',
  phone: '+256 703 456789',
  message: 'Do you have any financing options available?',
  status: 'New',
  createdAt: '2024-01-15T11:45:00Z'
}];


export const mockDashboardStats: DashboardStats = {
  totalCars: 6,
  availableCars: 5,
  soldCars: 1,
  pendingInquiries: 2,
  totalInquiries: 3,
  blogPosts: 3,
  recentActivity: [
  {
    id: '1',
    type: 'inquiry_received',
    description: 'New inquiry from John Mukasa for Toyota Harrier',
    timestamp: '2024-01-16T08:30:00Z'
  },
  {
    id: '2',
    type: 'car_sold',
    description: 'Nissan X-Trail marked as sold',
    timestamp: '2024-01-16T15:30:00Z'
  },
  {
    id: '3',
    type: 'blog_published',
    description: 'Published: Why Japanese Cars Are the Best Choice for Uganda',
    timestamp: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    type: 'inquiry_received',
    description: 'New inquiry from Sarah Nambi for Honda Vezel',
    timestamp: '2024-01-15T14:20:00Z'
  }]

};