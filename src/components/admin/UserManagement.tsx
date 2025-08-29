import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  UserPlus, Shield, Key, Edit, Trash2, Check, X,
  Mail, Phone, Calendar, MoreHorizontal, Eye, EyeOff } from
'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Editor';
  permissions: string[];
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  status: 'Active' | 'Inactive' | 'Suspended';
}

const mockUsers: User[] = [
{
  id: '1',
  name: 'Admin User',
  email: 'admin@3sk.com',
  role: 'Admin',
  permissions: ['manage_users', 'manage_cars', 'manage_blog', 'view_analytics', 'manage_settings'],
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  createdAt: '2024-01-15T10:00:00Z',
  lastLogin: '2024-01-20T14:30:00Z',
  status: 'Active'
},
{
  id: '2',
  name: 'Manager User',
  email: 'manager@3sk.com',
  role: 'Manager',
  permissions: ['manage_cars', 'manage_blog', 'view_analytics'],
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  createdAt: '2024-01-10T09:00:00Z',
  lastLogin: '2024-01-19T16:45:00Z',
  status: 'Active'
},
{
  id: '3',
  name: 'Editor User',
  email: 'editor@3sk.com',
  role: 'Editor',
  permissions: ['manage_blog'],
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  createdAt: '2024-01-05T11:00:00Z',
  lastLogin: '2024-01-18T10:15:00Z',
  status: 'Active'
}];


const availablePermissions = [
{ id: 'manage_users', label: 'Manage Users', description: 'Add, edit, and remove users' },
{ id: 'manage_cars', label: 'Manage Cars', description: 'Add, edit, and remove car listings' },
{ id: 'manage_blog', label: 'Manage Blog', description: 'Create and edit blog posts' },
{ id: 'view_analytics', label: 'View Analytics', description: 'Access analytics and reports' },
{ id: 'manage_settings', label: 'Manage Settings', description: 'Modify system settings' },
{ id: 'manage_inquiries', label: 'Manage Inquiries', description: 'Handle customer inquiries' },
{ id: 'delete_content', label: 'Delete Content', description: 'Remove content permanently' }];


const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Editor' as 'Manager' | 'Editor' | 'Sales' | 'Support',
    phone: ''
  });

  const { user: currentUser, hasPermission, createTeamMember } = useAuth();
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Inactive':
        return 'bg-gray-500';
      case 'Suspended':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Manager':
        return 'bg-blue-100 text-blue-800';
      case 'Editor':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleManagePermissions = (user: User) => {
    setSelectedUser(user);
    setIsPermissionDialogOpen(true);
  };

  const handleChangePassword = (user: User) => {
    setSelectedUser(user);
    setNewPassword('');
    setConfirmPassword('');
    setIsPasswordDialogOpen(true);
  };

  const updateUserPermissions = (userId: string, newPermissions: string[]) => {
    setUsers(users.map((user) =>
    user.id === userId ?
    { ...user, permissions: newPermissions } :
    user
    ));

    toast({
      title: 'Success',
      description: 'User permissions updated successfully'
    });

    setIsPermissionDialogOpen(false);
    setSelectedUser(null);
  };

  const updateUserPassword = () => {
    if (!newPassword || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all password fields',
        variant: 'destructive'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters long',
        variant: 'destructive'
      });
      return;
    }

    // In a real app, this would make an API call
    toast({
      title: 'Success',
      description: 'Password updated successfully'
    });

    setIsPasswordDialogOpen(false);
    setSelectedUser(null);
    setNewPassword('');
    setConfirmPassword('');
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map((user) =>
    user.id === userId ?
    {
      ...user,
      status: user.status === 'Active' ? 'Suspended' : 'Active' as User['status']
    } :
    user
    ));

    const user = users.find((u) => u.id === userId);
    toast({
      title: 'Success',
      description: `User ${user?.status === 'Active' ? 'suspended' : 'activated'} successfully`
    });
  };

  const deleteUser = (userId: string) => {
    if (userId === currentUser?.id) {
      toast({
        title: 'Error',
        description: 'You cannot delete your own account',
        variant: 'destructive'
      });
      return;
    }

    setUsers(users.filter((user) => user.id !== userId));
    toast({
      title: 'Success',
      description: 'User deleted successfully'
    });
  };

  const handleCreateTeamMember = async () => {
    if (!newUserData.name || !newUserData.email || !newUserData.password) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (newUserData.password !== newUserData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    if (newUserData.password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters long',
        variant: 'destructive'
      });
      return;
    }

    try {
      const result = await createTeamMember({
        name: newUserData.name,
        email: newUserData.email,
        password: newUserData.password,
        userType: 'employee',
        role: newUserData.role,
        phone: newUserData.phone
      });

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Team member created successfully'
        });

        // Add the new user to the local state
        const newUser: User = {
          id: Date.now().toString(),
          name: newUserData.name,
          email: newUserData.email,
          role: newUserData.role,
          permissions: availablePermissions.filter((p) => {
            switch (newUserData.role) {
              case 'Manager':
                return ['manage_cars', 'manage_blog', 'view_analytics', 'manage_inquiries', 'view_users'].includes(p.id);
              case 'Editor':
                return ['manage_blog', 'manage_cars', 'view_inquiries'].includes(p.id);
              case 'Sales':
                return ['manage_cars', 'manage_inquiries', 'view_customers', 'create_quotes'].includes(p.id);
              case 'Support':
                return ['view_inquiries', 'respond_inquiries', 'view_customers'].includes(p.id);
              default:
                return false;
            }
          }).map((p) => p.id),
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
          createdAt: new Date().toISOString(),
          status: 'Active'
        };

        setUsers([...users, newUser]);
        setIsCreateUserDialogOpen(false);
        setNewUserData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'Editor',
          phone: ''
        });
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to create team member',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    }
  };

  if (!hasPermission('manage_users')) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">You don't have permission to manage users.</p>
        </CardContent>
      </Card>);

  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>User Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setIsCreateUserDialogOpen(true)}
                className="h-8">

                <UserPlus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
              <Badge variant="secondary">{users.length} users</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mobile View */}
          <div className="block lg:hidden space-y-4">
            {users.map((user) =>
            <div key={user.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Status</p>
                    <Badge className={`${getStatusColor(user.status)} text-white text-xs`}>
                      {user.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Last Login</p>
                    <p className="font-medium text-xs">
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleManagePermissions(user)}>

                    <Shield className="h-3 w-3 mr-1" />
                    Permissions
                  </Button>
                  <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleChangePassword(user)}>

                    <Key className="h-3 w-3 mr-1" />
                    Password
                  </Button>
                  {user.id !== currentUser?.id &&
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteUser(user.id)}>

                      <Trash2 className="h-3 w-3" />
                    </Button>
                }
                </div>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) =>
                <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(user.status)} text-white`}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {user.permissions.slice(0, 2).map((permission) =>
                      <Badge key={permission} variant="outline" className="text-xs">
                            {availablePermissions.find((p) => p.id === permission)?.label}
                          </Badge>
                      )}
                        {user.permissions.length > 2 &&
                      <Badge variant="outline" className="text-xs">
                            +{user.permissions.length - 2} more
                          </Badge>
                      }
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleManagePermissions(user)}>

                          <Shield className="h-3 w-3" />
                        </Button>
                        <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleChangePassword(user)}>

                          <Key className="h-3 w-3" />
                        </Button>
                        <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleUserStatus(user.id)}>

                          {user.status === 'Active' ?
                        <X className="h-3 w-3" /> :

                        <Check className="h-3 w-3" />
                        }
                        </Button>
                        {user.id !== currentUser?.id &&
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteUser(user.id)}>

                            <Trash2 className="h-3 w-3" />
                          </Button>
                      }
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Dialog */}
      <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Permissions</DialogTitle>
            <DialogDescription>
              Update permissions for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {availablePermissions.map((permission) =>
            <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <input
                type="checkbox"
                id={permission.id}
                defaultChecked={selectedUser?.permissions.includes(permission.id)}
                onChange={(e) => {
                  if (!selectedUser) return;
                  const newPermissions = e.target.checked ?
                  [...selectedUser.permissions, permission.id] :
                  selectedUser.permissions.filter((p) => p !== permission.id);
                  setSelectedUser({ ...selectedUser, permissions: newPermissions });
                }}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />

                <div className="flex-1">
                  <label htmlFor={permission.id} className="font-medium text-sm cursor-pointer">
                    {permission.label}
                  </label>
                  <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPermissionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => selectedUser && updateUserPermissions(selectedUser.id, selectedUser.permissions)}>
              <Shield className="h-4 w-4 mr-2" />
              Update Permissions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Set a new password for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password" />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}>

                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password" />

            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={updateUserPassword}>
              <Key className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Team Member Dialog */}
      <Dialog open={isCreateUserDialogOpen} onOpenChange={setIsCreateUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Team Member</DialogTitle>
            <DialogDescription>
              Add a new team member to your organization
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newUserName">Full Name</Label>
              <Input
                id="newUserName"
                value={newUserData.name}
                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                placeholder="Enter full name" />

            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newUserEmail">Email Address</Label>
              <Input
                id="newUserEmail"
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                placeholder="Enter company email" />

            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newUserRole">Role</Label>
              <Select
                value={newUserData.role}
                onValueChange={(value: 'Manager' | 'Editor' | 'Sales' | 'Support') =>
                setNewUserData({ ...newUserData, role: value })
                }>

                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager - Full management access</SelectItem>
                  <SelectItem value="Editor">Editor - Content management</SelectItem>
                  <SelectItem value="Sales">Sales - Customer & inventory</SelectItem>
                  <SelectItem value="Support">Support - Customer service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newUserPhone">Phone Number (Optional)</Label>
              <Input
                id="newUserPhone"
                type="tel"
                value={newUserData.phone}
                onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                placeholder="Enter phone number" />

            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newUserPassword">Password</Label>
              <div className="relative">
                <Input
                  id="newUserPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={newUserData.password}
                  onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                  placeholder="Create password" />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}>

                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newUserConfirmPassword">Confirm Password</Label>
              <Input
                id="newUserConfirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={newUserData.confirmPassword}
                onChange={(e) => setNewUserData({ ...newUserData, confirmPassword: e.target.value })}
                placeholder="Confirm password" />

            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTeamMember}>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Team Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);

};

export default UserManagement;