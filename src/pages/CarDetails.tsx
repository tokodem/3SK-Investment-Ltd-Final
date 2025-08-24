import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { mockCars } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  Fuel,
  Settings,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  CheckCircle } from
'lucide-react';

const CarDetails = () => {
  const { id } = useParams();
  const { user, isCustomer } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Initialize favorite status from user's preferences
  const [isFavorite, setIsFavorite] = useState(
    user?.preferences?.favoriteCarIds?.includes(id || '') || false
  );

  const [inquiryForm, setInquiryForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: ''
  });

  const car = mockCars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <Button asChild>
            <Link to="/cars">Browse Cars</Link>
          </Button>
        </div>
      </div>);

  }

  // Similar cars (same make or body type)
  const similarCars = mockCars.
  filter((c) => c.id !== car.id && (c.make === car.make || c.bodyType === car.bodyType)).
  slice(0, 3);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
    prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
    prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  const handleFavoriteToggle = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save cars to your favorites.",
        variant: "destructive"
      });
      return;
    }

    if (!isCustomer()) {
      toast({
        title: "Customer account required",
        description: "Only customer accounts can save favorites.",
        variant: "destructive"
      });
      return;
    }

    setIsFavorite(!isFavorite);

    // In a real app, this would update the user's preferences in the database
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ?
      "Car removed from your favorites list." :
      "Car added to your favorites list."
    });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Here you would typically send the inquiry to your API
      console.log('Sending inquiry:', inquiryForm);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Inquiry Sent!",
        description: "We'll get back to you within 24 hours."
      });

      // Reset form
      setInquiryForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${car.make} ${car.model}`,
        text: `Check out this ${car.year} ${car.make} ${car.model} for UGX ${car.price.toLocaleString()}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Car link copied to clipboard"
      });
    }
  };

  const specifications = [
  { label: 'Make', value: car.make },
  { label: 'Model', value: car.model },
  { label: 'Year', value: car.year.toString() },
  { label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
  { label: 'Engine Size', value: `${car.engineSize}L` },
  { label: 'Fuel Type', value: car.fuelType },
  { label: 'Transmission', value: car.transmission },
  { label: 'Body Type', value: car.bodyType },
  { label: 'Color', value: car.color },
  { label: 'Condition', value: car.condition },
  { label: 'Location', value: car.location },
  { label: 'Chassis Number', value: car.chassisNumber || 'N/A' },
  { label: 'Registration Year', value: car.registrationYear?.toString() || 'N/A' }];


  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/cars" className="hover:text-blue-600">Cars</Link>
          <span>/</span>
          <span className="text-gray-900">{car.make} {car.model}</span>
        </div>

        {/* Back Button */}
        <Button variant="outline" asChild className="mb-6">
          <Link to="/cars">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={car.images[currentImageIndex]}
                  alt={`${car.make} ${car.model} - Image ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)} />

                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${
                  car.status === 'Available' ? 'bg-green-500' :
                  car.status === 'Sold' ? 'bg-red-500' : 'bg-yellow-500'} text-white`
                  }>
                    {car.status}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={handleFavoriteToggle}
                    disabled={!user || !isCustomer()}>
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button size="icon" variant="secondary" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Navigation Arrows */}
                {car.images.length > 1 &&
                <>
                    <Button
                    size="icon"
                    variant="secondary"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    onClick={handlePrevImage}>

                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={handleNextImage}>

                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                }

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {car.images.length}
                </div>

                {/* View Full Size Button */}
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-4 right-4"
                  onClick={() => setIsLightboxOpen(true)}>

                  <Eye className="h-4 w-4 mr-2" />
                  View Full Size
                </Button>
              </div>

              {/* Thumbnail Gallery */}
              {car.images.length > 1 &&
              <div className="p-4 border-t">
                  <div className="flex gap-2 overflow-x-auto">
                    {car.images.map((image, index) =>
                  <img
                    key={index}
                    src={image}
                    alt={`${car.make} ${car.model} thumbnail ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all ${
                    index === currentImageIndex ? 'border-blue-500' : 'border-transparent'}`
                    }
                    onClick={() => setCurrentImageIndex(index)} />

                  )}
                  </div>
                </div>
              }
            </Card>

            {/* Car Description */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{car.description}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Features & Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {car.features.map((feature, index) =>
                  <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specifications.map((spec, index) =>
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">{spec.label}:</span>
                      <span className="font-semibold">{spec.value}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Quick Info */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold mb-2">
                    {car.make} {car.model}
                  </h1>
                  <p className="text-3xl font-bold text-blue-600">
                    UGX {car.price.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Year</span>
                    </div>
                    <span className="font-semibold">{car.year}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Eye className="h-4 w-4 mr-2" />
                      <span>Mileage</span>
                    </div>
                    <span className="font-semibold">{car.mileage.toLocaleString()} km</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Fuel className="h-4 w-4 mr-2" />
                      <span>Fuel Type</span>
                    </div>
                    <span className="font-semibold">{car.fuelType}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Transmission</span>
                    </div>
                    <span className="font-semibold">{car.transmission}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>Location</span>
                    </div>
                    <span className="font-semibold">{car.location}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now: +256-704-235914
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  
                  {/* Sign in prompt for non-authenticated users */}
                  {!user &&
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 mb-2">
                        Sign in to save this car to your favorites and get personalized recommendations.
                      </p>
                      <div className="flex space-x-2">
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link to="/login">Sign In</Link>
                        </Button>
                        <Button asChild size="sm" className="flex-1">
                          <Link to="/signup">Sign Up</Link>
                        </Button>
                      </div>
                    </div>
                  }
                </div>
              </CardContent>
            </Card>

            {/* Inquiry Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      required />

                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      required />

                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      required />

                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder={`I'm interested in the ${car.make} ${car.model}...`}
                      rows={4}
                      required />

                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">+256-704-235914</div>
                    <div className="font-semibold">+256-774-776734</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">3skinvestltd@gmail.com</div>
                    <div className="font-semibold">jhatti22@yahoo.com</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-semibold">3SK Investment</div>
                    <div className="text-sm text-gray-600">
                      Banda Bond No. W0474 Plot 4<br />
                      Jinja Road, Kampala, Uganda
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Cars */}
        {similarCars.length > 0 &&
        <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Similar Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarCars.map((similarCar) =>
            <Card key={similarCar.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                  src={similarCar.images[0]}
                  alt={`${similarCar.make} ${similarCar.model}`}
                  className="w-full h-48 object-cover" />

                    <div className="absolute top-4 left-4">
                      <Badge className={`${
                  similarCar.status === 'Available' ? 'bg-green-500' :
                  similarCar.status === 'Sold' ? 'bg-red-500' : 'bg-yellow-500'} text-white`
                  }>
                        {similarCar.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">
                      {similarCar.make} {similarCar.model}
                    </h3>
                    <p className="text-lg font-bold text-blue-600 mb-2">
                      UGX {similarCar.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {similarCar.year} • {similarCar.mileage.toLocaleString()} km
                    </p>
                    <Button asChild className="w-full">
                      <Link to={`/cars/${similarCar.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
            )}
            </div>
          </section>
        }
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative">
            <img
              src={car.images[currentImageIndex]}
              alt={`${car.make} ${car.model}`}
              className="w-full h-auto max-h-[80vh] object-contain" />

            
            {/* Close Button */}
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4"
              onClick={() => setIsLightboxOpen(false)}>

              <X className="h-4 w-4" />
            </Button>

            {/* Navigation in Lightbox */}
            {car.images.length > 1 &&
            <>
                <Button
                size="icon"
                variant="secondary"
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                onClick={handlePrevImage}>

                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                size="icon"
                variant="secondary"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={handleNextImage}>

                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            }

            {/* Image Counter in Lightbox */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded">
              {currentImageIndex + 1} / {car.images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>);

};

export default CarDetails;