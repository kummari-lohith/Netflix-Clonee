import React from 'react';
import { useMyList } from '../context/MyListContext';
import { useMovies } from '../context/MoviesContext';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import styles from './MyList.module.css';

const MyList = () => {
  const { myList } = useMyList();

  return (
    <div className={styles.myListContainer}>
      <Navbar />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>My List</h1>
          <p className={styles.subtitle}>
            {myList.length === 0 
              ? 'Your list is empty. Add movies and shows to watch later!' 
              : `${myList.length} ${myList.length === 1 ? 'title' : 'titles'} in your list`
            }
          </p>
        </div>

        {myList.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📺</div>
            <h2 className={styles.emptyTitle}>No titles in your list yet</h2>
            <p className={styles.emptyText}>
              Browse movies and TV shows, then add them to your list by clicking the + button
            </p>
            <a href="/browse" className={styles.browseBtn}>
              Browse Content
            </a>
          </div>
        ) : (
          <div className={styles.moviesGrid}>
            {myList.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie}
                isLargeRow={false}
              />
            ))}
          </div>
        )}

        <Footer />
      </div>

      <Modal />
    </div>
  );
};

export default MyList;
