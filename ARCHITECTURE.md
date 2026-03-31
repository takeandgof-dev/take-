# 🏗️ Systemarkitektur - Take & Go Falkenberg

## Systemöversikt

```
┌─────────────────────────────────────────────────────────────┐
│                    TAKE & GO FALKENBERG                      │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                       FRONTEND (Next.js)                      │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────┐    ┌─────────────────────────┐    │
│  │   STARTSIDA (/)      │    │  ERBJUDANDEN PAGE       │    │
│  │  ├─ Hero-sektion     │    │  (/erbjudanden)         │    │
│  │  ├─ Meny preview     │    │  ├─ Kategori-tabs      │    │
│  │  ├─ Öppettider       │    │  ├─ Produktkort        │    │
│  │  └─ Kontakt          │    │  ├─ Priser             │    │
│  │                      │    │  ├─ Auto-refresh (5s)  │    │
│  └──────────────────────┘    │  └─ Vegetarisk/Stark   │    │
│                               │     badges             │    │
│  ┌──────────────────────┐    │                        │    │
│  │  ADMIN PANEL         │    │  API REQUESTS:         │    │
│  │  (/admin)            │    │  • GET /api/menu/items │    │
│  │  ├─ Meny-flik        │    │  • GET /api/menu/      │    │
│  │  │  ├─ Lägg till +   │    │    categories          │    │
│  │  │  ├─ Redigera ✏️   │    │  (Var 5:e sekund)     │    │
│  │  │  └─ Ta bort ❌    │    │                        │    │
│  │  │                   │    │                        │    │
│  │  ├─ Kategorier       │    │                        │    │
│  │  │  └─ Hantera       │    │                        │    │
│  │  │                   │    │                        │    │
│  │  ├─ API REQUESTS:    │    │                        │    │
│  │  │ • POST /api/menu/ │    │                        │    │
│  │  │   items (CREATE)  │    │                        │    │
│  │  │ • PUT /api/menu/  │    │                        │    │
│  │  │   items (UPDATE)  │    │                        │    │
│  │  │ • DELETE /api/    │    │                        │    │
│  │  │   menu/items      │    │                        │    │
│  │  └─ FireBase Auth    │    │                        │    │
│  │     (/admin/login)   │    │                        │    │
│  └──────────────────────┘    └─────────────────────────┘    │
│                                                               │
└──────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                    API LAYER (Route Handlers)                 │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  /api/menu/items/route.ts                                   │
│  ├─ GET  → getMenuItems()   → Database                      │
│  ├─ POST → createMenuItem() → Database                      │
│  ├─ PUT  → updateMenuItem() → Database                      │
│  └─ DELETE → deleteMenuItem() → Database                    │
│                                                               │
│  /api/menu/categories/route.ts                              │
│  ├─ GET  → getCategories()    → Database                    │
│  ├─ POST → createCategory()   → Database                    │
│  ├─ PUT  → updateCategory()   → Database                    │
│  └─ DELETE → deleteCategory() → Database                    │
│                                                               │
└──────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────┐
│              SERVICE LAYER (lib/neon/)                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  menu-service.ts                                            │
│  ├─ getCategories()      │ getMenuItems()                   │
│  ├─ createCategory()     │ createMenuItem()                 │
│  ├─ updateCategory()     │ updateMenuItem()                 │
│  └─ deleteCategory()     │ deleteMenuItem()                 │
│                                                               │
│         Använder: neon() SQL client                         │
│                                                               │
└──────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────┐
│              DATABASE LAYER (Neon PostgreSQL)                 │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  menu_categories TABLE                                       │
│  ┌──────────────────────────────────┐                       │
│  │ id | name | display_order | ...  │                       │
│  ├──────────────────────────────────┤                       │
│  │ 1  | Pizzor | 1 |                │                       │
│  │ 2  | Burgare | 2 |               │                       │
│  │ 3  | Kebab | 3 |                 │                       │
│  └──────────────────────────────────┘                       │
│                                                               │
│  menu_items TABLE                                            │
│  ┌────────────────────────────────────────────┐             │
│  │ id | name | price | category_id | is_... │             │
│  ├────────────────────────────────────────────┤             │
│  │ 1  | Margherita | 99 | 1 | 1 |           │             │
│  │ 2  | BBQ | 119 | 2 | 0 |                 │             │
│  │ 3  | Falafel | 89 | 3 | 1 |              │             │
│  └────────────────────────────────────────────┘             │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## Dataflöde

### 1. Besökare visar erbjudandessidan

```
Besökare → /erbjudanden
                    ▼
          Startar React Component
                    ▼
          useEffect hämtar data
                    ▼
          GET /api/menu/categories  ──┐
                    │                   │
          GET /api/menu/items ────────┤
                    │                   │
                    └─────────────────┬─┘
                                      ▼
                            setState(categories)
                            setState(items)
                                      ▼
                              Komponenten re-renderas
                                      ▼
                            Visar all meny på sidan
                                      ▼
                        ⏰ 5 sekunder senare...
                                      ▼
                          Hämtar data igen (polling)
                                      ▼
                    Om något har ändrats → uppdaterar UI
```

### 2. Admin ändrar ett pris

```
Admin → /admin → Redigera pizza
                      ▼
            Fyller i nytt pris
                      ▼
           Klickar "Spara" (Save)
                      ▼
         PUT /api/menu/items
         {id, data: {price: 110}}
                      ▼
         menu-service.ts updateMenuItem()
                      ▼
         SQL: UPDATE menu_items
              SET price = 110
              WHERE id = 1
                      ▼
         Databasen uppdateras
                      ▼
         Response: {success: true}
                      ▼
         Admin ser toast: "Uppdaterat!"
         Items-state uppdateras
                      ▼
         ⏰ Inom 5 sekunder...
                      ▼
         Erbjudandessidan hämtar ny data
                      ▼
         Besökare ser nytt pris!
```

### 3. Admin lägger till ny produkt

```
Admin → /admin → "Lägg till produkt"
                      ▼
              Form öppnas
                      ▼
         Fyller i namn, pris, etc.
                      ▼
         Klickar "Spara"
                      ▼
         POST /api/menu/items
         {name, price, category_id, ...}
                      ▼
         menu-service.ts createMenuItem()
                      ▼
         SQL: INSERT INTO menu_items
              VALUES (...)
                      ▼
         Databasen lagrar ny pizza
                      ▼
         Response: {success, data: newItem}
                      ▼
         Items-state: [...items, newItem]
                      ▼
         Komponenten uppdateras
                      ▼
         ⏰ Inom 5 sekunder...
                      ▼
         Erbjudandessidan hämtar ny data
                      ▼
         Ny pizza visas för besökare!
```

---

## Komponenthieraki

```
Layout
├─ Header (Navigation)
│  └─ Logo
│  └─ Navigation Links
│  │  ├─ Home
│  │  ├─ Erbjudanden ← NYT
│  │  ├─ Öppettider
│  │  └─ Kontakt
│  └─ Phone Button
│
├─ AdminDashboard (/admin)
│  └─ Header
│     ├─ Logo
│     ├─ Title
│     └─ Buttons
│        ├─ Refresh
│        ├─ Go to Website
│        ├─ Go to Offers ← NYT
│        └─ Logout
│  │
│  └─ Tabs
│     ├─ Tab: "Items"
│     │  └─ MenuItemsManager
│     │     ├─ Filter Dropdown
│     │     ├─ Add Button
│     │     └─ ItemsList
│     │        ├─ Card
│     │        │  ├─ Name, Price, Description
│     │        │  ├─ Edit Button ✏️
│     │        │  └─ Delete Button ❌
│     │        └─ Dialog (Create/Edit Form)
│     │
│     └─ Tab: "Categories"
│        └─ CategoriesManager
│           ├─ Add Button
│           └─ CategoriesList
│
├─ OffersPage (/erbjudanden) ← NYT
│  ├─ Header
│  ├─ Hero Section
│  │  ├─ Logo
│  │  └─ Title
│  │
│  └─ OffersContent
│     ├─ Tabs (Categories)
│     │  └─ Each Tab:
│     │     └─ Grid of Cards
│     │        └─ Card
│     │           ├─ Name
│     │           ├─ Price
│     │           ├─ Description
│     │           └─ Badges (Veg, Spicy)
│     │
│     └─ Auto-refresh logic (5s polling)
│
└─ Footer
```

---

## State Management

### Admin Panel State (Client-side)
```javascript
// AdminDashboard
const [categories, setCategories] = useState([...])
const [items, setItems] = useState([...])
const [isSeeding, setIsSeeding] = useState(false)

// MenuItemsManager
const [editingItem, setEditingItem] = useState(null)
const [isCreating, setIsCreating] = useState(false)
const [loading, setLoading] = useState(false)
const [selectedCategory, setSelectedCategory] = useState("all")
const [formData, setFormData] = useState({...})
```

### Erbjudandessida State (Client-side)
```javascript
// OffersContent
const [categories, setCategories] = useState([...])
const [items, setItems] = useState([...])
const [loading, setLoading] = useState(false)

// useEffect polling every 5 seconds
```

---

## Authentication Flow

```
User → /admin/login
       ↓
    Firebase Auth Form
       ↓
    signIn(email, password)
       ↓
    Firebase verifies
       ↓
    ✅ Success → Redirect to /admin
    ❌ Fail → Show error message
       ↓
    /admin checks: getCurrentUser()
       ↓
    ✅ Authenticated → Show AdminDashboard
    ❌ Not Authenticated → Redirect to /admin/login
```

---

## API Response Structure

### GET /api/menu/items
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Margherita",
      "price": "99",
      "category_id": "1",
      "description": "Tomatsås, ost, basilika",
      "is_veg": true,
      "is_spicy": false,
      "is_available": true,
      "created_at": "2025-01-15...",
      "updated_at": "2025-01-15..."
    }
  ]
}
```

### POST /api/menu/items (Create)
```json
Request:
{
  "name": "Pepperoni",
  "price": "109",
  "category_id": "1",
  "description": "...",
  "is_veg": false,
  "is_spicy": false,
  "is_available": true,
  "display_order": 0
}

Response:
{
  "success": true,
  "data": { /* Created item */ }
}
```

### PUT /api/menu/items (Update)
```json
Request:
{
  "id": "1",
  "data": {
    "price": "119"
  }
}

Response:
{
  "success": true,
  "data": { /* Updated item */ }
}
```

### DELETE /api/menu/items
```
Request:
DELETE /api/menu/items?id=1

Response:
{
  "success": true
}
```

---

## Teknisk Stack

```
FRONTEND
├─ Framework: Next.js 16 (App Router)
├─ Language: TypeScript
├─ Styling: Tailwind CSS v4
├─ UI Library: shadcn/ui
├─ Icons: lucide-react
└─ State: React Hooks (useState, useEffect)

BACKEND
├─ Server: Next.js API Routes
├─ Auth: Firebase Authentication
├─ Database: Neon PostgreSQL
├─ SQL Client: @neondatabase/serverless
└─ Validation: TypeScript

DEPLOYMENT
├─ Host: Vercel
├─ Repository: GitHub
└─ CI/CD: Vercel Deployments
```

---

## Säkerhetslager

```
┌─────────────────────────────────────┐
│        PUBLIC (No Auth)              │
├─────────────────────────────────────┤
│ • GET /api/menu/items               │
│ • GET /api/menu/categories          │
│ • /erbjudanden page                 │
│ • / home page                       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│     PROTECTED (Firebase Auth)        │
├─────────────────────────────────────┤
│ • /admin dashboard                  │
│ • POST /api/menu/items (future)     │
│ • PUT /api/menu/items (future)      │
│ • DELETE /api/menu/items (future)   │
│ • Admin components                  │
└─────────────────────────────────────┘
```

---

## Skalbarhet

### Nuvarande solution
- ✅ Hanterar 1000+ produkter enkelt
- ✅ Realtidsuppdateringar via polling
- ✅ Minimal server-belastning
- ✅ Cached av Vercel Edge

### Framtida optimeringar
- [ ] WebSocket för push-updates (istället för polling)
- [ ] Redis caching för populära queries
- [ ] Image optimization för produktfoton
- [ ] Database indexing på category_id
- [ ] CDN för images

---

**Slutsats**: En väldesignad, skalbar arkitektur som är enkel att underhålla och utöka! 🚀
