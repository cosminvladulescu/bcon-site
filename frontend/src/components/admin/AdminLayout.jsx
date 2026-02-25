import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  FolderOpen,
  Star,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_buildtech-romania/artifacts/f06mkb4m_Red%20Black%20Geometric%20Construction%20Architecture%20Logo.svg";
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const response = await axios.get(`${API}/admin/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500">Se încarcă...</p>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Articole Blog", icon: FileText, path: "/admin", hash: "blog" },
    { name: "Mesaje Contact", icon: MessageSquare, path: "/admin", hash: "contacts" },
    { name: "Proiecte", icon: FolderOpen, path: "/admin", hash: "projects" },
    { name: "Testimoniale", icon: Star, path: "/admin", hash: "testimonials" }
  ];

  return (
    <div className="min-h-screen bg-slate-100" data-testid="admin-layout">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white z-50 h-16 flex items-center justify-between px-4">
        <img src={LOGO_URL} alt="B-CON" className="h-10 brightness-0 invert" />
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-40 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        data-testid="admin-sidebar"
      >
        <div className="p-6 border-b border-slate-800 hidden lg:block">
          <img src={LOGO_URL} alt="B-CON Consulting" className="h-12 brightness-0 invert" />
        </div>

        <nav className="p-4 mt-16 lg:mt-0">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.hash ? `${item.path}#${item.hash}` : item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                  data-testid={`admin-nav-${item.name.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || "Admin"}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded"
            data-testid="admin-logout-button"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Deconectare
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <Outlet context={{ user }} />
      </main>
    </div>
  );
};

export default AdminLayout;
