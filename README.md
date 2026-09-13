## Ampeo — site premium bornes de recharge

Stack : Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

### Démarrer

```bash
npm install
npm run dev
```

### Contenu et placeholders

Tout le contenu métier vit dans `lib/content/` (bornes, prix, aides, avis,
réalisations, certifications, navigation, identité de marque). Rien n'y est
inventé :

- Les prix (`lib/content/prix.ts`, `lib/content/bornes.ts`) sont à `null`
  tant qu'un tarif vérifié n'est pas fourni — l'UI affiche alors « Sur devis ».
- Les avis (`lib/content/avis.ts`) sont vides tant qu'une source vérifiée
  (Google Reviews ou saisie manuelle) n'est connectée.
- Les certifications (`lib/content/certifications.ts`) sont vides tant que
  les justificatifs réels ne sont pas fournis.
- Les aides (`lib/content/aides.ts`) listent des dispositifs réels par leur
  nom, avec un montant `null` à confirmer avant publication.
- Les réalisations (`lib/content/realisations.ts`) sont des exemples de
  structure de page, clairement annotés comme tels, à remplacer par de
  vrais projets et de vraies photos.
- Le nom de marque « Ampeo » et le logo (`lib/content/brand.ts`,
  `components/layout/Logo.tsx`) sont des placeholders à remplacer.

### Images

Le composant `components/ui/PlaceholderMedia.tsx` affiche un encadré
clairement identifié tant qu'aucune image réelle n'est fournie. Pour
remplacer un placeholder, passez la prop `src` (ou renseignez `imageSrc` /
`coverImageSrc` dans les fichiers de contenu) — la mise en page ne change
pas.

### 3D / animation d'accueil

`components/home/ParticleField.tsx` est une animation abstraite en canvas
(profondeur, particules, lignes) utilisée à la place d'un modèle 3D réel,
qu'aucun asset ne permettait de créer. Elle respecte
`prefers-reduced-motion` et se met en pause hors écran.

### CMS

Le contenu commercial (bornes, prix, aides, avis…) est séparé du code dans
`lib/content/`. Ces fichiers TypeScript peuvent être remplacés par des
appels à un CMS headless sans changer les composants qui les consomment.

### Module SEO local national (régions → départements → villes)

La couverture géographique nationale vit dans une vraie base de données
(Supabase Postgres, projet `manu`, tables préfixées `evcharge_` dans le
schéma `public` — voir `lib/supabase/client.ts` et `lib/geo/`), **pas**
dans le code. C'est la base qui permet d'ajouter une région, un département
ou une ville sans toucher aux composants.

Variables d'environnement requises (voir `.env.example`) :
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

**Hiérarchie** : `evcharge_regions` → `evcharge_departments` →
`evcharge_cities` → `evcharge_city_content` / `evcharge_city_project_pages`
(pages maison/copropriété/entreprise par ville) ; `evcharge_faqs` (portée
région/département/ville) et `evcharge_city_neighbors` complètent le
maillage. Routes : `/installation-borne-recharge/[region]/[department]/[city]/[projectType]`.

**Base réelle chargée** : les 18 régions et 101 départements français
(noms, codes INSEE officiels, préfectures) sont tous en base — rien n'est
inventé. Seuls trois départements sont `published` avec un contenu
éditorial réel et différencié par ville (Val-d'Oise avec Arnouville,
Gonesse, Sarcelles, Garges-lès-Gonesse et Villiers-le-Bel ; Paris ; Rhône
avec Lyon) : c'est l'exemple travaillé en profondeur. Les autres
départements existent en base mais restent `published = false` — pas de
page générée tant qu'un contenu réel n'est écrit, conformément à la
consigne « ne jamais publier des pages minces en masse ». Un
département/ville non publié n'apparaît jamais comme lien cliquable (juste
en texte sous « Couverture à venir ») et son URL renvoie un 404 propre si
on la visite directement.

**Pour publier une nouvelle ville** : ajouter la ligne dans
`evcharge_cities` (`published = true`), écrire un `evcharge_city_content`
réel et différencié (jamais un simple remplissage de variables), puis
`published = true` sur son département et sa région si besoin. Le
sitemap, les breadcrumbs, le JSON-LD et le maillage interne (villes
voisines, montée région/département) se génèrent automatiquement.

**Ne jamais inventer** : population, code INSEE de commune, prix, avis,
certifications et contraintes locales restent `null`/absents tant qu'ils
ne sont pas vérifiés — l'UI masque proprement le champ plutôt que
d'afficher une valeur inventée.

**Sitemaps** : `/sitemap.xml` est un index pointant vers
`sitemap-services.xml`, `sitemap-regions.xml`, `sitemap-departements.xml`,
`sitemap-villes.xml` et `sitemap-guides.xml` (`app/sitemap-*.xml/route.ts`),
chacun ne listant que des pages réellement publiées.

**Trouver mon installateur / géolocalisation** : `components/geo/CoverageFinder.tsx`
(recherche ville/CP) et `components/geo/LocationBanner.tsx` (bandeau non
intrusif, géolocalisation à la demande de l'utilisateur uniquement,
jamais déclenchée automatiquement) interrogent la même base — aucune
couverture n'est jamais affirmée pour une ville absente de la base.
