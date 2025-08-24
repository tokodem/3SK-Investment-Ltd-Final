import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'customer' | 'employee' | 'admin';
  role: 'Customer' | 'Admin' | 'Manager' | 'Editor' | 'Sales' | 'Support';
  permissions: string[];
  avatar?: string;
  phone?: string;
  preferences?: {
    favoriteCarIds: string[];
    interestedBrands: string[];
    priceRange: {min: number;max: number;};
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{success: boolean;error?: string;}>;
  signup: (userData: SignupData) => Promise<{success: boolean;error?: string;}>;
  createTeamMember: (userData: TeamMemberData) => Promise<{success: boolean;error?: string;}>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  isCustomer: () => boolean;
  isEmployee: () => boolean;
  isAdmin: () => boolean;
  getRedirectPath: () => string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'customer';
  phone?: string;
}

interface TeamMemberData {
  name: string;
  email: string;
  password: string;
  userType: 'employee' | 'admin';
  role: 'Manager' | 'Editor' | 'Sales' | 'Support';
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissions = {
  Customer: [
  'view_cars', 'save_favorites', 'make_inquiries', 'view_profile', 'edit_profile'],

  Admin: [
  'manage_users', 'manage_cars', 'manage_blog', 'view_analytics',
  'manage_settings', 'manage_inquiries', 'delete_content', 'manage_employees'],

  Manager: [
  'manage_cars', 'manage_blog', 'view_analytics', 'manage_inquiries', 'view_users'],

  Editor: [
  'manage_blog', 'manage_cars', 'view_inquiries'],

  Sales: [
  'manage_cars', 'manage_inquiries', 'view_customers', 'create_quotes'],

  Support: [
  'view_inquiries', 'respond_inquiries', 'view_customers']

};

// Mock users for demonstration
const mockUsers: User[] = [
// Admin users
{
  id: '1',
  name: 'Admin User',
  email: 'admin@3sk.com',
  userType: 'admin',
  role: 'Admin',
  permissions: rolePermissions.Admin,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
},
// Employee users
{
  id: '2',
  name: 'Manager User',
  email: 'manager@3sk.com',
  userType: 'employee',
  role: 'Manager',
  permissions: rolePermissions.Manager,
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
},
{
  id: '3',
  name: 'Sales Representative',
  email: 'sales@3sk.com',
  userType: 'employee',
  role: 'Sales',
  permissions: rolePermissions.Sales,
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
},
// Customer users
{
  id: '4',
  name: 'John Customer',
  email: 'john@email.com',
  userType: 'customer',
  role: 'Customer',
  permissions: rolePermissions.Customer,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  phone: '+1-555-0123',
  preferences: {
    favoriteCarIds: [],
    interestedBrands: ['Toyota', 'Honda'],
    priceRange: { min: 15000, max: 30000 }
  }
}];



export const AuthProvider = ({ children }: {children: ReactNode;}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth
    const storedAuth = localStorage.getItem('3sk_auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        const foundUser = mockUsers.find((u) => u.email === authData.email);
        if (foundUser) {
          setUser(foundUser);
        }
      } catch (error) {
        console.error('Auth restoration failed:', error);
        localStorage.removeItem('3sk_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find((u) => u.email === email);

    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'User not found' };
    }

    // In a real app, you'd verify the password hash
    // Default password for demo: 'password123'
    if (password !== 'password123') {
      setIsLoading(false);
      return { success: false, error: 'Invalid password' };
    }

    setUser(foundUser);
    localStorage.setItem('3sk_auth', JSON.stringify({ email, timestamp: Date.now() }));
    setIsLoading(false);

    return { success: true };
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (userData.password !== userData.confirmPassword) {
      setIsLoading(false);
      return { success: false, error: 'Passwords do not match' };
    }

    if (mockUsers.find((u) => u.email === userData.email)) {
      setIsLoading(false);
      return { success: false, error: 'Email already registered' };
    }

    // Only allow customer registration through public signup
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      userType: 'customer',
      role: 'Customer',
      permissions: rolePermissions.Customer,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`,
      phone: userData.phone,
      preferences: {
        favoriteCarIds: [],
        interestedBrands: [],
        priceRange: { min: 0, max: 100000 }
      }
    };

    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('3sk_auth', JSON.stringify({ email: userData.email, timestamp: Date.now() }));
    setIsLoading(false);

    return { success: true };
  };

  const createTeamMember = async (userData: TeamMemberData) => {
    setIsLoading(true);

    // Only admins can create team members
    if (!user || !isAdmin()) {
      setIsLoading(false);
      return { success: false, error: 'Unauthorized: Only administrators can create team members' };
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (mockUsers.find((u) => u.email === userData.email)) {
      setIsLoading(false);
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      userType: userData.userType,
      role: userData.role,
      permissions: rolePermissions[userData.role],
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`,
      phone: userData.phone
    };

    mockUsers.push(newUser);
    setIsLoading(false);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('3sk_auth');
  };

  const hasPermission = (permission: string) => {
    return user?.permissions.includes(permission) || false;
  };

  const isCustomer = () => {
    return user?.userType === 'customer';
  };

  const isEmployee = () => {
    return user?.userType === 'employee';
  };

  const isAdmin = () => {
    return user?.userType === 'admin';
  };

  const getRedirectPath = () => {
    if (!user) return '/login';
    if (user.userType === 'customer') return '/';
    if (user.userType === 'admin' || user.userType === 'employee') return '/admin';
    return '/';
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      createTeamMember,
      logout,
      isLoading,
      hasPermission,
      isCustomer,
      isEmployee,
      isAdmin,
      getRedirectPath
    }}>
      {children}
    </AuthContext.Provider>);

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;