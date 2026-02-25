# B-CON CONSULTING - PRD (Product Requirements Document)

## Problema Originală
Website profesional pentru B-CON CONSULTING - firmă de consultanță în construcții din România. Public țintă: antreprenori și firme de construcții cu contracte publice. Obiectiv principal: generare lead-uri prin formular de contact și CTA "Solicită o consultanță gratuită".

## Arhitectură
- **Frontend**: React 19 + TailwindCSS + Shadcn/UI + Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Email**: Resend (opțional, necesită cheie API)

## User Personas
1. **Antreprenor în construcții** - caută consultanță pentru contracte publice
2. **Manager de proiect** - are nevoie de asistență FIDIC și decontări
3. **Administrator website** - gestionează conținutul prin panoul admin

## Core Requirements (Static)
- Website multipage în limba română
- Design modern, minimalist, profesional
- Formular de contact cu salvare în DB + notificare email
- Panou admin pentru gestionarea conținutului
- SEO-ready

## Ce s-a Implementat

### Pagini Publice
- ✅ **Home** - Hero, Servicii, Comparație costuri (4 blocuri), De ce B-CON, CTA final
- ✅ **Despre Noi** - Prezentare firmă, Ce facem concret, Valori, Expertiză
- ✅ **Servicii** - 6 servicii detaliate cu beneficii
- ✅ **Blog** - Hero actualizat, filtre hardcodate (3 categorii), fără articole hardcodate (CMS extern)
- ✅ **Contact** - Formular funcțional cu salvare DB, număr real 0758 231 666
- ✅ **Termeni și Condiții** (`/termeni-si-conditii`)
- ✅ **Politică de Confidențialitate** (`/politica-confidentialitate`)
- ✅ **Politică de Cookies** (`/politica-cookies`)
- ✅ **404 Page** - Pagina personalizată cu logo, butoane navigare, header/footer

### SEO & Tehnic
- ✅ Meta title + description per pagină (toate 8 pagini)
- ✅ Favicon: `/public/bcon-logo.svg` referențiat în `index.html`
- ✅ Alt text descriptiv pentru toate imaginile
- ✅ Smooth scroll CSS global (`html { scroll-behavior: smooth }`)
- ✅ Animații scroll framer-motion pe toate paginile

### GDPR & Legal
- ✅ Banner cookies cu localStorage persistence (accept/esențiale/aflați mai multe)
- ✅ 3 pagini legale complete (Termeni, Confidențialitate, Cookies)

### Footer
- ✅ 4 coloane, date firmă complete (DAB Nexus S.R.L., CUI, J23, adresă)
- ✅ Număr real: 0758 231 666 | Email: office@b-con.ro
- ✅ Logo mărit (h-20), fără iconuri social media
- ✅ Linkuri legale verificate functional

### Footer
- ✅ Structură 4 coloane: Brand, Navigare, Servicii, Contact
- ✅ Date firmă: DAB Nexus S.R.L., CUI 46207927, J23/3449/27.05.2022, adresă Popești Leordeni
- ✅ Linkuri legale: Termeni, Confidențialitate, Cookies
- ✅ Email: office@b-con.ro | Social: LinkedIn, Facebook

### Backend API
- ✅ Endpoint contact form (POST /api/contact)
- ✅ CRUD Blog posts
- ✅ Autentificare admin JWT
- ✅ Trimitere email via Resend (necesită cheie API)

### Admin Panel
- ✅ Login admin cu JWT
- ✅ Dashboard cu statistici
- ✅ Gestionare articole blog (CRUD)
- ✅ Vizualizare mesaje contact

### Design & UX
- ✅ Header sticky cu logo mărit
- ✅ Mobile responsive (menu, hero, servicii, CTA)
- ✅ ScrollToTop la schimbarea rutei
- ✅ Logo transparent (fără fundal alb)

## Prioritized Backlog

### P0 (Critical) - DONE
- [x] Homepage funcțională
- [x] Contact form cu salvare DB
- [x] Navigație responsive
- [x] Pagini legale (Termeni, Confidențialitate, Cookies)
- [x] Footer complet cu date firmă

### P1 (Important)
- [ ] Număr telefon real în footer (înlocuire placeholder +40 7XX XXX XXX)
- [ ] SEO meta tags per pagină
- [ ] Admin panel - testare end-to-end completă

### P2 (Nice to Have)
- [ ] Re-adăugare pagină Portofoliu (la cerere utilizator)
- [ ] Google Analytics integration
- [ ] Newsletter subscription funcțional (backend)
- [ ] Rich text editor pentru blog admin
- [ ] Căutare în blog

## Next Steps
1. Actualizare număr telefon real în Footer.jsx
2. Testare end-to-end admin panel (CRUD blog)
3. Adaugă cheie Resend API pentru email notifications
4. Adaugă meta descriptions pentru SEO
