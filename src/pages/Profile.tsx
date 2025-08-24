import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Car, Heart, Settings, Shield } from 'lucide-react';

const Profile = () => {
  const { user, isCustomer, isEmployee, isAdmin } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleSave = () => {
    // In a real app, this would make an API call
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.'
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setIsEditing(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Customer':return 'bg-green-100 text-green-800';
      case 'Admin':return 'bg-red-100 text-red-800';
      case 'Manager':return 'bg-blue-100 text-blue-800';
      case 'Sales':return 'bg-purple-100 text-purple-800';
      case 'Support':return 'bg-orange-100 text-orange-800';
      default:return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <p>Please sign in to view your profile.</p>
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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription>
                    Update your account details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover" />

                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {isEditing ?
                  <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSave}>Save Changes</Button>
                        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                      </div>
                    </div> :

                  <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                      {user.phone &&
                    <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{user.phone}</span>
                        </div>
                    }
                      <Button onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    </div>
                  }
                </CardContent>
              </Card>
            </div>

            {/* Account Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Account Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Account Type</p>
                    <p className="font-semibold capitalize">{user.userType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Permissions</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.permissions.slice(0, 3).map((permission) =>
                      <Badge key={permission} variant="secondary" className="text-xs">
                          {permission.replace('_', ' ')}
                        </Badge>
                      )}
                      {user.permissions.length > 3 &&
                      <Badge variant="secondary" className="text-xs">
                          +{user.permissions.length - 3} more
                        </Badge>
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>

              {isCustomer() &&
              <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Car className="h-5 w-5" />
                      <span>Car Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {user.preferences?.interestedBrands && user.preferences.interestedBrands.length > 0 ?
                  <div>
                        <p className="text-sm text-gray-600">Interested Brands</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.preferences.interestedBrands.map((brand) =>
                      <Badge key={brand} variant="outline" className="text-xs">
                              {brand}
                            </Badge>
                      )}
                        </div>
                      </div> :

                  <p className="text-sm text-gray-500">No preferences set</p>
                  }
                    
                    {user.preferences?.priceRange &&
                  <div>
                        <p className="text-sm text-gray-600">Price Range</p>
                        <p className="font-semibold">
                          ${user.preferences.priceRange.min.toLocaleString()} - ${user.preferences.priceRange.max.toLocaleString()}
                        </p>
                      </div>
                  }
                  </CardContent>
                </Card>
              }
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>);

};

export default Profile;