import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockBlogPosts } from '@/data/mockData';
import {
  Plus, Edit, Trash2, Eye, Calendar, Tag, User,
  Save, X, Upload, Image as ImageIcon, FileText,
  Clock, TrendingUp, MessageSquare, Share } from
'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  status: 'Draft' | 'Published' | 'Scheduled';
  tags: string[];
  featuredImage: string;
  views: number;
  comments: number;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  readTime: number;
}

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    excerpt: '',
    status: 'Draft',
    tags: [],
    featuredImage: '',
    seoTitle: '',
    seoDescription: ''
  });
  const [tagInput, setTagInput] = useState('');

  const { user, hasPermission } = useAuth();
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
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const generateSlug = (title: string) => {
    return title.
    toLowerCase().
    replace(/[^a-z0-9 -]/g, '').
    replace(/\s+/g, '-').
    replace(/-+/g, '-');
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: 'Error',
        description: 'Please fill in title and content',
        variant: 'destructive'
      });
      return;
    }

    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title!,
      content: newPost.content!,
      excerpt: newPost.excerpt || newPost.content!.substring(0, 150) + '...',
      author: user?.name || 'Unknown',
      publishedAt: newPost.status === 'Published' ? new Date().toISOString() : '',
      status: newPost.status as BlogPost['status'] || 'Draft',
      tags: newPost.tags || [],
      featuredImage: newPost.featuredImage || '/placeholder.svg',
      views: 0,
      comments: 0,
      slug: generateSlug(newPost.title!),
      seoTitle: newPost.seoTitle || newPost.title,
      seoDescription: newPost.seoDescription || newPost.excerpt,
      readTime: estimateReadTime(newPost.content!)
    };

    setPosts([post, ...posts]);
    resetForm();
    setIsCreateOpen(false);

    toast({
      title: 'Success',
      description: `Blog post ${post.status === 'Published' ? 'published' : 'saved as draft'} successfully!`
    });
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setNewPost({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status,
      tags: post.tags,
      featuredImage: post.featuredImage,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription
    });
    setIsEditOpen(true);
  };

  const handleUpdatePost = () => {
    if (!selectedPost || !newPost.title || !newPost.content) {
      toast({
        title: 'Error',
        description: 'Please fill in title and content',
        variant: 'destructive'
      });
      return;
    }

    const updatedPost: BlogPost = {
      ...selectedPost,
      title: newPost.title!,
      content: newPost.content!,
      excerpt: newPost.excerpt || newPost.content!.substring(0, 150) + '...',
      status: newPost.status as BlogPost['status'] || 'Draft',
      tags: newPost.tags || [],
      featuredImage: newPost.featuredImage || '/placeholder.svg',
      slug: generateSlug(newPost.title!),
      seoTitle: newPost.seoTitle || newPost.title,
      seoDescription: newPost.seoDescription || newPost.excerpt,
      readTime: estimateReadTime(newPost.content!),
      publishedAt: newPost.status === 'Published' && selectedPost.status !== 'Published' ?
      new Date().toISOString() :
      selectedPost.publishedAt
    };

    setPosts(posts.map((post) => post.id === selectedPost.id ? updatedPost : post));
    resetForm();
    setIsEditOpen(false);
    setSelectedPost(null);

    toast({
      title: 'Success',
      description: 'Blog post updated successfully!'
    });
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
    toast({
      title: 'Success',
      description: 'Blog post deleted successfully!'
    });
  };

  const handleStatusChange = (postId: string, newStatus: BlogPost['status']) => {
    setPosts(posts.map((post) =>
    post.id === postId ?
    {
      ...post,
      status: newStatus,
      publishedAt: newStatus === 'Published' && post.status !== 'Published' ?
      new Date().toISOString() :
      post.publishedAt
    } :
    post
    ));

    toast({
      title: 'Success',
      description: `Post ${newStatus.toLowerCase()} successfully!`
    });
  };

  const addTag = (tag: string) => {
    if (tag && !newPost.tags?.includes(tag)) {
      setNewPost({
        ...newPost,
        tags: [...(newPost.tags || []), tag]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags?.filter((tag) => tag !== tagToRemove) || []
    });
  };

  const resetForm = () => {
    setNewPost({
      title: '',
      content: '',
      excerpt: '',
      status: 'Draft',
      tags: [],
      featuredImage: '',
      seoTitle: '',
      seoDescription: ''
    });
    setTagInput('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server or cloud storage
      const imageUrl = URL.createObjectURL(file);
      setNewPost({ ...newPost, featuredImage: imageUrl });
    }
  };

  if (!hasPermission('manage_blog')) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">You don't have permission to manage blog posts.</p>
        </CardContent>
      </Card>);

  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold">{posts.filter((p) => p.status === 'Published').length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{posts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Comments</p>
                <p className="text-2xl font-bold">{posts.reduce((sum, post) => sum + post.comments, 0)}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Blog Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Blog Management</span>
            </div>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mobile View */}
          <div className="block lg:hidden space-y-4">
            {posts.map((post) =>
            <div key={post.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-16 h-16 rounded object-cover flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{post.title}</p>
                    <p className="text-xs text-gray-500">By {post.author}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                      <span className="text-xs text-gray-500">{post.readTime} min read</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Views</p>
                    <p className="font-medium">{post.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Comments</p>
                    <p className="font-medium">{post.comments}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEditPost(post)}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Select value={post.status} onValueChange={(value) => handleStatusChange(post.id, value as BlogPost['status'])}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline" onClick={() => handleDeletePost(post.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Post</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) =>
                <TableRow key={post.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-12 h-12 rounded object-cover" />

                        <div className="max-w-xs">
                          <p className="font-medium truncate">{post.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{post.readTime} min read</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.tags.slice(0, 2).map((tag) =>
                          <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                          )}
                            {post.tags.length > 2 &&
                          <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 2}
                              </Badge>
                          }
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      <Select value={post.status} onValueChange={(value) => handleStatusChange(post.id, value as BlogPost['status'])}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {post.publishedAt ? formatDate(post.publishedAt) : 'Not published'}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Eye className="h-3 w-3" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MessageSquare className="h-3 w-3" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditPost(post)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeletePost(post.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Post Dialog */}
      <Dialog open={isCreateOpen || isEditOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateOpen(false);
          setIsEditOpen(false);
          setSelectedPost(null);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditOpen ? 'Edit Post' : 'Create New Post'}</DialogTitle>
            <DialogDescription>
              {isEditOpen ? 'Update your blog post' : 'Create a new blog post for your website'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newPost.title || ''}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter post title" />

              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={newPost.excerpt || ''}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                  placeholder="Brief description of the post"
                  rows={3} />

              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={newPost.content || ''}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Write your post content here..."
                  rows={12} />

              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newPost.status || 'Draft'} onValueChange={(value) => setNewPost({ ...newPost, status: value as BlogPost['status'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image</Label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload} />

                  {newPost.featuredImage &&
                  <img
                    src={newPost.featuredImage}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded" />

                  }
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(tagInput);
                      }
                    }} />

                  <Button type="button" onClick={() => addTag(tagInput)} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {newPost.tags?.map((tag) =>
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={newPost.seoTitle || ''}
                  onChange={(e) => setNewPost({ ...newPost, seoTitle: e.target.value })}
                  placeholder="SEO optimized title" />

              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  value={newPost.seoDescription || ''}
                  onChange={(e) => setNewPost({ ...newPost, seoDescription: e.target.value })}
                  placeholder="SEO meta description"
                  rows={3} />

              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreateOpen(false);
              setIsEditOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={isEditOpen ? handleUpdatePost : handleCreatePost}>
              <Save className="h-4 w-4 mr-2" />
              {isEditOpen ? 'Update Post' : 'Create Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);

};

export default BlogManagement;