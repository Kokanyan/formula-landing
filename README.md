# FORMULA — Landing page

Landing page d'une page pour la formation **FORMULA** (formule des ventes sur Instagram, en arménien).
Site statique, léger et rapide : **HTML + CSS + un peu de JavaScript** (aucun framework).

## 📁 Structure

```
formula-site/
├── index.html            → la page (structure + texte arménien)
├── css/
│   └── styles.css        → styles (couleurs, layout, responsive, animations)
├── js/
│   └── main.js           → lien de paiement + animations au scroll
└── assets/
    ├── formula-logo.jpeg     → logo (hero)
    ├── favicon-32.png        → favicon
    ├── favicon-192.png       → favicon (haute résolution)
    ├── apple-touch-icon.png  → icône iOS
    └── og-image.jpg          → aperçu au partage (Open Graph)
```

## 🔗 1) Mettre le lien de paiement (IMPORTANT)

Ouvre **`js/main.js`** et remplace la ligne tout en haut :

```js
const PAYMENT_URL = "#"; // <-- METS TON LIEN ICI
```

par ton vrai lien, par exemple :

```js
const PAYMENT_URL = "https://buy.stripe.com/xxxxx";
```

Tous les boutons d'achat de la page (« Միացիր FORMULA-ին », « Սկսիր հենց հիմա՝ 45.000 դրամով », etc.)
pointeront automatiquement vers ce lien. **C'est le seul endroit à modifier.**

## 👀 2) Prévisualiser en local

Depuis le dossier `formula-site/` :

```bash
python3 -m http.server 8000
```

Puis ouvre <http://localhost:8000> dans ton navigateur.
(Ou, plus simple : double-clique sur `index.html`.)

## 🚀 3) Mettre en ligne

### Option A — Netlify (glisser-déposer, le plus simple)
1. Va sur <https://app.netlify.com/drop>
2. Glisse-dépose le dossier `formula-site/` entier.
3. C'est en ligne. Tu peux ensuite renommer le site et brancher ton domaine.

### Option B — Vercel
1. Installe : `npm i -g vercel`
2. Dans le dossier `formula-site/`, lance : `vercel`
3. Suis les questions (projet statique, dossier racine).

### Option C — GitHub Pages
1. Crée un dépôt GitHub et pousse le contenu de `formula-site/`.
2. Repo → **Settings → Pages** → Source : branche `main`, dossier `/root`.
3. L'URL publique apparaît en quelques minutes.

## ✏️ À personnaliser (optionnel)
- **Footer** : liens contact / Instagram / mentions — voir le commentaire `TODO (footer)` dans `index.html`.
- **Open Graph** : une fois en ligne, décommente et renseigne `og:url` dans `index.html` pour un partage propre.
- **Visuel AI** : la section AI utilise un placeholder « VISUEL AI » ; remplace-le par une vraie image si tu veux.
