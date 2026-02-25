import { motion } from "framer-motion";
import PageMeta from "@/components/PageMeta";

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-20 bg-[#F9FAFB] min-h-screen" data-testid="privacy-policy-page">
      <PageMeta
        title="Politica de Confidențialitate | B-CON Consulting"
        description="Informații despre prelucrarea datelor personale de către DAB Nexus S.R.L. în conformitate cu GDPR."
      />
      <div className="max-w-[800px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-burgundy-900 mb-2">
            Politica de Confidențialitate
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Ultima actualizare: februarie 2025
          </p>

          <div className="prose prose-slate max-w-none text-[#1F2937]">
            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">1. Identitatea Operatorului de Date</h2>
            <p className="leading-relaxed mb-4">
              Datele dumneavoastră personale sunt prelucrate de:
            </p>
            <p className="leading-relaxed mb-4">
              <strong>DAB Nexus S.R.L.</strong>, cu sediul social în Strada Drumul Fermei, nr. 74, Bloc 13C, Ap. 8, Popești Leordeni, Ilfov, înregistrată la Registrul Comerțului sub nr. J23/3449/27.05.2022, CUI 46207927, denumită în continuare "B-CON Consulting" sau "noi".
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Email:</strong> office@b-con.ro
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">2. Ce Date Personale Colectăm</h2>
            <p className="leading-relaxed mb-4">
              <strong>Date transmise voluntar de dumneavoastră</strong>, prin formularul de contact sau prin mesaje directe: numele și prenumele, adresa de email, numărul de telefon, denumirea firmei pe care o reprezentați și conținutul mesajului transmis.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Date colectate automat</strong> în momentul vizitării site-ului: adresa IP, tipul browserului, dispozitivul folosit, paginile vizitate și durata sesiunii.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">3. Scopul și Temeiul Legal al Prelucrării</h2>
            <p className="leading-relaxed mb-4">
              Prelucrăm datele dumneavoastră pentru a răspunde solicitărilor de consultanță și ofertare — temeiul legal fiind interesul nostru legitim și executarea unui contract (Art. 6 alin. 1 lit. b și f din GDPR), pentru a vă transmite informații despre serviciile noastre dacă ne-ați acordat consimțământul (Art. 6 alin. 1 lit. a din GDPR), și pentru îndeplinirea obligațiilor legale care ne revin (Art. 6 alin. 1 lit. c din GDPR).
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">4. Durata Păstrării Datelor</h2>
            <p className="leading-relaxed mb-4">
              Datele transmise prin formularul de contact sunt păstrate maximum 3 ani de la ultima interacțiune. Datele din contracte și documente contabile sunt păstrate conform termenelor legale aplicabile. Datele prelucrate pe baza consimțământului sunt șterse la retragerea acestuia.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">5. Destinatarii Datelor</h2>
            <p className="leading-relaxed mb-4">
              Nu vindem și nu închiriem datele dumneavoastră. Acestea pot fi accesate de furnizorii noștri de servicii IT și hosting, exclusiv în baza unor contracte de prelucrare, și de autoritățile publice, doar când există o obligație legală în acest sens.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">6. Drepturile Dumneavoastră</h2>
            <p className="leading-relaxed mb-4">
              Conform GDPR, aveți dreptul de acces la datele deținute despre dumneavoastră, dreptul la rectificarea datelor inexacte, dreptul la ștergerea datelor ("dreptul de a fi uitat"), dreptul la restricționarea prelucrării, dreptul la portabilitatea datelor, dreptul de a vă opune prelucrării și dreptul de a retrage consimțământul în orice moment.
            </p>
            <p className="leading-relaxed mb-4">
              Pentru exercitarea acestor drepturi, ne puteți contacta la <a href="mailto:office@b-con.ro" className="text-burgundy-900 hover:underline">office@b-con.ro</a>. Aveți de asemenea dreptul de a depune o plângere la ANSPDCP — Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal: <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-burgundy-900 hover:underline">www.dataprotection.ro</a>.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">7. Securitatea Datelor</h2>
            <p className="leading-relaxed mb-4">
              Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor dumneavoastră, inclusiv conexiuni securizate HTTPS și acces restricționat la sistemele interne.
            </p>

            <hr className="border-slate-200 my-8" />

            <h2 className="font-heading text-xl font-semibold text-slate-900 mt-8 mb-4">8. Modificări ale Politicii</h2>
            <p className="leading-relaxed mb-4">
              Ne rezervăm dreptul de a actualiza această politică periodic. Orice modificare va fi reflectată prin actualizarea datei din antetul documentului.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
