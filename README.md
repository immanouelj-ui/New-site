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

Le contenu est séparé du code dans `lib/content/`. Ces fichiers TypeScript
peuvent être remplacés par des appels à un CMS headless ou une base de
données sans changer les composants qui les consomment.
