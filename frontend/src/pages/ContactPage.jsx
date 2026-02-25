import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import PageMeta from "@/components/PageMeta";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Te rugăm să completezi toate câmpurile obligatorii.");
      return;
    }

    setLoading(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      toast.success("Mesajul a fost trimis cu succes!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("A apărut o eroare. Te rugăm să încerci din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20" data-testid="contact-page">
      <PageMeta
        title="Contact | B-CON Consulting"
        description="Contactați echipa B-CON Consulting pentru o discuție gratuită despre contractele dumneavoastră publice. Email: office@b-con.ro | Tel: 0758 231 666"
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
              Contact
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="contact-title">
              Hai să discutăm
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Completează formularul de mai jos sau contactează-ne direct. 
              Te vom contacta în cel mai scurt timp posibil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-8">
                Informații de contact
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-900 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-slate-900 mb-1">Email</h3>
                    <a 
                      href="mailto:office@bcon-consulting.ro"
                      className="text-slate-600 hover:text-burgundy-900 transition-colors"
                      data-testid="contact-email"
                    >
                      office@bcon-consulting.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-900 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-slate-900 mb-1">Telefon</h3>
                    <a 
                      href="tel:0758231666"
                      className="text-slate-600 hover:text-burgundy-900 transition-colors"
                      data-testid="contact-phone"
                    >
                      0758 231 666
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-slate-50 border-l-4 border-burgundy-900">
                <h3 className="font-heading font-semibold text-slate-900 mb-3">
                  Program de lucru
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Luni - Vineri: 09:00 - 18:00<br />
                  Sâmbătă - Duminică: Închis
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {submitted ? (
                <div className="bg-green-50 p-8 text-center" data-testid="contact-success-message">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-semibold text-slate-900 mb-3">
                    Mesaj trimis cu succes!
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Îți mulțumim pentru mesaj. Te vom contacta în cel mai scurt timp.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="rounded-none"
                    data-testid="contact-send-another"
                  >
                    Trimite alt mesaj
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nume complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ion Popescu"
                        className="rounded-none border-slate-200 focus:border-slate-900 h-12"
                        required
                        data-testid="contact-input-name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ion@companie.ro"
                        className="rounded-none border-slate-200 focus:border-slate-900 h-12"
                        required
                        data-testid="contact-input-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0758 231 666"
                        className="rounded-none border-slate-200 focus:border-slate-900 h-12"
                        data-testid="contact-input-phone"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Companie</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Numele companiei"
                        className="rounded-none border-slate-200 focus:border-slate-900 h-12"
                        data-testid="contact-input-company"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mesaj *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Descrie-ne cum te putem ajuta..."
                      rows={6}
                      className="rounded-none border-slate-200 focus:border-slate-900 resize-none"
                      required
                      data-testid="contact-input-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-burgundy-900 text-white hover:bg-burgundy-700 rounded-none py-6 font-semibold text-base group"
                    data-testid="contact-submit-button"
                  >
                    {loading ? (
                      "Se trimite..."
                    ) : (
                      <>
                        Trimite mesajul
                        <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>

                  <p className="text-slate-500 text-sm text-center">
                    Prin trimiterea formularului, ești de acord cu prelucrarea datelor personale.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
            Preferi să discutăm telefonic?
          </h2>
          <p className="text-slate-600 mb-6">
            Sună-ne direct și vom răspunde la întrebările tale.
          </p>
          <a href="tel:0758231666">
            <Button 
              variant="outline"
              className="border-slate-300 hover:border-slate-900 rounded-none px-8 py-4"
              data-testid="contact-call-button"
            >
              <Phone className="mr-2 h-4 w-4" />
              0758 231 666
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
