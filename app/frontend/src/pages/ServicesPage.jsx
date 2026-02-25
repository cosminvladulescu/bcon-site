import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  FileText, 
  Calculator, 
  HardHat, 
  Building, 
  ClipboardList,
  Briefcase,
  CheckCircle,
  Target,
  FileSearch
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageMeta from "@/components/PageMeta";
const services = [
  {
    id: 1,
    icon: FileText,
    title: "Consultanță Contracte Publice",
    description: "Asistență completă în procesul de contractare publică și gestionarea relației cu autoritățile contractante.",
    benefits: [
      "Analiza documentațiilor de atribuire",
      "Verificarea clauzelor contractuale",
      "Asistență în negocieri",
      "Suport în procesul de ofertare"
    ]
  },
  {
    id: 2,
    icon: FileSearch,
    title: "Ofertare SEAP & Strategie Financiară",
    description: "Pregătire completă a ofertei tehnice și financiare pentru proceduri de achiziție publică, cu accent pe structurarea corectă a costurilor și reducerea riscurilor contractuale ulterioare.",
    benefits: [
      "Analiza documentației de atribuire",
      "Elaborare propunere financiară competitivă",
      "Structurare devize conform cerințelor",
      "Identificare riscuri contractuale înainte de depunere"
    ]
  },
  {
    id: 3,
    icon: Calculator,
    title: "Decontare & Managementul Situațiilor de Lucrări",
    description: "Optimizarea procesului de decontare prin verificare tehnico-economică riguroasă și fundamentare documentară solidă.",
    benefits: [
      "Întocmire situații de lucrări",
      "Verificare încadrări și cantități",
      "Corelare cu contract și acte adiționale",
      "Susținere documentație în relația cu beneficiarul"
    ]
  },
  {
    id: 4,
    icon: Target,
    title: "Claim Management & Strategie Contractuală",
    description: "Identificarea, fundamentarea și susținerea drepturilor contractuale în cadrul contractelor publice și acordurilor-cadru.",
    benefits: [
      "Identificarea claim-urilor potențiale (termene, costuri, lucrări suplimentare)",
      "Redactarea notificărilor contractuale în termen",
      "Fundamentare tehnică și economică a costurilor suplimentare",
      "Strategie de negociere cu autoritatea contractantă"
    ],
    additionalText: "Abordarea noastră este orientată spre prevenirea pierderilor financiare și consolidarea poziției antreprenorului în relația contractuală cu autoritatea contractantă."
  },
  {
    id: 5,
    icon: HardHat,
    title: "Dirigenție de Șantier / RTE",
    description: "Servicii profesionale de supraveghere tehnică pentru execuția lucrărilor de construcții.",
    benefits: [
      "Verificarea calității lucrărilor",
      "Urmărirea conformității cu proiectul",
      "Participarea la fazele determinante",
      "Întocmirea documentelor de calitate"
    ]
  },
  {
    id: 6,
    icon: Briefcase,
    title: "Asistență Tehnică Documentații",
    description: "Suport în pregătirea și verificarea documentațiilor tehnice și administrative ale proiectelor.",
    benefits: [
      "Verificarea documentațiilor tehnice",
      "Analiza caietelor de sarcini",
      "Suport în obținerea avizelor",
      "Pregătirea documentațiilor de recepție"
    ]
  }
];

const ServicesPage = () => {
  return (
    <div className="pt-20" data-testid="services-page">
      <PageMeta
        title="Servicii de Consultanță | B-CON Consulting"
        description="Ofertare SEAP, management contractual, decontare și situații de lucrări, claim management. Soluții complete pentru contracte publice în construcții."
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
              Serviciile Noastre
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="services-title">
              Soluții complete pentru contracte publice
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Oferim o gamă completă de servicii de consultanță pentru companiile 
              care derulează proiecte cu finanțare publică.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-slate-200 p-8 hover:border-slate-400 transition-all group flex flex-col"
                data-testid={`service-detail-${service.id}`}
              >
                <div className="w-14 h-14 bg-slate-900 flex items-center justify-center mb-6 group-hover:bg-burgundy-900 transition-colors">
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-6">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-burgundy-900 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {service.additionalText && (
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 italic border-l-2 border-burgundy-200 pl-3">
                    {service.additionalText}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <Link to="/contact" className="inline-flex items-center text-burgundy-900 font-medium text-sm hover:gap-2 transition-all group/link">
                    Discută cu echipa B-CON
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <p className="text-burgundy-900 font-medium uppercase tracking-widest text-sm mb-4">
              Cum Lucrăm
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900">
              Procesul nostru de lucru
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Analiză", desc: "Evaluăm situația actuală și identificăm nevoile specifice" },
              { step: "02", title: "Strategie", desc: "Dezvoltăm un plan de acțiune personalizat" },
              { step: "03", title: "Implementare", desc: "Executăm acțiunile planificate cu precizie" },
              { step: "04", title: "Monitorizare", desc: "Urmărim rezultatele și ajustăm strategia" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center"
                data-testid={`process-step-${index}`}
              >
                <div className="text-6xl font-heading font-bold text-slate-200 mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-burgundy-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Ai nevoie de consultanță pentru proiectul tău?
            </h2>
            <p className="text-burgundy-200 text-lg mb-8 max-w-2xl mx-auto">
              Contactează-ne pentru a discuta despre nevoile tale specifice.
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-white text-burgundy-900 hover:bg-slate-100 rounded-none px-10 py-6 font-semibold group"
                data-testid="services-cta-button"
              >
                Discută cu echipa B-CON
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
