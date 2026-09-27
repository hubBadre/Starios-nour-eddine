# Starios Climatisation — Proposition de structure

> Document de validation. **Aucun code applicatif n'est généré tant que tu n'as pas validé.**

## 1. Décisions d'architecture à valider

| # | Sujet | Proposition | Alternative |
|---|-------|-------------|-------------|
| D1 | Base de données | **Supabase Postgres** (connecteur déjà actif sur ton compte) + Prisma | Postgres local / Neon |
| D2 | Auth admin | **Auth.js v5 (NextAuth)** — provider Credentials, stratégie **JWT** | Sessions en BDD (+2 tables) |
| D3 | Traduction du contenu | **Colonnes dupliquées** `titleFr` / `titleAr` | Tables de traduction |
| D4 | i18n / routing | **next-intl**, segment `app/[locale]/`, `fr` par défaut, `ar` en RTL | next-i18next |
| D5 | Upload d'images | **Supabase Storage** depuis l'admin | UploadThing / Cloudinary |
| D6 | Éditeur blog | **Tiptap** → stocké en JSON | Markdown (MDX) |

**D2 (JWT)** évite les tables `Account` / `Session` : plus simple pour 1 à 3 admins.

**D3 (colonnes dupliquées)** : simple, typé, requêtes rapides. Le coût est qu'ajouter une 3e langue impose une migration. Vu FR + AR uniquement, c'est le bon compromis.

**D4 (RTL)** : l'arabe impose `dir="rtl"`. Il faut utiliser les utilitaires logiques Tailwind (`ms-*`, `me-*`, `ps-*`, `pe-*`) plutôt que `ml-*` / `pl-*` **dès le départ** — repasser dessus après coup coûte très cher.

---

## 2. Charte graphique (issue de /ui-ux-pro-max)

Style retenu : **Trust & Authority** — badges de certification, avant/après, témoignages avec photo. C'est le pattern des métiers où l'achat demande de la réassurance.

### Palette — fraîcheur + réassurance

| Rôle | Hex | Usage |
|------|-----|-------|
| `navy` (primaire) | `#0F172A` | Titres, header, footer, texte fort |
| `slate` (secondaire) | `#334155` | Texte courant, bordures fortes |
| `sky` (marque) | `#0EA5E9` | Accent de marque, icônes, liens |
| `sky-deep` | `#0369A1` | Boutons secondaires, hover |
| `orange` (CTA) | `#F97316` | **Boutons devis / WhatsApp uniquement** |
| `bg` | `#F8FAFC` | Fond de page |
| `bg-cool` | `#F0F9FF` | Fonds de section alternés |
| `text` | `#020617` | Corps de texte |

Le bleu porte la fraîcheur, l'orange porte l'action — c'est aussi le duo chaud/froid classique du métier (clim + chauffage). L'orange reste **rare** : uniquement les CTA de conversion.

### Typographie

| Usage | Police |
|-------|--------|
| Titres (FR) | **Lexend** 500 / 600 / 700 |
| Corps (FR) | **Source Sans 3** 400 / 600 |
| Titres + corps (AR) | **Cairo** 400 / 600 / 700 |

Lexend est dessinée pour la lisibilité (excellent score accessibilité). **Lexend ne couvre pas l'arabe** — Cairo n'est donc pas un choix esthétique optionnel mais un fallback obligatoire.

### À éviter

Dégradés violet / rose « IA », emojis en guise d'icônes (→ **Lucide**), contenu générique sans preuve (certifications, nombre de chantiers, marques réelles).

---

## 3. Arborescence du projet

```
starios/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts                      # 8 produits, 3 articles, 5 témoignages, 6 réalisations
│   └── migrations/
├── messages/
│   ├── fr.json
│   └── ar.json
├── public/
│   ├── images/{products,projects,blog,brands,team}/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx           # <html lang dir>, fonts, Header/Footer, WhatsApp flottant
│   │   │   ├── page.tsx             # Accueil
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── catalogue/
│   │   │   │   ├── page.tsx         # filtres marque / BTU / type / prix (searchParams)
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── realisations/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── a-propos/page.tsx
│   │   │   ├── devis/page.tsx       # formulaire multi-étapes
│   │   │   ├── contact/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── mentions-legales/page.tsx
│   │   │   ├── confidentialite/page.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── error.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx           # garde de session + sidebar
│   │   │   ├── login/page.tsx
│   │   │   ├── page.tsx             # tableau de bord (devis récents, stats)
│   │   │   ├── produits/{page.tsx,nouveau/page.tsx,[id]/page.tsx}
│   │   │   ├── articles/{page.tsx,nouveau/page.tsx,[id]/page.tsx}
│   │   │   ├── devis/{page.tsx,[id]/page.tsx}
│   │   │   ├── temoignages/page.tsx
│   │   │   ├── realisations/{page.tsx,nouveau/page.tsx,[id]/page.tsx}
│   │   │   ├── faq/page.tsx
│   │   │   └── parametres/page.tsx  # coordonnées, WhatsApp, Maps
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── revalidate/route.ts
│   │   │   └── upload/route.ts
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── globals.css
│   ├── actions/                     # Server Actions ("use server")
│   │   ├── quote.actions.ts         # création devis + emails + estimation
│   │   ├── contact.actions.ts
│   │   ├── product.actions.ts
│   │   ├── post.actions.ts
│   │   ├── testimonial.actions.ts
│   │   ├── project.actions.ts
│   │   └── faq.actions.ts
│   ├── components/
│   │   ├── ui/                      # shadcn/ui (button, input, select, dialog, table…)
│   │   ├── layout/{Header,Footer,MobileNav,LocaleSwitcher,WhatsAppFab}.tsx
│   │   ├── home/{Hero,ServicesGrid,WhyUs,BrandMarquee,Testimonials,CtaBand}.tsx
│   │   ├── catalog/{ProductCard,ProductGrid,ProductFilters,ProductGallery}.tsx
│   │   ├── quote/{QuoteWizard,StepService,StepProperty,StepContact,StepReview,EstimateBadge}.tsx
│   │   ├── blog/{PostCard,PostBody,TiptapRenderer}.tsx
│   │   ├── projects/{ProjectCard,BeforeAfterSlider}.tsx
│   │   ├── admin/{DataTable,ImageUploader,RichTextEditor,StatusBadge,StatCard}.tsx
│   │   └── shared/{SectionHeading,Reveal,Breadcrumbs,EmptyState,Pagination}.tsx
│   ├── lib/
│   │   ├── prisma.ts                # singleton
│   │   ├── auth.ts                  # config Auth.js
│   │   ├── email.ts                 # Resend
│   │   ├── estimate.ts              # calcul BTU + fourchette de prix
│   │   ├── seo.ts                   # generateMetadata + JSON-LD LocalBusiness
│   │   └── utils.ts                 # cn()
│   ├── schemas/                     # Zod — partagés client + serveur
│   │   ├── quote.schema.ts
│   │   ├── contact.schema.ts
│   │   ├── product.schema.ts
│   │   └── post.schema.ts
│   ├── emails/
│   │   ├── QuoteAdminNotification.tsx
│   │   └── QuoteClientReceipt.tsx
│   ├── i18n/{routing.ts,request.ts}
│   ├── types/index.ts
│   └── middleware.ts                # next-intl + protection /admin
├── design-system/starios-climatisation/MASTER.md
├── .env.example
├── components.json                  # shadcn/ui
├── tailwind.config.ts
├── next.config.mjs
└── README.md
```

---

## 4. Schéma de base de données (Prisma)

```prisma
generator client { provider = "prisma-client-js" }

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")      // Supabase : pooler + direct pour les migrations
}

// ---------- Énumérations ----------
enum ProductType     { SPLIT GAINABLE CASSETTE VRV_VRF MOBILE FENETRE }
enum ServiceCategory { VENTE_INSTALLATION MAINTENANCE DEPANNAGE NETTOYAGE VENTILATION_VMC PROFESSIONNEL }
enum PropertyType    { APPARTEMENT VILLA BUREAU COMMERCE RESTAURANT INDUSTRIE }
enum QuoteStatus     { NOUVEAU EN_COURS TRAITE ANNULE }
enum AdminRole       { OWNER EDITOR }
enum Locale          { FR AR }

// ---------- Contenu commercial ----------
model Brand {
  id       String    @id @default(cuid())
  name     String    @unique
  slug     String    @unique
  logoUrl  String
  website  String?
  order    Int       @default(0)
  active   Boolean   @default(true)
  products Product[]
  projects Project[]
}

model Product {
  id             String      @id @default(cuid())
  slug           String      @unique
  nameFr         String
  nameAr         String
  descriptionFr  String      @db.Text
  descriptionAr  String      @db.Text
  brand          Brand       @relation(fields: [brandId], references: [id])
  brandId        String
  type           ProductType
  btu            Int                              // 9000, 12000, 18000, 24000…
  coverageM2     Int?                             // surface conseillée
  price          Decimal     @db.Decimal(10, 2)   // MAD
  oldPrice       Decimal?    @db.Decimal(10, 2)
  energyClass    String?                          // "A++"
  inverter       Boolean     @default(false)
  warrantyMonths Int         @default(12)
  images         String[]
  stock          Int         @default(0)
  featured       Boolean     @default(false)
  active         Boolean     @default(true)
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  @@index([brandId])
  @@index([type])
  @@index([price])
  @@index([btu])
}

model Service {
  id        String          @id @default(cuid())
  slug      String          @unique
  category  ServiceCategory @unique
  titleFr   String
  titleAr   String
  excerptFr String
  excerptAr String
  contentFr String          @db.Text
  contentAr String          @db.Text
  icon      String                       // nom d'icône Lucide
  coverImage String
  order     Int             @default(0)
  featured  Boolean         @default(false)
  active    Boolean         @default(true)
  quotes    Quote[]
}

// ---------- Preuve sociale ----------
model Testimonial {
  id         String   @id @default(cuid())
  authorName String
  city       String
  role       String?
  contentFr  String   @db.Text
  contentAr  String   @db.Text
  rating     Int      @default(5)          // 1..5
  avatarUrl  String?
  published  Boolean  @default(false)
  order      Int      @default(0)
  createdAt  DateTime @default(now())
}

model Project {
  id            String          @id @default(cuid())
  slug          String          @unique
  titleFr       String
  titleAr       String
  descriptionFr String          @db.Text
  descriptionAr String          @db.Text
  city          String
  category      ServiceCategory
  brand         Brand?          @relation(fields: [brandId], references: [id])
  brandId       String?
  beforeImage   String
  afterImage    String
  gallery       String[]
  completedAt   DateTime
  featured      Boolean         @default(false)
  published     Boolean         @default(true)
  order         Int             @default(0)

  @@index([category])
  @@index([city])
}

// ---------- Éditorial ----------
model BlogPost {
  id          String    @id @default(cuid())
  slug        String    @unique
  titleFr     String
  titleAr     String
  excerptFr   String
  excerptAr   String
  contentFr   Json                          // document Tiptap
  contentAr   Json
  coverImage  String
  tags        String[]
  seoTitleFr  String?
  seoTitleAr  String?
  seoDescFr   String?
  seoDescAr   String?
  published   Boolean   @default(false)
  publishedAt DateTime?
  author      Admin     @relation(fields: [authorId], references: [id])
  authorId    String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([published, publishedAt])
}

model FaqItem {
  id         String           @id @default(cuid())
  questionFr String
  questionAr String
  answerFr   String           @db.Text
  answerAr   String           @db.Text
  category   ServiceCategory?
  order      Int              @default(0)
  published  Boolean          @default(true)
}

// ---------- Conversion ----------
model Quote {
  id            String          @id @default(cuid())
  reference     String          @unique               // DEV-2026-0001
  service       Service?        @relation(fields: [serviceId], references: [id])
  serviceId     String?
  category      ServiceCategory
  propertyType  PropertyType
  surfaceM2     Int
  roomsCount    Int?
  city          String
  preferredDate DateTime?
  fullName      String
  phone         String
  email         String?
  message       String?         @db.Text
  estimateMin   Decimal?        @db.Decimal(10, 2)    // fourchette indicative
  estimateMax   Decimal?        @db.Decimal(10, 2)
  estimatedBtu  Int?
  status        QuoteStatus     @default(NOUVEAU)
  internalNote  String?         @db.Text
  locale        Locale          @default(FR)
  handledBy     Admin?          @relation(fields: [handledById], references: [id])
  handledById   String?
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  @@index([status, createdAt])
}

model ContactMessage {
  id        String   @id @default(cuid())
  fullName  String
  email     String
  phone     String?
  subject   String
  message   String   @db.Text
  handled   Boolean  @default(false)
  createdAt DateTime @default(now())
}

// ---------- Administration ----------
model Admin {
  id           String     @id @default(cuid())
  email        String     @unique
  passwordHash String
  name         String
  role         AdminRole  @default(EDITOR)
  lastLoginAt  DateTime?
  createdAt    DateTime   @default(now())
  posts        BlogPost[]
  quotes       Quote[]
}

model Setting {
  key       String   @id            // "phone", "whatsapp", "address", "mapsEmbed", "hours"
  valueFr   String
  valueAr   String?
  updatedAt DateTime @updatedAt
}
```

### Notes sur le schéma

- `Service.category` est `@unique` : un service par catégorie métier, ce qui permet de relier proprement `Quote` et `Project` à la même énumération. Si tu veux plusieurs services dans une même catégorie, il faut retirer ce `@unique`.
- `Decimal` et non `Float` pour les prix (pas d'erreur d'arrondi).
- `Quote.estimateMin` / `estimateMax` : fourchette **indicative**, à afficher avec une mention explicite « estimation non contractuelle » — c'est important juridiquement.
- Pas de tables `Account` / `Session` : conséquence directe du choix JWT (D2).

---

## 5. Logique d'estimation du devis

`lib/estimate.ts`, fonction pure et testable :

```
BTU requis ≈ surface(m²) × facteur(typeDeBien) × correctif(étage / exposition)

  APPARTEMENT 130 · VILLA 150 · BUREAU 160
  COMMERCE 180 · RESTAURANT 220 · INDUSTRIE 250

→ arrondi au palier commercial supérieur (9k / 12k / 18k / 24k / 36k)
→ fourchette = (prix matériel du palier + pose) × [0.9 ; 1.25]
```

Les facteurs seront regroupés dans une constante unique en haut du fichier, pour que tu puisses les ajuster à tes vrais tarifs sans toucher à la logique.

---

## 6. Variables d'environnement (`.env.example`)

```
DATABASE_URL=                       # Supabase pooler (port 6543)
DIRECT_URL=                         # Supabase direct (port 5432) — migrations
AUTH_SECRET=                        # openssl rand -base64 32
AUTH_URL=http://localhost:3000
RESEND_API_KEY=
EMAIL_FROM="Starios <devis@starios.ma>"
EMAIL_TO_ADMIN=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP=2126XXXXXXXX
NEXT_PUBLIC_MAPS_EMBED=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=          # uploads serveur uniquement
```

---

## 7. Ordre de construction proposé

| Lot | Contenu | Pourquoi dans cet ordre |
|-----|---------|-------------------------|
| **1** | Init projet, Tailwind + charte, shadcn, Prisma + schéma + seed, i18n FR/AR, Header / Footer / WhatsApp | Socle : rien ne se construit sans lui |
| **2** | Accueil, Services (liste + détail), **Devis multi-étapes + emails** | Le chemin de conversion — c'est ce qui rapporte |
| **3** | Catalogue + filtres + fiche produit, Contact, FAQ, pages légales | Le volume de contenu |
| **4** | Admin (auth, devis, produits, témoignages, réalisations) | Utile seulement quand il y a du contenu à gérer |
| **5** | Blog + Tiptap, Réalisations avant/après, SEO / JSON-LD, Framer Motion | Acquisition long terme |

Tu évoquais toi-même de commencer par Accueil / Services / Devis : c'est exactement **lot 1 + lot 2**.

---

## 8. Informations qu'il me manque

| Sujet | Impact si non fourni |
|-------|----------------------|
| Nom réel de l'entreprise, ville, téléphone, WhatsApp | Contenu fictif à remplacer partout ensuite |
| Logo / charte existante | La palette ci-dessus est appliquée telle quelle |
| Marques réellement distribuées | Le seed utilisera Daikin / LG / Samsung / Gree / Carrier |
| Fourchettes de prix réelles (matériel + pose) | L'estimateur sortira des montants indicatifs à recalibrer |
| L'arabe est-il requis au lancement ? | S'il peut attendre, on gagne un temps notable sur le lot 1 |
