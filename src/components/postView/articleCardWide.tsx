import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from '../../helper/timeElapsed';
import { Post } from '../../mst';
import styles from './articleCardWide.module.scss';
import { BiCalendarCheck } from 'react-icons/bi';
import { IoMdPricetags } from 'react-icons/io';
import { GoArrowRight } from 'react-icons/go';

type ArticleCardWideProps = {
  blogPost: Post,
  prefix?: boolean,
  key?: string|number,
}

const ArticleCardWide: React.FC<ArticleCardWideProps> = ({ blogPost, prefix = false }) => {
  const timeAgo = TimeAgo(blogPost.time);

  return (
    <div className={`${styles.container} ${prefix ? styles.alt : null} `}>
    <div className={styles.meta}>
      <div className={styles.photo} style={{
        backgroundImage: `url(${blogPost.displayImage ?? ''})`}}></div>
      <ul className={styles.details}>
          <li className={styles.date}><BiCalendarCheck/> {timeAgo}</li>
        <li>
          <ul className={styles.tags}>
            {
              blogPost.tags.map((x, i) => {
                return (
                  <li key={x}>
                    {i === 0 ? <IoMdPricetags/> : null}
                    <Link to='' >#{x}</Link>
                  </li>
                )
              })
            }
          </ul>
        </li>
      </ul>
    </div>
    <div className={styles.description}>
      <h1>{blogPost.header}</h1>
      <h2>{blogPost.subHeader}</h2>
      <p>{blogPost.caption}</p>
      <p className={styles.readMore}>
        <Link to={`posts/${blogPost.time}`}>Read More<GoArrowRight/></Link>
        
      </p>
    </div>
  </div>
  )
}

export default ArticleCardWide
