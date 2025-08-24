import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Car } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: string;
}

const LoadingSpinner = () =>
<div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
          <Car className="h-8 w-8 text-white animate-pulse" />
        </div>
        <div className="space-y-2 text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </CardContent>
    </Card>
  </div>;


const ProtectedRoute = ({ children, requiredPermission }: ProtectedRouteProps) => {
  const { user, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    // User doesn't have required permission
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
              <Car className="h-8 w-8 text-red-600" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Access Denied</h2>
              <p className="text-gray-600">
                You don't have permission to access this resource.
              </p>
              <p className="text-sm text-gray-500">
                Required permission: <code className="bg-gray-100 px-2 py-1 rounded">{requiredPermission}</code>
              </p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline">

              ← Go back
            </button>
          </CardContent>
        </Card>
      </div>);

  }

  return <>{children}</>;
};

export default ProtectedRoute;