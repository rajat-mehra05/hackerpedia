import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px;
  flex: 1;
  max-width: 350px;

  @media (max-width: 720px) {
    max-width: 100%;
    margin: 10px 5px;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 6px 10px;
  transition: background-color 0.3s ease;

  .dark-theme & {
    background-color: rgba(40, 40, 40, 0.9);
  }

  &:focus-within {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 1px;
  }
`;

const SearchIcon = styled.i`
  color: ${props => props.theme.colors.secondary};
  font-size: 14px;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: ${props => props.theme.colors.primary};
  font-size: 14px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  outline: none;
  padding: 2px 0;

  &::placeholder {
    color: ${props => props.theme.colors.secondary};
    opacity: 0.7;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: 1px solid ${props => props.theme.colors.accent};
    border-radius: 2px;
  }
`;

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
    <SearchContainer>
      <SearchInputWrapper>
        <SearchIcon className="fas fa-search" aria-hidden="true" />
        <SearchInput
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search stories or domains..."
          aria-label="Search stories"
        />
        {localQuery && (
          <ClearButton
            onClick={handleClear}
            aria-label="Clear search"
            title="Clear search (Esc)"
          >
            <i className="fas fa-times" aria-hidden="true" />
          </ClearButton>
        )}
      </SearchInputWrapper>
    </SearchContainer>
  );
};

export default Search;

