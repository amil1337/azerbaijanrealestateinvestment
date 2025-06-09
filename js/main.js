// Handle scroll events for navbar background color and back to top button
function handleScroll() {
  const navbar = document.querySelector('.navbar-container');
  const backToTopBtn = document.getElementById('backToTopBtn');
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
  } else {
    backToTopBtn.classList.remove('visible');
  }
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
