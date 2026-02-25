import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, ChevronRight, Target, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageMeta from "@/components/PageMeta";

const TEAM_IMAGE = "https://customer-assets.emergentagent.com/job_buildtech-romania/artifacts/u0adu0i5_2.png";
const OFFICE_IMAGE = "https://customer-assets.emergentagent.com/job_buildtech-romania/artifacts/gvtoms1r_1.png";

const values = [
  {
    icon: Target,
    title: "Excelență",
    description: "Urmărim cele mai înalte standarde în tot ceea ce facem, de la analiza documentațiilor până la livrarea rapoartelor finale."
  },
  {
    icon: Eye,
    title: "Transparență",
    description: "Comunicăm deschis și onest cu clienții noștri, oferind informații clare despre progresul și stadiul fiecărui proiect."
  },
  {
    icon: Heart,
    title: "Integritate",
    description: "Acționăm întotdeauna în interesul clienților noștri, respectând cele mai înalte standarde etice profesionale."
  }
];

const whatWeDo = [
  "Strategie de ofertare și analiză documentație SEAP",
  "Management contractual și identificare riscuri",
  "Claim Management și susținerea drepturilor contractuale",
  "Fundamentare și optimizare situații de lucrări",
  "Asistență în relația cu autoritățile contractante"
];

const expertise = [
  "Ofertare SEAP și strategie financiară",
  "Managementul contractelor publice de lucrări",
  "Pregătirea și verificarea situațiilor de lucrări",
  "Claim Management și soluționarea disputelor",
  "Dirigenție de șantier (RTE) pentru proiecte de infrastructură",
  "Audit tehnic și financiar al proiectelor"
];

const AboutPage = () => {
  return (
    <div className="pt-20" data-testid="about-page">
      <PageMeta
        title="Despre Noi | B-CON Consulting"
        description="Peste 10 ani de experiență în consultanță tehnică pentru contracte publice în construcții. Aflați cum B-CON Consulting vă poate proteja interesele contractuale."
      />
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-burgundy-900 font-medium uppercase tracking-widest text-sm mb-4">
                Despre Noi
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-5xl font-bold text-slate-900 mb-6" data-testid="about-title">
                Consultanță strategică pentru contracte publice în construcții
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                B-CON Consulting este o firmă specializată în management contractual, ofertare și 
                optimizare financiară pentru contracte publice din domeniul construcțiilor. Oferim 
                suport antreprenorilor care derulează lucrări cu autorități contractante și 
                acordurilor-cadru cu autorități contractante din România.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Cu o experiență de peste 10 ani în domeniu, sprijinim companiile să gestioneze 
                eficient relația contractuală, să își protejeze drepturile și să maximizeze 
                valoarea proiectelor derulate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img 
                src={TEAM_IMAGE}
                alt="Echipa B-CON Consulting — experți în consultanță contracte publice"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-burgundy-900 text-white p-6 hidden md:block">
                <p className="font-heading text-3xl font-bold">10+</p>
                <p className="text-burgundy-200 text-sm">Ani experiență</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <img 
                src={OFFICE_IMAGE}
                alt="Consultanți B-CON pe șantier analizând documentele contractuale"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <p className="text-burgundy-900 font-medium uppercase tracking-widest text-sm mb-4">
                Suport Aplicat
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Ce facem concret pentru antreprenori
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Oferim suport aplicat și orientat spre rezultate în toate etapele unui contract public:
              </p>
              
              <ul className="space-y-4 mb-8">
                {whatWeDo.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-burgundy-900 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-burgundy-200 pl-4 italic">
                Abordarea noastră este tehnico-economică și orientată spre protejarea marjei 
                antreprenorului, reducerea riscurilor și creșterea predictibilității financiare.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-slate-900" data-testid="values-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <p className="text-burgundy-500 font-medium uppercase tracking-widest text-sm mb-4">
              Valorile Noastre
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
              Principiile care ne ghidează
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-slate-800 p-8 border-t-4 border-burgundy-900"
                data-testid={`value-card-${index}`}
              >
                <value.icon className="h-12 w-12 text-burgundy-500 mb-6" />
                <h3 className="font-heading text-2xl font-semibold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-burgundy-900 font-medium uppercase tracking-widest text-sm mb-4">
                Domenii de Expertiză
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8">
                Competențe dovedite în industrie
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Echipa noastră reunește specialiști cu experiență practică în gestionarea 
                proiectelor de infrastructură, cu competențe tehnice și economice complementare.
              </p>
            </div>

            <div>
              <ul className="space-y-4">
                {expertise.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                    data-testid={`expertise-item-${index}`}
                  >
                    <CheckCircle className="h-6 w-6 text-burgundy-900 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Vrei să afli mai multe despre serviciile noastre?
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            Contactează-ne pentru o discuție despre cum putem colabora.
          </p>
          <Link to="/contact">
            <Button 
              size="lg"
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-none px-10 py-6 font-semibold group"
              data-testid="about-cta-button"
            >
              Discută cu echipa B-CON
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
