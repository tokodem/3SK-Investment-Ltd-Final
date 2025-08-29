import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, UserPlus, Car, CheckCircle, Users } from 'lucide-react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer' as 'customer',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };



  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your full name',
        variant: 'destructive'
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        variant: 'destructive'
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters long',
        variant: 'destructive'
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await signup(formData);

      if (result.success) {
        toast({
          title: 'Account Created!',
          description: 'Welcome to 3SK Investment! Redirecting to dashboard...'
        });

        // Small delay for better UX
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast({
          title: 'Signup Failed',
          description: result.error || 'Failed to create account',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 2, label: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 12) return { strength: 3, label: 'Good', color: 'bg-blue-500' };
    return { strength: 4, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Brand */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Car className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">3SK Investment</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Join 3SK Investment
            </CardTitle>
            <CardDescription className="text-center">
              Create your customer account to access exclusive car listings, save favorites, and connect with our team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Account Type Display - Customer Only */}
              <div className="space-y-2">
                <Label htmlFor="userType">Account Type</Label>
                <div className="h-11 flex items-center space-x-2 px-3 border border-gray-200 rounded-md bg-gray-50">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">Customer Account</span>
                </div>
                <p className="text-xs text-gray-500">
                  Creating a customer account to browse and purchase vehicles.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-11"
                  autoComplete="name"
                  required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11"
                  autoComplete="email"
                  required />
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-11"
                  autoComplete="tel" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-11 pr-10"
                    autoComplete="new-password"
                    required />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}>

                    {showPassword ?
                    <EyeOff className="h-4 w-4 text-gray-400" /> :

                    <Eye className="h-4 w-4 text-gray-400" />
                    }
                  </Button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password &&
                <div className="space-y-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((level) =>
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full ${
                      passwordStrength.strength >= level ?
                      passwordStrength.color :
                      'bg-gray-200'}`
                      } />

                    )}
                    </div>
                    <p className="text-xs text-gray-600">
                      Password strength: <span className="font-medium">{passwordStrength.label}</span>
                    </p>
                  </div>
                }
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="h-11 pr-10"
                    autoComplete="new-password"
                    required />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}>

                    {showConfirmPassword ?
                    <EyeOff className="h-4 w-4 text-gray-400" /> :

                    <Eye className="h-4 w-4 text-gray-400" />
                    }
                  </Button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword &&
                <div className="flex items-center space-x-2">
                    {formData.password === formData.confirmPassword ?
                  <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <p className="text-xs text-green-600">Passwords match</p>
                      </> :

                  <>
                        <div className="h-4 w-4 rounded-full border-2 border-red-300" />
                        <p className="text-xs text-red-600">Passwords don't match</p>
                      </>
                  }
                  </div>
                }
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                disabled={isSubmitting}>

                {isSubmitting ?
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div> :

                <div className="flex items-center space-x-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Create account</span>
                  </div>
                }
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <div className="text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline">

                  Sign in here
                </Link>
              </div>
              
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-700 mb-1">💼 Looking to join our team?</p>
                <p>Team member accounts are created by our administrators. Contact your manager or HR department for access.</p>
              </div>
              
              <div className="text-sm">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-700 font-medium hover:underline">

                  ← Back to website
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default SignupForm;