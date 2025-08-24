import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { mockBlogPosts } from '@/data/mockData';
import { BlogPost } from '@/types';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Get all unique tags
  const allTags = Array.from(
    new Set(mockBlogPosts.flatMap((post) => post.tags))
  ).sort();

  // Filter posts
  const filteredPosts = mockBlogPosts.filter((post) => {
    const matchesSearch =
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = !selectedTag || post.tags.includes(selectedTag);

    return matchesSearch && matchesTag && post.status === 'Published';
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const featuredPost = mockBlogPosts.
  filter((post) => post.status === 'Published').
  sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Automotive Blog
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Stay updated with the latest automotive news, tips, and insights from our experts
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Post */}
        {featuredPost &&
        <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
            <Link to={`/blog/${featuredPost.id}`} className="block">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg hover:scale-[1.02]">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative">
                    <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-300" />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">Featured</Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge className="bg-white/90 text-blue-600">
                        <ArrowRight className="h-4 w-4" />
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.tags.slice(0, 3).map((tag) =>
                    <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                    )}
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 text-lg">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(featuredPost.publishedAt)}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                        Read More →
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </section>
        }

        {/* Search and Filter */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10" />

              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag('')}>

                All Topics
              </Button>
              {allTags.map((tag) =>
              <Button
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(tag)}>

                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        {paginatedPosts.length > 0 ?
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedPosts.map((post) =>
            <Link key={post.id} to={`/blog/${post.id}`} className="block">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg hover:scale-105">
                    <div className="relative">
                      <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge className="bg-blue-600 text-white">
                          <ArrowRight className="h-3 w-3" />
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) =>
                    <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                    )}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                        Read Article →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
            )}
            </div>

            {/* Pagination */}
            {totalPages > 1 &&
          <div className="flex justify-center items-center gap-2">
                <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}>

                  Previous
                </Button>
                
                {[...Array(totalPages)].map((_, i) =>
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? 'default' : 'outline'}
              onClick={() => setCurrentPage(i + 1)}
              className="w-10">

                    {i + 1}
                  </Button>
            )}
                
                <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}>

                  Next
                </Button>
              </div>
          }
          </> :

        <Card className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or browse all topics.
            </p>
            <Button onClick={() => {setSearchTerm('');setSelectedTag('');}}>
              Clear Filters
            </Button>
          </Card>
        }

        {/* Newsletter Signup */}
        <section className="mt-16 bg-gray-50 rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest automotive news, 
            tips, and exclusive offers delivered directly to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1" />

            <Button className="bg-blue-600 hover:bg-blue-700">
              Subscribe
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </section>
      </div>

      <Footer />
    </div>);

};

export default Blog;