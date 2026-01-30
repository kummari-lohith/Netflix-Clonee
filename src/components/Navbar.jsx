import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/api';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useDebounce } from '../hooks/useDebounce';
import { useAuth } from '../context/AuthContext';
import SearchResults from './SearchResults';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const scrollPosition = useScrollPosition();
  const { user, logout } = useAuth();
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const scrolled = scrollPosition > 50;

  // Handle search
  useEffect(() => {
    if (debouncedSearch) {
      setSearchLoading(true);
      searchMovies(debouncedSearch)
        .then(results => {
          setSearchResults(results);
          setSearchLoading(false);
        })
        .catch(error => {
          console.error('Search error:', error);
          setSearchResults([]);
          setSearchLoading(false);
        });
    } else {
      setSearchResults([]);
      setSearchLoading(false);
    }
  }, [debouncedSearch]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCloseSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchExpanded(false);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      {/* Logo Section */}
      <div className={styles.logo} onClick={() => navigate('/browse')}>
        NETFLIX
      </div>

      {/* Navigation Links */}
      <div className={styles.navLinks}>
        <a onClick={() => navigate('/browse')} className={styles.active}>Home</a>
        <a onClick={() => navigate('/tv-shows')}>TV Shows</a>
        <a onClick={() => navigate('/movies')}>Movies</a>
        <a onClick={() => navigate('/new-and-popular')}>New & Popular</a>
        <a onClick={() => navigate('/my-list')}>My List</a>
        <a onClick={() => navigate('/browse-by-languages')}>Browse by Languages</a>
      </div>

      {/* Right Section - Search, Notifications & Profile */}
      <div className={styles.rightSection}>
        {/* Search */}
        <div className={styles.searchContainer}>
          {searchExpanded && (
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Titles, people, genres"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (!searchQuery) {
                  setTimeout(() => setSearchExpanded(false), 200);
                }
              }}
              autoFocus
            />
          )}
          <div 
            className={styles.icon}
            onClick={() => setSearchExpanded(!searchExpanded)}
          >
            🔍
          </div>
          {searchExpanded && searchQuery && (
            <SearchResults
              results={searchResults}
              loading={searchLoading}
              onClose={handleCloseSearch}
            />
          )}
        </div>

        <div className={styles.icon}>🔔</div>
        
        {/* Profile with Dropdown */}
        <div 
          className={styles.profileContainer}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className={styles.profile}>
            {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
          </div>
          
          {showDropdown && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem}>
                <span className={styles.userName}>{user?.name || 'User'}</span>
              </div>
              <div className={styles.dropdownDivider}></div>
              <div className={styles.dropdownItem} onClick={() => navigate('/browse')}>
                Account
              </div>
              <div className={styles.dropdownItem}>Help Center</div>
              <div className={styles.dropdownDivider}></div>
              <div className={styles.dropdownItem} onClick={handleLogout}>
                Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

