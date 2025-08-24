import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedSearch from '@/components/EnhancedSearch';
import CarComparison from '@/components/CarComparison';
import { mockCars, mockBlogPosts } from '@/data/mockData';
import {
  Search,
  Star,
  Users,
  Award,
  Shield,
  Phone,
  Mail,
  Calendar,
  Fuel,
  Settings,
  ArrowRight,
  CheckCircle,
  Scale } from
'lucide-react';

const HomePage = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonCars, setComparisonCars] = useState([]);

  const featuredCars = mockCars.filter((car) => car.status === 'Available').slice(0, 6);
  const recentBlogPosts = mockBlogPosts.slice(0, 3);

  const addToComparison = (car) => {
    if (comparisonCars.length < 3 && !comparisonCars.find((c) => c.id === car.id)) {
      setComparisonCars([...comparisonCars, car]);
      setShowComparison(true);
    }
  };

  const testimonials = [
  {
    name: 'James Ssempala',
    location: 'Kampala',
    text: 'Excellent service! Got my Toyota Harrier from 3SK Investment and the entire process was smooth. Highly recommended!',
    rating: 5
  },
  {
    name: 'Grace Nakato',
    location: 'Entebbe',
    text: 'Professional and reliable. They helped me import my dream car from Japan. Great customer service!',
    rating: 5
  },
  {
    name: 'Robert Mubiru',
    location: 'Jinja',
    text: 'Best prices in town and quality vehicles. Have bought 2 cars from them and planning for a third!',
    rating: 5
  }];


  const features = [
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Every vehicle is thoroughly inspected before shipment'
  },
  {
    icon: Award,
    title: 'Best Prices',
    description: 'Competitive pricing with no hidden costs'
  },
  {
    icon: Users,
    title: 'Expert Service',
    description: 'Professional team with years of experience'
  },
  {
    icon: CheckCircle,
    title: 'Proven Track Record',
    description: 'Thousands of satisfied customers across Uganda'
  }];


  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30"></div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Your Trusted Partner for
              <span className="block text-yellow-400">Japanese Vehicles</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto">
              Importers and Exporters of Quality Japanese Vehicles in Uganda. 
              Find your perfect car today!
            </p>
            
            {/* Enhanced Search Form */}
            <EnhancedSearch compact={true} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose 3SK Investment?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide exceptional service and quality vehicles that meet your needs and budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) =>
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of quality Japanese vehicles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCars.map((car) =>
            <div key={car.id} className="relative group">
                <Link to={`/cars/${car.id}`} className="block">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105">
                    <div className="relative">
                      <img
                      src={car.images[0]}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-500 text-white">
                          {car.status}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90">
                          {car.year}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge className="bg-blue-600 text-white">
                          <ArrowRight className="h-3 w-3" />
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                        {car.make} {car.model}
                      </h3>
                      <p className="text-2xl font-bold text-blue-600 mb-4">
                        UGX {car.price.toLocaleString()}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {car.year} • {car.mileage.toLocaleString()} km
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Fuel className="h-4 w-4 mr-2" />
                          {car.fuelType} • {car.transmission}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Settings className="h-4 w-4 mr-2" />
                          {car.engineSize}L Engine
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                        View Details →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                
                {/* Comparison button positioned absolutely */}
                <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToComparison(car);
                }}
                disabled={comparisonCars.length >= 3 || comparisonCars.find((c) => c.id === car.id)}>
                  <Scale className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/cars">
                View All Cars
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            
            {comparisonCars.length > 0 &&
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setShowComparison(true)}>

                <Scale className="h-5 w-5 mr-2" />
                Compare Cars ({comparisonCars.length})
              </Button>
            }
          </div>
          
          {/* Car Comparison */}
          {showComparison &&
          <div className="mt-12">
              <CarComparison initialCars={comparisonCars} />
            </div>
          }
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                About 3SK Investment Company Ltd.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We are leading importers and exporters of Japanese vehicles in Uganda, 
                committed to providing quality vehicles at competitive prices. With years 
                of experience in the automotive industry, we have built a reputation for 
                reliability and excellent customer service.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of experts carefully selects each vehicle, ensuring they meet 
                our high standards for quality, performance, and value. We handle the 
                entire import process, from selection to delivery, making your car 
                buying experience seamless and stress-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/about">Learn More</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Car showroom"
                className="rounded-lg shadow-xl" />

              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) =>
            <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) =>
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  )}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Latest News & Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest automotive news and helpful tips
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {recentBlogPosts.map((post) =>
            <Link key={post.id} to={`/blog/${post.id}`} className="block">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg hover:scale-105">
                  <div className="relative">
                    <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-600 text-white">
                        <ArrowRight className="h-3 w-3" />
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) =>
                    <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                    )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                      <span>{post.author}</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                      Read Article →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/blog">
                Read More Articles
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today for personalized assistance in finding the right vehicle for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center justify-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+256-704-235914</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>3skinvestltd@gmail.com</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
              <Link to="/contact">Get In Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
              <Link to="/cars">Browse Cars</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default HomePage;