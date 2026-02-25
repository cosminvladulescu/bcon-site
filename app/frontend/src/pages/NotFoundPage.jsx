import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_buildtech-romania/artifacts/f06mkb4m_Red%20Black%20Geometric%20Construction%20Architecture%20Logo.svg";

const NotFoundPage = () => {
  return (
    <div className="pt-20 min-h-[80vh] bg-slate-50 flex items-center" data-testid="not-found-page">
      <PageMeta
        title="404 — Pagină negăsită | B-CON Consulting"
        description="Pagina pe care o cauți nu există sau a fost mutată."
      />
      <div className="max-w-2xl mx-auto px-6 text-center py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={LOGO_URL}
            alt="B-CON Consulting logo"
            className="h-20 w-auto mx-auto mb-10"
            style={{ background: "transparent" }}
          />
          <h1 className="font-heading text-8xl md:text-9xl font-bold text-slate-900 mb-4" data-testid="not-found-title">
            404
          </h1>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
            Pagina nu a fost găsită
          </h2>
          <p className="text-slate-600 text-lg mb-10 max-w-md mx-auto">
            Ne pare rău, pagina pe care o cauți nu există sau a fost mutată.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button
                size="lg"
                className="bg-slate-900 text-white hover:bg-slate-800 rounded-none px-8 py-4 font-semibold group"
                data-testid="not-found-home-btn"
              >
                <Home className="mr-2 h-5 w-5" />
                Înapoi la pagina principală
              </Button>
            </Link>
            <Link to="/servicii">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 hover:border-slate-900 rounded-none px-8 py-4 font-semibold group"
                data-testid="not-found-services-btn"
              >
                Vezi serviciile noastre
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
