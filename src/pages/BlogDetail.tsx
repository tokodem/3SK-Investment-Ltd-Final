import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ReadMoreText from '@/components/ReadMoreText';
import { mockBlogPosts } from '@/data/mockData';
import { Calendar, User, ArrowLeft, ArrowRight, Share, Tag } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = mockBlogPosts.find((post) => post.id === id);
  const relatedPosts = mockBlogPosts.
  filter((p) => p.id !== id && p.status === 'Published').
  slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>);

  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-900">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6">

            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Article Meta */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) =>
              <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={shareArticle}
                className="flex items-center space-x-1">

                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg" />

          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <ReadMoreText
              text={post.content}
              maxLength={500}
              className="text-gray-700 leading-relaxed text-lg" />

          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 &&
          <div className="border-t pt-12">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) =>
              <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="block">
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-md hover:scale-105">
                      <div className="relative">
                        <img
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300" />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Badge className="bg-blue-600 text-white">
                            <ArrowRight className="h-3 w-3" />
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {relatedPost.tags.slice(0, 2).map((tag) =>
                      <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                      )}
                        </div>
                        
                        <h3 className="text-sm font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        
                        <p className="text-gray-600 text-xs line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
              )}
              </div>
            </div>
          }

          {/* Navigation */}
          <div className="border-t pt-8 mt-12">
            <div className="flex justify-center">
              <Button asChild variant="outline">
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to All Articles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>);

};

export default BlogDetail;