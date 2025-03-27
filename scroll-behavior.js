// Script to add scroll behavior effects for Jellyfin UI

/**
 * This script implements modern UI behaviors:
 * 1. Hide/show header on scroll
 * 2. Staggered animations for list items
 * 3. Skeleton loading for content
 * 4. Modern filter bar behavior
 */
document.addEventListener('DOMContentLoaded', function() {
  // Header visibility on scroll
  implementHeaderScrollBehavior();
  
  // Animate items as they enter the viewport
  implementListItemAnimations();
  
  // Implement skeleton loading
  implementSkeletonLoading();
  
  // Implement filter bar behavior
  implementFilterBarBehavior();
});

/**
 * Implements hide/show behavior for header on scroll
 */
function implementHeaderScrollBehavior() {
  let lastScrollTop = 0;
  const header = document.querySelector('.headerTabs, .sectionTabs');
  const skinHeader = document.querySelector('.skinHeader');
  
  if (header || skinHeader) {
    const targetElements = [header, skinHeader].filter(Boolean);
    
    window.addEventListener('scroll', function() {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll > lastScrollTop && currentScroll > 50) {
        // Scrolling down - hide headers
        targetElements.forEach(el => {
          el.classList.add('header-hidden');
          el.classList.remove('header-visible');
        });
      } else {
        // Scrolling up - show headers
        targetElements.forEach(el => {
          el.classList.add('header-visible');
          el.classList.remove('header-hidden');
        });
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });
  }
}

/**
 * Implements staggered animations for list items using Intersection Observer
 */
function implementListItemAnimations() {
  // Create intersection observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add animation with staggered delay based on index
        setTimeout(() => {
          entry.target.classList.add('listItemAnimated');
        }, index * 50); // 50ms staggered delay
        
        // Stop observing after animation is applied
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,  // Trigger when 10% of the item is visible
    rootMargin: '0px 0px 50px 0px'  // Slightly before item enters viewport
  });
  
  // Observe all list items
  document.querySelectorAll('.listItem').forEach(item => {
    // Set initial state before animation
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    
    // Start observing
    observer.observe(item);
  });
  
  // Also animate card elements with same effect
  document.querySelectorAll('.card').forEach(card => {
    card.classList.add('fadeInUp-animation');
  });
}

/**
 * Implements skeleton loading for content sections
 */
function implementSkeletonLoading() {
  // Add skeleton loading class to sections that will load content
  const contentSections = document.querySelectorAll('.itemsContainer');
  
  contentSections.forEach(section => {
    // Only add skeleton if section is empty or loading
    if (section.children.length === 0 || section.getAttribute('data-loading') === 'true') {
      section.classList.add('skeleton-loading');
      
      // Create ghost cards for visual loading indication
      for (let i = 0; i < 6; i++) {
        const ghostCard = document.createElement('div');
        ghostCard.className = 'ghost-card';
        section.appendChild(ghostCard);
      }
      
      // Simulate loading completion (in real usage, this would be triggered when content loads)
      setTimeout(() => {
        section.classList.remove('skeleton-loading');
        // Remove ghost cards when real content loads
        section.querySelectorAll('.ghost-card').forEach(ghost => {
          ghost.remove();
        });
      }, 1500); // Simulate loading time
    }
  });
  
  // Listen for new content being loaded via AJAX
  document.addEventListener('jellyfin-content-loading', function(event) {
    const targetSection = event.detail.container;
    if (targetSection) {
      implementSkeletonForSection(targetSection);
    }
  });
}

/**
 * Adds skeleton loading to a specific section
 */
function implementSkeletonForSection(section) {
  section.classList.add('skeleton-loading');
  
  // Create ghost cards
  for (let i = 0; i < 6; i++) {
    const ghostCard = document.createElement('div');
    ghostCard.className = 'ghost-card';
    section.appendChild(ghostCard);
  }
  
  // In a real implementation, this would be removed when content loads
  // This is just for demo purposes
  setTimeout(() => {
    section.classList.remove('skeleton-loading');
    section.querySelectorAll('.ghost-card').forEach(ghost => {
      ghost.remove();
    });
  }, 1500);
}

/**
 * Implements modern filter bar behavior
 */
function implementFilterBarBehavior() {
  const filterBars = document.querySelectorAll('.filterButtonContainer');
  
  filterBars.forEach(bar => {
    // Add scroll behavior to filter bars
    let isScrolling;
    
    bar.addEventListener('scroll', function() {
      window.clearTimeout(isScrolling);
      
      isScrolling = setTimeout(function() {
        // When scrolling stops, check if we should snap to nearest filter
        const scrollLeft = bar.scrollLeft;
        const itemWidth = bar.querySelector('.emby-button.filter-button')?.offsetWidth || 100;
        const targetPosition = Math.round(scrollLeft / itemWidth) * itemWidth;
        
        // Smooth scroll to nearest item
        bar.scrollTo({
          left: targetPosition,
          behavior: 'smooth'
        });
      }, 100);
    });
    
    // Add click behavior to filter buttons
    const filterButtons = bar.querySelectorAll('.emby-button.filter-button');
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Toggle selected state
        const wasSelected = this.classList.contains('selected');
        
        if (!this.hasAttribute('data-multi-select')) {
          // Single select mode - remove selected from all others
          filterButtons.forEach(btn => btn.classList.remove('selected'));
        }
        
        // Toggle this button
        if (wasSelected) {
          this.classList.remove('selected');
        } else {
          this.classList.add('selected');
        }
        
        // Scroll this button into view
        button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        
        // Trigger filter event (would be implemented by Jellyfin)
        const filterEvent = new CustomEvent('jellyfin-filter-change', {
          detail: {
            filter: button.getAttribute('data-filter'),
            selected: !wasSelected
          }
        });
        document.dispatchEvent(filterEvent);
      });
    });
  });
}

/**
 * Create smooth scroll effects for page navigation
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href !== '#') {
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});
