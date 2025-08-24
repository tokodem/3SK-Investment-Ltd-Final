import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedSearch from '@/components/EnhancedSearch';
import CarComparison from '@/components/CarComparison';
import { mockCars } from '@/data/mockData';
import { Car } from '@/types';
import {
  Grid3X3,
  List,
  Calendar,
  Fuel,
  Settings,
  MapPin,
  ArrowRight,
  Scale,
  Search } from
'lucide-react';

const CarListings = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filteredCars, setFilteredCars] = useState<Car[]>(mockCars);
  const [comparisonCars, setComparisonCars] = useState<Car[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Handle search results from URL parameters or search component
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('search');

    if (searchTerm) {
      const filtered = mockCars.filter((car) => {
        const term = searchTerm.toLowerCase();
        return (
        car.make.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term) ||
        car.year.toString().includes(term) ||
        car.fuelType.toLowerCase().includes(term) ||
        car.transmission.toLowerCase().includes(term) ||
        car.color?.toLowerCase().includes(term) ||
        car.location.toLowerCase().includes(term) ||
        car.features.some((feature) => feature.toLowerCase().includes(term))) &&
        car.status === 'Available';
      });
      setFilteredCars(filtered);
    } else {
      setFilteredCars(mockCars.filter((car) => car.status === 'Available'));
    }
  }, [location.search]);

  const handleSearchResults = (results: Car[]) => {
    setFilteredCars(results);
  };

  const addToComparison = (car: Car) => {
    if (comparisonCars.length < 3 && !comparisonCars.find((c) => c.id === car.id)) {
      setComparisonCars([...comparisonCars, car]);
    }
  };

  const removeFromComparison = (carId: string) => {
    setComparisonCars(comparisonCars.filter((car) => car.id !== carId));
  };

  const applySorting = (cars: Car[]) => {
    const sorted = [...cars];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'year-new':
        return sorted.sort((a, b) => b.year - a.year);
      case 'year-old':
        return sorted.sort((a, b) => a.year - b.year);
      case 'mileage':
        return sorted.sort((a, b) => a.mileage - b.mileage);
      default:
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  };

  const sortedCars = applySorting(filteredCars);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500 text-white';
      case 'Sold':
        return 'bg-red-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Browse Our Vehicles
          </h1>
          <p className="text-lg text-gray-600">
            Find your perfect Japanese vehicle from our extensive collection
          </p>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <EnhancedSearch onSearchResults={handleSearchResults} showResults={false} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Comparison Bar */}
        {comparisonCars.length > 0 &&
        <div className="mb-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <Scale className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">
                      Comparing {comparisonCars.length} car{comparisonCars.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {comparisonCars.map((car, index) =>
                    <img
                      key={car.id}
                      src={car.images[0]}
                      alt={`${car.make} ${car.model}`}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover" />

                    )}
                    </div>
                    <Button
                    size="sm"
                    onClick={() => setShowComparison(!showComparison)}
                    className="bg-blue-600 hover:bg-blue-700">

                      {showComparison ? 'Hide' : 'View'} Comparison
                    </Button>
                    <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setComparisonCars([])}>

                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        }

        {/* Car Comparison Component */}
        {showComparison && comparisonCars.length > 0 &&
        <div className="mb-8">
            <CarComparison initialCars={comparisonCars} />
          </div>
        }

        <div className="flex flex-col gap-8">
          {/* Cars Grid/List */}
          <div className="w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Available Cars
                </h2>
                <p className="text-gray-600">
                  {sortedCars.length} car{sortedCars.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}>

                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}>

                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="year-new">Year: Newest</SelectItem>
                    <SelectItem value="year-old">Year: Oldest</SelectItem>
                    <SelectItem value="mileage">Mileage: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cars Display */}
            {viewMode === 'grid' ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedCars.map((car) =>
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
                          <Badge className={getStatusColor(car.status)}>
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
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {car.location}
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
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToComparison(car);
                  }}
                  disabled={comparisonCars.length >= 3 || comparisonCars.find((c) => c.id === car.id) !== undefined}>
                    <Scale className="h-4 w-4" />
                  </Button>
                </div>
              )}
              </div> :

            <div className="space-y-4">
                {sortedCars.map((car) =>
              <div key={car.id} className="relative group">
                  <Link to={`/cars/${car.id}`} className="block">
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-[1.02]">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-80">
                          <img
                          src={car.images[0]}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-300" />

                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                          <div className="absolute top-4 left-4">
                            <Badge className={getStatusColor(car.status)}>
                              {car.status}
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Badge className="bg-blue-600 text-white">
                              <ArrowRight className="h-4 w-4" />
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="flex-1 p-6">
                          <div className="flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                                  {car.make} {car.model}
                                </h3>
                                <Badge variant="secondary">{car.year}</Badge>
                              </div>
                              <p className="text-2xl font-bold text-blue-600">
                                UGX {car.price.toLocaleString()}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {car.mileage.toLocaleString()} km
                              </div>
                              <div className="flex items-center">
                                <Fuel className="h-4 w-4 mr-2" />
                                {car.fuelType}
                              </div>
                              <div className="flex items-center">
                                <Settings className="h-4 w-4 mr-2" />
                                {car.transmission}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                {car.location}
                              </div>
                            </div>

                            <div className="mt-auto">
                              <div className="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                                View Details →
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                  
                  {/* Comparison button positioned absolutely */}
                  <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToComparison(car);
                  }}
                  disabled={comparisonCars.length >= 3 || comparisonCars.find((c) => c.id === car.id) !== undefined}>
                    <Scale className="h-4 w-4" />
                  </Button>
                </div>
              )}
              </div>
            }

            {/* No Results */}
            {sortedCars.length === 0 &&
            <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all available cars.</p>
                <Button asChild variant="outline">
                  <Link to="/cars">View All Cars</Link>
                </Button>
              </div>
            }
          </div>
        </div>
      </div>

      <Footer />
    </div>);

};

export default CarListings;