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

// Contact Modal Functionality
const contactBtn = document.getElementById("contactBtn");
const contactModal = document.getElementById("contactModal");
const closeContactModals = document.querySelectorAll("#closeContactModal");
const contactForm = document.getElementById("contactForm");

// Open contact modal
contactBtn.addEventListener("click", function(e) {
  e.preventDefault();
  contactModal.classList.add("active");
  document.body.style.overflow = "hidden";
});

// Close contact modal - handles both the X button and Cancel button
closeContactModals.forEach(btn => {
  btn.addEventListener("click", function() {
    contactModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close modal when clicking outside
window.addEventListener("click", function(e) {
  if (e.target === contactModal) {
    contactModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Handle contact form submission
contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("visitorName").value;
  const email = document.getElementById("visitorEmail").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Create mailto link with form data
  const mailtoLink = `mailto:johnmichaeldiaz.102403@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

  // Open default email client
  window.location.href = mailtoLink;

  // Close modal and reset form
  contactModal.classList.remove("active");
  document.body.style.overflow = "auto";
  contactForm.reset();
});