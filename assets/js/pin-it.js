/**
 * Verdant Curation — Working Pin It Button
 * Adds functional Pinterest pin buttons to all images.
 * Each button opens Pinterest's create-pin dialog with the correct image & page URL.
 * Loaded via <script> in each article page.
 */
(function() {
  'use strict';

  function getAbsoluteUrl(src) {
    // If it's an absolute URL, use it directly
    if (src && (src.startsWith('http://') || src.startsWith('https://'))) {
      return src;
    }
    // If it's a base64 data URI, we can't use it for Pinterest
    if (src && src.startsWith('data:')) {
      return null;
    }
    // If it's a relative URL (e.g., /assets/images/cards/...), make it absolute
    if (src && src.startsWith('/')) {
      return window.location.origin + src;
    }
    // Fallback: relative URL
    if (src) {
      return new URL(src, window.location.href).href;
    }
    return null;
  }

  function addPinButtons() {
    // Find all relevant images across the site
    var selectors = [
      '.card__image img',
      '.hero-wrap img',
      '.scene-img-wrap img',
      '.image-wrap img',
      '.container img:not(.logo-img):not(.site-header img)',
      '.img-wrapper img',
      '.section-img',
      'img.hero-img'
    ];
    var imgs = document.querySelectorAll(selectors.join(', '));
    if (!imgs.length) return;

    var pageUrl = encodeURIComponent(window.location.href);
    var pageTitle = document.title || 'Verdant Curation';

    imgs.forEach(function(img) {
      // Skip logo images
      if (img.closest('.logo') || img.closest('.site-header') || img.classList.contains('logo-img')) {
        return;
      }
      // Skip if already has pin button
      var parent = img.parentNode;
      if (parent && parent.querySelector('.pin-overlay')) return;

      // Get image URL for Pinterest
      var mediaUrl = getAbsoluteUrl(img.src || img.getAttribute('src'));
      if (!mediaUrl) {
        // Base64 image — skip, can't pin directly
        // But we can still show a decorative pin button that links to the page
        mediaUrl = window.location.href;
      }

      // Build Pinterest pin URL
      var pinUrl = 'https://www.pinterest.com/pin/create/button/'
        + '?url=' + pageUrl
        + '&media=' + encodeURIComponent(mediaUrl)
        + '&description=' + encodeURIComponent(pageTitle);

      // Create the pin button as a clickable link
      var pin = document.createElement('a');
      pin.className = 'pin-overlay';
      pin.href = pinUrl;
      pin.target = '_blank';
      pin.rel = 'noopener noreferrer';
      pin.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#fff">'
        + '<path d="M12 16 L12 23" stroke="#fff" stroke-width="2" stroke-linecap="round"/>'
        + '<path d="M7 6 Q7 2 12 2 Q17 2 17 6 Q17 10 15 12 Q14 14 12 15 Q10 14 9 12 Q7 10 7 6 Z" fill="#fff"/>'
        + '</svg> Pin It';

      // Ensure parent has position:relative
      var computed = window.getComputedStyle(parent, null);
      if (computed.position !== 'relative' && computed.position !== 'absolute' && computed.position !== 'fixed') {
        parent.style.position = 'relative';
      }

      // Insert after the image
      parent.insertBefore(pin, img.nextSibling);
    });
  }

  // Also load Pinterest's official widget for enhanced functionality
  function loadPinterestWidget() {
    if (document.getElementById('pinterest-widget-script')) return;
    var script = document.createElement('script');
    script.id = 'pinterest-widget-script';
    script.src = 'https://assets.pinterest.com/js/pinit.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // Run after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      addPinButtons();
      loadPinterestWidget();
    });
  } else {
    addPinButtons();
    loadPinterestWidget();
  }
})();
