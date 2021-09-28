import React from 'react';
import { useStores } from '../../mst/rootStoreContext';
import { Link } from 'react-router-dom';
import styles from './latestPosts.module.scss';

type ListOfLatestPostsProps = {
  maxItems?: number,
}

/**
 * 
 * @param maxItems Max length of visible posts captions, default = 5. 
 * @returns React.Fc
 */
const ListOfLatestPosts: React.FC<ListOfLatestPostsProps> = ({ maxItems = 5 }) => {
  const { getLatestNPost } = useStores();
  const latestPost = getLatestNPost(maxItems);
  return (  
    <div className={styles.container}>
      <h3>Latest posts</h3>
      {
        latestPost.map(x => {
          return (
            <span key={x.time}>
              <b>|</b>
              <Link to={`/posts/${x.time}`} >{x.caption}</Link>
            </span>
          )
        })
      }
    </div>
  )
}

export default ListOfLatestPosts;