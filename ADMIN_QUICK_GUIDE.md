# Admin Panel - Snabbguide

## 🔐 Logga in
1. Gå till `/admin/login`
2. Ange Firebase-uppgifter

---

## ➕ Lägg till ny produkt

1. **Meny-fliken** → Klicka **"+ Lägg till produkt"**
2. Fyll i:
   - **Namn**: "Margherita"
   - **Beskrivning**: "Tomatsås, mozzarella, basilika"
   - **Pris**: "99" (bara siffror)
   - **Kategori**: Välja från dropdown
3. **Spara** → Produkten läggs till!

---

## ✏️ Ändra pris eller namn

1. **Meny-fliken** → Hitta produkten
2. Klicka **pennsymbolen** 🖊️
3. Ändra:
   - Pris
   - Namn
   - Beskrivning
   - Kategori
4. **Spara** → Uppdaterat!

### Tips: Ändringar visas på `/erbjudanden` inom 5 sekunder!

---

## ❌ Ta bort produkt

1. **Meny-fliken** → Hitta produkten
2. Klicka **papperskorgen** 🗑️
3. **Bekräfta** borttagningen
4. Produkten är borta!

---

## 📁 Hantera kategorier

### Lägg till kategori
1. **Kategorier-fliken** → **"+ Lägg till kategori"**
2. Ange namn: "Sallader"
3. **Spara**

### Ändra kategori
1. **Kategorier-fliken** → Klicka pennsymbolen
2. Ändra namn
3. **Spara**

### Ta bort kategori
1. **Kategorier-fliken** → Klicka papperskorgen
2. **Bekräfta**

---

## 🔍 Filtrera produkter

**Meny-fliken** → Dropdown i övre högra hörnet:
- **Alla** = Visa alla produkter
- **Pizzor** = Bara pizzor
- **Burgare** = Bara burgare
- etc.

---

## 🏷️ Etiketter

Markera produkter:
- ✅ **Vegetarisk** = Har inget kött
- ✅ **Stark** = Innehåller stark krydda

---

## 🔄 Uppdatera sidan

Knappen i övre höger hörn: **Uppdatera** 🔄
- Laddar in senaste data från databasen

---

## 🌐 Se erbjudandessidan

**Knappen "Erbjudanden"** i admin-panelen
- Eller gå direkt till `/erbjudanden`
- Visar all meny för besökare

---

## 💾 Spara ändringar

**Allt sparas automatiskt** när du klickar "Spara":
- ✅ Sparas i databasen
- ✅ Visas på erbjudandessidan
- ✅ Besökare ser uppdateringar inom 5 sekunder

---

## 🔄 Importera fullständig meny

**"Importera fullständig meny"** knapp:
- Laddar all denna test-data
- Använd för att fylla databasen med exempel

---

## 📌 Keyboard Shortcuts

| Åtgärd | Genväg |
|--------|---------|
| Spara | `Ctrl + S` (i form-fältet) |
| Fokus nästa fält | `Tab` |
| Markera checkbox | `Space` |

---

## ⚠️ Vanliga misstag

### "Produkten sparas inte"
- ❌ Du klickade inte "Spara"
- ✅ Klicka **Spara** efter ändringar

### "Priset visar inte rätt på erbjudandessidan"
- ❌ Vänta inte tillräckligt länge
- ✅ Vänta 5 sekunder eller ladda om sidan

### "Kan inte logga in"
- ❌ Fel Firebase-uppgifter
- ✅ Kontrollera användarnamn/lösenord

---

## 🎯 Vanliga uppgifter

### Dagligt: Uppdatera priset på en pizza
1. **Meny** → Hitta pizzan → ✏️ → Ändra pris → **Spara**
2. **Done!** Priset uppdateras på webbplatsen

### Veckovis: Lägg till ny produkt
1. **Meny** → **+ Lägg till** → Fyll i → **Spara**
2. Produkten syns på `/erbjudanden` direkt!

### Månatligt: Helt nytt utbud
1. **Kategorier** → Lägg till ny → Skapa produkter
2. Eller ta bort gamla och lägg till nya

---

## 📊 Statistik

**Visa antal:**
- Meny-fliken visar: "Menyprodukter (X stycken)"
- Uppdateras automatiskt när du lägger till/tar bort

---

## 🎨 Användbarhetsips

- Använd **kort och tydliga namn** för produkter
- **Beskrivningar** är valfria men rekommenderade
- **Priser** - bara siffror (99, inte 99 kr)
- **Kategori** måste väljas för varje produkt

---

## 🚀 Nästa steg

1. ✅ Logga in på admin
2. ✅ Lägg till/ändra en produkt
3. ✅ Gå till `/erbjudanden` och se uppdateringen
4. ✅ Publicera på Vercel!

**Lycka till! 🎉**
