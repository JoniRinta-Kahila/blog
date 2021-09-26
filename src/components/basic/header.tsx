import React from 'react';
import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
  <div className={styles.container}>
    <h1>My Blog</h1>
    <h2>console.log('Hello, User!');</h2>
  </div>
  )
}

export default Header;
