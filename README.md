# HackerPedia

<img width="1164" height="794" alt="Screenshot 2025-11-15 at 12 20 16 PM" src="https://github.com/user-attachments/assets/1fc794a8-62a2-4761-a7de-908f114fb4c0" />


A modern, feature-rich Hacker News interface built with React while learning frontend development. This project fetches real-time data from the [Hacker News API](https://github.com/HackerNews/API) without using any state management library like Redux.

---

## 🛠️ Tech Stack

- **React 18** - UI framework
- **React Hooks** - State and lifecycle management
- **CSS Modules** - Scoped, modular styling
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **react-window** - Virtualized list rendering
- **DOMPurify** - HTML sanitization for comment content
- **Vite** - Build tool and dev server
- **PWA** - Progressive Web App (via vite-plugin-pwa)

---

## ✨ Features

### Core Functionality
- **Real-time Story Feed** - Fetches and displays top stories from Hacker News
- **Infinite Scroll** - Seamlessly loads more stories as you scroll down
- **Story Metadata** - View points, author, post time, and comment count for each story
- **External Links** - Direct links to original articles with domain preview

### 🎨 User Interface
- **Dark Mode** - Toggle between light and dark themes with persistent localStorage
- **Responsive Design** - Fully responsive layout that works on desktop, tablet, and mobile
- **Skeleton Loading** - Content-aware skeleton placeholders that match actual layout
- **Clean UI** - Modern, minimalist design inspired by Hacker News

### 🔍 Search & Discovery
- **Live Search** - Real-time search with debounced input for better performance
- **Smart Filtering** - Search across story titles and domains
- **Search Results Counter** - Shows the number of matching stories
- **Clear Search** - Quick clear button and ESC key support

### 💬 Comment System
- **Nested Comments** - Fully recursive comment threads with proper indentation
- **Comment Collapse/Expand** - Collapse comment threads to focus on what matters
- **HN-Style UI** - Authentic Hacker News comment styling
- **Deep Nesting Support** - Handles deeply nested comments with smart indentation caps
- **HTML Sanitization** - Safe rendering of comment content
- **No Authentication Required** - View all comments without logging in

### 🎯 Technical Features
- **React Hooks** - Modern functional components with useState, useEffect, useCallback, useRef
- **CSS Modules** - Scoped styles with zero global leakage
- **Virtualized Lists** - react-window for smooth scrolling with large story feeds
- **React Router** - Client-side routing for navigation
- **Axios** - Efficient API calls with error handling
- **Context API** - Global theme management
- **PWA Support** - Progressive Web App capabilities
- **Smart Caching** - localStorage-based caching with 5-minute TTL and LRU eviction

---

## 📦 Setup

Use the node package manager npm to set up the development environment.

### Prerequisites
- Node.js (v20.19+ or v22.12+)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajat-mehra05/hackerpedia.git
   cd hackerpedia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

The app will be available at `http://localhost:3000`

---

## 🎮 Usage

- **Browse Stories** - Scroll through the main feed of top stories
- **Search** - Use the search bar to filter stories by title or domain
- **Toggle Theme** - Click the moon/sun icon in the navigation bar
- **View Comments** - Click on the comment count to view the full discussion
- **Collapse Comments** - Click [−] to collapse a comment thread
- **Navigate** - Use the back button or browser history to return to the main feed

---

## ⚡ Caching Strategy

The app implements an intelligent caching system to improve performance and reduce API calls:

### Cache Configuration
- **Cache Duration**: 5 minutes TTL (Time To Live)
- **Storage**: localStorage for persistence across page reloads
- **Capacity**: 
  - 100 stories maximum
  - 40 comment threads maximum

### Benefits
- **Faster Navigation**: Back button and revisits load instantly from cache
- **Reduced API Calls**: Minimizes requests to Hacker News API
- **Better UX**: No loading spinners for cached content
- **Persistence**: Cache survives page reloads (within TTL window)
- **No External Dependencies**: Pure localStorage implementation

### Implementation Details

The caching system consists of two layers:

1. **`cacheUtils.js`**: Low-level cache management
   - localStorage read/write operations
   - TTL validation
   - LRU eviction algorithm
   - Expired entry cleanup

2. **`cacheService.js`**: High-level API wrapper
   - Transparent caching layer over HN API calls
   - Cache-first strategy with API fallback
   - Automatic cache updates after API calls

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

### Steps to Contribute
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

---

## 🙏 Acknowledgments

- [Hacker News](https://news.ycombinator.com/) for the API and inspiration
- [Hacker News API Documentation](https://github.com/HackerNews/API)
- The React community for excellent documentation and resources

---
