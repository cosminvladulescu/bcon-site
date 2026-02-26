import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import footerContent from "../content/footer.json";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_buildtech-romania/artifacts/f06mkb4m_Red%20Black%20Geometric%20Construction%20Architecture%20Logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Helpers
  const withYear = (text) => (text || "").replace("{{year}}", String(currentYear));

  const phoneRaw = (footerContent?.contact?.phone || "").replace(/\s+/g, "");
  const email = footerContent?.contact?.email || "";

  // columns: [{ title, links: [{label, href}]}]
  const columns = Array.isArray(footerContent?.columns) ? footerContent.columns : [];

  // fallback în caz că footer.json e gol / incomplet
  const navLinks = columns[0]?.links || [];
  const serviceLinks = columns[1]?.links || [];

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
                background: "transparent",
                backgroundColor: "transparent",
              }}
            />
            <p className="text-slate-400 text-sm leading-relaxed">
              {footerContent?.brandDescription ||
                "Consultanță profesională în construcții și infrastructură pentru proiecte publice din România."}
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">
              {columns[0]?.title || "Navigare"}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                    data-testid={`footer-link-${(link.href || "").replace("/", "") || "home"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">
              {columns[1]?.title || "Servicii"}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.href + service.label}>
                  <Link
                    to={service.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">Contact</h4>
            <ul className="space-y-4">
              {email ? (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
                    data-testid="footer-email"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    {email}
                  </a>
                </li>
              ) : null}

              {phoneRaw ? (
                <li>
                  <a
                    href={`tel:${phoneRaw}`}
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
                    data-testid="footer-phone"
                  >
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    {footerContent?.contact?.phone}
                  </a>
                </li>
              ) : null}

              {footerContent?.contact?.location ? (
                <li className="text-slate-400 text-sm">{footerContent.contact.location}</li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-slate-800 mt-10 pt-6">
          {/* Company Legal Info */}
          {footerContent?.companyLegal ? (
            <p className="text-[12px] text-[#9CA3AF] leading-relaxed mb-4 text-center lg:text-left">
              {footerContent.companyLegal}
            </p>
          ) : null}

          {/* Copyright & Legal Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-[#9CA3AF]">
              {withYear(footerContent?.legal?.copyright) ||
                `© ${currentYear} — Toate drepturile rezervate`}
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {(footerContent?.legalLinks || []).map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-[12px] text-[#9CA3AF] hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}

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