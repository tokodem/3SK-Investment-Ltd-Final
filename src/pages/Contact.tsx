import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Car,
  Users,
  Award,
  CheckCircle } from
'lucide-react';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    interestedIn: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the contact form to your API
      console.log('Sending contact form:', contactForm);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours."
      });

      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        interestedIn: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Location',
    details: [
    'Banda Bond No. W0474 Plot 4',
    'Jinja Road, Kampala',
    'Uganda']

  },
  {
    icon: Phone,
    title: 'Phone Numbers',
    details: [
    '+256-704-235914',
    '+256-774-776734']

  },
  {
    icon: Mail,
    title: 'Email Addresses',
    details: [
    '3skinvestltd@gmail.com',
    'jhatti22@yahoo.com']

  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: [
    'Monday - Friday: 8:00 AM - 6:00 PM',
    'Saturday: 8:00 AM - 4:00 PM',
    'Sunday: Closed']

  }];


  const services = [
  {
    icon: Car,
    title: 'Vehicle Import & Export',
    description: 'Professional import and export services for Japanese vehicles'
  },
  {
    icon: Users,
    title: 'Expert Consultation',
    description: 'Get expert advice on choosing the right vehicle for your needs'
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Every vehicle is thoroughly inspected before delivery'
  },
  {
    icon: CheckCircle,
    title: 'After-Sales Support',
    description: 'Comprehensive support even after your purchase'
  }];


  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Get in touch with our team of automotive experts. We're here to help you find your perfect vehicle.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                        className="mt-1" />

                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                        className="mt-1" />

                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        required
                        className="mt-1" />

                    </div>
                    
                    <div>
                      <Label htmlFor="interestedIn">I'm Interested In</Label>
                      <Select onValueChange={(value) => setContactForm({ ...contactForm, interestedIn: value })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buying-car">Buying a Car</SelectItem>
                          <SelectItem value="selling-car">Selling a Car</SelectItem>
                          <SelectItem value="import-services">Import Services</SelectItem>
                          <SelectItem value="export-services">Export Services</SelectItem>
                          <SelectItem value="consultation">General Consultation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                      className="mt-1"
                      placeholder="What's this about?" />

                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      className="mt-1"
                      rows={6}
                      placeholder="Tell us more about your inquiry..." />

                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    size="lg"
                    disabled={isSubmitting}>

                    {isSubmitting ?
                    'Sending...' :

                    <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <p className="text-gray-600">
                  We're here to help you with all your automotive needs.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) =>
                <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <info.icon className="h-6 w-6 text-blue-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      {info.details.map((detail, i) =>
                    <p key={i} className="text-gray-600 text-sm">
                          {detail}
                        </p>
                    )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start" variant="outline">
                  <a href="tel:+256704235914">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us Now
                  </a>
                </Button>
                
                <Button asChild className="w-full justify-start" variant="outline">
                  <a href="mailto:3skinvestltd@gmail.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </Button>
                
                <Button asChild className="w-full justify-start" variant="outline">
                  <a
                    href="https://wa.me/256704235914"
                    target="_blank"
                    rel="noopener noreferrer">

                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Find Our Location</CardTitle>
              <p className="text-gray-600">
                Visit our showroom in Kampala to see our vehicles in person.
              </p>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p className="font-semibold">Interactive Map</p>
                  <p className="text-sm">Banda Bond No. W0474 Plot 4, Jinja Road, Kampala</p>
                  <Button asChild className="mt-4" variant="outline">
                    <a
                      href="https://maps.google.com/?q=Banda+Bond+Jinja+Road+Kampala"
                      target="_blank"
                      rel="noopener noreferrer">

                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Services Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive automotive services to meet all your vehicle needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) =>
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <service.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services and vehicles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How long does the import process take?</h3>
                <p className="text-gray-600 text-sm">
                  Typically, the import process takes 6-8 weeks from order confirmation to delivery in Kampala.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you provide financing options?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, we work with several financial institutions to provide flexible financing solutions.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What warranty do you offer?</h3>
                <p className="text-gray-600 text-sm">
                  We provide a comprehensive warranty covering major mechanical components for all our vehicles.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I inspect the car before purchase?</h3>
                <p className="text-gray-600 text-sm">
                  Absolutely! We encourage all customers to thoroughly inspect vehicles before making a purchase.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>);

};

export default Contact;