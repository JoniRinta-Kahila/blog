import React from 'react';
import { pageHeader, pageSubheader } from '../../appProperties';
import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
  <div className={styles.container}>
    <h1>{pageHeader}</h1>
    <h2>{pageSubheader}</h2>
  </div>
  )
}

export default Header;
