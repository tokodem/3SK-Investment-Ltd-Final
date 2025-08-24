import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { mockCars } from '@/data/mockData';
import { Car } from '@/types';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchFilters {
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
  priceFrom: number;
  priceTo: number;
  mileageFrom: number;
  mileageTo: number;
  fuelType: string;
  transmission: string;
  color: string;
  location: string;
  engineSizeFrom: number;
  engineSizeTo: number;
  features: string[];
  status: string;
}

interface EnhancedSearchProps {
  onSearchResults?: (results: Car[]) => void;
  showResults?: boolean;
  compact?: boolean;
}

const EnhancedSearch = ({ onSearchResults, showResults = false, compact = false }: EnhancedSearchProps) => {
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState<'quick' | 'advanced'>('quick');
  const [quickSearch, setQuickSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [filters, setFilters] = useState<SearchFilters>({
    make: '',
    model: '',
    yearFrom: 2000,
    yearTo: 2024,
    priceFrom: 5000000,
    priceTo: 200000000,
    mileageFrom: 0,
    mileageTo: 300000,
    fuelType: '',
    transmission: '',
    color: '',
    location: '',
    engineSizeFrom: 1.0,
    engineSizeTo: 5.0,
    features: [],
    status: 'Available'
  });

  // Get unique values for filters
  const makes = [...new Set(mockCars.map((car) => car.make))].sort();
  const models = [...new Set(mockCars.map((car) => car.model))].sort();
  const fuelTypes = [...new Set(mockCars.map((car) => car.fuelType))].sort();
  const transmissions = [...new Set(mockCars.map((car) => car.transmission))].sort();
  const colors = [...new Set(mockCars.map((car) => car.color).filter(Boolean))].sort();
  const locations = [...new Set(mockCars.map((car) => car.location))].sort();
  const allFeatures = [...new Set(mockCars.flatMap((car) => car.features))].sort();

  const handleQuickSearch = () => {
    setIsSearching(true);

    const results = mockCars.filter((car) => {
      const searchTerm = quickSearch.toLowerCase();
      return (
      car.make.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm) ||
      car.year.toString().includes(searchTerm) ||
      car.fuelType.toLowerCase().includes(searchTerm) ||
      car.transmission.toLowerCase().includes(searchTerm) ||
      car.color?.toLowerCase().includes(searchTerm) ||
      car.location.toLowerCase().includes(searchTerm) ||
      car.features.some((feature) => feature.toLowerCase().includes(searchTerm))) &&
      car.status === 'Available';
    });

    setSearchResults(results);
    if (onSearchResults) {
      onSearchResults(results);
    }

    // Navigate to car listings with search term
    navigate(`/cars?search=${encodeURIComponent(quickSearch)}`);
    setIsSearching(false);
  };

  const handleAdvancedSearch = () => {
    setIsSearching(true);

    const results = mockCars.filter((car) => {
      return (
        (!filters.make || car.make === filters.make) && (
        !filters.model || car.model.toLowerCase().includes(filters.model.toLowerCase())) &&
        car.year >= filters.yearFrom && car.year <= filters.yearTo &&
        car.price >= filters.priceFrom && car.price <= filters.priceTo &&
        car.mileage >= filters.mileageFrom && car.mileage <= filters.mileageTo && (
        !filters.fuelType || car.fuelType === filters.fuelType) && (
        !filters.transmission || car.transmission === filters.transmission) && (
        !filters.color || car.color === filters.color) && (
        !filters.location || car.location === filters.location) &&
        car.engineSize >= filters.engineSizeFrom && car.engineSize <= filters.engineSizeTo && (
        filters.features.length === 0 || filters.features.every((feature) =>
        car.features.includes(feature))) && (
        !filters.status || car.status === filters.status));

    });

    setSearchResults(results);
    if (onSearchResults) {
      onSearchResults(results);
    }

    // Navigate to car listings with filters
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && (typeof value !== 'string' || value !== '') && (
      !Array.isArray(value) || value.length > 0)) {
        searchParams.set(key, Array.isArray(value) ? value.join(',') : value.toString());
      }
    });
    navigate(`/cars?${searchParams.toString()}`);
    setIsSearching(false);
  };

  const clearFilters = () => {
    setFilters({
      make: '',
      model: '',
      yearFrom: 2000,
      yearTo: 2024,
      priceFrom: 5000000,
      priceTo: 200000000,
      mileageFrom: 0,
      mileageTo: 300000,
      fuelType: '',
      transmission: '',
      color: '',
      location: '',
      engineSizeFrom: 1.0,
      engineSizeTo: 5.0,
      features: [],
      status: 'Available'
    });
    setQuickSearch('');
    setSearchResults([]);
  };

  const toggleFeature = (feature: string) => {
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(feature) ?
      prev.features.filter((f) => f !== feature) :
      [...prev.features, feature]
    }));
  };

  const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;

  if (compact) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8">
        <Tabs value={searchMode} onValueChange={(value) => setSearchMode(value as 'quick' | 'advanced')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="quick">Quick Search</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Search</TabsTrigger>
          </TabsList>

          <TabsContent value="quick">
            <div className="flex gap-2">
              <Input
                placeholder="Search by make, model, year, features..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="bg-white text-gray-900 flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleQuickSearch()} />

              <Button
                onClick={handleQuickSearch}
                disabled={!quickSearch.trim() || isSearching}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">

                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Select value={filters.make} onValueChange={(value) => setFilters({ ...filters, make: value })}>
                <SelectTrigger className="bg-white text-gray-900">
                  <SelectValue placeholder="Select Make" />
                </SelectTrigger>
                <SelectContent>
                  {makes.map((make) =>
                  <SelectItem key={make} value={make}>{make}</SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Input
                placeholder="Model"
                value={filters.model}
                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                className="bg-white text-gray-900" />


              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Year From"
                  type="number"
                  value={filters.yearFrom}
                  onChange={(e) => setFilters({ ...filters, yearFrom: parseInt(e.target.value) || 2000 })}
                  className="bg-white text-gray-900" />

                <Input
                  placeholder="Year To"
                  type="number"
                  value={filters.yearTo}
                  onChange={(e) => setFilters({ ...filters, yearTo: parseInt(e.target.value) || 2024 })}
                  className="bg-white text-gray-900" />

              </div>

              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Min Price (UGX)"
                  type="number"
                  value={filters.priceFrom}
                  onChange={(e) => setFilters({ ...filters, priceFrom: parseInt(e.target.value) || 0 })}
                  className="bg-white text-gray-900" />

                <Input
                  placeholder="Max Price (UGX)"
                  type="number"
                  value={filters.priceTo}
                  onChange={(e) => setFilters({ ...filters, priceTo: parseInt(e.target.value) || 200000000 })}
                  className="bg-white text-gray-900" />

              </div>

              <Select value={filters.fuelType} onValueChange={(value) => setFilters({ ...filters, fuelType: value })}>
                <SelectTrigger className="bg-white text-gray-900">
                  <SelectValue placeholder="Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((fuel) =>
                  <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Select value={filters.transmission} onValueChange={(value) => setFilters({ ...filters, transmission: value })}>
                <SelectTrigger className="bg-white text-gray-900">
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  {transmissions.map((trans) =>
                  <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAdvancedSearch}
                disabled={isSearching}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">

                <Filter className="h-4 w-4 mr-2" />
                Search Cars
              </Button>
              <Button variant="outline" onClick={clearFilters} className="bg-white/90">
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>);

  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SlidersHorizontal className="h-5 w-5" />
            <span>Enhanced Car Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={searchMode} onValueChange={(value) => setSearchMode(value as 'quick' | 'advanced')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="quick">Quick Search</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Search</TabsTrigger>
            </TabsList>

            <TabsContent value="quick" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search by make, model, year, color, fuel type, transmission, location, or features..."
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleQuickSearch()} />

                <Button
                  onClick={handleQuickSearch}
                  disabled={!quickSearch.trim() || isSearching}>

                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Try searching for: "Toyota", "2020", "Automatic", "Petrol", "Kampala", or "Air Conditioning"
              </p>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              {/* Basic Filters */}
              <div>
                <h4 className="font-semibold mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Make</Label>
                    <Select value={filters.make} onValueChange={(value) => setFilters({ ...filters, make: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Make" />
                      </SelectTrigger>
                      <SelectContent>
                        {makes.map((make) =>
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input
                      placeholder="Enter model name"
                      value={filters.model}
                      onChange={(e) => setFilters({ ...filters, model: e.target.value })} />

                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Sold">Sold</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Year Range */}
              <div>
                <h4 className="font-semibold mb-3">Year Range</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>From Year: {filters.yearFrom}</Label>
                    <Slider
                      value={[filters.yearFrom]}
                      onValueChange={([value]) => setFilters({ ...filters, yearFrom: value })}
                      min={2000}
                      max={2024}
                      step={1}
                      className="w-full" />

                  </div>
                  <div className="space-y-2">
                    <Label>To Year: {filters.yearTo}</Label>
                    <Slider
                      value={[filters.yearTo]}
                      onValueChange={([value]) => setFilters({ ...filters, yearTo: value })}
                      min={2000}
                      max={2024}
                      step={1}
                      className="w-full" />

                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Min Price: {formatCurrency(filters.priceFrom)}</Label>
                    <Slider
                      value={[filters.priceFrom]}
                      onValueChange={([value]) => setFilters({ ...filters, priceFrom: value })}
                      min={5000000}
                      max={200000000}
                      step={1000000}
                      className="w-full" />

                  </div>
                  <div className="space-y-2">
                    <Label>Max Price: {formatCurrency(filters.priceTo)}</Label>
                    <Slider
                      value={[filters.priceTo]}
                      onValueChange={([value]) => setFilters({ ...filters, priceTo: value })}
                      min={5000000}
                      max={200000000}
                      step={1000000}
                      className="w-full" />

                  </div>
                </div>
              </div>

              {/* Mileage Range */}
              <div>
                <h4 className="font-semibold mb-3">Mileage Range (km)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Min Mileage: {filters.mileageFrom.toLocaleString()}</Label>
                    <Slider
                      value={[filters.mileageFrom]}
                      onValueChange={([value]) => setFilters({ ...filters, mileageFrom: value })}
                      min={0}
                      max={300000}
                      step={5000}
                      className="w-full" />

                  </div>
                  <div className="space-y-2">
                    <Label>Max Mileage: {filters.mileageTo.toLocaleString()}</Label>
                    <Slider
                      value={[filters.mileageTo]}
                      onValueChange={([value]) => setFilters({ ...filters, mileageTo: value })}
                      min={0}
                      max={300000}
                      step={5000}
                      className="w-full" />

                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div>
                <h4 className="font-semibold mb-3">Vehicle Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Fuel Type</Label>
                    <Select value={filters.fuelType} onValueChange={(value) => setFilters({ ...filters, fuelType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Fuel Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map((fuel) =>
                        <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Transmission</Label>
                    <Select value={filters.transmission} onValueChange={(value) => setFilters({ ...filters, transmission: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissions.map((trans) =>
                        <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Color</Label>
                    <Select value={filters.color} onValueChange={(value) => setFilters({ ...filters, color: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) =>
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) =>
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Engine Size */}
              <div>
                <h4 className="font-semibold mb-3">Engine Size (L)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Min Engine: {filters.engineSizeFrom}L</Label>
                    <Slider
                      value={[filters.engineSizeFrom]}
                      onValueChange={([value]) => setFilters({ ...filters, engineSizeFrom: value })}
                      min={1.0}
                      max={5.0}
                      step={0.1}
                      className="w-full" />

                  </div>
                  <div className="space-y-2">
                    <Label>Max Engine: {filters.engineSizeTo}L</Label>
                    <Slider
                      value={[filters.engineSizeTo]}
                      onValueChange={([value]) => setFilters({ ...filters, engineSizeTo: value })}
                      min={1.0}
                      max={5.0}
                      step={0.1}
                      className="w-full" />

                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold mb-3">Features</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {allFeatures.map((feature) =>
                  <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                      id={feature}
                      checked={filters.features.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature)} />

                      <Label htmlFor={feature} className="text-sm">
                        {feature}
                      </Label>
                    </div>
                  )}
                </div>
                {filters.features.length > 0 &&
                <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Selected features:</p>
                    <div className="flex flex-wrap gap-1">
                      {filters.features.map((feature) =>
                    <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                          <button
                        onClick={() => toggleFeature(feature)}
                        className="ml-1 hover:text-red-500">

                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                    )}
                    </div>
                  </div>
                }
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleAdvancedSearch}
                  disabled={isSearching}
                  className="flex-1">

                  <Filter className="h-4 w-4 mr-2" />
                  Search Cars ({mockCars.filter((car) => {
                    return (
                      (!filters.make || car.make === filters.make) && (
                      !filters.model || car.model.toLowerCase().includes(filters.model.toLowerCase())) &&
                      car.year >= filters.yearFrom && car.year <= filters.yearTo &&
                      car.price >= filters.priceFrom && car.price <= filters.priceTo &&
                      car.mileage >= filters.mileageFrom && car.mileage <= filters.mileageTo && (
                      !filters.fuelType || car.fuelType === filters.fuelType) && (
                      !filters.transmission || car.transmission === filters.transmission) && (
                      !filters.color || car.color === filters.color) && (
                      !filters.location || car.location === filters.location) &&
                      car.engineSize >= filters.engineSizeFrom && car.engineSize <= filters.engineSizeTo && (
                      filters.features.length === 0 || filters.features.every((feature) =>
                      car.features.includes(feature))) && (
                      !filters.status || car.status === filters.status));

                  }).length} results)
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Search Results Preview */}
      {showResults && searchResults.length > 0 &&
      <Card>
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length} cars found)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.slice(0, 6).map((car) =>
            <div key={car.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-32 object-cover rounded mb-2" />

                  <h4 className="font-semibold">{car.year} {car.make} {car.model}</h4>
                  <p className="text-blue-600 font-bold">{formatCurrency(car.price)}</p>
                  <p className="text-sm text-gray-600">{car.mileage.toLocaleString()} km • {car.fuelType}</p>
                </div>
            )}
            </div>
            {searchResults.length > 6 &&
          <div className="text-center mt-4">
                <Button variant="outline" onClick={() => navigate('/cars')}>
                  View All {searchResults.length} Results
                </Button>
              </div>
          }
          </CardContent>
        </Card>
      }
    </div>);

};

export default EnhancedSearch;