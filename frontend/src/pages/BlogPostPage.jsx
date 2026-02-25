import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API}/blog/${slug}`);
        setPost(response.data);
      } catch (err) {
        setError("Articolul nu a fost găsit.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Se încarcă articolul...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-20 min-h-screen" data-testid="blog-post-not-found">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 text-center">
          <h1 className="font-heading text-4xl font-bold text-slate-900 mb-6">
            Articol negăsit
          </h1>
          <p className="text-slate-600 mb-8">
            Ne pare rău, articolul pe care îl căutați nu există sau a fost șters.
          </p>
          <Link to="/blog">
            <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-none px-8 py-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Înapoi la Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20" data-testid="blog-post-page">
      {/* Header */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la Blog
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {post.category && (
              <span className="inline-block bg-burgundy-900 text-white px-3 py-1 text-xs font-medium mb-4">
                {post.category}
              </span>
            )}
            
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" data-testid="blog-post-title">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.created_at)}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image_url && (
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-8">
            <img 
              src={post.image_url}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
            data-testid="blog-post-content"
          >
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <div className="text-slate-600 leading-relaxed space-y-6">
                <p>{post.excerpt}</p>
                <p>
                  Acest articol este în curs de redactare. Reveniți în curând pentru conținutul complet.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h3 className="font-heading text-2xl font-bold text-slate-900 mb-4">
            Ai întrebări despre acest subiect?
          </h3>
          <p className="text-slate-600 mb-8">
            Contactează-ne pentru o discuție personalizată.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-none px-8 py-4 font-medium group"
              data-testid="blog-post-cta"
            >
              Discută cu echipa B-CON
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
