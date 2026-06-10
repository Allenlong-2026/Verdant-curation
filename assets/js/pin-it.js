/**
 * Verdant Curation — Universal Pin It Button
 * Adds Pinterest-style pin buttons to all article images.
 * Loaded via <script> in each article page.
 */
(function() {
  'use strict';

  function addPinButtons() {
    // Find all images in the article content area
    var imgs = document.querySelectorAll('.container img, .hero-wrap img, .scene-img-wrap img');
    if (!imgs.length) return;

    imgs.forEach(function(img) {
      // Skip if already has a pin button sibling
      if (img.nextElementSibling && img.nextElementSibling.classList.contains('pin-overlay')) {
        return;
      }
      // Skip if already wrapped
      if (img.parentNode && img.parentNode.classList.contains('pin-overlay')) {
        return;
      }

      // Create pin button
      var pin = document.createElement('div');
      pin.className = 'pin-overlay';
      pin.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#fff">'
        + '<path d="M12 16 L12 23" stroke="#fff" stroke-width="2" stroke-linecap="round"/>'
        + '<path d="M7 6 Q7 2 12 2 Q17 2 17 6 Q17 10 15 12 Q14 14 12 15 Q10 14 9 12 Q7 10 7 6 Z" fill="#fff"/>'
        + '</svg> Pin It';

      // Ensure container has position:relative for absolute positioning
      var container = img.parentNode;
      var computed = window.getComputedStyle(container, null);
      if (computed.position !== 'relative' && computed.position !== 'absolute' && computed.position !== 'fixed') {
        container.style.position = 'relative';
      }

      // Insert after the image
      img.parentNode.insertBefore(pin, img.nextSibling);
    });
  }

  // Run after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addPinButtons);
  } else {
    addPinButtons();
  }
})();
