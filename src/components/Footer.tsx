import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-lg font-bold">3SK Investment</h3>
                <p className="text-sm text-gray-400">Company Ltd.</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Importers and Exporters of Japanese Vehicles. Your trusted partner for quality vehicles in Uganda.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/cars" className="block text-gray-400 hover:text-white transition-colors">
                Browse Cars
              </Link>
              <Link to="/blog" className="block text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>Vehicle Import & Export</p>
              <p>Japanese Car Sales</p>
              <p>Vehicle Inspection</p>
              <p>Shipping & Logistics</p>
              <p>After-Sales Service</p>
              <p>Vehicle Registration</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  Banda Bond No. W0474 Plot 4<br />
                  Jinja Road, Kampala, Uganda
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-400" />
                <div className="text-gray-400 text-sm">
                  <p>+256-704-235914</p>
                  <p>+256-774-776734</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-400" />
                <div className="text-gray-400 text-sm">
                  <p>3skinvestltd@gmail.com</p>
                  <p>jhatti22@yahoo.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} 3SK Investment Company Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>);

};

export default Footer;