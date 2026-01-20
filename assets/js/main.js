// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

const projectGalleries = {
  pos: {
    title: "POS & Inventory System",
    images: [
      "assets/images/Gallery/POS-Android1.png",
      "assets/images/Gallery/POS-Android2.png",
      "assets/images/Gallery/Admin1.png",
      "assets/images/Gallery/Admin2.png",
      "assets/images/Gallery/Admin3.png",
      "assets/images/Gallery/Admin4.png",
      "assets/images/Gallery/Admin5.png",
      "assets/images/Gallery/Admin6.png",
      "assets/images/Gallery/Admin7.png",
      "assets/images/Gallery/Admin8.png",
      "assets/images/Gallery/Admin9.png",
      "assets/images/Gallery/Admin10.png",
      "assets/images/Gallery/Admin11.png",
      "assets/images/Gallery/Admin12.png",
      "assets/images/Gallery/Admin13.png",
      "assets/images/Gallery/Admin14.png"
    ]
  }
};

function openGallery(projectKey) {
  const modal = document.getElementById("galleryModal");
  const gallery = document.getElementById("modalGallery");
  const title = document.getElementById("modalTitle");

  gallery.innerHTML = "";
  title.textContent = projectGalleries[projectKey].title;

  projectGalleries[projectKey].images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Project image";
    img.addEventListener('click', function() {
      openLightbox(src);
    });
    gallery.appendChild(img);
  });

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  document.getElementById("galleryModal").style.display = "none";
  document.body.style.overflow = "auto";
}

function openLightbox(imageSrc) {
  const lightbox = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  lightboxImg.src = imageSrc;
  lightbox.style.display = "block";
}

function closeLightbox() {
  document.getElementById("imageLightbox").style.display = "none";
}

/* Close modal when clicking outside */
window.onclick = function (e) {
  const modal = document.getElementById("galleryModal");
  const lightbox = document.getElementById("imageLightbox");
  
  if (e.target === modal) {
    closeGallery();
  }
  
  if (e.target === lightbox) {
    closeLightbox();
  }
};

/* Close lightbox with Escape key */
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});