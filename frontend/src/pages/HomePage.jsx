import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  FileText,
  Calculator,
  Users,
  Award,
  Clock,
  Target,
  ClipboardList,
  Shield,
  TrendingUp,
  Calendar,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageMeta from "@/components/PageMeta";
import homepageContent from "../content/homepage.json";

const HERO_IMAGE =
  "https://customer-assets.emergentagent.com/job_buildtech-romania/artifacts/vcceupad_ChatGPT%20Image%20Feb%201%2C%202026%2C%2010_51_11%20PM.png";
const ABOUT_IMAGE =
  "https://customer-assets.emergentagent.com/job_buildtech-romania/artifacts/kvzv51xh_Untitled%20design.png";

// Icon maps (păstrăm look-ul, textele vin din CMS)
const SERVICE_ICONS = [FileText, Calculator, ClipboardList, Target];
const BENEFIT_ICONS = [Award, Target, Clock, Users];

const HomePage = () => {
  return (
    <div className="pt-20" data-testid="home-page">
      <PageMeta
        title="B-CON Consulting | Consultanță Contracte Publice în Construcții"
        description="Consultanță tehnică specializată pentru antreprenori care derulează contracte cu autorități publice din România. Ofertare SEAP, decontare, claim management."
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center" data-testid="hero-section">
        <div className="absolute inset-0 z-0">
          {/* Gradient overlay - dark navy from left to transparent on right */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.85) 35%, rgba(15, 23, 42, 0.5) 60%, transparent 100%)",
            }}
          />
          <img
            src={HERO_IMAGE}
            alt="Consultanți B-CON analizând documente de construcții"
            className="w-full h-full object-cover"
            style={{
              filter: "saturate(0.85) brightness(0.95)",
            }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-burgundy-500 font-medium uppercase tracking-widest text-sm mb-6"
            >
              Consultanță în Construcții
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none mb-6"
              data-testid="hero-title"
            >
              {homepageContent.hero?.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10"
            >
              {homepageContent.hero?.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-burgundy-900 text-white hover:bg-burgundy-700 rounded-none px-10 py-6 font-semibold text-base group"
                  data-testid="hero-cta-primary"
                >
                  {homepageContent.hero?.ctaPrimary}
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link to="/servicii">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 rounded-none px-8 py-6 font-medium max-md:border-2 max-md:border-white"
                  data-testid="hero-cta-secondary"
                >
                  {homepageContent.hero?.ctaSecondary}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 md:py-32 bg-white" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <p className="text-burgundy-900 font-medium uppercase tracking-widest text-sm mb-4">
              Ce Facem
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Servicii de Consultanță
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Soluții complete pentru gestionarea contractelor publice și a proiectelor de infrastructură.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {(homepageContent.services || []).map((service, index) => {
              const Icon = SERVICE_ICONS[index] || FileText;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-50 p-4 md:p-8 border-l-4 border-burgundy-900 hover:bg-slate-100 transition-colors group w-full"
                  data-testid={`service-card-${index}`}
                >
                  <Icon className="h-10 w-10 text-burgundy-900 mb-6" />
                  <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/servicii">
              <Button
                variant="outline"
                className="border-slate-200 text-slate-900 hover:border-slate-900 rounded-none px-8 py-4"
                data-testid="services-view-all"
              >
                Vezi toate serviciile
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cost Comparison Section */}

      {/* Bloc 1 — Hero Text */}
      <section className="py-20 md:py-28 bg-white" data-testid="cost-comparison-intro">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Expertiză specializată, fără costurile unei angajări permanente
            </h2>
            <p className="text-burgundy-900 font-medium text-lg mb-6">
              De ce tot mai mulți antreprenori aleg colaborarea contractuală în locul unui angajat intern
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              În contractele publice, o decizie greșită poate costa mai mult decât un an de consultanță. Modelul
              de lucru pe care îl alegi face diferența.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bloc 2 — Comparație vizuală */}
      <section className="py-16 bg-white" data-testid="cost-comparison-cards">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* Card stânga — Angajare internă */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#F3F4F6] p-8"
              data-testid="internal-hire-card"
            >
              <h3 className="font-heading text-xl font-bold text-slate-700 mb-6">Angajare internă</h3>
              <ul className="space-y-4 mb-6">
                {[
                  "Salariu fix lunar: 8.000–15.000+ lei, indiferent de volumul de activitate",
                  "Taxe salariale și contribuții angajator (~40% peste salariu brut)",
                  "Concedii, zile libere, beneficii obligatorii",
                  "Costuri echipamente, software, training",
                  "Experiența limitată la un singur specialist",
                  "Risc operațional la fluctuația de personal",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="h-4 w-4 text-[#9CA3AF] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bold text-slate-800 text-sm border-t border-slate-200 pt-4">
                Cost fix anual estimativ: 120.000 – 210.000+ lei
              </p>
            </motion.div>

            {/* Card dreapta — Colaborare B-CON */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#FDF2F2] p-8 border-t-[3px] border-burgundy-900"
              data-testid="bcon-collaboration-card"
            >
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-6">Colaborare B-CON</h3>
              <ul className="space-y-4 mb-6">
                {[
                  "Cost doar pentru proiectele și perioadele active",
                  "Zero taxe salariale sau contribuții",
                  "Expertiză cumulată din zeci de contracte publice",
                  "Acoperire completă: ofertare, execuție, decontare, claim-uri",
                  "Scalabilitate imediată la volumul tău de activitate",
                  "Fără obligații pe termen lung sau proceduri de HR",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-burgundy-900 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bold text-burgundy-900 text-sm border-t border-burgundy-100 pt-4">
                Cost variabil, optimizat în funcție de volumul real de activitate
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bloc 3 — Diferențiator */}
      <section className="py-20 md:py-24 bg-[#F9FAFB]" data-testid="differentiator-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">Ce câștigi concret</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                Icon: Shield,
                title: "Reducerea riscului financiar",
                description:
                  "Notificări la timp, actualizări de preț corecte, situații de lucrări fără erori costisitoare",
              },
              {
                Icon: TrendingUp,
                title: "Maximizarea veniturilor contractuale",
                description:
                  "Identificăm lucrări suplimentare, ajustări și claim-uri pe care le ratezi fără expertiză specializată",
              },
              {
                Icon: Calendar,
                title: "Predictibilitate financiară",
                description: "Știi exact cât plătești și pentru ce, fără costuri ascunse sau surprize",
              },
              {
                Icon: Users,
                title: "Continuitate operațională",
                description: "Nu depinzi de o singură persoană. Echipa B-CON este mereu disponibilă",
              },
            ].map(({ Icon, title, description }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 border border-slate-100 shadow-sm"
                data-testid={`gain-card-${index}`}
              >
                <div className="w-10 h-10 bg-burgundy-50 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-burgundy-900" />
                </div>
                <h3 className="font-heading font-semibold text-slate-900 mb-2 text-base">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-28 md:py-36 bg-slate-50" data-testid="why-us-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-burgundy-900 font-medium uppercase tracking-widest text-sm mb-4">
                De Ce B-CON Consulting
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Expertiză tehnică și profesionalism în fiecare proiect
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                B-CON CONSULTING oferă suport tehnic și consultanță specializată în domeniul construcțiilor, adaptată
                cerințelor proiectelor derulate cu autorități contractante. Abordarea noastră este una riguroasă,
                orientată spre claritate contractuală, control și rezultate predictibile.
              </p>

              <div className="space-y-6">
                {(homepageContent.benefits || []).map((benefit, index) => {
                  const Icon = BENEFIT_ICONS[index] || Award;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4"
                      data-testid={`benefit-${index}`}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-900 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-slate-900 mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={ABOUT_IMAGE}
                alt="Echipă de consultanți B-CON pe șantier"
                className="w-full h-[550px] object-cover shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bloc 4 — Concluzie */}
      <section className="py-20 md:py-24 bg-burgundy-900" data-testid="conclusion-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Nu ai nevoie de un salariu în plus. Ai nevoie de rezultate.
            </h2>
            <p className="text-burgundy-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Colaborarea cu B-CON îți oferă expertiză completă, flexibilitate totală și control financiar real — exact
              când ai nevoie, exact cât ai nevoie.
            </p>
            <Link to="/contact">
              <button
                className="inline-flex items-center bg-white text-burgundy-900 font-semibold px-10 py-4 hover:bg-burgundy-50 transition-colors duration-200 mb-4"
                data-testid="conclusion-cta-button"
              >
                Programează o discuție gratuită →
              </button>
            </Link>
            <div className="mt-4">
              <Link
                to="/servicii"
                className="text-white underline underline-offset-4 text-sm hover:text-burgundy-100 transition-colors"
                data-testid="conclusion-services-link"
              >
                Vezi serviciile noastre →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;