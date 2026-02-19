# Static Website Files

This directory contains the original static HTML/CSS/JS website for Fixwala.com.

## Files
- `index.html` - Main HTML page
- `style.css` - Styling
- `script.js` - JavaScript functionality
- `hero-bg.png` - Background image

## Usage

You can serve these files with any static web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Note

The main MERN application is now in the root directory with:
- `/client` - React frontend
- `/server` - Node.js/Express backend
