import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import CarListings from "./pages/CarListings";
import CarDetails from "./pages/CarDetails";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/Admin/Dashboard";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<CarListings />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            
            {/* User Routes */}
            <Route path="/profile" element={
          <ProtectedRoute requiredPermission="view_profile">
                <Profile />
              </ProtectedRoute>
          } />
            <Route path="/favorites" element={
          <ProtectedRoute requiredPermission="save_favorites">
                <Favorites />
              </ProtectedRoute>
          } />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
          <ProtectedRoute requiredPermission="view_analytics">
                <AdminDashboard />
              </ProtectedRoute>
          } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>;

export default App;