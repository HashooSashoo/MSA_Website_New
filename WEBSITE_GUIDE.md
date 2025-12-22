# Rice Muslim Student Association Website

A fully responsive website for the Rice University Muslim Student Association, built with HTML, CSS, and JavaScript.

## Project Structure

```
MSA_Website_New/
├── index.html              # Main homepage
├── about.html              # About Us page
├── contact.html            # Contact form page
├── donations.html          # Donation instructions page
├── events.html             # Events calendar and gallery
├── get-connected.html      # Social media links page
├── prayer-times.html       # Prayer times and Jummah info
├── resources.html          # Resources/articles page (dynamic)
├── sitemap.html            # Site navigation map
├── styles.css              # Main stylesheet (includes Jeju Myeongjo font)
├── script.js               # Main JavaScript (navigation, forms)
├── resources.js            # Resource cards loader
├── resources-data.json     # Editable resource articles data
├── image_files/            # All images and logos
└── original_site_design/   # Your original Figma designs
```

## Features

✅ **Fully Responsive Design** - Works beautifully on mobile, tablet, and desktop
✅ **Jeju Myeongjo Font** - Automatically loaded from Google Fonts
✅ **Easy-to-Edit Resources** - Add articles by editing `resources-data.json`
✅ **Mobile Navigation** - Hamburger menu for smaller screens
✅ **Prayer Times Widget** - Displayed in header on all pages
✅ **Contact Form** - Ready for backend integration
✅ **Placeholder System** - Gray boxes clearly marked for future images

## How to Use

### Opening the Website

1. Open `index.html` in any modern web browser
2. Or use a local web server for best results:
   ```bash
   # Option 1: Using Python
   python3 -m http.server 8000

   # Option 2: Using PHP
   php -S localhost:8000

   # Option 3: Using Node.js (if you have npx)
   npx http-server
   ```
3. Then visit `http://localhost:8000` in your browser

### Editing Resources/Articles

To add, edit, or remove resource cards on the Resources page:

1. Open `resources-data.json` in any text editor
2. Add a new resource object following this format:

```json
{
    "id": 4,
    "title": "Your Article Title",
    "description": "Late updated: 2024-12-22\nAuthor: John Doe\nContact: john@rice.edu",
    "imagePlaceholder": true
}
```

3. To use an actual image instead of a placeholder:

```json
{
    "id": 4,
    "title": "Your Article Title",
    "description": "Description here",
    "imagePlaceholder": false,
    "imageUrl": "image_files/your-image.jpg"
}
```

4. Save the file - changes will appear immediately when you refresh the Resources page!

### Updating Prayer Times

Prayer times are currently hardcoded in the HTML files. To update them:

1. Search for "6:56 AM" (or any current prayer time) across all `.html` files
2. Replace with new times
3. You mentioned you'll connect this to an API later - the times appear in:
   - Header prayer widget (all pages)
   - Prayer times table on `prayer-times.html`

### Replacing Placeholder Images

Placeholder boxes are marked with gray backgrounds and text like "Image Placeholder". To replace:

1. Add your image to the `image_files/` folder
2. Find the placeholder in the HTML (look for `<div class="step-image">` or similar)
3. Replace with: `<img src="image_files/your-image.jpg" alt="Description">`

### Customizing Colors

All colors are defined in `styles.css` at the top:

```css
:root {
    --primary-blue: #6CB4E8;
    --rice-blue: #00205B;
    --coral-button: #F08080;
    /* etc... */
}
```

Change these values to update colors site-wide!

## Pages Overview

- **Home** (`index.html`) - Hero section with Islamic symbol, Who We Are section
- **About Us** (`about.html`) - Information about the MSA organization
- **Prayer Times** (`prayer-times.html`) - Prayer schedule and Jummah locations
- **Events** (`events.html`) - Google Calendar placeholder and event image gallery
- **Resources** (`resources.html`) - Dynamic article cards loaded from JSON
- **Get Connected** (`get-connected.html`) - Social media page (currently minimal)
- **Contact Us** (`contact.html`) - Contact form (needs backend integration)
- **Donations** (`donations.html`) - Step-by-step donation instructions

## Adding Backend Functionality

The contact form is ready for backend integration. You'll need to:

1. Set up a form handler (e.g., FormSpree, Netlify Forms, or custom backend)
2. Update the form action in `contact.html`
3. Or modify `script.js` to send data via AJAX to your API

## Social Media Links

Update social media links in the footer (all HTML files):

```html
<a href="YOUR_YOUTUBE_LINK" class="social-icon" aria-label="YouTube">
<a href="YOUR_INSTAGRAM_LINK" class="social-icon" aria-label="Instagram">
<!-- etc... -->
```

## Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Need Help?

The code is well-commented and organized. Key files:
- `styles.css` - All styling and layout
- `script.js` - Navigation and form handling
- `resources.js` - Resource card loading logic
- `resources-data.json` - Your editable article data

## Next Steps

You mentioned wanting to add:
1. Button functionality and navigation links (✅ Done - all navigation working!)
2. Transitions between pages
3. Prayer times API integration
4. Backend for form submissions
5. Additional images for placeholders

Feel free to continue building on this foundation!

---

Built with ❤️ for Rice MSA
