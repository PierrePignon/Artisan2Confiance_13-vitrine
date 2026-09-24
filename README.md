# Réseaux Artisans de Confiance 13 — Site vitrine

Site **multi-pages statique** (HTML / CSS / JS, sans framework), optimisé SEO,
déployé sur **Vercel**.

## Pages

| URL | Fichier | Rôle |
|---|---|---|
| `/` | `index.html` | Accueil — prologue, piliers, méthode, métiers, réalisations, FAQ |
| `/ebenisterie-sur-mesure-aix-marseille` | idem `.html` | Landing métier — ébénisterie & agencement |
| `/tadelakt-marseille-aix` | idem `.html` | Landing métier — tadelakt & enduits à la chaux |
| `/ferronnerie-art-bouches-du-rhone` | idem `.html` | Landing métier — ferronnerie d'art |
| `/taille-de-pierre-marbrerie-provence` | idem `.html` | Landing métier — taille de pierre & marbrerie |
| `/menuiserie-sur-mesure-bouches-du-rhone` | idem `.html` | Landing métier — menuiserie du bâti |
| `/platrerie-staff-decoratif-marseille-aix` | idem `.html` | Landing métier — plâtrerie & staff |
| `/peinture-decorative-patines-provence` | idem `.html` | Landing métier — peinture décorative |
| `/maconnerie-restauration-bati-ancien-13` | idem `.html` | Landing métier — maçonnerie & bâti ancien |
| `/realisations` | `realisations.html` | Galerie |
| `/a-propos` | `a-propos.html` | Positionnement |
| `/contact` | `contact.html` | Formulaire |
| `/mentions-legales` | `mentions-legales.html` | Mentions légales + RGPD |
| — | `404.html` | Page d'erreur (servie automatiquement par Vercel) |

Communs : `styles.css`, `app.js`, `images/` (21 WebP + `og-card.jpg`),
`sitemap.xml`, `robots.txt`, `vercel.json`, `api/contact.js`.

## SEO en place

**Contenu**
- **8 landings métier** de 880 à 970 mots, une par requête commerciale
  (« tadelakt Marseille », « ébéniste sur mesure Aix », « maçon bâti ancien 13 », etc.) —
  une par ligne de la section « Nos métiers » de l'accueil, aucune ligne morte.
- Une FAQ de 5 questions par landing + 6 sur l'accueil, calées sur les questions
  réellement tapées (prix au m², délais, différences entre métiers, entretien, normes,
  autorisations d'urbanisme).
- Bloc « zone d'intervention » listant 16 communes du 13 sur chaque landing.
- Maillage interne : menu, footer (les 8 savoir-faire sur chaque page), section métiers
  de l'accueil, liens croisés entre landings voisines.
- ~10 300 mots au total sur le site.

**Technique**
- Une URL propre par page (`cleanUrls`), title + meta description uniques et calibrés
  (≤ 62 / ≤ 162 caractères), canonical, Open Graph et Twitter Card complets.
- Données structurées unifiées en un seul graphe JSON-LD par page :
  `ProfessionalService` (entité unique, `@id` sur l'accueil), `WebSite`, `WebPage`,
  `BreadcrumbList`, `Service` et `FAQPage` — les pages internes référencent l'entité
  au lieu de la dupliquer.
- `sitemap.xml` avec `lastmod`, `robots.txt`, page 404 réelle.
- Images WebP + `alt` descriptifs + dimensions + `loading="lazy"` ;
  preload et `fetchpriority="high"` sur l'image LCP de l'accueil.
- En-têtes Vercel : cache long sur `/images`, `stale-while-revalidate` sur CSS/JS,
  HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- Espace Chantier (appli privée) en `rel="nofollow"`.

## Déploiement

1. `git add . && git commit -m "..."` puis `git push`.
2. Vercel redéploie automatiquement le dépôt lié.

---

# À faire

## 1. Bloquant — le site ne peut pas ranker sans ça

- [ ] **Domaine définitif.** Tout le code pointe vers `https://reseauxartisansdeconfiance13.fr`
      (canonical, og:url, JSON-LD, sitemap, robots). Acheter le domaine et le brancher
      dans Vercel → Settings → Domains, ou faire un rechercher/remplacer global si le
      domaine change.
- [ ] **Google Business Profile.** C'est le premier levier local, devant le site :
      créer la fiche (catégorie « Entreprise de rénovation » ou « Coordinateur de travaux »),
      zone de chalandise = Bouches-du-Rhône, photos, horaires, lien vers le site.
- [ ] **Google Search Console.** Le fichier de vérification `google364addc9b7971b7b.html`
      est déjà en place : valider la propriété, soumettre `sitemap.xml`, demander
      l'indexation des 4 landings métier.
- [ ] **Compléter les mentions légales** : statut juridique, siège, SIREN/SIRET, TVA,
      directeur de publication, médiateur de la consommation. Les `[à compléter]` sont
      visibles en ligne aujourd'hui.

## 2. À valider avec le client

- [ ] **Les fourchettes de prix des FAQ.** J'ai mis des ordres de grandeur marché
      (tadelakt 120–250 €/m², ébénisterie 900–2 500 €/ml, verrière 700–1 400 €/m²,
      corniche en staff 60–180 €/ml, peinture décorative 80–200 €/m²).
      À faire relire par le client : ce sont les siens qui doivent figurer, ou les
      supprimer s'il ne veut pas afficher de prix.
- [ ] **Formulaire de contact** : validation navigateur OK, `api/contact.js` présent —
      vérifier que l'envoi réel fonctionne en production (Brevo ou endpoint) et qu'un
      mail arrive bien.
- [ ] **Photos réelles.** Les 21 visuels sont des images d'illustration, et c'est écrit
      sur le site. Les remplacer par de vraies réalisations dès les premières livraisons
      (même noms de fichiers, WebP). Les 4 nouvelles landings réutilisent des visuels
      existants faute de mieux — celle de la maçonnerie (`img16`) est la moins pertinente
      et mérite une photo dédiée en priorité.

## 3. Prochains gains SEO

- [ ] **Pages « ville »** pour les 3 plus gros bassins (Marseille, Aix, Aubagne), à ne
      faire que si le contenu est réellement différent d'une ville à l'autre — sinon
      Google les traite comme du duplicata.
- [ ] **Avis clients.** Les avis Google alimentent à la fois la fiche et un éventuel
      balisage `AggregateRating` sur le site. À ne baliser que sur des avis réels.
- [ ] **Backlinks locaux** : annuaires d'artisans du 13, architectes et décorateurs
      partenaires, chambre de métiers, presse locale déco.
- [ ] **Mesure d'audience.** Aucun outil n'est installé (et c'est ce que disent les
      mentions légales). Si suivi souhaité : Plausible ou Vercel Analytics, sans cookie,
      et mettre à jour la section Cookies en conséquence.
- [ ] **Vérifier les Core Web Vitals** une fois en ligne (PageSpeed Insights). Le poste
      le plus lourd restant est le chargement des Google Fonts.
