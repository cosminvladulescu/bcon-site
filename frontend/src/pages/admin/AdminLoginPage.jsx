import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_buildtech-romania/artifacts/f06mkb4m_Red%20Black%20Geometric%20Construction%20Architecture%20Logo.svg";
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await axios.post(`${API}/admin/login`, {
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem("admin_token", response.data.access_token);
        toast.success("Autentificare reușită!");
        navigate("/admin");
      } else {
        const response = await axios.post(`${API}/admin/register`, {
          email: formData.email,
          password: formData.password,
          name: formData.name
        });
        localStorage.setItem("admin_token", response.data.access_token);
        toast.success("Cont creat cu succes!");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(error.response?.data?.detail || "A apărut o eroare. Încercați din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6" data-testid="admin-login-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img 
            src={LOGO_URL} 
            alt="B-CON Consulting" 
            className="h-16 mx-auto mb-6 brightness-0 invert"
          />
          <h1 className="font-heading text-2xl font-bold text-white mb-2">
            {isLogin ? "Autentificare Admin" : "Creare Cont Admin"}
          </h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? "Accesează panoul de administrare" : "Creează un cont nou de administrator"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-6" data-testid="admin-login-form">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Nume complet</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ion Popescu"
                className="rounded-none h-12"
                required={!isLogin}
                data-testid="admin-input-name"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@bcon.ro"
              className="rounded-none h-12"
              required
              data-testid="admin-input-email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Parolă</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="rounded-none h-12 pr-12"
                required
                data-testid="admin-input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-none py-6 font-semibold"
            data-testid="admin-submit-button"
          >
            {loading ? (
              "Se procesează..."
            ) : (
              <>
                <LogIn className="mr-2 h-5 w-5" />
                {isLogin ? "Autentificare" : "Creare cont"}
              </>
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-600 hover:text-burgundy-900 text-sm transition-colors"
              data-testid="admin-toggle-form"
            >
              {isLogin ? "Nu ai cont? Creează unul nou" : "Ai deja cont? Autentifică-te"}
            </button>
          </div>
        </form>

        <p className="text-center text-slate-500 text-xs mt-6">
          <a href="/" className="hover:text-white transition-colors">
            ← Înapoi la site
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
