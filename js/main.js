// Handle scroll events for navbar background color and back to top button
function handleScroll() {
  const navbar = document.querySelector('.navbar-container');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const whatsappBtn = document.querySelector('.whatsapp-button');
  const scrollPosition = window.scrollY;
  
  // Add or remove scrolled class based on scroll position
  if (scrollPosition > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Show or hide back to top button
  if (scrollPosition > 300) {
    backToTopBtn.classList.add('visible');
    // Make WhatsApp button visible too
    if (whatsappBtn) {
      whatsappBtn.classList.add('visible');
    }
  } else {
    backToTopBtn.classList.remove('visible');
    // Hide WhatsApp button too
    if (whatsappBtn) {
      whatsappBtn.classList.remove('visible');
    }
  }
}

// Mobile menu functionality
function setupMobileMenu() {
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.mobile-menu-close');
  const overlay = document.querySelector('.overlay');
  const body = document.body;

  // Open mobile menu
  if (burgerMenu) {
    burgerMenu.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
  }

  // Close mobile menu
  if (closeMenu) {
    closeMenu.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      body.style.overflow = ''; // Allow scrolling again
    });
  }

  // Close menu when clicking on overlay
  if (overlay) {
    overlay.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      body.style.overflow = '';
    });
  }

  // Close menu when clicking on a link
  const mobileLinks = document.querySelectorAll('.mobile-nav ul li a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      body.style.overflow = '';
    });
  });
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// When the user scrolls down, change the navbar background color
window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Check on page load too
window.addEventListener("load", function() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  }
});

// Back to top button functionality
const backToTopButton = document.querySelector(".back-to-top");
if (backToTopButton) {
  window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Update results count on catalog page
window.addEventListener('DOMContentLoaded', function() {
  // Update property count if available
  const propertyCards = document.querySelectorAll('.property-card');
  const resultsCount = document.querySelector('.results-count p strong');
  
  if (resultsCount && propertyCards.length) {
    resultsCount.textContent = propertyCards.length;
  }
});

// Currency dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check scroll position immediately on page load
  handleScroll();
  
  // Initialize mobile menu functionality
  setupMobileMenu();
  
  // Add back to top button functionality
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Main page property search form filter buttons functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Toggle active class - if it has the class, remove it; otherwise, add it
        this.classList.toggle('active');
      });
    });
  }

  // Status toggle functionality with animation (Sale/Rent)
  const toggleOptions = document.querySelectorAll('.toggle-option');
  
  if (toggleOptions.length > 0) {
    toggleOptions.forEach((option, index) => {
      option.addEventListener('click', function() {
        // Remove active class from all options
        toggleOptions.forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked option
        this.classList.add('active');
        
        // Get the parent container
        const container = this.closest('.status-toggle');
        
        // Add or remove the second-active class based on which button was clicked
        if (index === 1) {
          container.classList.add('second-active');
        } else {
          container.classList.remove('second-active');
        }
        
        // You can access the selected value with:
        const selectedValue = this.getAttribute('data-value');
        console.log('Selected status:', selectedValue);
      });
    });
  }
  
  // Currency dropdown functionality
  const currencyBtn = document.getElementById('currency-btn');
  const currencyMenu = document.getElementById('currency-menu');
  
  if (currencyBtn && currencyMenu) {
    // Toggle dropdown on button click
    currencyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      currencyMenu.classList.toggle('show');
      currencyBtn.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!currencyBtn.contains(e.target) && !currencyMenu.contains(e.target)) {
        currencyMenu.classList.remove('show');
        currencyBtn.classList.remove('active');
      }
    });
    
    // Allow selecting currencies
    const currencyItems = currencyMenu.querySelectorAll('.dropdown-item');
    currencyItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the currency text from the clicked item
        const currencyText = this.textContent.trim();
        // Update the button text
        currencyBtn.innerHTML = this.innerHTML;
        
        // Close the dropdown
        currencyMenu.classList.remove('show');
        currencyBtn.classList.remove('active');
      });
    });
  }
  
  // Language dropdown functionality
  const languageBtn = document.getElementById('language-btn');
  const languageMenu = document.getElementById('language-menu');
  
  if (languageBtn && languageMenu) {
    // Toggle dropdown on button click
    languageBtn.addEventListener('click', function(e) {
      e.preventDefault();
      languageMenu.classList.toggle('show');
      languageBtn.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!languageBtn.contains(e.target) && !languageMenu.contains(e.target)) {
        languageMenu.classList.remove('show');
        languageBtn.classList.remove('active');
      }
    });
    
    // Allow selecting languages
    const languageItems = languageMenu.querySelectorAll('.dropdown-item');
    languageItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the language text from the clicked item
        const languageText = this.textContent.trim();
        // Update the button text
        languageBtn.innerHTML = this.innerHTML;
        
        // Close the dropdown
        languageMenu.classList.remove('show');
        languageBtn.classList.remove('active');
      });
    });
  }
});
