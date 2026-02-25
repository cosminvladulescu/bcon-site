import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Building, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Placeholder projects (shown when DB is empty)
const placeholderProjects = [
  {
    id: "1",
    title: "Modernizare DN1 - Sector București-Ploiești",
    description: "Consultanță tehnică și asistență în managementul contractului pentru modernizarea a 60 km de drum național.",
    challenge: "Gestionarea unui contract complex cu multiple părți interesate și termene strânse.",
    solution: "Am implementat un sistem de monitorizare în timp real și am optimizat procesul de decontare.",
    results: "Proiect finalizat la termen, cu decontări complete și fără litigii.",
    category: "Infrastructură rutieră",
    image_url: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80",
    year: "2023",
    is_featured: true
  },
  {
    id: "2",
    title: "Construcție Spital Regional Cluj",
    description: "Dirigenție de șantier și consultanță FIDIC pentru construcția unui spital regional modern.",
    challenge: "Coordonarea a peste 20 de subcontractori și respectarea standardelor stricte de calitate.",
    solution: "Am creat proceduri clare de control și un sistem eficient de comunicare între echipe.",
    results: "Calitate superioară a lucrărilor, certificate la primele inspecții.",
    category: "Construcții civile",
    image_url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    year: "2022",
    is_featured: true
  },
  {
    id: "3",
    title: "Rețea de Canalizare Metropolitană",
    description: "Asistență tehnică pentru implementarea unui proiect de infrastructură de apă și canalizare.",
    challenge: "Proiect cu finanțare europeană, cu cerințe stricte de raportare și documentare.",
    solution: "Am dezvoltat templates standardizate și am automatizat procesele de raportare.",
    results: "Toate raportările acceptate la prima submisie, fără corecții.",
    category: "Utilități publice",
    image_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    year: "2023",
    is_featured: false
  },
  {
    id: "4",
    title: "Reabilitare Clădire Istorică",
    description: "Consultanță pentru reabilitarea și consolidarea unei clădiri de patrimoniu din centrul orașului.",
    challenge: "Echilibrarea cerințelor de conservare cu standardele moderne de siguranță.",
    solution: "Colaborare strânsă cu arhitecții și autoritățile de patrimoniu pentru soluții acceptabile.",
    results: "Proiect premiat pentru calitatea restaurării și integrarea modernă.",
    category: "Reabilitare patrimoniu",
    image_url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=800&q=80",
    year: "2021",
    is_featured: false
  }
];

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Toate");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API}/projects`);
        if (response.data.length > 0) {
          setProjects(response.data);
        } else {
          setProjects(placeholderProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(placeholderProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ["Toate", ...new Set(projects.map(p => p.category).filter(Boolean))];
  
  const filteredProjects = selectedCategory === "Toate" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-20" data-testid="portfolio-page">
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
              Portofoliu
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="portfolio-title">
              Proiecte reprezentative
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Descoperă o selecție din proiectele în care am oferit consultanță 
              tehnică și suport profesional.
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
                data-testid={`filter-${category.toLowerCase().replace(/\s/g, "-")}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Se încarcă proiectele...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                  data-testid={`project-card-${project.id}`}
                >
                  <div className="relative overflow-hidden mb-6">
                    <img 
                      src={project.image_url || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"}
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {project.is_featured && (
                      <div className="absolute top-4 right-4 bg-burgundy-900 text-white px-3 py-1 text-xs font-medium">
                        Proiect Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    {project.category && (
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {project.category}
                      </span>
                    )}
                    {project.year && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {project.year}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-heading text-2xl font-semibold text-slate-900 mb-3 group-hover:text-burgundy-900 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {project.challenge && (
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Provocare</p>
                        <p className="text-slate-700 text-sm">{project.challenge}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Rezultate</p>
                        <p className="text-slate-700 text-sm">{project.results}</p>
                      </div>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ai un proiect similar?
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            Contactează-ne pentru a discuta cum putem contribui la succesul proiectului tău.
          </p>
          <Link to="/contact">
            <Button 
              size="lg"
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-none px-10 py-6 font-semibold group"
              data-testid="portfolio-cta-button"
            >
              Discută cu noi
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
