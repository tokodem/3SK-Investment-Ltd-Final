import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Award,
  Users,
  Car,
  Globe,
  Shield,
  Clock,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  Heart,
  Target,
  Zap } from
'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
  { icon: Car, label: 'Cars Imported', value: '1,000+', color: 'text-blue-600' },
  { icon: Users, label: 'Happy Customers', value: '850+', color: 'text-green-600' },
  { icon: Globe, label: 'Years Experience', value: '10+', color: 'text-purple-600' },
  { icon: Award, label: 'Awards Won', value: '5', color: 'text-yellow-600' }];


  const values = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Every vehicle undergoes rigorous inspection to ensure it meets our high standards before shipment.'
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'We prioritize our customers\' needs and satisfaction above everything else in our business.'
  },
  {
    icon: Target,
    title: 'Transparency',
    description: 'We believe in honest pricing and clear communication throughout the entire process.'
  },
  {
    icon: Zap,
    title: 'Efficiency',
    description: 'Our streamlined processes ensure quick and hassle-free vehicle import and delivery.'
  }];


  const team = [
  {
    name: 'Samuel Kigozi',
    position: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    description: 'With over 15 years in the automotive industry, Samuel leads our vision of making quality Japanese vehicles accessible.'
  },
  {
    name: 'Grace Nakamya',
    position: 'Operations Manager',
    image: 'https://images.unsplash.com/photo-1503455637927-730bce8583c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBJTIwY3JvcHBlZCUyMGltYWdlJTIwb2YlMjBhJTIwcGVyc29uJTJDJTIwZm9jdXNpbmclMjBvbiUyMHRoZWlyJTIwZmFjZSUyQyUyMHdpdGglMjBhJTIwbmV1dHJhbCUyMGJhY2tncm91bmQufGVufDB8fHx8MTc0ODM2NTgxNHww&ixlib=rb-4.1.0&q=80&w=200$w=300',
    description: 'Grace oversees all operations ensuring smooth import processes and customer satisfaction.'
  },
  {
    name: 'Robert Ssengooba',
    position: 'Technical Inspector',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    description: 'Robert ensures every vehicle meets our quality standards through comprehensive technical inspections.'
  }];


  const milestones = [
  { year: '2014', event: 'Company Founded', description: 'Started as a small family business with a vision to import quality Japanese vehicles.' },
  { year: '2016', event: 'First 100 Cars', description: 'Successfully imported and sold our first 100 vehicles to satisfied customers.' },
  { year: '2018', event: 'Expanded Operations', description: 'Opened our main showroom in Kampala and expanded our team.' },
  { year: '2020', event: 'Digital Transformation', description: 'Launched our online platform to serve customers better during the pandemic.' },
  { year: '2022', event: '1000+ Cars Milestone', description: 'Celebrated importing over 1,000 vehicles and serving 850+ happy customers.' },
  { year: '2024', event: 'Premium Services', description: 'Introduced premium inspection and warranty services for enhanced customer confidence.' }];


  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            About <span className="text-yellow-400">3SK Investment</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Your trusted partner in importing quality Japanese vehicles to Uganda since 2014.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
              <Link to="/cars">Browse Our Cars</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) =>
            <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6">
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2014 by Samuel Kigozi, 3SK Investment Company Ltd. began as a small family business 
                with a simple mission: to make high-quality Japanese vehicles accessible to Ugandans at fair prices.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What started as a one-man operation has grown into Uganda's trusted automotive import company, 
                serving over 850 satisfied customers and importing more than 1,000 vehicles from Japan.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, we continue to uphold our founding principles of quality, transparency, and customer 
                satisfaction while embracing modern technology to serve our customers better.
              </p>
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-gray-700 font-medium">Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-gray-700 font-medium">10+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-gray-700 font-medium">Customer Satisfaction Guaranteed</span>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Car showroom"
                className="rounded-lg shadow-xl w-full" />

              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl font-bold text-blue-600">1000+</div>
                  <div>
                    <div className="font-semibold text-gray-900">Cars Imported</div>
                    <div className="text-sm text-gray-600">Since 2014</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our relationships with customers, 
              partners, and the community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) =>
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of professionals is committed to providing you with 
              exceptional service and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) =>
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />

                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-4">{member.position}</Badge>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A decade of growth, innovation, and customer satisfaction.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) =>
                <div key={index} className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className="hidden md:flex absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                    
                    {/* Content */}
                    <div className="md:ml-16 w-full">
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            <Badge className="bg-blue-600 text-white w-fit mb-2 sm:mb-0">
                              {milestone.year}
                            </Badge>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {milestone.event}
                            </h3>
                          </div>
                          <p className="text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Showroom
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Come and see our collection of quality Japanese vehicles in person.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7554096847745!2d32.58351831475385!3d0.3475964997516994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb0f9b1b8a35%3A0x1f9b8b8b8b8b8b8b!2sJinja%20Road%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1647895234567!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg">
              </iframe>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Banda Bond No. W0474 Plot 4<br />
                    Jinja Road, Kampala<br />
                    Uganda
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href="https://maps.google.com/maps?q=Banda+Bond+Jinja+Road+Kampala+Uganda"
                      target="_blank"
                      rel="noopener noreferrer">

                      Get Directions
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Phone className="h-6 w-6 mr-3 text-blue-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+256-704-235914</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">3skinvestltd@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">Mon - Sat: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today and let our experienced team help you find the ideal Japanese vehicle 
            that fits your needs and budget.
          </p>
          
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

export default About;