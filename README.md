# Artisan de Confiance du 13 — Site vitrine

Site vitrine statique (une seule page, navigation par ancres) de l'apporteur
d'affaires « Artisan de Confiance du 13 ». Conçu pour être déployé en statique
sur **Vercel** (rapide, gratuit, bon référencement).

## Contenu

- `index.html` — tout le site (HTML + CSS + JS + photos en base64, un seul fichier autonome).
- `robots.txt` — autorise l'indexation par les moteurs de recherche.

## Déploiement sur Vercel

1. Pousser ce dépôt sur GitHub.
2. Sur vercel.com : **New Project** → importer le dépôt.
3. Framework preset : **Other** (site statique, aucun build). Laisser tout par défaut → Deploy.
4. Le site est en ligne sur une URL `*.vercel.app`.
5. **Domaine** : quand le nom est confirmé, Project → Settings → Domains → ajouter
   `artisandeconfiance13.fr` (Vercel donne les enregistrements DNS à créer chez le registrar).

## À faire ensuite

- **Formulaire de contact** : aujourd'hui il valide côté navigateur mais n'envoie pas
  encore les demandes. À brancher (Brevo, ou un petit endpoint) en même temps que l'emailing.
- **Coordonnées** : remplacer les `[Téléphone]` / `[Email]` du pied de page par les vraies.
- **Lien Espace Chantier** : le bouton du footer pointe vers l'appli Fly ; le faire pointer
  vers le sous-domaine `espace.artisandeconfiance13.fr` une fois le domaine en place.
- **SEO** : ajouter la balise `<link rel="canonical">` et un `sitemap.xml` une fois le domaine connu.
# Artisan2Confiance_13-vitrine
