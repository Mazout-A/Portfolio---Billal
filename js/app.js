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

});
