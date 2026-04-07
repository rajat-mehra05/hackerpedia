import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Search.module.css';

const Search = ({ searchQuery, onSearchChange }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const debounceTimer = useRef(null);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const debouncedSearch = useCallback((value) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onSearchChange(value);
    }, 300);
  }, [onSearchChange]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearchChange('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        <i className={`fas fa-search ${styles.searchIcon}`} aria-hidden="true" />
        <input
          className={styles.searchInput}
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search stories or domains..."
          aria-label="Search stories"
        />
        {localQuery && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
            title="Clear search (Esc)"
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
