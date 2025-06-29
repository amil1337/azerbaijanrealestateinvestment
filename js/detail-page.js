/**
 * Azerbaijan Real Estate Investment - Property Detail Page Functionality
 * Handles interactive elements on the property detail page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize gallery functionality
  initGallery();
  
  // Initialize the inquiry form
  initInquiryForm();
  
  // Initialize property features hover effects
  initFeatureItems();
  
  // Initialize similar properties hover effects
  initSimilarProperties();
  
  // Initialize dropdown toggles (reusing from main site)
  initDropdowns();
});

/**
 * Initialize the property image gallery
 */
function initGallery() {
  const mainImage = document.querySelector('.gallery-featured-img');
  const thumbnails = document.querySelectorAll('.thumbnail:not(.view-all)');
  const viewAllButton = document.querySelector('.thumbnail.view-all');
  
  // Click handler for thumbnails
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Update active state
      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Update main image
      const thumbnailImg = this.querySelector('img');
      const imgSrc = thumbnailImg.src.replace('w=300', 'w=1200');
      
      // Animate image change
      setTimeout(() => {
        mainImage.src = imgSrc;
      }, 100);
    });
  });
  
  // View all photos functionality
  if (viewAllButton) {
    viewAllButton.addEventListener('click', function() {
      openFullGallery();
    });
  }
}

/**
 * Open full gallery modal (placeholder functionality)
 */
function openFullGallery() {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'gallery-modal';
  
  // Add close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'gallery-modal-close';
  closeBtn.innerHTML = '<i class="fi fi-rr-cross"></i>';
  
  // Get all images
  const galleryImages = Array.from(document.querySelectorAll('.thumbnail:not(.view-all) img'));
  const mainImage = document.querySelector('.gallery-featured-img');
  const allImages = [mainImage.src.replace('w=1200', 'w=1600')].concat(
    galleryImages.map(img => img.src.replace('w=300', 'w=1600'))
  );
  
  // Create slider container
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'gallery-slider';
  
  // Add images to slider
  allImages.forEach(imgSrc => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide';
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Property Image';
    
    slide.appendChild(img);
    sliderContainer.appendChild(slide);
  });
  
  // Add navigation buttons
  const prevBtn = document.createElement('button');
  prevBtn.className = 'gallery-nav prev';
  prevBtn.innerHTML = '<i class="fi fi-rr-angle-left"></i>';
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'gallery-nav next';
  nextBtn.innerHTML = '<i class="fi fi-rr-angle-right"></i>';
  
  // Add counter
  const counter = document.createElement('div');
  counter.className = 'gallery-counter';
  counter.textContent = `1 / ${allImages.length}`;
  
  // Add elements to modal
  modal.appendChild(closeBtn);
  modal.appendChild(sliderContainer);
  modal.appendChild(prevBtn);
  modal.appendChild(nextBtn);
  modal.appendChild(counter);
  
  // Add modal to body
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  
  // Set up event listeners
  let currentSlide = 0;
  
  // Update slide display
  const updateSlide = () => {
    const slides = document.querySelectorAll('.gallery-slide');
    slides.forEach((slide, i) => {
      slide.style.display = i === currentSlide ? 'flex' : 'none';
    });
    counter.textContent = `${currentSlide + 1} / ${allImages.length}`;
  };
  
  // Initial slide display
  updateSlide();
  
  // Navigation handlers
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + allImages.length) % allImages.length;
    updateSlide();
  });
  
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % allImages.length;
    updateSlide();
  });
  
  // Close modal handler
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
    document.body.style.overflow = ''; // Restore scrolling
  });
  
  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function galleryKeyHandler(e) {
    if (e.key === 'Escape') {
      document.body.removeChild(modal);
      document.body.style.overflow = ''; // Restore scrolling
      document.removeEventListener('keydown', galleryKeyHandler);
    } else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });
}

/**
 * Initialize the inquiry form
 */
function initInquiryForm() {
  const inquiryForm = document.querySelector('.inquiry-form');
  
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const phone = this.querySelector('input[type="tel"]').value;
      const message = this.querySelector('textarea').value;
      
      // Simple validation
      if (!name || !email || !phone || !message) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Phone validation (simple)
      const phoneRegex = /^[0-9+\s-]+$/;
      if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number');
        return;
      }
      
      // Show success message
      const formContainer = inquiryForm.parentElement;
      const successMsg = document.createElement('div');
      successMsg.className = 'alert-success';
      successMsg.innerHTML = `
        <i class="fi fi-rr-check-circle"></i>
        <p>Thank you for your interest! Your message has been sent successfully. Our property advisor will contact you shortly.</p>
      `;
      
      inquiryForm.style.display = 'none';
      formContainer.appendChild(successMsg);
      
      // In a real app, here you would send the data to the server
      console.log('Form submitted:', { name, email, phone, message });
    });
  }
}

/**
 * Initialize hover effects for property features
 */
function initFeatureItems() {
  const featureItems = document.querySelectorAll('.feature-item');
  
  featureItems.forEach(item => {
    // Add hover animation
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
  });
}

/**
 * Initialize hover effects for similar properties
 */
function initSimilarProperties() {
  const propertyCards = document.querySelectorAll('.similar-properties .property-card');
  
  propertyCards.forEach(card => {
    // Add click handler - in a real application, this would navigate to the property details
    card.addEventListener('click', function() {
      // For demonstration purposes, just log the property name
      const propertyName = this.querySelector('h3').textContent;
      console.log(`Navigating to property: ${propertyName}`);
      
      // In a real app, this would be:
      // window.location.href = 'detail.html?property=' + propertyId;
    });
    
    // Add cursor style
    card.style.cursor = 'pointer';
  });
}

/**
 * Initialize dropdown functionality (copied from main site)
 * Supports the language and currency dropdowns with English, Turkish, Arabic, Russian
 * languages and USD, RUB, AED, TRY currencies as per site standards
 */
function initDropdowns() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      
      const dropdownId = this.id;
      const targetMenuId = dropdownId.replace('-btn', '-menu');
      const targetMenu = document.getElementById(targetMenuId);
      
      // Close all other dropdown menus
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu.id !== targetMenuId) {
          menu.classList.remove('show');
        }
      });
      
      document.querySelectorAll('.dropdown-toggle').forEach(otherToggle => {
        if (otherToggle.id !== dropdownId) {
          otherToggle.classList.remove('active');
        }
      });
      
      // Toggle current menu
      targetMenu.classList.toggle('show');
      this.classList.toggle('active');
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
      
      document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.classList.remove('active');
      });
    }
  });
  
  // Handle currency selection
  const currencyItems = document.querySelectorAll('.currency-menu .dropdown-item');
  const currencyBtn = document.getElementById('currency-btn');
  
  if (currencyItems && currencyBtn) {
    currencyItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const currencyText = this.querySelector('.currency-text').textContent;
        const currencyHtml = this.innerHTML;
        
        // Update button text with selected currency
        currencyBtn.innerHTML = currencyHtml;
        
        // Close dropdown
        document.getElementById('currency-menu').classList.remove('show');
        currencyBtn.classList.remove('active');
        
        // In a real app, this would update prices throughout the page
        console.log(`Currency changed to: ${currencyText}`);
      });
    });
  }
  
  // Handle language selection
  const languageItems = document.querySelectorAll('.lang-menu .dropdown-item');
  const languageBtn = document.getElementById('lang-btn');
  
  if (languageItems && languageBtn) {
    languageItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const langCode = this.getAttribute('data-lang');
        const langText = this.textContent;
        const langHtml = this.innerHTML;
        
        // Update button text with selected language
        languageBtn.innerHTML = langHtml;
        
        // Close dropdown
        document.getElementById('lang-menu').classList.remove('show');
        languageBtn.classList.remove('active');
        
        // In a real app, this would change the page language
        console.log(`Language changed to: ${langText} (${langCode})`);
      });
    });
  }
}
