# Réseaux Artisans de Confiance 13 — Site vitrine

Site vitrine **multi-pages statique** (HTML/CSS/JS, sans framework), optimisé SEO,
prêt à déployer sur **Vercel**.

## Pages
- `index.html` — Accueil (prologue animé, hero, 3 piliers, concept, réalisations, CTA)
- `realisations.html` — `/realisations`
- `a-propos.html` — `/a-propos`
- `contact.html` — `/contact`
- `styles.css`, `app.js` — communs à toutes les pages
- `images/` — 21 photos en WebP optimisé (chargées à la demande)
- `sitemap.xml`, `robots.txt`, `vercel.json`

## SEO (déjà en place)
- Une **vraie URL par page**, avec titre + meta description propres.
- **Données structurées** JSON-LD (ProfessionalService, zone = Bouches-du-Rhône).
- **Images WebP** légères + `alt` descriptifs + `loading="lazy"` → page rapide.
- `sitemap.xml`, `robots.txt`, canonical, Open Graph.
- `vercel.json` → URLs propres (`/contact` et non `/contact.html`).

## Déploiement Vercel
1. `git add . && git commit -m "..."` puis pousser sur GitHub.
2. vercel.com → New Project → importer le dépôt → Framework **Other** → Deploy.
3. En ligne sur une URL `*.vercel.app`.
4. Domaine : Settings → Domains → ajouter le domaine (DNS fournis par Vercel).

## À finaliser (quand tu auras les infos)
- **Domaine** : remplacer `https://reseauxartisansdeconfiance13.fr` dans `index.html`,
  `realisations.html`, `a-propos.html`, `contact.html` (balises canonical / og:url /
  JSON-LD) **et** dans `sitemap.xml` + `robots.txt`, par le domaine définitif.
- **Coordonnées** : remplacer `[Téléphone]` / `[Email]` (pied de page + page Contact).
- **Formulaire de contact** : validation OK côté navigateur ; l'envoi réel reste à
  brancher (Brevo ou petit endpoint), avec l'emailing de l'outil.
- **Photos** : ce sont des visuels d'exemple ; les remplacer par les vraies réalisations
  (dans `images/`, même noms, format WebP de préférence).
