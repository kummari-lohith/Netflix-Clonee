import React, { createContext, useContext, useState, useEffect } from 'react';

// Create MyList Context
const MyListContext = createContext();

// Custom hook to use the MyListContext
export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useMyList must be used within a MyListProvider');
  }
  return context;
};

// MyListProvider Component
export const MyListProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);

  // Load my list from localStorage on mount
  useEffect(() => {
    const storedList = localStorage.getItem('netflixMyList');
    if (storedList) {
      setMyList(JSON.parse(storedList));
    }
  }, []);

  // Save to localStorage whenever list changes
  useEffect(() => {
    localStorage.setItem('netflixMyList', JSON.stringify(myList));
  }, [myList]);

  // Add movie to list
  const addToMyList = (movie) => {
    if (!isInMyList(movie.id)) {
      setMyList(prev => [...prev, movie]);
      return true;
    }
    return false;
  };

  // Remove movie from list
  const removeFromMyList = (movieId) => {
    setMyList(prev => prev.filter(movie => movie.id !== movieId));
  };

  // Check if movie is in list
  const isInMyList = (movieId) => {
    return myList.some(movie => movie.id === movieId);
  };

  // Toggle movie in list
  const toggleMyList = (movie) => {
    if (isInMyList(movie.id)) {
      removeFromMyList(movie.id);
      return false;
    } else {
      addToMyList(movie);
      return true;
    }
  };

  const value = {
    myList,
    addToMyList,
    removeFromMyList,
    isInMyList,
    toggleMyList,
  };

  return (
    <MyListContext.Provider value={value}>
      {children}
    </MyListContext.Provider>
  );
};

export default MyListContext;
