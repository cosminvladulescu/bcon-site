import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("bcon_cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("bcon_cookie_consent", "all");
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("bcon_cookie_consent", "essential");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] bg-slate-900 border-t-2 border-burgundy-900"
      data-testid="cookie-banner"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-4 md:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-slate-300 text-sm leading-relaxed flex-1">
            Folosim cookies pentru a îmbunătăți experiența ta pe site. Prin continuarea navigării, ești de acord cu utilizarea acestora.{" "}
            <Link
              to="/politica-cookies"
              className="text-burgundy-400 hover:text-white underline underline-offset-2 transition-colors whitespace-nowrap"
              data-testid="cookie-learn-more"
            >
              Află mai multe
            </Link>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:flex-shrink-0">
            <button
              onClick={handleEssentialOnly}
              className="px-5 py-2.5 text-sm font-medium border border-burgundy-900 text-burgundy-400 hover:bg-burgundy-900 hover:text-white transition-colors"
              data-testid="cookie-essential-btn"
            >
              Doar esențiale
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-5 py-2.5 text-sm font-medium bg-burgundy-900 text-white hover:bg-burgundy-700 transition-colors"
              data-testid="cookie-accept-btn"
            >
              Accept toate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
