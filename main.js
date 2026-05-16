const revealNodes = document.querySelectorAll("[data-reveal]");
const orbitStage = document.querySelector("[data-orbit]");
const wordmarks = document.querySelectorAll("[data-wordmark]");
let spotlightTimer = null;

function revealImmediately() {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

function initRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    revealImmediately();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function initOrbitMotion() {
  if (!orbitStage) {
    return;
  }

  orbitStage.style.setProperty("--pointer-x", "0px");
  orbitStage.style.setProperty("--pointer-y", "0px");

  orbitStage.addEventListener("pointermove", (event) => {
    const rect = orbitStage.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    orbitStage.style.setProperty("--pointer-x", `${offsetX * 0.04}px`);
    orbitStage.style.setProperty("--pointer-y", `${offsetY * 0.04}px`);
  });

  orbitStage.addEventListener("pointerleave", () => {
    orbitStage.style.setProperty("--pointer-x", "0px");
    orbitStage.style.setProperty("--pointer-y", "0px");
  });
}

function initWordmarkStates() {
  wordmarks.forEach((wordmark) => {
    wordmark.addEventListener("mouseenter", () => {
      wordmark.classList.add("is-active");
    });

    wordmark.addEventListener("mouseleave", () => {
      wordmark.classList.remove("is-active");
    });

    wordmark.addEventListener(
      "focus",
      () => {
        wordmark.classList.add("is-active");
      },
      true,
    );

    wordmark.addEventListener(
      "blur",
      () => {
        wordmark.classList.remove("is-active");
      },
      true,
    );
  });
}

function initWordmarkSpotlight() {
  if (!wordmarks.length) {
    return;
  }

  if ("matchMedia" in window && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let activeIndex = 0;

  const syncState = () => {
    wordmarks.forEach((wordmark, index) => {
      wordmark.classList.toggle("is-active", index === activeIndex);
    });
  };

  syncState();

  spotlightTimer = setInterval(() => {
    activeIndex = (activeIndex + 1) % wordmarks.length;
    syncState();
  }, 1800);
}

document.addEventListener("DOMContentLoaded", () => {
  initRevealObserver();
  initOrbitMotion();
  initWordmarkStates();
  initWordmarkSpotlight();
});
