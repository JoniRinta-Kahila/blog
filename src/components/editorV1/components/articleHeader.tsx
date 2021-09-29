import React from 'react';
import styles from './articleHeader.module.scss';

type ArticleHeaderProps = {
  str: string,
  inEditor: boolean
};

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ str, inEditor }) => {

  return inEditor && !str ? (
    <h1 className={styles.err}>HEADER MISSING</h1>
  ) : (
    <h1 className={styles.ok}>{str}</h1>
  );
};

export default ArticleHeader;
