# Interactive Mouse Canvas - Setup Guide

## Complete Project Setup for Hosting

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Text editor or IDE
- Web browser for testing

### Step 1: Download and Setup

1. **Download all project files** to a folder called `interactive-mouse-canvas`

2. **Navigate to the project directory:**
   ```bash
   cd interactive-mouse-canvas
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Step 2: Development Testing

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Open browser and visit:**
   ```
   http://localhost:3000
   ```

3. **Test the application:**
   - Move mouse around to see particle effects
   - Try different controls in the right panel
   - Test on different devices/screen sizes

### Step 3: Build for Production

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Export static files:**
   ```bash
   npm run export
   ```

3. **Files ready for hosting:**
   - All files in the `out/` folder are ready to upload

### Step 4: Deploy to Your Domain

For `interactive-mousecanvas.commonux.org`:

1. **Upload files:**
   - Upload ALL contents from the `out/` folder to your web server
   - Make sure `index.html` is in the root directory

2. **File structure on server should be:**
   ```
   public_html/ (or web root)
   ├── index.html
   ├── _next/
   │   ├── static/
   │   └── ...
   ├── 404.html
   └── ...
   ```

### Step 5: Verify Deployment

1. **Visit your domain:**
   ```
   https://interactive-mousecanvas.commonux.org
   ```

2. **Test functionality:**
   - Canvas loads properly
   - Mouse interactions work
   - Control panels function
   - Responsive on mobile

### Project Structure Overview

```
interactive-mouse-canvas/
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── pages/
│   ├── _app.tsx          # App wrapper
│   ├── _document.tsx     # HTML document structure
│   └── index.tsx         # Main page component
├── components/
│   ├── InteractiveCanvas.tsx  # Main canvas component
│   ├── ControlPanel.tsx       # Settings panel
│   ├── InfoPanel.tsx         # Information panel
│   └── ui/               # UI components (buttons, sliders, etc.)
├── styles/
│   └── globals.css       # Global styles and Tailwind
├── lib/
│   └── utils.ts         # Utility functions
├── public/              # Static assets
├── README.md            # Project documentation
├── DEPLOYMENT.md        # Deployment guide
└── SETUP.md            # This setup guide
```

### Customization Options

1. **Colors:** Modify the color presets in `ControlPanel.tsx`
2. **Physics:** Adjust default values in `index.tsx`
3. **Styling:** Update `globals.css` for theme changes
4. **Features:** Extend functionality in `InteractiveCanvas.tsx`

### Troubleshooting

**Common Issues:**

1. **npm install fails:**
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Try again
   npm install
   ```

2. **Build errors:**
   - Check Node.js version (must be 18+)
   - Ensure all files are present
   - Check for syntax errors in TypeScript files

3. **Deployment issues:**
   - Verify all files from `out/` folder are uploaded
   - Check file permissions on server
   - Ensure web server supports serving static files

**Need Help?**
- Check browser console for error messages
- Verify network connectivity
- Ensure HTTPS is enabled on your domain

### Performance Tips

- **Optimize for production:** Always use `npm run build` for deployment
- **Enable compression:** Configure gzip on your web server
- **Cache headers:** Set appropriate cache headers for static assets
- **CDN:** Consider using a CDN for better global performance

Your interactive canvas should now be live and fully functional! 🎉