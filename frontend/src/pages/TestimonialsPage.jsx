import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Star, Quote, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Placeholder testimonials
const placeholderTestimonials = [
  {
    id: "1",
    client_name: "Ing. Mihai Popescu",
    company: "Construct Pro SRL",
    role: "Director General",
    content: "Colaborarea cu B-CON Consulting a fost esențială pentru succesul proiectului nostru de infrastructură. Expertiza lor în contracte FIDIC ne-a ajutat să navigăm eficient prin toate provocările contractuale.",
    rating: 5,
    logo_url: ""
  },
  {
    id: "2",
    client_name: "Ing. Ana Ionescu",
    company: "BuildTech România",
    role: "Manager Proiecte",
    content: "Recomand cu încredere serviciile B-CON pentru orice antreprenor care lucrează cu contracte publice. Profesionalismul și promptitudinea echipei sunt remarcabile.",
    rating: 5,
    logo_url: ""
  },
  {
    id: "3",
    client_name: "Dr. Ing. Andrei Munteanu",
    company: "Infrastructure Partners",
    role: "Director Tehnic",
    content: "Am apelat la B-CON pentru consultanță în gestionarea unui claim complex. Rezultatul a fost peste așteptări - au obținut o soluție favorabilă într-un timp record.",
    rating: 5,
    logo_url: ""
  },
  {
    id: "4",
    client_name: "Ing. Elena Dumitrescu",
    company: "Drumuri Moderne SA",
    role: "Șef Departament Contracte",
    content: "Echipa B-CON ne-a oferit suport complet în procesul de decontare pentru un proiect major de drumuri. Datorită lor, am avut toate documentațiile în ordine și am evitat întârzierile.",
    rating: 5,
    logo_url: ""
  }
];

const partnerLogos = [
  { name: "Companie A", logo: "" },
  { name: "Companie B", logo: "" },
  { name: "Companie C", logo: "" },
  { name: "Companie D", logo: "" }
];

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API}/testimonials`);
        if (response.data.length > 0) {
          setTestimonials(response.data);
        } else {
          setTestimonials(placeholderTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials(placeholderTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="pt-20" data-testid="testimonials-page">
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
              Testimoniale
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="testimonials-title">
              Ce spun clienții noștri
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Descoperă experiențele partenerilor noștri și rezultatele obținute 
              în urma colaborării cu echipa B-CON Consulting.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Se încarcă testimonialele...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-50 p-8 border-l-4 border-burgundy-900"
                  data-testid={`testimonial-card-${testimonial.id}`}
                >
                  <Quote className="h-10 w-10 text-burgundy-900/20 mb-6" />
                  
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-burgundy-900 text-burgundy-900" />
                    ))}
                  </div>
                  
                  <div className="border-t border-slate-200 pt-4">
                    <p className="font-heading font-semibold text-slate-900">
                      {testimonial.client_name}
                    </p>
                    <p className="text-slate-600 text-sm">
                      {testimonial.role && `${testimonial.role}, `}{testimonial.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-center text-slate-500 text-sm uppercase tracking-wider mb-8">
            Am colaborat cu companii de top din România
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {partnerLogos.map((partner, index) => (
              <div 
                key={index}
                className="flex items-center justify-center w-32 h-16 bg-slate-200 text-slate-400 text-sm font-medium"
                data-testid={`partner-logo-${index}`}
              >
                <Building className="h-6 w-6 mr-2" />
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-heading text-5xl font-bold text-burgundy-900 mb-2">98%</p>
              <p className="text-slate-600">Clienți care ne-ar recomanda</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="font-heading text-5xl font-bold text-burgundy-900 mb-2">85%</p>
              <p className="text-slate-600">Clienți recurenți</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="font-heading text-5xl font-bold text-burgundy-900 mb-2">4.9/5</p>
              <p className="text-slate-600">Rating mediu de satisfacție</p>
            </motion.div>
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
              Vrei să devii următorul nostru partener de succes?
            </h2>
            <p className="text-burgundy-200 text-lg mb-8 max-w-2xl mx-auto">
              Contactează-ne și hai să discutăm despre cum putem colabora.
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-white text-burgundy-900 hover:bg-slate-100 rounded-none px-10 py-6 font-semibold group"
                data-testid="testimonials-cta-button"
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

export default TestimonialsPage;
