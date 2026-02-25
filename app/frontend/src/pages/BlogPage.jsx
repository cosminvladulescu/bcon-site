import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageMeta from "@/components/PageMeta";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// No hardcoded posts — articles are managed via CMS
const placeholderPosts = [];

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Toate");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/blog`);
        if (response.data.length > 0) {
          setPosts(response.data);
        } else {
          setPosts(placeholderPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts(placeholderPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = ["Toate", "Achiziții publice", "Modificări legislative", "Management contractual"];
  
  const filteredPosts = selectedCategory === "Toate" 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="pt-20" data-testid="blog-page">
      <PageMeta
        title="Blog & Resurse | B-CON Consulting"
        description="Analize, ghiduri și actualizări legislative pentru firme de construcții care derulează contracte publice din România."
      />
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-burgundy-500 font-medium uppercase tracking-widest text-sm mb-4">
              Blog & Resurse
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="blog-title">
              Informații care îți protejează contractul
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Analize, ghiduri și actualizări legislative pentru firme de construcții care derulează contracte publice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
                data-testid={`blog-filter-${category.toLowerCase().replace(/\s/g, "-")}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Se încarcă articolele...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Nu există articole în această categorie.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                  data-testid={`blog-post-card-${post.id}`}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative overflow-hidden mb-6">
                      <img 
                        src={post.image_url || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80"}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {post.category && (
                        <div className="absolute top-4 left-4 bg-burgundy-900 text-white px-3 py-1 text-xs font-medium">
                          {post.category}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                    
                    <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3 group-hover:text-burgundy-900 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    
                    <span className="inline-flex items-center text-burgundy-900 font-medium text-sm group-hover:gap-2 transition-all">
                      Citește mai mult
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Abonează-te la newsletter
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Primește cele mai noi articole și resurse direct în inbox-ul tău.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Adresa ta de email"
                className="px-6 py-4 border border-slate-200 focus:border-slate-400 focus:outline-none flex-1 max-w-md"
                data-testid="newsletter-email-input"
              />
              <Button 
                className="bg-slate-900 text-white hover:bg-slate-800 rounded-none px-8 py-4 font-medium"
                data-testid="newsletter-subscribe-button"
              >
                Abonează-te
              </Button>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Prin abonare, confirmi că ai citit și ești de acord cu{" "}
              <Link 
                to="/politica-confidentialitate" 
                className="text-burgundy-900 hover:underline font-medium"
                data-testid="newsletter-privacy-link"
              >
                Politica noastră de Confidențialitate
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
