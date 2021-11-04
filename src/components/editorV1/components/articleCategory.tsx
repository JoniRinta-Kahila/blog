import React from 'react';
import { Link } from 'react-router-dom';
import { PostSnapshot } from '../../../mst';
import styles from './articleCategory.module.scss';

type ArticleCategoryProps = {
  data: PostSnapshot
  inEditor: boolean
};

const ArticleCategory: React.FC<ArticleCategoryProps> = ({ data, inEditor }) => {
  return inEditor && !data.category ? (
    <p className={styles.err}>CATEGORY MISSING</p>
  ) : (
    <Link className={styles.ok} to={`/category/${data.category}`}>{data.category}</Link>
    // <p className={styles.ok}>{str}</p>
  );
};

export default ArticleCategory;
