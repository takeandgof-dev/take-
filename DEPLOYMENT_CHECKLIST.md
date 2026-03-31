# 🚀 Deployment Checklist

## Pre-Deployment ✅

### Lokala Test (Köra lokalt)
- [ ] `npm run dev` startar utan fel
- [ ] Kan logga in på `/admin/login`
- [ ] Admin-panelen läses in korrekt
- [ ] Kan lägga till produkt via admin
- [ ] Kan redigera pris på produkt
- [ ] Kan ta bort produkt
- [ ] Erbjudandessidan visar menyalternativ
- [ ] Prisändringar syns på `/erbjudanden` inom 5 sekunder
- [ ] Design ser bra ut på mobil och desktop

### Databas Verificering
- [ ] Neon-databaskoppling fungerar
- [ ] `menu_categories` tabell finns
- [ ] `menu_items` tabell finns
- [ ] Testdata finns i databasen
- [ ] Kan läsa data från database
- [ ] Kan skriva data till database

### Firebase Verificering
- [ ] Firebase project är konfigurerad
- [ ] Autentiseringsuppgifter är rätt
- [ ] Kan logga in med Firebase
- [ ] Sessioner fungerar korrekt

### Miljövariabler (Lokalt)
- [ ] `.env.local` har `DATABASE_URL`
- [ ] `.env.local` har Firebase config vars
- [ ] Inga varningar i konsolen
- [ ] Build avslutas utan fel

---

## Deployment till Vercel 🚀

### Steg 1: GitHub Push
```bash
# Commit alla ändringar
git add .
git commit -m "Add offers page with admin panel and real-time updates"

# Push till GitHub
git push origin main
```
- [ ] GitHub-repot är uppdaterat

### Steg 2: Vercel Connection
- [ ] Vercel är kopplat till GitHub-repo
- [ ] Vercel auto-deploy är aktiverat
- [ ] Deploy startar automatiskt efter push

### Steg 3: Miljövariabler i Vercel
1. Logga in på [vercel.com](https://vercel.com)
2. Gå till projektets Settings
3. Gå till Environment Variables
4. Lägg till:
   - [ ] `DATABASE_URL` = Din Neon-koppling
   - [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
   - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - [ ] Övriga Firebase variabler

### Steg 4: Verifiera Deploy
- [ ] Vercel visar "Ready" status
- [ ] Build-loggen visar inga fel
- [ ] Preview-länk fungerar
- [ ] Production-länk fungerar

---

## Post-Deployment Tester 🧪

### Público Site
- [ ] Home page (`/`) laddar
- [ ] Header visar logo och navigation
- [ ] Erbjudandessida (`/erbjudanden`) laddar
- [ ] Menyalternativ visas med priser
- [ ] Navigation-länkar fungerar
- [ ] Mobile-responsivitet fungerar
- [ ] Bilder laddar snabbt

### Admin Panel
- [ ] Admin-login (`/admin/login`) fungerar
- [ ] Kan logga in med Firebase
- [ ] Admin-dashboard laddar
- [ ] Meny-fliken visar produkter
- [ ] Kan öppna "Lägg till produkt"-dialog
- [ ] Kan spara ny produkt
- [ ] Produkt dyker upp i listan
- [ ] Kan redigera pris
- [ ] Kan ta bort produkt (med bekräftelse)
- [ ] Kategorier-fliken fungerar

### Realtidsuppdateringar
- [ ] Ändra pris i admin
- [ ] Vänta 5 sekunder
- [ ] Gå till `/erbjudanden`
- [ ] Nya priset visas ✅
- [ ] Lägg till ny produkt i admin
- [ ] Vänta 5 sekunder
- [ ] Produkt visas på `/erbjudanden` ✅
- [ ] Ta bort produkt i admin
- [ ] Vänta 5 sekunder
- [ ] Produkt borta från `/erbjudanden` ✅

### Database Connectivity
- [ ] Data läses från Neon
- [ ] Data skrivs till Neon
- [ ] Inga SQL-fel i logs
- [ ] Performance är bra

### Performance
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 3s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Ingen 404-fel i console

---

## Monitoring Post-Launch 📊

### Daily (Första veckan)
- [ ] Check Vercel Analytics
- [ ] Check för error logs
- [ ] Verify databaskoppling
- [ ] Test admin panel funkar

### Weekly
- [ ] Granska Vercel uptime
- [ ] Check database performance
- [ ] Backup-kontroll
- [ ] Security audit

### Monthly
- [ ] Performance review
- [ ] Database size check
- [ ] Update dependencies
- [ ] Feature review

---

## Troubleshooting 🔧

### Om deploy misslyckas
1. Check Vercel build logs
2. Verifiera miljövariabler är satta
3. Check GitHub-konfiguration
4. Se till att `main`-branchen är pushad

### Om admin-login inte fungerar
1. Verifiera Firebase config i `env`
2. Test Firebase lokalt
3. Check Firebase-projektkonfiguration
4. Se till att Firebase är aktiverad

### Om databaskoppling misslyckas
1. Verifiera `DATABASE_URL` i Vercel
2. Test Neon-koppling lokalt
3. Check Neon-projektinställningar
4. Se till att databasen inte är låst

### Om `/erbjudanden` inte uppdateras
1. Check browser console för errors
2. Verifiera API-anrop i Network-tab
3. Kontrollera att data finns i databasen
4. Se till att 5-sekunderscycle körs

---

## Rollback Plan 🔄

Om något går fel:
```bash
# Gå tillbaka till tidigare version
git revert HEAD
git push origin main

# Vercel auto-deployar föregående version
```

---

## Go-Live Checklist ✅

### 24 timmar före launch
- [ ] Alla tester är godkända
- [ ] Dokumentation är uppdaterad
- [ ] Team är meddelad
- [ ] Backup är gjord

### Dag av launch
- [ ] Deploy är klar
- [ ] Admin kan logga in
- [ ] Alla sidor laddar
- [ ] Testdata är inlagd
- [ ] Länk är delad med kunder

### Efter launch (1 vecka)
- [ ] Samla feedback
- [ ] Fixa eventuella bugs
- [ ] Optimera baserat på analytics
- [ ] Uppdatera dokumentation

---

## Länkar & Resources

| Vad | Länk |
|-----|------|
| Vercel | https://vercel.com |
| GitHub | https://github.com |
| Neon | https://neon.tech |
| Firebase | https://firebase.google.com |
| Next.js Docs | https://nextjs.org/docs |

---

## Support Kontakter

| Problem | Kontakt |
|---------|---------|
| Vercel Deploy | Vercel Support |
| Neon Database | Neon Support |
| Firebase Auth | Firebase Support |
| Next.js | Next.js Discord |

---

## Notes

```
Datum: ___________
Deployad av: ___________
Status: ___________
Incidents: ___________
```

---

**Lycka till med launch! 🎉**
