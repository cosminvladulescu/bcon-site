import { motion } from "framer-motion";
import PageMeta from "@/components/PageMeta";

const TermsPage = () => {
  return (
    <div className="pt-20 bg-[#F9FAFB] min-h-screen" data-testid="terms-page">
      <PageMeta
        title="Termeni și Condiții | B-CON Consulting"
        description="Termenii și condițiile de utilizare ale site-ului B-CON Consulting, operat de DAB Nexus S.R.L."
      />
      <div className="max-w-[800px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-burgundy-900 mb-2">
            Termeni și Condiții de Utilizare
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Ultima actualizare: februarie 2025
          </p>

          <div className="prose prose-slate max-w-none text-[#1F2937]">
            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">1. Informații Generale</h2>
            <p className="leading-relaxed mb-4">
              Prezentul site web, disponibil la adresa www.b-con.ro, este operat de DAB Nexus S.R.L., înregistrată la Registrul Comerțului sub nr. J23/3449/27.05.2022, CUI 46207927, cu sediul social în Strada Drumul Fermei, nr. 74, Bloc 13C, Ap. 8, Popești Leordeni, Ilfov, denumită în continuare "B-CON Consulting", "noi" sau "firma".
            </p>
            <p className="leading-relaxed mb-4">
              Prin accesarea și utilizarea acestui site, confirmați că ați citit, înțeles și acceptat în totalitate prezenții Termeni și Condiții. Dacă nu sunteți de acord cu oricare dintre prevederile de mai jos, vă rugăm să nu utilizați acest site.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">2. Obiectul Site-ului</h2>
            <p className="leading-relaxed mb-4">
              Site-ul b-con.ro este un site de prezentare a serviciilor de consultanță tehnică și contractuală oferite de B-CON Consulting în domeniul construcțiilor și al contractelor publice din România. Informațiile prezentate pe site au caracter general și informativ și nu constituie consultanță juridică, financiară sau tehnică specifică situației dumneavoastră.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">3. Proprietate Intelectuală</h2>
            <p className="leading-relaxed mb-4">
              Toate elementele de conținut prezente pe acest site — inclusiv, dar fără a se limita la: texte, logo-uri, imagini, grafice, structura și design-ul paginilor — sunt proprietatea exclusivă a DAB Nexus S.R.L. sau sunt utilizate cu acordul deținătorilor de drepturi și sunt protejate de legislația română și europeană privind drepturile de autor și proprietatea intelectuală.
            </p>
            <p className="leading-relaxed mb-4">
              Este interzisă reproducerea, distribuirea, modificarea sau utilizarea în orice scop comercial a oricărui element de pe acest site fără acordul scris prealabil al B-CON Consulting. Utilizarea în scop personal și necomercial a informațiilor de pe site este permisă cu condiția menționării sursei.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">4. Limitarea Răspunderii</h2>
            <p className="leading-relaxed mb-4">
              B-CON Consulting depune toate eforturile pentru a menține informațiile de pe site actualizate și corecte, însă nu garantează exhaustivitatea, acuratețea sau actualitatea acestora la orice moment în timp.
            </p>
            <p className="leading-relaxed mb-4">
              B-CON Consulting nu își asumă răspunderea pentru eventuale prejudicii directe sau indirecte rezultate din utilizarea informațiilor prezentate pe site, din imposibilitatea temporară de accesare a site-ului, din erori tehnice sau întreruperi ale serviciului de hosting, sau din accesarea unor linkuri externe către site-uri terțe.
            </p>
            <p className="leading-relaxed mb-4">
              Informațiile despre legislație (Legea 98/2016, HG1, proceduri ANAP, FIDIC etc.) prezentate pe site reflectă cadrul legal la data publicării și pot fi modificate prin acte normative ulterioare. Vă recomandăm verificarea legislației în vigoare înainte de luarea oricărei decizii.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">5. Linkuri către Site-uri Terțe</h2>
            <p className="leading-relaxed mb-4">
              Site-ul poate conține linkuri către site-uri externe (ex. ANAP, SEAP, ANSPDCP, asociații profesionale). Aceste linkuri sunt oferite exclusiv pentru informarea dumneavoastră. B-CON Consulting nu controlează și nu își asumă răspunderea pentru conținutul, politicile de confidențialitate sau practicile site-urilor terțe.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">6. Serviciile Oferite</h2>
            <p className="leading-relaxed mb-4">
              Informațiile prezentate pe site privind serviciile B-CON Consulting (consultanță contracte publice, ofertare SEAP, decontare și situații de lucrări, claim management, consultanță FIDIC) au caracter orientativ. Prestarea efectivă a oricărui serviciu se realizează exclusiv în baza unui contract scris semnat între DAB Nexus S.R.L. și client, care va reglementa în detaliu obiectul, prețul, termenele și condițiile specifice colaborării.
            </p>
            <p className="leading-relaxed mb-4">
              Nicio informație prezentată pe acest site nu constituie o ofertă fermă sau un angajament contractual din partea B-CON Consulting.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">7. Confidențialitatea Datelor</h2>
            <p className="leading-relaxed mb-4">
              Prelucrarea datelor personale colectate prin intermediul acestui site se realizează în conformitate cu Politica de Confidențialitate, disponibilă la secțiunea dedicată a site-ului. Prin utilizarea formularului de contact sau a oricărui alt mijloc de comunicare disponibil pe site, vă exprimați acordul cu privire la prelucrarea datelor transmise în scopul răspunsului la solicitarea dumneavoastră.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">8. Cookies</h2>
            <p className="leading-relaxed mb-4">
              Utilizarea cookies pe acest site este reglementată de Politica de Cookies, disponibilă la secțiunea dedicată. Prin continuarea navigării după afișarea bannerului de informare, vă exprimați acordul cu privire la utilizarea cookies în conformitate cu preferințele selectate.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">9. Conduita Utilizatorilor</h2>
            <p className="leading-relaxed mb-4">
              Utilizatorii site-ului se angajează să nu folosească site-ul în scopuri ilegale sau contrare bunelor moravuri, să nu încerce să acceseze neautorizat sistemele informatice ale B-CON Consulting, să nu transmită prin intermediul formularelor de contact conținut ofensator, spam sau programe malițioase și să nu reproducă sau distribuie conținutul site-ului fără acordul scris al firmei.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">10. Modificarea Termenilor și Condițiilor</h2>
            <p className="leading-relaxed mb-4">
              B-CON Consulting își rezervă dreptul de a modifica în orice moment prezenții Termeni și Condiții, fără notificare prealabilă. Versiunea actualizată va fi publicată pe site cu data revizuirii. Continuarea utilizării site-ului după publicarea modificărilor constituie acceptarea noilor termeni.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">11. Legea Aplicabilă și Jurisdicția</h2>
            <p className="leading-relaxed mb-4">
              Prezenții Termeni și Condiții sunt guvernați de legislația română în vigoare. Orice litigiu decurgând din utilizarea acestui site va fi soluționat pe cale amiabilă, iar în caz de eșec, de instanțele judecătorești competente din România.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">12. Contact</h2>
            <p className="leading-relaxed mb-4">
              Pentru orice întrebări legate de prezenții Termeni și Condiții, ne puteți contacta la:
            </p>
            <p className="leading-relaxed mb-2">
              <strong>Email:</strong> office@b-con.ro
            </p>
            <p className="leading-relaxed">
              <strong>Adresă poștală:</strong> Strada Drumul Fermei, nr. 74, Bloc 13C, Ap. 8, Popești Leordeni, Ilfov, România
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
