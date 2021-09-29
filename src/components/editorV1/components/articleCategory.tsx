import React from 'react';
import styles from './articleCategory.module.scss';

type ArticleCategoryProps = {
  str: string,
  inEditor: boolean
};

const ArticleCategory: React.FC<ArticleCategoryProps> = ({ str, inEditor }) => {
  return inEditor && !str ? (
    <p className={styles.err}>CATEGORY MISSING</p>
  ) : (
    <p className={styles.ok}>{str}</p>
  );
};

export default ArticleCategory;
