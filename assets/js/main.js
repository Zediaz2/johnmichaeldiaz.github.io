
// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Safely query DOM elements with error handling
 */
const DOM = {
  query: (selector) => {
    const element = document.querySelector(selector);
    if (!element) console.warn(`Element not found: ${selector}`);
    return element;
  },
  queryAll: (selector) => document.querySelectorAll(selector)
};

/**
 * Debounce function to prevent excessive function calls
 */
function debounce(func, delay = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScrolling() {
  DOM.queryAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = DOM.query(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// PROJECT GALLERY MANAGEMENT
// ============================================

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

class GalleryManager {
  constructor() {
    this.modal = DOM.query("#galleryModal");
    this.gallery = DOM.query("#modalGallery");
    this.title = DOM.query("#modalTitle");
    this.lightbox = DOM.query("#imageLightbox");
    this.lightboxImg = DOM.query("#lightboxImage");
    this.currentImageIndex = 0;
    this.currentImages = [];
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Close gallery when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeGallery();
      if (e.target === this.lightbox) this.closeLightbox();
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape") this.closeLightbox();
    });

    // Lightbox navigation
    document.addEventListener('keydown', (e) => {
      if (this.lightbox.style.display === "block") {
        if (e.key === "ArrowLeft") this.previousImage();
        if (e.key === "ArrowRight") this.nextImage();
      }
    });
  }

  openGallery(projectKey) {
    if (!projectGalleries[projectKey]) {
      console.error(`Project gallery not found: ${projectKey}`);
      return;
    }

    const project = projectGalleries[projectKey];
    this.currentImages = project.images;
    this.currentImageIndex = 0;

    this.gallery.innerHTML = "";
    this.title.textContent = project.title;

    project.images.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${project.title} - Image ${index + 1}`;
      img.loading = "lazy";
      img.addEventListener('click', () => this.openLightbox(index));
      this.gallery.appendChild(img);
    });

    this.modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  closeGallery() {
    this.modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  openLightbox(imageIndex) {
    this.currentImageIndex = imageIndex;
    this.lightboxImg.src = this.currentImages[imageIndex];
    this.lightbox.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  closeLightbox() {
    this.lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.currentImages.length;
    this.lightboxImg.src = this.currentImages[this.currentImageIndex];
  }

  previousImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.currentImages.length) % this.currentImages.length;
    this.lightboxImg.src = this.currentImages[this.currentImageIndex];
  }
}

// Global gallery instance
const galleryManager = new GalleryManager();

// Wrapper functions for HTML onclick handlers
function openGallery(projectKey) {
  galleryManager.openGallery(projectKey);
}

function closeGallery() {
  galleryManager.closeGallery();
}

function openLightbox(imageSrc) {
  const index = galleryManager.currentImages.indexOf(imageSrc);
  galleryManager.openLightbox(index);
}

function closeLightbox() {
  galleryManager.closeLightbox();
}

// ============================================
// CONTACT MODAL MANAGEMENT
// ============================================

class ContactModalManager {
  constructor() {
    this.modal = DOM.query("#contactModal");
    this.contactBtn = DOM.query("#contactBtn");
    this.closeButtons = DOM.queryAll("#closeContactModal");
    this.form = DOM.query("#contactForm");
    this.init();
  }

  init() {
    if (!this.modal || !this.contactBtn || !this.form) {
      console.error("Contact modal elements not found");
      return;
    }
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Open modal
    this.contactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.openModal();
    });

    // Close modal buttons
    this.closeButtons.forEach(btn => {
      btn.addEventListener("click", () => this.closeModal());
    });

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.closeModal();
      }
    });

    // Form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  openModal() {
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
    // Focus on first input for accessibility
    const firstInput = this.form.querySelector("input");
    if (firstInput) firstInput.focus();
  }

  closeModal() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("visitorName").value.trim();
    const email = document.getElementById("visitorEmail").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!this.validateForm(name, email, subject, message)) {
      return;
    }

    // Create mailto link with form data
    const mailtoLink = `mailto:johnmichaeldiaz.102403@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Close modal and reset form
    this.closeModal();
    this.form.reset();
  }

  validateForm(name, email, subject, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || name.length < 2) {
      alert("Please enter a valid name (at least 2 characters)");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (!subject || subject.length < 3) {
      alert("Please enter a subject (at least 3 characters)");
      return false;
    }

    if (!message || message.length < 10) {
      alert("Please enter a message (at least 10 characters)");
      return false;
    }

    return true;
  }
}

// Global contact modal instance
const contactModalManager = new ContactModalManager();

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function() {
  initSmoothScrolling();
  console.log("Portfolio initialized successfully");
});

// ===============================
// MOBILE HAMBURGER MENU
// ===============================
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
}

// Close menu when clicking mobile links
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// Sync mobile Send Email button
const mobileContactBtn = document.getElementById("mobileContactBtn");
if (mobileContactBtn) {
  mobileContactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMenu.classList.remove("active");
    document.getElementById("contactBtn").click();
  });
}
