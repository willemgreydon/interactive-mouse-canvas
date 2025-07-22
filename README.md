# Interactive Canvas - Advanced Particle System

An interactive particle system showcasing modern web technologies with React, TypeScript, and Canvas API. Features real-time physics, magnetic attraction, fluid dynamics, and comprehensive visual controls.

## Features

- **Real-time Particle Physics** - Advanced particle systems with gravity, velocity, and life cycles
- **Magnetic Attraction** - Particles attract to mouse cursor and each other
- **Fluid Dynamics** - Particle-to-particle interactions and flow behaviors
- **Visual Effects** - Glow effects, mouse trails, ripple waves
- **Interactive Controls** - Color presets, physics parameters, visual toggles
- **Responsive Design** - Works on desktop and tablet devices

## Quick Start

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation & Setup

1. **Clone or download** this project to your local machine

2. **Navigate to the project directory**
   ```bash
   cd interactive-canvas
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Alternative: Using Create React App

If you're setting this up from scratch:

1. **Create a new React TypeScript project**
   ```bash
   npx create-react-app interactive-canvas --template typescript
   cd interactive-canvas
   ```

2. **Install required dependencies**
   ```bash
   npm install lucide-react class-variance-authority clsx tailwind-merge
   npm install -D tailwindcss @tailwindcss/typography
   ```

3. **Copy the provided files** into your project structure

4. **Start the development server**
   ```bash
   npm start
   ```

## How to Use

### Mouse Controls
- **Move Mouse** - Create particles along your cursor path
- **Click & Hold** - Generate ripple wave effects
- **Drag** - Paint with enhanced particle streams

### Effect Modes
- **Continuous Flow** - Particles generate constantly while moving
- **Click to Emit** - Particles only generate on mouse clicks
- **Drag to Paint** - Particles follow mouse drag movements

### Advanced Controls
- **Color Presets** - Quick access to vibrant color schemes
- **Physics Settings** - Adjust gravity, intensity, and particle behavior
- **Visual Effects** - Toggle glow, trails, and ripple effects
- **Magnetic Fields** - Control particle attraction and fluid dynamics

## 🛠 Technology Stack

- **React 18** - Modern component-based UI framework
- **TypeScript** - Type-safe JavaScript development
- **Canvas API** - High-performance 2D graphics rendering
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Modern icon library

## Project Structure

```
├── App.tsx                    # Main application component
├── components/
│   ├── InteractiveCanvas.tsx  # Core particle system & physics
│   ├── ControlPanel.tsx       # Settings and controls UI
│   ├── InfoPanel.tsx          # Instructions and info
│   └── ui/                    # Reusable UI components
├── styles/
│   └── globals.css           # Global styles and design tokens
└── README.md                 # This file
```

## Customization

### Adding New Visual Effects
Modify `InteractiveCanvas.tsx` to add new particle behaviors or visual effects.

### Custom Color Schemes
Update the `colorPresets` array in `ControlPanel.tsx` to add your own color combinations.

### Performance Tuning
Adjust the `particleLimit` and animation frame rate in the canvas component for different performance profiles.

## 🔧 Troubleshooting

### Common Issues

1. **Blank screen on startup**
   - Ensure all dependencies are installed: `npm install`
   - Check browser console for errors
   - Verify Node.js version (18+)

2. **Performance issues**
   - Reduce particle count in the control panel
   - Disable glow effects for better performance
   - Close other browser tabs using GPU acceleration

3. **Controls not responding**
   - Refresh the page
   - Clear browser cache
   - Check if JavaScript is enabled

### Browser Compatibility
- **Recommended**: Chrome, Firefox, Safari, Edge (latest versions)
- **Minimum**: Any browser with Canvas API and ES6 support

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Ensure all dependencies are properly installed
3. Verify your browser supports modern web APIs

---

**Enjoy creating stunning visual experiences!**
