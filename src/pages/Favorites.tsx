import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { mockCars } from '@/data/mockData';
import { Car } from '@/types';
import { Heart, Eye, Calendar, Fuel, Users, Settings, Trash2 } from 'lucide-react';

const Favorites = () => {
  const { user, isCustomer } = useAuth();
  const [favoriteCarIds, setFavoriteCarIds] = useState<string[]>(
    user?.preferences?.favoriteCarIds || ['1', '3'] // Mock some favorites
  );

  const favoriteCars = mockCars.filter((car) => favoriteCarIds.includes(car.id));

  const removeFavorite = (carId: string) => {
    setFavoriteCarIds((prev) => prev.filter((id) => id !== carId));
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new':return 'bg-green-100 text-green-800';
      case 'used':return 'bg-blue-100 text-blue-800';
      case 'certified':return 'bg-purple-100 text-purple-800';
      default:return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user || !isCustomer()) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <p>Please sign in as a customer to view your favorites.</p>
              <Button asChild className="mt-4">
                <Link to="/login">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>);

  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <span>My Favorite Cars</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Keep track of the cars you're interested in
            </p>
          </div>

          {favoriteCars.length === 0 ?
          <Card className="max-w-md mx-auto">
              <CardContent className="text-center py-8">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start browsing our inventory to add cars to your favorites list.
                </p>
                <Button asChild>
                  <Link to="/cars">Browse Cars</Link>
                </Button>
              </CardContent>
            </Card> :

          <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  {favoriteCars.length} car{favoriteCars.length !== 1 ? 's' : ''} saved
                </p>
                <Button asChild variant="outline">
                  <Link to="/cars">Browse More Cars</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCars.map((car) =>
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                    src={car.images[0]}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-48 object-cover" />

                      <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => removeFavorite(car.id)}>

                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Badge
                    className={`absolute top-2 left-2 ${getConditionColor(car.condition)}`}>

                        {car.condition}
                      </Badge>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        {car.year} {car.make} {car.model}
                      </CardTitle>
                      <CardDescription className="text-xl font-bold text-green-600">
                        ${car.price.toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{car.mileage.toLocaleString()} mi</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Fuel className="h-4 w-4" />
                          <span>{car.fuelType}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Settings className="h-4 w-4" />
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{car.seats} seats</span>
                        </div>
                      </div>
                      
                      {car.features && car.features.length > 0 &&
                  <div className="flex flex-wrap gap-1">
                          {car.features.slice(0, 2).map((feature) =>
                    <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                    )}
                          {car.features.length > 2 &&
                    <Badge variant="secondary" className="text-xs">
                              +{car.features.length - 2} more
                            </Badge>
                    }
                        </div>
                  }
                      
                      <div className="flex space-x-2 pt-2">
                        <Button asChild size="sm" className="flex-1">
                          <Link to={`/cars/${car.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Link>
                        </Button>
                        <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFavorite(car.id)}>

                          <Heart className="h-4 w-4 fill-current text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
              )}
              </div>
            </>
          }
        </div>
      </div>

      <Footer />
    </div>);

};

export default Favorites;