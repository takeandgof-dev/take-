# Take & Go Falkenberg - Inställningsguide

## Funktioner som är implementerade

### 1. Erbjudandessida (`/erbjudanden`)
- Visar alla menyalternativ organiserade efter kategori
- Visar pris, namn, beskrivning för varje produkt
- Uppdateras automatiskt när ändringar görs i admin-panelen
- Hämtar data var 5:e sekund för realtidsuppdateringar

### 2. Admin Panel (`/admin`)
- **Meny-flik**: Hantera alla pizzor, burgare, kebab etc.
  - Lägg till nya produkter
  - Redigera namn och pris på befintliga produkter
  - Ta bort produkter från menyn
  - Markera som vegetarisk/stark
  
- **Kategorier-flik**: Hantera matkategorier
  - Lägg till nya kategorier
  - Redigera kategorinamn

### 3. Realtidsuppdateringar
- Alla ändringar i admin-panelen sparas direkt i databasen
- Erbjudandessidan hämtar uppdaterad data automatiskt
- Besökare ser alltid de senaste priserna och menyalternativ

---

## Så använder du admin-panelen

### Steg 1: Logga in
1. Gå till `/admin/login`
2. Ange dina FireBase-autentiseringsuppgifter

### Steg 2: Lägg till eller ändra produkter

#### Lägga till en ny pizza/produkt:
1. Klicka på "Lägg till produkt" (+ knapp)
2. Fyll i:
   - **Namn**: t.ex. "Margherita"
   - **Beskrivning**: t.ex. "Tomatsås, ost, basilika"
   - **Pris**: t.ex. "99"
   - **Kategori**: Välj "Pizzor"
   - **Vegetarisk**: Markera om den är vegetarisk
   - **Stark**: Markera om den är stark
3. Klicka "Spara"

#### Ändra pris på en befintlig pizza:
1. Klicka på pennsymbolen på pizzan
2. Ändra priset
3. Klicka "Spara"

#### Ta bort en pizza:
1. Klicka på papperskorgen på pizzan
2. Bekräfta borttagningen

### Steg 3: Visa erbjudandessidan
1. Från admin-panelen, klicka "Erbjudanden"
2. Eller gå direkt till `/erbjudanden`
3. Du ser alla produkter med uppdaterade priser

---

## Databaskonfiguration

Databasen är redan satt upp med följande tabeller:

### `menu_categories`
- Lagrar matkategorier (Pizzor, Burgare, Kebab, etc.)
- Tabellen redan fylld med data

### `menu_items`
- Lagrar alla menyalternativ
- Kolumner: `id`, `name`, `price`, `description`, `category_id`, `is_available`, etc.
- Redan fylld med data

---

## API-Endpoints

### GET /api/menu/items
- Hämtar alla menyalternativ
- Query: `?available=true` (endast tillgängliga)

### POST /api/menu/items
- Skapar ny menyprodukt
- Body: `{ name, price, description, category_id, ... }`

### PUT /api/menu/items
- Uppdaterar menyprodukt
- Body: `{ id, data: { name, price, ... } }`

### DELETE /api/menu/items
- Tar bort menyprodukt
- Query: `?id={item_id}`

### GET /api/menu/categories
- Hämtar alla kategorier

### POST /api/menu/categories
- Skapar ny kategori

---

## Troubleshooting

### Ändringar visas inte på erbjudandessidan
- Vänta 5 sekunder (hämtningsintervallet)
- Eller ladda om sidan manuellt

### Kan inte logga in på admin
- Se till att Firebase är konfigurerat
- Kontrollera miljövariabler

### Priser visar inte rätt
- Kontrollera att du sparade ändringarna
- Se databasen direkt om värdet är uppdaterat

---

## Menystruktur (redan inladd)

### Pizzor
- Margherita, Pepperoni, Vegetarisk, etc.

### Burgare
- Klassisk, BBQ, Husburgare, etc.

### Kebab
- Kyckeling, Nötkött, Vegetarisk, etc.

Alla produkter och kategorier kan ändras från admin-panelen.

---

## Nästa steg

1. ✅ Logga in på admin-panelen
2. ✅ Testa att ändra ett pris
3. ✅ Besök erbjudandessidan och se uppdaterningen
4. ✅ Publicera till Vercel för att live-sidan ska uppdateras
