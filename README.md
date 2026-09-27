# Starios — site vitrine climatisation

Site Next.js 15 (App Router) pour une entreprise de vente, installation et maintenance de climatisation au Maroc. Bilingue français / arabe avec support RTL.

> ⚠️ **Toutes les données sont fictives** : nom des clients, adresse, téléphone, prix, réalisations, témoignages. Voir [Remplacer les données fictives](#remplacer-les-données-fictives).

---

## Stack

| Domaine | Choix |
|---------|-------|
| Framework | Next.js 15 · App Router · TypeScript |
| Styles | Tailwind CSS 3 · primitives shadcn/ui |
| Base de données | PostgreSQL (Supabase) via Prisma 6 |
| Formulaires | React Hook Form + Zod |
| i18n | next-intl (`fr` par défaut, `ar` en RTL) |
| Emails | Resend |
| Auth admin | Auth.js v5 (Credentials + JWT) |
| Animations | Framer Motion |

---

## Démarrage rapide

```bash
npm install
cp .env.example .env      # PowerShell : Copy-Item .env.example .env
npm run dev
```

Le site tourne sur http://localhost:3000 **sans configurer la base de données** : les lectures de contenu retombent sur un jeu statique si Postgres est injoignable (voir `src/lib/content.ts`). Les formulaires, eux, ont besoin de la base pour enregistrer.

### Avec la base de données

1. Créer un projet sur [supabase.com](https://supabase.com), puis récupérer les deux chaînes de connexion (onglet *Connect*).
2. Renseigner `DATABASE_URL` (pooler, port 6543) et `DIRECT_URL` (direct, port 5432) dans `.env`.
3. Créer le schéma et charger les données de démonstration :

```bash
npm run db:push     # crée les tables (ou npm run db:migrate pour une migration versionnée)
npm run db:seed     # 6 marques, 6 services, 8 produits, 5 témoignages, 6 réalisations, 3 articles, 5 FAQ
npm run db:studio   # interface d'inspection Prisma
```

Le seed crée un compte administrateur affiché en fin d'exécution (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).

---

## Variables d'environnement

Toutes décrites dans [`.env.example`](.env.example).

| Variable | Obligatoire | Rôle |
|----------|-------------|------|
| `DATABASE_URL` / `DIRECT_URL` | pour la BDD | Connexion Postgres (pooler / direct) |
| `AUTH_SECRET` | pour `/admin` | Signature des JWT — `openssl rand -base64 32` |
| `RESEND_API_KEY` | non | Sans clé, les emails sont **journalisés en console** au lieu d'être envoyés |
| `EMAIL_TO_ADMIN` | non | Destinataire des demandes de devis |
| `NEXT_PUBLIC_WHATSAPP` | non | Numéro du bouton flottant, format international sans `+` |
| `NEXT_PUBLIC_SITE_URL` | en production | Base des URLs canoniques et du sitemap |

---

## Scripts

| Script | Effet |
|--------|-------|
| `npm run dev` | Serveur de développement |
| `npm run build` | `prisma generate` puis build de production |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:push` | Applique le schéma sans migration |
| `npm run db:migrate` | Migration versionnée |
| `npm run db:seed` | Charge les données de démonstration |

---

## Structure

```
src/
├── app/
│   ├── (public)/[locale]/     # site public, traduit — layout racine RTL/LTR
│   ├── sitemap.ts, robots.ts
│   └── globals.css            # tokens de couleur, styles de base
├── actions/                   # Server Actions (devis, contact)
├── components/
│   ├── ui/                    # primitives shadcn/ui
│   ├── layout/                # header, footer, menu mobile, WhatsApp
│   ├── home/                  # sections de la page d'accueil
│   ├── quote/                 # wizard de devis
│   └── shared/
├── lib/                       # prisma, auth, email, seo, estimate, site, content
├── schemas/                   # validation Zod partagée client/serveur
└── i18n/                      # configuration next-intl
messages/{fr,ar}.json          # traductions
prisma/{schema.prisma,seed.ts}
```

`(public)` est un **groupe de routes** : il permet d'avoir un layout racine traduit pour le site et, plus tard, un second layout racine non traduit pour `/admin`. Sans ce découpage, deux balises `<html>` s'imbriqueraient.

---

## Points d'implémentation à connaître

**Bilingue et RTL.** L'arabe impose `dir="rtl"`. Le code utilise partout les utilitaires *logiques* de Tailwind (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`) et non `ml-*` / `pl-*`. **Conserver cette règle** dans tout nouveau composant : y revenir après coup impose de repasser sur l'ensemble du site. Lexend et Source Sans ne couvrant pas l'arabe, `globals.css` bascule sur Cairo sous `[dir='rtl']`.

**Estimation de devis.** `src/lib/estimate.ts` calcule une fourchette à partir de la surface et du type de local. Les constantes `BTU_PER_M2`, `PRICE_TIERS` et `LABOUR_MAD` en haut du fichier sont des **tarifs fictifs** : les ajuster suffit, la logique en dessous n'a pas à changer. L'estimation est affichée avec une mention « non contractuelle » — la conserver, elle protège juridiquement.

**Les leads ne sont jamais perdus.** Si l'enregistrement en base échoue, `submitQuote` journalise l'erreur puis **envoie quand même l'email** à l'entreprise. Perdre un prospect coûte plus cher qu'une ligne manquante en base. Le champ `persisted` du retour indique ce qui s'est réellement passé.

**Anti-spam.** Les deux formulaires portent un champ piège (`website`), masqué et retiré du parcours clavier. Rempli, la soumission renvoie un succès neutre sans rien enregistrer.

**Résilience du contenu.** `src/lib/content.ts` retombe sur un contenu statique si la base est absente *ou vide*. Dès que le seed est passé, le site bascule automatiquement sur la base.

---

## Remplacer les données fictives

| Fichier | Ce qu'il contient |
|---------|-------------------|
| `src/lib/site.ts` | Nom légal, téléphone, WhatsApp, adresse, horaires, villes couvertes, statistiques de la page d'accueil |
| `prisma/seed.ts` | Marques, produits et prix, témoignages, réalisations, articles, FAQ |
| `src/lib/estimate.ts` | Grille de prix matériel et main d'œuvre |
| `src/components/layout/Logo.tsx` | Logo provisoire |
| `public/images/placeholder.svg` | Visuel de remplacement utilisé partout |
| `.env` | Téléphone et WhatsApp réellement affichés en production |

Les logos de marques partenaires sont volontairement rendus **en typographie et non en images** : afficher un logo non autorisé ou approximatif dessert la crédibilité. À remplacer par les logos officiels une fois les autorisations obtenues.

---

## Déploiement sur Vercel

1. Pousser le dépôt sur GitHub, puis l'importer dans Vercel.
2. Renseigner les variables d'environnement du tableau ci-dessus.
3. `AUTH_URL` et `NEXT_PUBLIC_SITE_URL` doivent pointer vers le domaine de production.
4. La commande de build (`prisma generate && next build`) est déjà configurée dans `package.json`.

Les migrations ne sont pas jouées automatiquement au déploiement : lancer `npx prisma migrate deploy` depuis un poste connecté à la base de production.

---

## État d'avancement

### Livré

- Socle : Next.js, Tailwind + charte, primitives shadcn/ui, Prisma, seed complet
- Bilingue FR/AR avec RTL, sélecteur de langue conservant la page courante
- Header, menu mobile, footer, bouton WhatsApp flottant
- Accueil : hero, chiffres, services, arguments, bandeau marques, témoignages, CTA
- Services : liste et pages de détail (6 prestations, générées statiquement)
- **Devis multi-étapes** avec estimation en direct, validation Zod, emails entreprise + client
- Contact : formulaire, coordonnées, carte
- SEO : métadonnées par locale, `hreflang`, JSON-LD `HVACBusiness`, `sitemap.xml`, `robots.txt`
- Accessibilité : focus visibles, cibles tactiles ≥ 44 px, `prefers-reduced-motion`, lien d'évitement

### Non livré

| Manque | Remarque |
|--------|----------|
| Catalogue produits + filtres | Le modèle `Product` et le seed sont prêts ; il reste les pages |
| Réalisations, blog, à propos, FAQ, pages légales | Modèles et contenu de seed prêts |
| **Panel `/admin`** | `src/lib/auth.ts` est écrit et fonctionnel, mais aucune page `/admin` n'existe encore |
| Upload d'images | Prévu via Supabase Storage |
| Éditeur Tiptap | Le contenu des articles est déjà stocké en JSON compatible |

Les liens du header vers Catalogue, Réalisations, Blog et À propos pointent donc vers des routes qui renvoient 404 tant que ces pages ne sont pas construites.
