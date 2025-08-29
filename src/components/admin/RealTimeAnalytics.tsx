import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp, TrendingDown, Users, Car, Eye, MessageSquare,
  DollarSign, Clock, Calendar, BarChart3, PieChart, Activity,
  RefreshCw, Download } from
'lucide-react';

interface AnalyticsData {
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  inquiries: number;
  carViews: number;
  revenue: number;
  conversionRate: number;
  avgSessionDuration: string;
  bounceRate: number;
  topPages: {page: string;views: number;percentage: number;}[];
  recentActivity: {action: string;timestamp: string;details: string;}[];
  salesData: {month: string;sales: number;revenue: number;}[];
  trafficSources: {source: string;visits: number;percentage: number;}[];
}

const RealTimeAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const fetchAnalytics = () => {
      setIsLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        const mockData: AnalyticsData = {
          totalVisitors: Math.floor(Math.random() * 1000) + 2500,
          uniqueVisitors: Math.floor(Math.random() * 800) + 1800,
          pageViews: Math.floor(Math.random() * 5000) + 8000,
          inquiries: Math.floor(Math.random() * 50) + 120,
          carViews: Math.floor(Math.random() * 300) + 450,
          revenue: Math.floor(Math.random() * 50000000) + 125000000,
          conversionRate: parseFloat((Math.random() * 5 + 20).toFixed(1)),
          avgSessionDuration: `${Math.floor(Math.random() * 3 + 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          bounceRate: parseFloat((Math.random() * 20 + 30).toFixed(1)),
          topPages: [
          { page: '/cars', views: Math.floor(Math.random() * 1000) + 2000, percentage: 35.2 },
          { page: '/', views: Math.floor(Math.random() * 800) + 1500, percentage: 28.8 },
          { page: '/about', views: Math.floor(Math.random() * 500) + 800, percentage: 15.4 },
          { page: '/contact', views: Math.floor(Math.random() * 400) + 600, percentage: 12.1 },
          { page: '/blog', views: Math.floor(Math.random() * 300) + 450, percentage: 8.5 }],

          recentActivity: [
          { action: 'New inquiry received', timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(), details: 'Honda Civic 2022' },
          { action: 'Car listing viewed', timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(), details: 'Toyota Camry 2021' },
          { action: 'New user registered', timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(), details: 'john.doe@email.com' },
          { action: 'Blog post published', timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(), details: 'Car Maintenance Tips' },
          { action: 'Contact form submitted', timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(), details: 'General inquiry' }],

          salesData: [
          { month: 'Jan', sales: 12, revenue: 45000000 },
          { month: 'Feb', sales: 15, revenue: 52000000 },
          { month: 'Mar', sales: 18, revenue: 61000000 },
          { month: 'Apr', sales: 14, revenue: 48000000 },
          { month: 'May', sales: 20, revenue: 72000000 },
          { month: 'Jun', sales: 16, revenue: 55000000 }],

          trafficSources: [
          { source: 'Direct', visits: Math.floor(Math.random() * 800) + 1200, percentage: 42.3 },
          { source: 'Google', visits: Math.floor(Math.random() * 600) + 900, percentage: 31.8 },
          { source: 'Facebook', visits: Math.floor(Math.random() * 300) + 400, percentage: 15.2 },
          { source: 'Instagram', visits: Math.floor(Math.random() * 200) + 250, percentage: 7.4 },
          { source: 'Other', visits: Math.floor(Math.random() * 100) + 150, percentage: 3.3 }]

        };

        setAnalyticsData(mockData);
        setLastUpdated(new Date());
        setIsLoading(false);
      }, 1000);
    };

    fetchAnalytics();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);

    return () => clearInterval(interval);
  }, [timeRange]);

  const formatCurrency = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const StatCard = ({
    title,
    value,
    change,
    changeType,
    icon: Icon,
    suffix = ''







  }: {title: string;value: string | number;change: string;changeType: 'positive' | 'negative';icon: any;suffix?: string;}) =>
  <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">
            {typeof value === 'number' && title.includes('Revenue') ?
          formatCurrency(value) :
          `${value}${suffix}`
          }
          </div>
          <div className={`flex items-center text-xs ${
        changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`
        }>
            {changeType === 'positive' ?
          <TrendingUp className="h-3 w-3 mr-1" /> :

          <TrendingDown className="h-3 w-3 mr-1" />
          }
            {change} from last {timeRange === '24h' ? 'day' : timeRange === '7d' ? 'week' : 'month'}
          </div>
        </div>
      </CardContent>
    </Card>;


  if (!analyticsData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <span className="text-sm text-gray-600">Loading analytics...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) =>
          <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-8 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>);

  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span>Real-Time Analytics</span>
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            disabled={isLoading}>

            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Visitors"
          value={analyticsData.totalVisitors}
          change="+12%"
          changeType="positive"
          icon={Users} />

        <StatCard
          title="Car Views"
          value={analyticsData.carViews}
          change="+8%"
          changeType="positive"
          icon={Eye} />

        <StatCard
          title="Inquiries"
          value={analyticsData.inquiries}
          change="+23%"
          changeType="positive"
          icon={MessageSquare} />

        <StatCard
          title="Revenue"
          value={analyticsData.revenue}
          change="+15%"
          changeType="positive"
          icon={DollarSign} />

      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Conversion Rate"
          value={analyticsData.conversionRate}
          change="+2.1%"
          changeType="positive"
          icon={TrendingUp}
          suffix="%" />

        <StatCard
          title="Avg. Session"
          value={analyticsData.avgSessionDuration}
          change="+5%"
          changeType="positive"
          icon={Clock} />

        <StatCard
          title="Bounce Rate"
          value={analyticsData.bounceRate}
          change="-3.2%"
          changeType="positive"
          icon={Activity}
          suffix="%" />

        <StatCard
          title="Page Views"
          value={analyticsData.pageViews}
          change="+18%"
          changeType="positive"
          icon={Eye} />

      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Top Pages</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topPages.map((page, index) =>
                  <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{page.page}</p>
                        <div className="mt-1 bg-gray-200 rounded-full h-2">
                          <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${page.percentage}%` }} />

                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-medium">{page.views.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{page.percentage}%</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Traffic Sources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.trafficSources.map((source, index) =>
                  <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{source.source}</p>
                        <div className="mt-1 bg-gray-200 rounded-full h-2">
                          <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${source.percentage}%` }} />

                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-medium">{source.visits.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{source.percentage}%</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <p>Traffic Chart</p>
                  <p className="text-sm">Interactive traffic analytics visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.salesData.map((data, index) =>
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      <span className="font-medium">{data.month}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{data.sales} cars sold</p>
                      <p className="text-sm text-gray-500">{formatCurrency(data.revenue)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activity</span>
                <Badge variant="secondary" className="ml-auto">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.recentActivity.map((activity, index) =>
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                    </div>
                    <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);

};

export default RealTimeAnalytics;