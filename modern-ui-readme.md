# Modern UI Enhancements for Jellyfin

This package includes modern UI/UX enhancements for Jellyfin that make it look and feel like a premium 2025 streaming service. The enhancements focus on fluid animations, responsive design, and intuitive user interactions.

## Features

### 🚀 Modern Visual Design
- Glass morphism effects for UI components
- Subtle animations for UI elements
- Enhanced card layouts with hover effects
- Custom scrollbars and interactive elements

### 💫 Animation Enhancements
- Staggered loading animations for list items
- Smooth reveal animations for content
- Micro-interactions throughout the interface
- Pulse effects for indicators and badges

### 📱 Responsive Behaviors
- Smart header that hides on scroll down, shows on scroll up
- Responsive genre/filter bars with snap scrolling
- Adaptive layout changes for different viewport sizes
- Touch-friendly controls optimized for mobile

### ⚡ Performance Improvements
- Skeleton loading for content areas
- Optimized animations with GPU acceleration
- Lazy loading with smooth transitions
- Intersection observer for optimized loading

## Implementation

To implement these enhancements in your Jellyfin instance:

1. Add the `zombie_revived.css` file to your Jellyfin custom CSS
2. Include the `scroll-behavior.js` script in your Jellyfin client

### Adding the JavaScript

The `scroll-behavior.js` script needs to be loaded by Jellyfin. This can be done in one of two ways:

**Option 1: Custom HTML header**
If your Jellyfin instance allows custom HTML headers, add this line:

```html
<script src="PATH_TO_YOUR_SCRIPT/scroll-behavior.js"></script>
```

**Option 2: User script manager**
Use a browser extension like Tampermonkey or Greasemonkey to load the script on Jellyfin pages.

## Customization

You can customize the appearance by modifying the CSS variables in the `:root` section of the CSS:

```css
:root {
  --accent: 100, 200, 255;        /* Change this to your preferred accent color */
  --darkest: 15, 15, 15;          /* Background darkness */
  --glass-blur: 10px;             /* Glass effect blur amount */
  --border-radius-medium: 12px;   /* Card and component rounding */
}
```

## Compatibility

These enhancements have been tested with:
- Jellyfin 10.8.x and newer
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile and desktop devices

## Tips for Best Experience

- For optimal performance, use a modern browser with good CSS support
- On low-power devices, you may want to reduce animation complexity
- Make sure your content has high-quality images for the best visual experience

## Credits

Created by Zombie theme contributors, enhanced for modern streaming service experience. 