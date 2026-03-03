import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Toate");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const context = require.context(
          "../../public/blog",
          false,
          /\.md$/
        );
        const matter = (await import("gray-matter")).default;
        const loaded = context.keys().map((key) => {
          const raw = context(key);
          const content = typeof raw === "string" ? raw : raw.default || "";
          const { data } = matter(content);
          const slug = key.replace("./", "").replace(".md", "");
          return { ...data, slug };
        });
        const published = loaded
          .filter((p) => p.published !== false)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(published);
      } catch (err) {
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const categories = ["Toate", "Achizitii publice", "Modificari legislative", "Management contractual"];

  const filteredPosts = selectedCategory === "Toate"
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="pt-20" data-testid="blog-page">
      <PageMeta
        title="Blog & Resurse | B-CON Consulting"
        description="Analize, ghiduri și actualizări legislative pentru firme de construcții care derulează contracte publice din România."
      />

      <section className="py-24 md:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-burgundy-500 font-medium uppercase tracking-widest text-sm mb-4">Blog & Resurse</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Informații care îți protejează contractul
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Analize, ghiduri și actualizări legislative pentru firme de construcții care derulează contracte publice.
            </p>
          </motion.div>
        </div>
      </section>

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
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <p className="text-center text-slate-500">Se încarcă articolele...</p>
          ) : filteredPosts.length === 0 ? (
            <p className="text-center text-slate-500">Nu există articole în această categorie.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative overflow-hidden mb-6">
                      <img
                        src={post.image || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80"}
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
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3 group-hover:text-burgundy-900 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="inline-flex items-center text-burgundy-900 font-medium text-sm">
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
    </div>
  );
};

export default BlogPage;