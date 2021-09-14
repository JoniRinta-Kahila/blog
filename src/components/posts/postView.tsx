import React from 'react';
import { IoCalendarSharp } from 'react-icons/io5';
import { RiFlag2Fill } from 'react-icons/ri';
import { AiOutlineShareAlt } from 'react-icons/ai';
import styles from './postView.module.scss';

type PostViewProps = {

};

const PostView: React.FC<PostViewProps> = () => {
  
  return (
    <article>
      
      {/* ARTICLE HEADER */}
      <h1 className={styles.articleHeader}>[POST HEADER]</h1>
      {/* ARTICLE INFO-BAR */}
      <div className={styles.infoBar}>
        <span style={{}}><IoCalendarSharp/><p style={{marginLeft: '6px', fontSize: '13px'}}>3 days ago</p></span>
        <span style={{}}><RiFlag2Fill/><p style={{marginLeft: '6px', fontSize: '13px'}}>[POST CATEGORY]</p></span>
        <span style={{}}><AiOutlineShareAlt/><p style={{marginLeft: '6px', fontSize: '13px'}}>Share</p></span>
      </div>

      {/* ARTICLE CONTENT */}

    </article>
  )
};

export default PostView;
