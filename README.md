# HackerPedia - Hacker News Clone

<img width="1164" height="794" alt="Screenshot 2025-11-15 at 12 20 16 PM" src="https://github.com/user-attachments/assets/1fc794a8-62a2-4761-a7de-908f114fb4c0" />


A modern, feature-rich Hacker News clone built with React while learning frontend development. This project fetches real-time data from the [Hacker News API](https://github.com/HackerNews/API) without using any state management library like Redux.

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
- **Loading States** - Beautiful loading animations using react-spinners
- **Clean UI** - Modern, minimalist design inspired by Hacker News

### 🔍 Search & Discovery
- **Live Search** - Real-time search with debounced input for better performance
- **Smart Filtering** - Search across story titles, authors, and domains
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
- **Styled Components** - Theme-aware, scoped CSS-in-JS styling
- **React Router** - Client-side routing for navigation
- **Axios** - Efficient API calls with error handling
- **Context API** - Global theme management
- **PWA Support** - Progressive Web App capabilities
- **Smart Caching** - localStorage-based caching with 2-minute TTL and LRU eviction

---

## 🛠️ Tech Stack

- **React** - UI framework
- **React Hooks** - State and lifecycle management
- **Styled Components** - CSS-in-JS with theming
- **Material-UI (MUI)** - Layout components and design system
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Spinners** - Loading animations
- **PWA** - Progressive Web App

---

## 📦 Setup

Use the node package manager npm to set up the development environment.

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hackerpedia.git
   cd hackerpedia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

The app will be available at `http://localhost:3000`

---

## 🎮 Usage

- **Browse Stories** - Scroll through the main feed of top stories
- **Search** - Use the search bar to filter stories by title, author, or domain
- **Toggle Theme** - Click the moon/sun icon in the navigation bar
- **View Comments** - Click on the comment count to view the full discussion
- **Collapse Comments** - Click [−] to collapse a comment thread
- **Navigate** - Use the back button or browser history to return to the main feed

---

## 📁 Project Structure

```
hackerpedia/
├── public/
├── src/
│   ├── components/
│   │   ├── CommentItem.js      # Individual comment component
│   │   ├── CommentList.js      # Comment list wrapper
│   │   ├── Search.js           # Search input component
│   │   ├── Story.js            # Story card component
│   │   ├── StoryContainer.js   # Main story feed
│   │   └── mapTime.js          # Time formatting utility
│   ├── context/
│   │   └── ThemeContext.js     # Theme provider
│   ├── infiniteScroll/
│   │   ├── constants.js        # Infinite scroll constants
│   │   └── infiniteScroll.js   # Infinite scroll hook
│   ├── NavigationBar/
│   │   ├── NavNews.js          # Navigation component
│   │   └── NavNews.css         # Navigation styles
│   ├── pages/
│   │   └── CommentPage.js      # Comment view page
│   ├── services/
│   │   ├── hnAPI.js            # Hacker News API calls
│   │   └── cacheService.js     # Caching layer for API calls
│   ├── styles/
│   │   ├── CommentStyles.js    # Comment styled components
│   │   ├── StoryStyles.js      # Story styled components
│   │   ├── StoryContainer.css  # Story container styles
│   │   └── themes.js           # Theme definitions
│   ├── utils/
│   │   ├── cacheUtils.js       # Cache management utilities
│   │   ├── commentUtils.js     # Comment helper functions
│   │   ├── searchUtils.js      # Search helper functions
│   │   └── themeUtils.js       # Theme helper functions
│   ├── App.js                  # Main app component
│   ├── index.js                # App entry point
│   └── index.css               # Global styles
├── package.json
└── README.md
```

---

## ⚡ Caching Strategy

The app implements an intelligent caching system to improve performance and reduce API calls:

### Cache Configuration
- **Cache Duration**: 2 minutes TTL (Time To Live)
- **Storage**: localStorage for persistence across page reloads
- **Capacity**: 
  - 100 stories maximum
  - 40 comment threads maximum

### How It Works

1. **First Request**: Data is fetched from the Hacker News API and stored in localStorage with a timestamp
2. **Subsequent Requests**: If cached data exists and is less than 2 minutes old, it's returned instantly
3. **Cache Expiration**: After 2 minutes, the cache is considered stale and fresh data is fetched
4. **LRU Eviction**: When cache limits are reached, the Least Recently Used items are automatically removed

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

## 🚀 Future Enhancements

- [ ] User authentication for commenting and voting
- [ ] Vote functionality (upvote stories and comments)
- [ ] Filter by story type (Ask HN, Show HN, Jobs)
- [ ] Share functionality
- [ ] Bookmarking/favorites
- [ ] Custom story sorting (newest, popular, trending)
- [ ] User profile pages
- [ ] Comment replies
- [ ] Pagination controls

---

## 🐛 Known Issues

All major issues have been resolved! If you find a bug, please open an issue.

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

**Made with ❤️ while learning React**
