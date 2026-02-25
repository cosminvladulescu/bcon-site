import { motion } from "framer-motion";
import PageMeta from "@/components/PageMeta";

const CookiesPolicyPage = () => {
  return (
    <div className="pt-20 bg-[#F9FAFB] min-h-screen" data-testid="cookies-policy-page">
      <PageMeta
        title="Politica de Cookies | B-CON Consulting"
        description="Informații despre utilizarea cookies pe site-ul B-CON Consulting și cum îți poți gestiona preferințele."
      />
      <div className="max-w-[800px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-burgundy-900 mb-2">
            Politica de Cookies
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Ultima actualizare: februarie 2025
          </p>

          <div className="prose prose-slate max-w-none text-[#1F2937]">
            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">1. Ce Sunt Cookies</h2>
            <p className="leading-relaxed mb-4">
              Cookies sunt fișiere text de mici dimensiuni stocate pe dispozitivul dumneavoastră atunci când vizitați un site web. Ele permit site-ului să vă recunoască la vizite ulterioare și să funcționeze corect.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">2. Ce Cookies Folosim</h2>
            <p className="leading-relaxed mb-4">
              <strong>Cookies esențiale</strong> — necesare pentru funcționarea corectă a site-ului (navigare, securitate). Nu pot fi dezactivate și nu necesită consimțământul dumneavoastră.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Cookies analitice</strong> — ne ajută să înțelegem cum este utilizat site-ul (ex. Google Analytics: pagini vizitate, durată sesiune, dispozitiv). Aceste cookies sunt activate doar cu consimțământul dumneavoastră.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Cookies de marketing</strong> — utilizate pentru afișarea de conținut relevant pe rețele sociale sau platforme de publicitate. Activate doar cu consimțământul dumneavoastră.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">3. Durata Cookies</h2>
            <p className="leading-relaxed mb-4">
              <strong>Cookies de sesiune</strong> sunt șterse automat când închideți browserul.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Cookies persistente</strong> rămân pe dispozitiv pentru o perioadă determinată (de regulă 30 de zile până la 2 ani, în funcție de tipul acestora).
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">4. Cum Gestionați Cookies</h2>
            <p className="leading-relaxed mb-4">
              Puteți gestiona preferințele privind cookies în orice moment prin bannerul afișat la prima vizită pe site sau direct din setările browserului dumneavoastră. Dezactivarea cookies esențiale poate afecta funcționarea site-ului.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">5. Cookies ale Terților</h2>
            <p className="leading-relaxed mb-4">
              Site-ul poate utiliza servicii oferite de terți (ex. Google Analytics, Facebook Pixel) care plasează propriile cookies. Vă recomandăm să consultați politicile de confidențialitate ale acestor servicii pentru detalii suplimentare.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">6. Contact</h2>
            <p className="leading-relaxed mb-4">
              Pentru orice întrebări legate de utilizarea cookies pe acest site, ne puteți contacta la <a href="mailto:office@b-con.ro" className="text-burgundy-900 hover:underline">office@b-con.ro</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPolicyPage;
