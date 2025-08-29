import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { mockCars } from '@/data/mockData';
import { Car } from '@/types';
import {
  Scale,
  X,
  Calendar,
  Fuel,
  Settings,
  MapPin,
  DollarSign,
  ArrowRight,
  CheckCircle,
  XCircle } from
'lucide-react';
import { Link } from 'react-router-dom';

interface CarComparisonProps {
  initialCars?: Car[];
}

const CarComparison = ({ initialCars = [] }: CarComparisonProps) => {
  const [selectedCars, setSelectedCars] = useState<Car[]>(initialCars);
  const [isOpen, setIsOpen] = useState(false);

  const availableCars = mockCars.filter((car) =>
  car.status === 'Available' && !selectedCars.find((selected) => selected.id === car.id)
  );

  const addCarToComparison = (car: Car) => {
    if (selectedCars.length < 3) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const removeCarFromComparison = (carId: string) => {
    setSelectedCars(selectedCars.filter((car) => car.id !== carId));
  };

  const clearComparison = () => {
    setSelectedCars([]);
  };

  const formatCurrency = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const ComparisonRow = ({ label, values, type = 'text'



  }: {label: string;values: (string | number | boolean)[];type?: 'text' | 'currency' | 'boolean' | 'number';}) =>
  <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100">
      <div className="font-medium text-gray-700">{label}</div>
      {values.map((value, index) =>
    <div key={index} className="text-center">
          {type === 'currency' && typeof value === 'number' ? formatCurrency(value) :
      type === 'boolean' ?
      value ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> :
      <XCircle className="h-5 w-5 text-red-500 mx-auto" /> :

      type === 'number' && typeof value === 'number' ? value.toLocaleString() :
      value}
        </div>
    )}
    </div>;


  if (selectedCars.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <Scale className="h-4 w-4" />
            <span>Compare Cars</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Compare Cars</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">Select cars to compare their features and specifications.</p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select First Car:</label>
              <Select onValueChange={(value) => {
                const car = mockCars.find((c) => c.id === value);
                if (car) addCarToComparison(car);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a car..." />
                </SelectTrigger>
                <SelectContent>
                  {mockCars.filter((car) => car.status === 'Available').map((car) =>
                  <SelectItem key={car.id} value={car.id}>
                      {car.year} {car.make} {car.model}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>);

  }

  return (
    <div className="space-y-6">
      {/* Comparison Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Car Comparison</h2>
          <p className="text-gray-600">Compare up to 3 vehicles side by side</p>
        </div>
        <div className="flex items-center space-x-2">
          {selectedCars.length < 3 &&
          <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Scale className="h-4 w-4 mr-2" />
                  Add Car
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Car to Comparison</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <Select onValueChange={(value) => {
                  const car = availableCars.find((c) => c.id === value);
                  if (car) addCarToComparison(car);
                }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a car..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCars.map((car) =>
                    <SelectItem key={car.id} value={car.id}>
                          {car.year} {car.make} {car.model} - {formatCurrency(car.price)}
                        </SelectItem>
                    )}
                    </SelectContent>
                  </Select>
                </div>
              </DialogContent>
            </Dialog>
          }
          <Button variant="outline" onClick={clearComparison}>
            Clear All
          </Button>
        </div>
      </div>

      {/* Car Cards */}
      <div className={`grid grid-cols-1 ${selectedCars.length === 2 ? 'lg:grid-cols-2' : selectedCars.length === 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
        {selectedCars.map((car) =>
        <Card key={car.id} className="relative">
            <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 z-10"
            onClick={() => removeCarFromComparison(car.id)}>

              <X className="h-4 w-4" />
            </Button>
            <CardHeader className="pb-4">
              <div className="relative">
                <img
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover rounded-lg" />

                <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                  {car.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">
                {car.year} {car.make} {car.model}
              </CardTitle>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(car.price)}
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to={`/cars/${car.id}`}>
                  View Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Comparison Table */}
      {selectedCars.length > 1 &&
      <Card>
          <CardHeader>
            <CardTitle>Detailed Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {/* Headers */}
              <div className="grid grid-cols-4 gap-4 py-4 font-semibold border-b-2 border-gray-200">
                <div>Specification</div>
                {selectedCars.map((car, index) =>
              <div key={index} className="text-center">
                    {car.year} {car.make} {car.model}
                  </div>
              )}
                {/* Fill empty columns if less than 3 cars */}
                {Array.from({ length: 3 - selectedCars.length }).map((_, index) =>
              <div key={`empty-${index}`}></div>
              )}
              </div>

              {/* Basic Information */}
              <div className="py-2">
                <h4 className="font-semibold text-gray-800 mb-2">Basic Information</h4>
                <ComparisonRow
                label="Price"
                values={[
                ...selectedCars.map((car) => car.price),
                ...Array(3 - selectedCars.length).fill('-')]
                }
                type="currency" />

                <ComparisonRow
                label="Year"
                values={[
                ...selectedCars.map((car) => car.year),
                ...Array(3 - selectedCars.length).fill('-')]
                } />

                <ComparisonRow
                label="Mileage"
                values={[
                ...selectedCars.map((car) => `${car.mileage.toLocaleString()} km`),
                ...Array(3 - selectedCars.length).fill('-')]
                } />

                <ComparisonRow
                label="Location"
                values={[
                ...selectedCars.map((car) => car.location),
                ...Array(3 - selectedCars.length).fill('-')]
                } />

              </div>

              <Separator />

              {/* Engine & Performance */}
              <div className="py-2">
                <h4 className="font-semibold text-gray-800 mb-2">Engine & Performance</h4>
                <ComparisonRow
                label="Engine Size"
                values={[
                ...selectedCars.map((car) => `${car.engineSize}L`),
                ...Array(3 - selectedCars.length).fill('-')]
                } />

                <ComparisonRow
                label="Fuel Type"
                values={[
                ...selectedCars.map((car) => car.fuelType),
                ...Array(3 - selectedCars.length).fill('-')]
                } />

                <ComparisonRow
                label="Transmission"
                values={[
                ...selectedCars.map((car) => car.transmission),
                ...Array(3 - selectedCars.length).fill('-')]
                } />

              </div>

              <Separator />

              {/* Additional Details */}
              <div className="py-2">
                <h4 className="font-semibold text-gray-800 mb-2">Additional Details</h4>
                <ComparisonRow
                label="Color"
                values={[
                ...selectedCars.map((car) => car.color || '-'),
                ...Array(3 - selectedCars.length).fill('-')]
                } />

                <ComparisonRow
                label="Features Count"
                values={[
                ...selectedCars.map((car) => car.features.length),
                ...Array(3 - selectedCars.length).fill('-')]
                }
                type="number" />

              </div>
            </div>
          </CardContent>
        </Card>
      }

      {/* Features Comparison */}
      {selectedCars.length > 1 &&
      <Card>
          <CardHeader>
            <CardTitle>Features Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedCars.map((car, index) =>
            <div key={car.id}>
                  <h4 className="font-semibold mb-2">{car.year} {car.make} {car.model}</h4>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, featureIndex) =>
                <Badge key={featureIndex} variant="secondary">
                        {feature}
                      </Badge>
                )}
                  </div>
                  {index < selectedCars.length - 1 && <Separator className="mt-4" />}
                </div>
            )}
            </div>
          </CardContent>
        </Card>
      }
    </div>);

};

export default CarComparison;