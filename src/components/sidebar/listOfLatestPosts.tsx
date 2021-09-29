import React from 'react';
import { useStores } from '../../mst/rootStoreContext';
import { Link } from 'react-router-dom';
import styles from './latestPosts.module.scss';
import { observer } from 'mobx-react-lite';

type ListOfLatestPostsProps = {
  maxItems?: number,
}

/**
 * 
 * @param maxItems Max length of visible posts captions, default = 5. 
 * @returns React.Fc
 */
const ListOfLatestPosts: React.FC<ListOfLatestPostsProps> = observer(({ maxItems = 5 }) => {
  const { latestFivePost } = useStores();

  return (  
    <div className={styles.container}>
      <h3>Latest posts</h3>
      {
        latestFivePost.map(x => {
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
})

export default ListOfLatestPosts;
