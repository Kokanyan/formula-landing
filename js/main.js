/* =========================================================================
   FORMULA — JavaScript (vanilla, léger)
   ========================================================================= */

/* -------------------------------------------------------------------------
   ⚑⚑⚑  LIEN DE PAIEMENT À REMPLACER  ⚑⚑⚑
   -------------------------------------------------------------------------
   Remplace la valeur ci-dessous par ton vrai lien de paiement / formulaire.
   Tous les boutons d'achat de la page ("Միացիր FORMULA-ին", etc.) pointeront
   automatiquement vers ce lien. C'est le SEUL endroit à modifier.

   Exemple : const PAYMENT_URL = "https://buy.stripe.com/xxxx";
             const PAYMENT_URL = "https://forms.gle/xxxx";
------------------------------------------------------------------------- */
const PAYMENT_URL = "#"; // <-- METS TON LIEN ICI

// Ouvrir le lien dans un nouvel onglet ? (true = oui). Mets false si tu
// préfères rester dans le même onglet.
const PAYMENT_OPEN_IN_NEW_TAB = true;

/* ------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {

  /* 1) Applique le lien de paiement à tous les boutons CTA (.js-cta) -------- */
  var ctas = document.querySelectorAll(".js-cta");
  var linkIsReal = PAYMENT_URL && PAYMENT_URL !== "#";

  ctas.forEach(function (btn) {
    btn.setAttribute("href", PAYMENT_URL);
    if (linkIsReal && PAYMENT_OPEN_IN_NEW_TAB) {
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener noreferrer");
    }
    // Tant que le lien n'est pas défini, on empêche un saut disgracieux vers "#"
    if (!linkIsReal) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        console.warn("FORMULA : le lien de paiement (PAYMENT_URL) n'est pas encore défini dans js/main.js");
      });
    }
  });

  /* 1a) Mode aperçu : ?preview affiche toutes les sections d'emblée
         (utile pour les captures / la relecture). Sans effet en prod. ------ */
  if (/[?&]preview\b/.test(location.search)) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* 1b) Deep-link : si l'URL contient une ancre (#pricing, #contenu…),
         on s'y positionne proprement une fois la page prête. --------------- */
  if (location.hash && location.hash.length > 1) {
    var target = document.querySelector(location.hash);
    if (target) {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
      requestAnimationFrame(function () {
        var prev = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        target.scrollIntoView();
        document.documentElement.style.scrollBehavior = prev;
      });
    }
  }

  /* 2) Année dynamique dans le footer -------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* 2b) Header : fond flouté dès qu'on quitte le haut de la page ------------ */
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("is-stuck", window.scrollY > 12); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* 3) Animations d'apparition au scroll (discrètes) ----------------------- */
  var reveals = document.querySelectorAll(".reveal");

  // Si le navigateur ne supporte pas IntersectionObserver, on affiche tout.
  if (!("IntersectionObserver" in window) || reveals.length === 0) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target); // on n'anime qu'une seule fois
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px"
  });

  reveals.forEach(function (el) { observer.observe(el); });
});
