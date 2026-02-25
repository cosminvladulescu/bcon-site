import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_buildtech-romania/artifacts/f06mkb4m_Red%20Black%20Geometric%20Construction%20Architecture%20Logo.svg";

const navLinks = [
{ name: "Acasă", path: "/" },
{ name: "Despre Noi", path: "/despre-noi" },
{ name: "Servicii", path: "/servicii" },
{ name: "Blog", path: "/blog" },
{ name: "Contact", path: "/contact" }];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ?
      "bg-[#E9EDF2] shadow-md" :
      "bg-[#E9EDF2]/95 backdrop-blur-sm"}`
      }
      data-testid="navbar">

      <nav className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Brand asset, no container styling */}
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <img
              src={LOGO_URL}
              alt="B-CON Consulting logo"
              className="h-40 mdw-auto block"
              style={{
                background: 'transparent',
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                outline: 'none'
              }} />

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium text-sm tracking-wide transition-all duration-200 relative group ${
              isActive(link.path) ?
              "text-slate-900" :
              "text-slate-600 hover:text-burgundy-900"}`
              }
              data-testid={`nav-link-${link.path.replace("/", "") || "home"}`}>

                {link.name}
                {/* Hover underline accent */}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-burgundy-900 transition-all duration-300 ${
              isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"}`
              } />
              </Link>
            )}
          </div>

          {/* Empty div for spacing balance */}
          <div className="hidden lg:block w-14" />

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-900"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle">

            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden">

              <div className="py-4 space-y-1 border-t border-slate-200">
                {navLinks.map((link) =>
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 font-medium transition-colors rounded ${
                isActive(link.path) ?
                "text-burgundy-900 bg-slate-100" :
                "text-slate-700 hover:text-burgundy-900 hover:bg-slate-50"}`
                }
                data-testid={`mobile-nav-link-${link.path.replace("/", "") || "home"}`}>

                    {link.name}
                  </Link>
              )}
                <div className="pt-4 px-4">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <Button
                    className="w-full text-white hover:opacity-90 rounded-none py-3 font-semibold"
                    style={{ backgroundColor: '#7F1D1D' }}
                    data-testid="cta-button-mobile">

                      Discută cu echipa B-CON
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </nav>
    </header>);

};

export default Navbar;