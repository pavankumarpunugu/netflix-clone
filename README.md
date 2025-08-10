# Netflix Clone - Static Version for Netlify

A fully functional Netflix clone built with React, TypeScript, and Tailwind CSS, optimized for static deployment on Netlify.

## 🎬 Features

- **Complete Netflix UI**: Dark theme, responsive design, hero sections
- **Content Browsing**: Movies, TV shows, trending content, Netflix originals
- **Search Functionality**: Search through movie and TV show catalog
- **Category Filtering**: Browse content by genre (Action, Drama, Comedy, etc.)
- **Mock Video Player**: Simulated video playback with controls
- **Add to List**: Local storage-based watchlist functionality
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## 🚀 Quick Deploy to Netlify

### Method 1: Drag & Drop (Recommended)
1. Download project as ZIP from Replit
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop your project folder
4. Netlify automatically builds and deploys!

### Method 2: GitHub Integration
1. Push code to GitHub repository
2. Connect GitHub repo to Netlify
3. Auto-deploy on every commit

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Wouter (routing)
- **Styling**: Tailwind CSS, Radix UI components
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify (static hosting)

## 📁 Project Structure

```
client/
├── src/
│   ├── components/netflix/    # Netflix-style UI components
│   ├── pages/                 # Application pages
│   ├── lib/                   # Utilities and mock data
│   └── hooks/                 # React hooks
├── public/                    # Static assets
└── dist/                      # Build output
```

## 🎯 Pages & Routes

- `/` - Home page with featured content
- `/movies` - Movies catalog
- `/tv-shows` - TV shows catalog
- `/browse` - Browse all content with filters
- `/my-list` - User's watchlist
- `/search/:query` - Search results
- `/content/:id` - Content detail page

## 📝 Configuration Files

- `netlify.toml` - Netlify deployment configuration
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS setup

## 🎨 Design Features

- Netflix-authentic dark theme
- Red accent colors (#E50914)
- Smooth hover animations
- Card-based content layout
- Responsive grid systems
- Custom scrollbars

## 📱 Mobile Responsive

Fully optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Live Demo

After deployment on Netlify, your app will be available at:
`https://your-app-name.netlify.app`

## 📄 License

MIT License - Feel free to use this project for learning and personal projects.

---

**Ready for deployment!** This static version works perfectly on Netlify without any backend or database requirements.