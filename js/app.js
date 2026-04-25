/* APP.JS */
document.addEventListener("DOMContentLoaded", () => {

  /* ===== Fade-in au scroll ===== */
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  document.querySelectorAll(".fade-in").forEach((el) => fadeObserver.observe(el));

  /* ===== Burger menu mobile ===== */
  const nav = document.querySelector(".header_nav");
  const burger = document.querySelector(".header_burger");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav--open");
      burger.classList.toggle("burger--open", isOpen);
      burger.setAttribute("aria-expanded", isOpen);
      
    });

    // Fermer en cliquant sur un lien
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav--open");
        burger.classList.remove("burger--open");
        burger.setAttribute("aria-expanded", "false");
        
      });
    });

    // Fermer avec Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("nav--open")) {
        nav.classList.remove("nav--open");
        burger.classList.remove("burger--open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ===== UX: Navigation Dynamique (Active State) ===== */
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split("/").pop() || "index.html";
  const headerLinks = document.querySelectorAll(".header_nav a");

  // Détermination du contexte pour les pages de projet
  let currentContext = currentFile;
  const projectPages = ['typedirecteur.html', 'css-translator.html', 'projet-detail.html', 'projet-bientot.html'];
  if (projectPages.includes(currentFile)) {
    currentContext = 'projets.html'; // Si dans un projet, surligner l'onglet "Projets"
  }

  headerLinks.forEach(link => {
    const targetFile = link.getAttribute("href").split("/").pop();
    
    // Retrait des classes hardcodées temporairement
    link.classList.remove("active");
    link.removeAttribute("aria-current");

    if (targetFile === currentContext) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* ===== UX: Bouton Copier Email ===== */
  const emailLinks = document.querySelectorAll('.footer_mail');
  emailLinks.forEach(link => {
    // Création du bouton avec l'icône de copie
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
    copyBtn.setAttribute('aria-label', "Copier l'email");
    copyBtn.style.cssText = 'background:transparent; border:none; color:var(--muted); cursor:pointer; font-size:1.2rem; margin-left:12px; transition:color 0.2s; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;';
    
    // Création du petit toast de notification ("Copié !")
    const toast = document.createElement('span');
    toast.textContent = "Copié !";
    toast.style.cssText = 'font-family: var(--font-body); font-size:0.8rem; font-weight: 500; color:var(--blanc); background:var(--rouge); padding:4px 10px; border-radius:12px; opacity:0; transition:opacity 0.2s; position:absolute; transform:translate(50px, -35px); pointer-events:none; display: inline-flex;';

    // Wrapper pour aligner l'email et son bouton sans modifier le CSS source
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex; justify-content:center; align-items:center; position:relative; margin-bottom: 24px;'; // Remplace le margin-bottom de .footer_mail
    
    link.parentNode.insertBefore(wrapper, link);
    wrapper.appendChild(link);
    wrapper.appendChild(copyBtn);
    wrapper.appendChild(toast);

    // On retire le margin par défaut pour éviter le double espacement avec le wrapper flex
    link.style.marginBottom = '0';

    // Événement Copier
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('Billalboudlal.pro@gmail.com').then(() => {
        toast.style.opacity = '1';
        setTimeout(() => toast.style.opacity = '0', 2000); // Disparaît après 2s
      });
    });
    
    // Événement Hover du bouton
    copyBtn.addEventListener('mouseenter', () => copyBtn.style.color = 'var(--blanc)');
    copyBtn.addEventListener('mouseleave', () => copyBtn.style.color = 'var(--muted)');
  });

});
