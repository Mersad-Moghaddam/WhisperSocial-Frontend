# 🌤️ Wisper Frontend

Modern, responsive React frontend for the Wisper social network platform. Built with React, Vite, and TailwindCSS featuring a peaceful sky-blue aesthetic with cloud animations.


<div align="center">

![Whisper Logo](src/assets/favicon.svg)

## ✨ Features

### Current Features ✅

- **🏠 Beautiful Homepage** - Professional landing page with animated clouds
- **🔐 Authentication System** - Secure registration and login
- **📝 Create Wispers** - Share thoughts with character counter (280 chars)
- **📰 Timeline Feed** - Real-time wisper feed from people you follow
- **👤 User Profiles** - View profiles with follow/unfollow functionality
- **📊 Follow Statistics** - See follower and following counts
- **🔍 User Search** - Find users by ID
- **♾️ Infinite Scroll** - Load more wispers with pagination
- **🎨 Wisper Theme** - Sky-blue gradient with cloud motifs
- **📱 Responsive Design** - Works beautifully on all devices
- **⚡ Fast Navigation** - Client-side routing with React Router
- **🔄 Real-time Updates** - Manual refresh to get latest wispers

### Design System

**Color Palette:**
```css
/* Primary Colors */
--wisper-primary: #A6D8FF;      /* Sky Blue */
--wisper-secondary: #C6B3FF;    /* Soft Purple */
--wisper-accent: #9BD3E8;       /* Cyan */

/* Cyan Shades */
--wisper-cyan: #06b6d4;
--wisper-cyan-dark: #0891b2;
--wisper-cyan-light: #cffafe;

/* Backgrounds */
--wisper-bg-gradient-from: #06b6d4;
--wisper-bg-gradient-to: #e0f2fe;

/* Text */
--wisper-text-primary: #0F172A;
--wisper-text-secondary: #475569;
--wisper-text-muted: #94A3B8;
```

**Typography:**
- Clean, rounded sans-serif fonts
- Smooth transitions and hover effects
- Consistent spacing and sizing

**UI Components:**
- Rounded corners (rounded-3xl, rounded-2xl)
- Soft shadows with hover effects
- Backdrop blur for glass-morphism
- Cloud animations on homepage
- Gradient backgrounds throughout

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Backend services** running (see [Backend README](../Backend/README.md))

### Installation

1. **Install dependencies:**
```bash
cd Frontend
npm install
```

2. **Configure environment (optional):**

Create `.env` file:
```env
VITE_AUTH_URL=http://127.0.0.1:8083
VITE_POST_URL=http://127.0.0.1:8081
VITE_FOLLOW_URL=http://127.0.0.1:8085
VITE_TIMELINE_URL=http://127.0.0.1:8082
```

**Note:** In development, the Vite dev server proxies API requests, so you can use relative paths like `/api/auth`.

3. **Start development server:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:3000
```

You'll see the beautiful Wisper homepage with cloud animations! 🌤️

## 📁 Project Structure

```
Frontend/
├── public/                  # Static assets
├── src/
│   ├── api/                # API client modules
│   │   ├── auth.js        # Authentication API
│   │   ├── client.js      # Axios client setup
│   │   ├── follow.js      # Follow/unfollow API
│   │   ├── posts.js       # Wisper creation API
│   │   └── timeline.js    # Timeline fetch API
│   ├── assets/            # Images, icons, fonts
│   │   └── favicon.svg    # Wisper cloud icon
│   ├── components/        # Reusable components
│   │   ├── Button.jsx     # Styled button component
│   │   ├── Input.jsx      # Form input component
│   │   └── Navbar.jsx     # Navigation bar
│   ├── contexts/          # React contexts
│   │   └── AuthContext.jsx # Authentication state
│   ├── hooks/             # Custom React hooks
│   │   └── useAuth.js     # Auth hook
│   ├── layouts/           # Layout components
│   │   └── MainLayout.jsx # Main app layout
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Login.jsx      # Login page
│   │   ├── Register.jsx   # Registration page
│   │   ├── Timeline.jsx   # Timeline feed
│   │   ├── Profile.jsx    # User profile page
│   │   └── CreateWisper.jsx # Wisper creation page
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles & Tailwind
│   └── main.jsx           # App entry point
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── package.json           # Dependencies
└── README.md              # This file
```

## 🛣️ Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Home | Public | Landing page with cloud animations |
| `/login` | Login | Public | User login |
| `/register` | Register | Public | User registration |
| `/timeline` | Timeline | Protected | Main wisper feed |
| `/timeline/create-post` | CreateWisper | Protected | Create new wisper |
| `/timeline/profile` | Profile | Protected | Current user's profile |
| `/timeline/profile/:id` | Profile | Protected | View other user's profile |

### Route Protection

- **Public routes:** Accessible to everyone
- **Protected routes:** Require authentication (JWT token)
- **Auto-redirect:** Authenticated users on `/` are redirected to `/timeline`
- **Login redirect:** Unauthenticated users accessing protected routes are redirected to `/register`

## 🔌 API Integration

### API Proxy Configuration

The development server proxies API requests to backend services:

```javascript
// vite.config.js
proxy: {
  '/api/auth': {
    target: 'http://127.0.0.1:8083',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/auth/, '')
  },
  '/api/posts': {
    target: 'http://127.0.0.1:8081',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/posts/, '')
  },
  '/api/follow': {
    target: 'http://127.0.0.1:8085',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/follow/, '')
  },
  '/api/timeline': {
    target: 'http://127.0.0.1:8082',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/timeline/, '')
  }
}
```

### API Modules

**Authentication (`src/api/auth.js`):**
```javascript
import { login, register, logout } from './api/auth';

// Register new user
await register('user@wisper.com', 'password123');

// Login
const { token, user_id } = await login('user@wisper.com', 'password123');

// Logout
logout();
```

**Wispers (`src/api/posts.js`):**
```javascript
import { createPost } from './api/posts';

// Create wisper
const wisper = await createPost('Hello Wisper!');
```

**Timeline (`src/api/timeline.js`):**
```javascript
import { getTimeline } from './api/timeline';

// Fetch timeline
const { posts, next_cursor } = await getTimeline({ 
  cursor: 0, 
  limit: 20 
});
```

**Follow System (`src/api/follow.js`):**
```javascript
import { 
  followUser, 
  unfollowUser, 
  getFollowers, 
  getFollowing, 
  isFollowing, 
  getStats 
} from './api/follow';

// Follow a user
await followUser(42);

// Unfollow
await unfollowUser(42);

// Get followers
const { followers } = await getFollowers(42);

// Get following
const { following } = await getFollowing(42);

// Check if following
const { is_following } = await isFollowing(42);

// Get statistics
const { followers_count, following_count } = await getStats(42);
```

## 🎨 Styling

### Tailwind CSS

Wisper uses Tailwind CSS with custom configuration:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      wisper: {
        primary: '#A6D8FF',
        secondary: '#C6B3FF',
        accent: '#9BD3E8',
        cyan: '#06b6d4',
        'cyan-dark': '#0891b2',
        'cyan-light': '#cffafe',
      }
    },
    borderRadius: {
      '3xl': '1.5rem',
      '4xl': '2rem',
    }
  }
}
```

### Cloud Animations

Homepage features floating cloud animations:

```css
/* src/index.css */
.cloud {
  position: absolute;
  animation: float 60s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translateX(-100%); opacity: 0; }
  10%, 90% { opacity: 1; }
  50% { transform: translateX(100vw); }
}
```

## 🔐 Authentication

### Auth Context

Authentication state is managed via React Context:

```javascript
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { 
    user, 
    token, 
    isAuthenticated, 
    login, 
    logout 
  } = useAuth();
  
  // Use auth state
}
```

### Token Storage

- JWT tokens are stored in `localStorage`
- Tokens are automatically included in API requests
- Logout clears token from storage

## 🧪 Development

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

### Development Tips

1. **Hot Reload:** Changes auto-reload in browser
2. **Console Logs:** Check browser console for errors
3. **Network Tab:** Inspect API requests/responses
4. **React DevTools:** Install for component debugging

### Adding New Features

1. **Create API module** in `src/api/` if needed
2. **Create component** in `src/components/` or `src/pages/`
3. **Add route** in `src/App.jsx` if it's a page
4. **Style with Tailwind** using Wisper color palette
5. **Test thoroughly** across different screen sizes

## 📱 Responsive Design

Wisper is fully responsive with breakpoints:

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md, lg)
- **Desktop:** > 1024px (xl, 2xl)

### Mobile-First Approach

```jsx
// Example responsive classes
<div className="
  w-full                    /* Mobile: full width */
  sm:w-auto                /* Tablet+: auto width */
  lg:max-w-2xl            /* Desktop: max width */
  px-4 sm:px-6 lg:px-8    /* Responsive padding */
">
```

## 🐛 Troubleshooting

### Common Issues

**Issue: "Cannot connect to backend"**
- Check backend services are running
- Verify proxy configuration in `vite.config.js`
- Check browser console for CORS errors

**Issue: "Authentication fails"**
- Clear localStorage: `localStorage.clear()`
- Check JWT token in DevTools → Application → Local Storage
- Verify backend auth service is running on port 8083

**Issue: "Timeline empty"**
- Follow some users first
- Create wispers
- Check backend fanout-worker is running
- Verify Redis stream is processing events

**Issue: "Styles not applying"**
- Run `npm install` to ensure Tailwind is installed
- Check `tailwind.config.js` is present
- Verify `@tailwind` directives in `src/index.css`

### Debug Mode

Enable verbose logging:

```javascript
// In src/api/client.js
const client = axios.create({
  // ...config
});

// Add request/response interceptors
client.interceptors.request.use(req => {
  console.log('API Request:', req);
  return req;
});

client.interceptors.response.use(res => {
  console.log('API Response:', res);
  return res;
});
```

## 🚀 Production Build

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Environment Variables

For production, set environment variables:

```env
VITE_AUTH_URL=https://api.wisper.com/auth
VITE_POST_URL=https://api.wisper.com/posts
VITE_FOLLOW_URL=https://api.wisper.com/follow
VITE_TIMELINE_URL=https://api.wisper.com/timeline
```

### Deployment

**Deploy to Netlify/Vercel:**
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables
5. Deploy!

**Deploy to Nginx:**
```nginx
server {
  listen 80;
  server_name wisper.example.com;
  root /var/www/wisper/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://backend:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

## 📚 Additional Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide for homepage
- **[HOMEPAGE_CHANGES.md](HOMEPAGE_CHANGES.md)** - Changelog for homepage
- **[docs/HOMEPAGE.md](docs/HOMEPAGE.md)** - Detailed homepage documentation
- **[docs/HOMEPAGE_SETUP.md](docs/HOMEPAGE_SETUP.md)** - Homepage setup guide
- **[Backend README](../Backend/README.md)** - Backend documentation
- **[Main README](../README.md)** - Project overview

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Code Style:** Follow existing patterns
2. **Tailwind:** Use utility classes, avoid custom CSS
3. **Components:** Keep components small and focused
4. **Naming:** Use descriptive names (camelCase for JS, PascalCase for components)
5. **Comments:** Add comments for complex logic
6. **Testing:** Test on multiple screen sizes

## 📊 Performance

### Optimization Tips

- ✅ Code splitting with React.lazy()
- ✅ Image optimization
- ✅ Minification in production build
- ✅ Tree shaking for unused code
- ✅ Compression (gzip/brotli)
- ⚠️ Consider adding service worker for PWA
- ⚠️ Implement virtual scrolling for long lists
- ⚠️ Add image lazy loading

### Bundle Size

Current production bundle sizes:
- **Main JS:** ~150KB (gzipped)
- **CSS:** ~25KB (gzipped)
- **Total:** ~175KB

## 🔮 Future Enhancements

See [ROADMAP.md](../ROADMAP.md) for planned features:

- Like and comment functionality
- Image/video uploads
- Real-time notifications
- Direct messaging
- User mentions (@username)
- Hashtag support (#trending)
- Dark mode toggle
- Emoji picker
- GIF support
- And much more!

## 📄 License

This project is part of the Wisper social network platform.

---

**Built with 🌤️ and React by the Wisper Team**

For questions or issues, please refer to the main [project README](../README.md) or open an issue on GitHub.
