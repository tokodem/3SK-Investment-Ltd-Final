import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Car, LogOut, User, Settings, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isCustomer, isEmployee, isAdmin } = useAuth();

  const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Cars', path: '/cars' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }];


  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const getUserMenuItems = () => {
    if (!user) return [];

    const baseItems = [
    { name: 'Profile', path: '/profile', icon: User }];


    if (isCustomer()) {
      return [
      ...baseItems,
      { name: 'Favorites', path: '/favorites', icon: Heart }];

    }

    if (isEmployee() || isAdmin()) {
      return [
      ...baseItems,
      { name: 'Dashboard', path: '/admin', icon: Settings }];

    }

    return baseItems;
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">3SK Investment</h1>
              <p className="text-xs text-gray-600">Japanese Vehicle Specialists</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) =>
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              isActivePath(item.path) ?
              'text-blue-600 border-b-2 border-blue-600 pb-1' :
              'text-gray-700'}`
              }>

                {item.name}
              </Link>
            )}
            <div className="flex items-center space-x-4">
              {user ?
              <>
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  {getUserMenuItems().map((item) =>
                <Button key={item.name} asChild variant="ghost" size="sm">
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Link>
                    </Button>
                )}
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </> :

              <>
                  <Button asChild variant="outline">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </>
              }
            </div>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) =>
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-blue-600 py-2 ${
                  isActivePath(item.path) ? 'text-blue-600' : 'text-gray-700'}`
                  }>

                    {item.name}
                  </Link>
                )}
                <div className="space-y-2 mt-4">
                  {user ?
                  <>
                      <div className="text-sm text-gray-600 py-2 border-b">
                        Welcome, {user.name}
                      </div>
                      {getUserMenuItems().map((item) =>
                    <Button key={item.name} asChild variant="ghost" className="w-full justify-start">
                          <Link to={item.path} onClick={() => setIsOpen(false)}>
                            <item.icon className="h-4 w-4 mr-2" />
                            {item.name}
                          </Link>
                        </Button>
                    )}
                      <Button variant="outline" className="w-full" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </> :

                  <>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </>
                  }
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>);

};

export default Navigation;