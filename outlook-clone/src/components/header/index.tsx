import React from 'react';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <h1>Outlook Calendar</h1>
      </div>
      <nav className={styles.navSection}>
        <button aria-label="Previous" className={styles.navButton}>Previous</button>
        <button aria-label="Today" className={styles.navButton}>Today</button>
        <button aria-label="Next" className={styles.navButton}>Next</button>
      </nav>
      <div className={styles.actionSection}>
        <button className={styles.actionButton}>New Event</button>
      </div>
    </header>
  );
}

export default Header;