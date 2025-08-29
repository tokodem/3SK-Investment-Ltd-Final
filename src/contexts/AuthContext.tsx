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
    priceRange: { min: number; max: number };
  };
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'customer';
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  isCustomer: () => boolean;
  isEmployee: () => boolean;
  isAdmin: () => boolean;
  getRedirectPath: () => string;
}

const API_BASE = "http://localhost/3sk/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('3sk_auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        fetch(`${API_BASE}/get_user.php?email=${authData.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setUser(data.user);
            } else {
              localStorage.removeItem('3sk_auth');
            }
          })
          .catch(() => {
            localStorage.removeItem('3sk_auth');
          });
      } catch {
        localStorage.removeItem('3sk_auth');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setIsLoading(false);

      if (!data.success) return { success: false, error: data.error };

      setUser(data.user);
      localStorage.setItem("3sk_auth", JSON.stringify({ email, timestamp: Date.now() }));

      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      setIsLoading(false);
      return { success: false, error: "Server error. Please try again later." };
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/signup.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setIsLoading(false);

      if (!data.success) return { success: false, error: data.error };

      setUser(data.user);
      localStorage.setItem("3sk_auth", JSON.stringify({ email: userData.email, timestamp: Date.now() }));

      return { success: true };
    } catch (err) {
      console.error("Signup error:", err);
      setIsLoading(false);
      return { success: false, error: "Server error. Please try again later." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('3sk_auth');
  };

  const hasPermission = (permission: string) =>
    user?.permissions?.includes(permission) ?? false;

  const isCustomer = () => user?.userType === 'customer';
  const isEmployee = () => user?.userType === 'employee';
  const isAdmin = () => user?.userType === 'admin';

  const getRedirectPath = () => {
    if (!user) return '/login';
    if (user.userType === 'customer') return '/';
    if (user.userType === 'admin' || user.userType === 'employee') return '/admin';
    return '/';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoading,
        hasPermission,
        isCustomer,
        isEmployee,
        isAdmin,
        getRedirectPath
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;
