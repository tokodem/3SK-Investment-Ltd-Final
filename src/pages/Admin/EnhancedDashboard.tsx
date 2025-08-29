import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockCars, mockInquiries, mockDashboardStats, mockBlogPosts } from '@/data/mockData';
import UserManagement from '@/components/admin/UserManagement';
import RealTimeAnalytics from '@/components/admin/RealTimeAnalytics';
import BlogManagement from '@/components/admin/BlogManagement';
import {
  Car,
  Users,
  MessageSquare,
  FileText,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Calendar,
  DollarSign,
  Activity,
  Bell,
  Settings,
  UserPlus,
  Shield,
  Key,
  Upload,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  X,
  LogOut,
  RefreshCw } from
'lucide-react';

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddCarOpen, setIsAddCarOpen] = useState(false);
  const [isEditCarOpen, setIsEditCarOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState(mockCars);
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const { user, logout, hasPermission } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [newCar, setNewCar] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    engineSize: '',
    color: '',
    location: '',
    description: '',
    features: '',
    status: 'Available',
    images: []
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Editor',
    password: '',
    confirmPassword: ''
  });

  const [siteSettings, setSiteSettings] = useState({
    siteName: '3SK Investment Company Ltd.',
    email: '3skinvestltd@gmail.com',
    phone: '+256-704-235914',
    address: 'Banda Bond No. W0474 Plot 4, Jinja Road, Kampala',
    description: 'Leading importers and exporters of Japanese vehicles in Uganda',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    whatsappNumber: '+256704235914'
  });

  const stats = mockDashboardStats;
  const recentCars = cars.slice(0, 5);
  const recentInquiries = inquiries.slice(0, 5);

  const formatCurrency = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500';
      case 'Sold':
        return 'bg-red-500';
      case 'Pending':
        return 'bg-yellow-500';
      case 'New':
        return 'bg-blue-500';
      case 'Contacted':
        return 'bg-orange-500';
      case 'Closed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out'
    });
  };

  const handleRefreshData = () => {
    setLastRefresh(new Date());
    toast({
      title: 'Data refreshed',
      description: 'Dashboard data has been updated'
    });
  };

  const handleAddCar = () => {
    if (!newCar.make || !newCar.model || !newCar.year || !newCar.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const car = {
      id: Date.now().toString(),
      ...newCar,
      year: parseInt(newCar.year),
      price: parseInt(newCar.price),
      mileage: parseInt(newCar.mileage),
      engineSize: parseFloat(newCar.engineSize),
      images: newCar.images.length > 0 ? newCar.images : ['/placeholder.svg'],
      createdAt: new Date().toISOString(),
      features: newCar.features.split(',').map((f) => f.trim())
    };

    setCars([...cars, car]);
    setNewCar({
      make: '', model: '', year: '', price: '', mileage: '', fuelType: '',
      transmission: '', engineSize: '', color: '', location: '', description: '',
      features: '', status: 'Available', images: []
    });
    setIsAddCarOpen(false);

    toast({
      title: "Success",
      description: "Car added successfully!"
    });
  };

  const handleDeleteInquiry = (inquiryId) => {
    setInquiries(inquiries.filter((inquiry) => inquiry.id !== inquiryId));
    toast({
      title: "Success",
      description: "Inquiry deleted successfully!"
    });
  };

  const handleUpdateInquiryStatus = (inquiryId, newStatus) => {
    setInquiries(inquiries.map((inquiry) =>
    inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
    ));
    toast({
      title: "Success",
      description: "Inquiry status updated successfully!"
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Success",
      description: "Settings saved successfully!"
    });
    setIsSettingsOpen(false);
  };

  // Real-time data simulation
  const getRealtimeData = () => {
    return {
      activeUsers: Math.floor(Math.random() * 50) + 25,
      todayInquiries: Math.floor(Math.random() * 15) + 8,
      pageViews: Math.floor(Math.random() * 1000) + 2500,
      onlineVisitors: Math.floor(Math.random() * 20) + 10
    };
  };

  const realtimeData = getRealtimeData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm">
                Welcome back, {user?.name} • {user?.role}
              </p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-300">
              Online • {realtimeData.activeUsers} users
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right text-sm text-gray-500">
              <p>Last updated: {lastRefresh.toLocaleTimeString()}</p>
            </div>
            
            <Button variant="outline" size="sm" onClick={handleRefreshData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            
            <Button asChild>
              <Link to="/">
                View Website
              </Link>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="cars" className="text-xs md:text-sm">Cars</TabsTrigger>
            <TabsTrigger value="inquiries" className="text-xs md:text-sm">Inquiries</TabsTrigger>
            <TabsTrigger value="blog" className="text-xs md:text-sm">Blog</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs md:text-sm">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs md:text-sm">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Real-time Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cars.length}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Inquiries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{realtimeData.todayInquiries}</div>
                  <p className="text-xs text-muted-foreground">
                    Real-time updates
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Page Views Today</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{realtimeData.pageViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8% from yesterday
                    </span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Online Visitors</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    {realtimeData.onlineVisitors}
                    <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Live visitors
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentActivity.map((activity) =>
                    <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-gray-500">
                            {formatDate(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Revenue</span>
                      <span className="text-lg font-bold">{formatCurrency(125000000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Car Price</span>
                      <span className="text-lg font-bold">{formatCurrency(30000000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Conversion Rate</span>
                      <span className="text-lg font-bold">23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Blog Posts</span>
                      <span className="text-lg font-bold">{blogPosts.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Cars */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Cars</CardTitle>
                {hasPermission('manage_cars') &&
                <Button onClick={() => setIsAddCarOpen(true)} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Car
                  </Button>
                }
              </CardHeader>
              <CardContent>
                {/* Recent cars table/list implementation */}
                <div className="text-center text-gray-500 py-8">
                  <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Recent cars will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cars Tab */}
          <TabsContent value="cars" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Car Management</CardTitle>
                {hasPermission('manage_cars') &&
                <Button onClick={() => setIsAddCarOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Car
                  </Button>
                }
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Car management features available here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inquiries Tab - Enhanced Real-time */}
          <TabsContent value="inquiries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Customer Inquiries</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Real-time
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Car</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inquiry) =>
                    <TableRow key={inquiry.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{inquiry.name}</p>
                            <p className="text-sm text-gray-500">{inquiry.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm line-clamp-2">{inquiry.message}</p>
                        </TableCell>
                        <TableCell>
                          {inquiry.carId ?
                        <span className="text-sm">
                              {cars.find((c) => c.id === inquiry.carId)?.make} 
                              {cars.find((c) => c.id === inquiry.carId)?.model}
                            </span> :

                        <span className="text-gray-500">General</span>
                        }
                        </TableCell>
                        <TableCell>
                          <Select
                          value={inquiry.status}
                          onValueChange={(value) => handleUpdateInquiryStatus(inquiry.id, value)}>

                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New">New</SelectItem>
                              <SelectItem value="Contacted">Contacted</SelectItem>
                              <SelectItem value="Closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" asChild>
                              <a href={`mailto:${inquiry.email}`}>
                                Reply
                              </a>
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDeleteInquiry(inquiry.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab - Use Enhanced Component */}
          <TabsContent value="blog" className="space-y-6">
            <BlogManagement />
          </TabsContent>

          {/* Analytics Tab - Use Real-time Component */}
          <TabsContent value="analytics" className="space-y-6">
            <RealTimeAnalytics />
          </TabsContent>

          {/* Settings Tab - Enhanced */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Website Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline" onClick={() => setIsSettingsOpen(true)}>
                    Edit Site Information
                  </Button>
                  <Button className="w-full" variant="outline">
                    SEO Settings
                  </Button>
                  <Button className="w-full" variant="outline">
                    Social Media Links
                  </Button>
                </CardContent>
              </Card>
              
              {/* User Management Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hasPermission('manage_users') ?
                  <>
                      <Button className="w-full" variant="outline" onClick={() => setIsAddUserOpen(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Admin User
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Manage Permissions
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Key className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </> :

                  <div className="text-center text-gray-500 py-4">
                      <p className="text-sm">No permission to manage users</p>
                    </div>
                  }
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Communication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    Email Templates
                  </Button>
                  <Button className="w-full" variant="outline">
                    Notification Settings
                  </Button>
                  <Button className="w-full" variant="outline">
                    Backup Data
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced User Management Section */}
            {hasPermission('manage_users') &&
            <UserManagement />
            }
          </TabsContent>
        </Tabs>
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Site Settings</DialogTitle>
            <DialogDescription>
              Update your website information and contact details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  value={siteSettings.siteName}
                  onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })} />

              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })} />

              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  value={siteSettings.phone}
                  onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })} />

              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp</Label>
                <Input
                  value={siteSettings.whatsappNumber}
                  onChange={(e) => setSiteSettings({ ...siteSettings, whatsappNumber: e.target.value })} />

              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                value={siteSettings.address}
                onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                rows={2} />

            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={siteSettings.description}
                onChange={(e) => setSiteSettings({ ...siteSettings, description: e.target.value })}
                rows={3} />

            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input
                  value={siteSettings.facebookUrl}
                  onChange={(e) => setSiteSettings({ ...siteSettings, facebookUrl: e.target.value })}
                  placeholder="https://facebook.com/yourpage" />

              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterUrl">Twitter URL</Label>
                <Input
                  value={siteSettings.twitterUrl}
                  onChange={(e) => setSiteSettings({ ...siteSettings, twitterUrl: e.target.value })}
                  placeholder="https://twitter.com/yourhandle" />

              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram URL</Label>
                <Input
                  value={siteSettings.instagramUrl}
                  onChange={(e) => setSiteSettings({ ...siteSettings, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/yourhandle" />

              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);

};

export default EnhancedDashboard;