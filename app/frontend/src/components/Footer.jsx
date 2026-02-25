import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_buildtech-romania/artifacts/f06mkb4m_Red%20Black%20Geometric%20Construction%20Architecture%20Logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Acasă", path: "/" },
    { name: "Despre Noi", path: "/despre-noi" },
    { name: "Servicii", path: "/servicii" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const serviceLinks = [
    { name: "Consultanță Contracte Publice", path: "/servicii" },
    { name: "Ofertare SEAP", path: "/servicii" },
    { name: "Decontare & Situații de Lucrări", path: "/servicii" },
    { name: "Claim Management", path: "/servicii" },
    { name: "Consultanță FIDIC", path: "/servicii" },
  ];

  return (
    <footer className="bg-slate-900 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img 
              src={LOGO_URL} 
              alt="B-CON Consulting logo" 
              className="h-20 w-auto mb-6"
              style={{ 
                background: 'transparent',
                backgroundColor: 'transparent',
              }}
            />
            <p className="text-slate-400 text-sm leading-relaxed">
              Consultanță profesională în construcții și infrastructură pentru proiecte publice din România.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">Navigare</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                    data-testid={`footer-link-${link.path.replace("/", "") || "home"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">Servicii</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service, idx) => (
                <li key={idx}>
                  <Link 
                    to={service.path}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:office@b-con.ro" 
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
                  data-testid="footer-email"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  office@b-con.ro
                </a>
              </li>
              <li>
                <a 
                  href="tel:0758231666" 
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
                  data-testid="footer-phone"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  0758 231 666
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-slate-800 mt-10 pt-6">
          {/* Company Legal Info */}
          <p className="text-[12px] text-[#9CA3AF] leading-relaxed mb-4 text-center lg:text-left">
            DAB Nexus S.R.L. | CUI: 46207927 | J23/3449/27.05.2022 | Sediul social: Strada Drumul Fermei, nr. 74, Bloc 13C, Ap. 8, Popești Leordeni, Ilfov
          </p>

          {/* Copyright & Legal Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-[#9CA3AF]">
              © {currentYear} DAB Nexus S.R.L. — Toate drepturile rezervate
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link 
                to="/termeni-si-conditii" 
                className="text-[12px] text-[#9CA3AF] hover:text-white transition-colors"
              >
                Termeni și Condiții
              </Link>
              <Link 
                to="/politica-confidentialitate" 
                className="text-[12px] text-[#9CA3AF] hover:text-white transition-colors"
              >
                Politica de Confidențialitate
              </Link>
              <Link 
                to="/politica-cookies" 
                className="text-[12px] text-[#9CA3AF] hover:text-white transition-colors"
              >
                Politica de Cookies
              </Link>
              <Link 
                to="/admin/login" 
                className="text-[12px] text-slate-700 hover:text-slate-500 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
