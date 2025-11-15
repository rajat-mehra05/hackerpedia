// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_STORIES = 100;
const MAX_COMMENTS = 40;

const CACHE_TYPES = {
  STORY: 'story',
  CATEGORY: 'category',
  COMMENTS: 'comments'
};

// Get cache namespace key
const getCacheNamespace = (type) => {
  return `hn_cache_${type}`;
};

// Get all cache keys for a specific type
const getCacheKeys = (type) => {
  try {
    const namespace = getCacheNamespace(type);
    const keys = localStorage.getItem(namespace);
    return keys ? JSON.parse(keys) : [];
  } catch (error) {
    console.error(`Error getting cache keys for ${type}:`, error);
    return [];
  }
};

// Save cache keys for a specific type
const saveCacheKeys = (type, keys) => {
  try {
    const namespace = getCacheNamespace(type);
    localStorage.setItem(namespace, JSON.stringify(keys));
  } catch (error) {
    console.error(`Error saving cache keys for ${type}:`, error);
  }
};

// Check if cache entry is still valid (within TTL)
const isValidCache = (entry) => {
  if (!entry || !entry.timestamp) {
    return false;
  }
  const now = Date.now();
  return now - entry.timestamp < CACHE_TTL;
};

// Get item from cache
export const getCacheItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }

    const entry = JSON.parse(item);
    
    // Check if cache is still valid
    if (!isValidCache(entry)) {
      // Remove expired entry
      localStorage.removeItem(key);
      return null;
    }

    // Update last accessed time for LRU
    entry.lastAccessed = Date.now();
    localStorage.setItem(key, JSON.stringify(entry));

    return entry.data;
  } catch (error) {
    console.error(`Error getting cache item ${key}:`, error);
    return null;
  }
};

// Set item in cache with LRU eviction
export const setCacheItem = (key, data, type) => {
  try {
    const entry = {
      data,
      timestamp: Date.now(),
      lastAccessed: Date.now()
    };

    // Save the item
    localStorage.setItem(key, JSON.stringify(entry));

    // Update cache keys list
    let keys = getCacheKeys(type);
    
    // Remove existing key if present
    keys = keys.filter(k => k !== key);
    
    // Add new key at the end
    keys.push(key);

    // Determine max size based on type
    let maxSize;
    if (type === CACHE_TYPES.STORY || type === CACHE_TYPES.CATEGORY) {
      maxSize = MAX_STORIES;
    } else if (type === CACHE_TYPES.COMMENTS) {
      maxSize = MAX_COMMENTS;
    }

    // Evict oldest entries if limit exceeded
    if (keys.length > maxSize) {
      const entriesToEvict = keys.length - maxSize;
      const keysToCheck = keys.slice(0, keys.length - 1); // Don't check the newest one
      
      // Get all entries with their lastAccessed times
      const entriesWithTime = keysToCheck.map(k => {
        try {
          const item = localStorage.getItem(k);
          if (item) {
            const parsed = JSON.parse(item);
            return { key: k, lastAccessed: parsed.lastAccessed || 0 };
          }
        } catch (error) {
          // If error, mark for removal
          return { key: k, lastAccessed: 0 };
        }
        return null;
      }).filter(Boolean);

      // Sort by lastAccessed (oldest first)
      entriesWithTime.sort((a, b) => a.lastAccessed - b.lastAccessed);

      // Remove the oldest entries
      for (let i = 0; i < entriesToEvict && i < entriesWithTime.length; i++) {
        const keyToRemove = entriesWithTime[i].key;
        localStorage.removeItem(keyToRemove);
        keys = keys.filter(k => k !== keyToRemove);
      }
    }

    // Save updated keys list
    saveCacheKeys(type, keys);
  } catch (error) {
    console.error(`Error setting cache item ${key}:`, error);
  }
};

// Clear all expired entries
export const clearExpiredCache = () => {
  try {
    Object.values(CACHE_TYPES).forEach(type => {
      const keys = getCacheKeys(type);
      const validKeys = [];

      keys.forEach(key => {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            const entry = JSON.parse(item);
            if (isValidCache(entry)) {
              validKeys.push(key);
            } else {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          // Remove corrupted entries
          localStorage.removeItem(key);
        }
      });

      saveCacheKeys(type, validKeys);
    });
  } catch (error) {
    console.error('Error clearing expired cache:', error);
  }
};

// Initialize cache (clear expired entries on app load)
export const initCache = () => {
  clearExpiredCache();
};

export { CACHE_TYPES };

