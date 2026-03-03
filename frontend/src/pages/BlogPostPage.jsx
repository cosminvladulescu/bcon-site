import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const matter = (await import("gray-matter")).default;
        const raw = await import(`../../public/blog/${slug}.md`);
        const content = typeof raw === "string" ? raw : raw.default || "";
        const { data, content: body } = matter(content);
        setPost({ ...data, body, slug });
      } catch (err) {
        console.error("Error loading post:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Se încarcă articolul...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 text-center">
          <h1 className="font-heading text-4xl font-bold text-slate-900 mb-6">Articol negăsit</h1>
          <p className="text-slate-600 mb-8">Ne pare rău, articolul nu există sau a fost șters.</p>
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
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link to="/blog" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {post.category && (
              <span className="inline-block bg-burgundy-900 text-white px-3 py-1 text-xs font-medium mb-4">
                {post.category}
              </span>
            )}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </div>
          </motion.div>
        </div>
      </section>

      {post.image && (
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-8">
            <img src={post.image} alt={post.title} className="w-full h-64 md:h-96 object-cover shadow-lg" />
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-burgundy-900"
          >
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h3 className="font-heading text-2xl font-bold text-slate-900 mb-4">Ai întrebări despre acest subiect?</h3>
          <p className="text-slate-600 mb-8">Contactează-ne pentru o discuție personalizată.</p>
          <Link to="/contact">
            <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-none px-8 py-4 font-medium group">
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