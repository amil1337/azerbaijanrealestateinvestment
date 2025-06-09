/**
 * Azerbaijan Real Estate Investment - Property Search Functionality
 * This script handles the advanced search form on the catalog page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Cache DOM elements
  const searchForm = document.querySelector('.advanced-search-form');
  const catalogGrid = document.querySelector('.catalog-grid');
  const resultsCount = document.querySelector('.results-count strong');
  const sortDropdown = document.getElementById('sort-options');
  const resetButton = document.querySelector('.reset-btn');
  
  // Store all property cards for filtering
  const allPropertyCards = Array.from(document.querySelectorAll('.property-card'));
  
  // Store the original DOM order of properties to preserve it during resets
  const originalPropertyOrder = [...allPropertyCards];
  
  // Initialize property data from DOM
  const properties = allPropertyCards.map(card => {
    // Extract property info
    const title = card.querySelector('h3').textContent;
    const location = card.querySelector('.property-location').textContent.trim();
    const priceText = card.querySelector('.property-price').textContent;
    const price = extractNumericPrice(priceText);
    const isRent = card.querySelector('.property-tag').textContent.includes('Rent');
    const status = isRent ? 'for-rent' : 'for-sale';
    
    // Extract features
    const features = card.querySelector('.property-features');
    const bedsMatch = features ? features.textContent.match(/(\d+)\s*Beds?/) : null;
    const bathsMatch = features ? features.textContent.match(/(\d+)\s*Baths?/) : null;
    const areaMatch = features ? features.textContent.match(/(\d+)\s*m²/) : null;
    
    // Extract property type from title
    const propertyType = extractPropertyType(title);
    
    // Extract city from location
    const city = extractCity(location);
    
    // Check for premium features (these would be better as data attributes in a real app)
    const hasPool = title.toLowerCase().includes('villa') || title.toLowerCase().includes('luxury');
    const hasGarage = title.toLowerCase().includes('house') || title.toLowerCase().includes('villa');
    const hasGarden = title.toLowerCase().includes('villa') || title.toLowerCase().includes('residence');
    const hasSecurity = title.toLowerCase().includes('luxury') || location.toLowerCase().includes('flame towers');
    
    return {
      element: card,
      title: title,
      type: propertyType,
      location: location, 
      city: city,
      status: status,
      price: price,
      priceText: priceText,
      bedrooms: bedsMatch ? parseInt(bedsMatch[1]) : null,
      bathrooms: bathsMatch ? parseInt(bathsMatch[1]) : null,
      area: areaMatch ? parseInt(areaMatch[1]) : null,
      features: {
        pool: hasPool,
        garage: hasGarage,
        garden: hasGarden,
        security: hasSecurity
      }
    };
  });
  
  // Form submit handler
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    filterProperties();
  });
  
  // Reset button handler
  resetButton.addEventListener('click', function() {
    searchForm.reset();
    resetFilters();
  });
  
  // Sort dropdown handler
  sortDropdown.addEventListener('change', function() {
    sortProperties(this.value);
  });
  
  // Filter properties based on form values
  function filterProperties() {
    const filters = {
      propertyType: document.getElementById('property-type').value,
      location: document.getElementById('location').value,
      status: document.getElementById('status').value,
      minPrice: document.getElementById('min-price').value ? parseFloat(document.getElementById('min-price').value) : null,
      maxPrice: document.getElementById('max-price').value ? parseFloat(document.getElementById('max-price').value) : null,
      bedrooms: document.getElementById('bedrooms').value ? parseInt(document.getElementById('bedrooms').value) : null,
      bathrooms: document.getElementById('bathrooms').value ? parseInt(document.getElementById('bathrooms').value) : null,
      minArea: document.getElementById('min-area').value ? parseFloat(document.getElementById('min-area').value) : null,
      maxArea: document.getElementById('max-area').value ? parseFloat(document.getElementById('max-area').value) : null,
      features: Array.from(document.querySelectorAll('input[name="feature"]:checked')).map(el => el.value)
    };
    
    // Check if any filters are actually applied
    const hasActiveFilters = (
      filters.propertyType || 
      filters.location || 
      filters.status || 
      filters.minPrice !== null || 
      filters.maxPrice !== null || 
      filters.bedrooms !== null || 
      filters.bathrooms !== null || 
      filters.minArea !== null || 
      filters.maxArea !== null || 
      filters.features.length > 0
    );
    
    // If no filters are applied, reset to original order and return
    if (!hasActiveFilters) {
      resetFilters();
      return;
    }
    
    const filteredProperties = properties.filter(property => {
      // Filter by property type
      if (filters.propertyType && property.type !== filters.propertyType) return false;
      
      // Filter by location/city
      if (filters.location && property.city !== filters.location) return false;
      
      // Filter by status (rent/sale)
      if (filters.status && property.status !== filters.status) return false;
      
      // Filter by price range
      if (filters.minPrice !== null && property.price < filters.minPrice) return false;
      if (filters.maxPrice !== null && property.price > filters.maxPrice) return false;
      
      // Filter by bedrooms (minimum)
      if (filters.bedrooms !== null && property.bedrooms < filters.bedrooms) return false;
      
      // Filter by bathrooms (minimum)
      if (filters.bathrooms !== null && property.bathrooms < filters.bathrooms) return false;
      
      // Filter by area range
      if (filters.minArea !== null && property.area < filters.minArea) return false;
      if (filters.maxArea !== null && property.area > filters.maxArea) return false;
      
      // Filter by features
      for (const feature of filters.features) {
        if (!property.features[feature]) return false;
      }
      
      return true;
    });
    
    // Update the UI with filtered properties
    updatePropertyDisplay(filteredProperties);
    
    // Update the count
    resultsCount.textContent = filteredProperties.length;
    
    // Apply current sort
    sortProperties(sortDropdown.value, filteredProperties);
  }
  
  // Sort properties by selected option
  function sortProperties(sortOption, propertiesToSort = null) {
    const propertiesToUse = propertiesToSort || properties.filter(p => !p.element.classList.contains('hidden'));
    
    propertiesToUse.sort((a, b) => {
      switch(sortOption) {
        case 'newest':
          // In a real app, we'd have a date field. For demo purposes, using random order
          return 0.5 - Math.random();
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'area-asc':
          return a.area - b.area;
        case 'area-desc':
          return b.area - a.area;
        default:
          return 0;
      }
    });
    
    // Reorder elements in the DOM
    catalogGrid.innerHTML = '';
    propertiesToUse.forEach(property => {
      catalogGrid.appendChild(property.element);
    });
  }
  
  // Reset filters and show all properties
  function resetFilters() {
    properties.forEach(property => {
      property.element.classList.remove('hidden');
    });
    
    resultsCount.textContent = properties.length;
    
    // Restore original DOM order instead of sorting
    restoreOriginalOrder();
  }
  
  // Restore the original order of properties in the DOM
  function restoreOriginalOrder() {
    catalogGrid.innerHTML = '';
    originalPropertyOrder.forEach(element => {
      catalogGrid.appendChild(element);
    });
  }
  
  // Update the display of properties
  function updatePropertyDisplay(filteredProperties) {
    // Hide all properties first
    properties.forEach(property => {
      property.element.classList.add('hidden');
    });
    
    // Show filtered properties
    filteredProperties.forEach(property => {
      property.element.classList.remove('hidden');
    });
  }
  
  // Helper function to extract numeric price from price text
  function extractNumericPrice(priceText) {
    const priceMatch = priceText.match(/[\$]?([\d,]+)/);
    if (priceMatch) {
      return parseFloat(priceMatch[1].replace(/,/g, ''));
    }
    return 0;
  }
  
  // Helper function to extract property type from title
  function extractPropertyType(title) {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('apartment')) return 'apartment';
    if (lowerTitle.includes('house')) return 'house';
    if (lowerTitle.includes('villa')) return 'villa';
    if (lowerTitle.includes('office') || lowerTitle.includes('commercial') || lowerTitle.includes('space')) return 'commercial';
    if (lowerTitle.includes('land')) return 'land';
    return '';
  }
  
  // Helper function to extract city from location
  function extractCity(location) {
    const cities = ['baku', 'ganja', 'sumqayit', 'lankaran', 'qabala'];
    const lowerLocation = location.toLowerCase();
    
    for (const city of cities) {
      if (lowerLocation.includes(city)) return city;
    }
    
    return '';
  }
  
  // Add CSS for hidden properties
  const style = document.createElement('style');
  style.textContent = `
    .property-card.hidden {
      display: none;
    }
  `;
  document.head.appendChild(style);
});
