(() => {
  const content = window.PORTFOLIO_CONTENT;
  if (!content) return;

  const hero = document.querySelector("#hero-image");
  hero.style.backgroundImage = 'url("' + content.hero + '")';

  const projectGrid = document.querySelector("#projects-grid");
  const dialog = document.querySelector("#project-dialog");
  const dialogImage = document.querySelector("#dialog-image");
  const dialogCategory = document.querySelector("#dialog-category");
  const dialogTitle = document.querySelector("#dialog-title");
  const dialogDescription = document.querySelector("#dialog-description");
const dialogGallery = document.createElement("div");
dialogGallery.className = "dialog-gallery";
dialogImage.insertAdjacentElement("afterend", dialogGallery);
  content.projects.forEach((project, index) => {
    const button = document.createElement("button");
    button.className = "project-card " + project.size;
    button.style.setProperty("--image", 'url("' + project.image + '")');
    button.style.setProperty("--position", project.position || "center");
    button.innerHTML =
      '<span class="project-number">0' + (index + 1) + "</span>" +
      '<span class="project-copy">' +
      "<small>" + project.category + "</small>" +
      "<strong>" + project.title + "</strong>" +
      "</span>";
    /* Barrido automático de imágenes en las tarjetas de inicio */

const slides = [
  project.image,
  ...(project.gallery || []),
].filter(Boolean);

if (slides.length > 1) {
  const slideLayer = document.createElement("span");

  slideLayer.className = "project-slideshow";
  slideLayer.setAttribute("aria-hidden", "true");
  slideLayer.style.backgroundImage =
    'linear-gradient(to top, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.08) 70%), url("' +
    slides[0] +
    '")';

  slideLayer.style.backgroundPosition =
    project.position || "center center";

  button.prepend(slideLayer);

  let currentSlide = 0;

  const changeProjectSlide = () => {
    /* Detener el barrido cuando la galería está abierta */
    if (document.hidden || dialog.open) {
      return;
    }

    slideLayer.classList.add("is-leaving");

    window.setTimeout(() => {
      currentSlide = (currentSlide + 1) % slides.length;

      slideLayer.style.backgroundImage =
        'linear-gradient(to top, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.08) 70%), url("' +
        slides[currentSlide] +
        '")';

      slideLayer.classList.remove("is-leaving");
      slideLayer.classList.add("is-entering");

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          slideLayer.classList.remove("is-entering");
        });
      });
    }, 450);
  };

  window.setInterval(
    changeProjectSlide,
    6500 + index * 350
  );
}
    button.addEventListener("click", () => {
     const images =
  project.gallery && project.gallery.length
    ? project.gallery
    : [project.image];

dialogImage.src = images[0];
dialogGallery.innerHTML = "";

images.forEach((src, imageIndex) => {
  const thumbnail = document.createElement("button");
  thumbnail.type = "button";
  thumbnail.className = "gallery-thumbnail";
  thumbnail.setAttribute(
    "aria-label",
    "Ver fotografía " + (imageIndex + 1)
  );
  thumbnail.innerHTML =
    '<img src="' + src + '" alt="" loading="lazy">';

  thumbnail.addEventListener("click", () => {
    dialogImage.src = src;
  });

  dialogGallery.appendChild(thumbnail);
});

dialogGallery.hidden = images.length < 2;
      dialogImage.alt = project.title;
      dialogCategory.textContent = project.category;
      dialogTitle.textContent = project.title;
      dialogDescription.textContent = project.description;
      dialog.showModal();
    });
    projectGrid.appendChild(button);
  });

  document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  const servicesGrid = document.querySelector("#services-grid");
  content.services.forEach((service, index) => {
    const article = document.createElement("article");
    article.className = "service-card";
    article.innerHTML =
      '<div class="service-top"><b>' + service.tag + "</b><span>0" +
      (index + 1) + "</span></div><h3>" + service.title + "</h3><p>" +
      service.description + "</p>";
    servicesGrid.appendChild(article);
  });

  const certifications = document.querySelector("#certifications-list");
  content.certifications.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    certifications.appendChild(li);
  });

  const toolsList = document.querySelector("#tools-list");
  content.tools.forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    toolsList.appendChild(span);
  });

  const contacts = [
    ["WhatsApp", content.contact.whatsapp],
    ["Correo", content.contact.email],
    ["LinkedIn", content.contact.linkedin],
    ["Behance", content.contact.behance],
  ];
  const contactLinks = document.querySelector("#contact-links");
  const configuredContacts = contacts.filter((item) => item[1]);

  if (configuredContacts.length) {
    configuredContacts.forEach(([label, url]) => {
      const link = document.createElement("a");
      link.href = url;
      link.textContent = label;
      if (!url.startsWith("mailto:")) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
      contactLinks.appendChild(link);
    });
  } else {
    contacts.forEach(([label]) => {
      const span = document.createElement("span");
      span.textContent = label;
      contactLinks.appendChild(span);
    });
    document.querySelector("#contact-note").textContent =
      "Completa tus enlaces en content.js antes de publicar.";
  }

  document.querySelector("#year").textContent = new Date().getFullYear();
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => link.closest("details").removeAttribute("open"));
  });
})();
