import React, { useEffect, useMemo, useState } from 'react';
import {useParams } from "react-router-dom";
import { Post } from '../../mst';
import { useStores } from '../../mst/rootStoreContext';
import ArticleHeader from '../editorV1/components/articleHeader';
import { IoCalendarSharp } from 'react-icons/io5';
import { RiFlag2Fill } from 'react-icons/ri';
import { AiOutlineShareAlt } from 'react-icons/ai';
import ArticleCategory from '../editorV1/components/articleCategory';
import TimeAgo from '../../helper/timeElapsed';
import styles from './postView.module.scss';
import { observer } from 'mobx-react-lite';
import hljs from 'highlight.js';

const PostView: React.FC = observer(() => {
  const [currentPost, setCurrentPost] = useState<Post>();
  const params = useParams<any>();
  const postId = params.postId;
  const rootStore = useStores();

  useEffect(() => {
    console.log('Hilight update')
    document.querySelectorAll('pre code').forEach((el: any) => {
      el.classList.add(styles.codeblock);
      hljs.highlightElement(el);
    })
  }, [currentPost]);

  useMemo(() => {
    let found = false;
    if (postId) {
      const current = rootStore.posts.find(x => x.time.toString() === postId);
      setCurrentPost(current);
      
      found = current !== undefined;
    }

    if (!found) {
      // TODO: redirect to 404
    }
  }, [postId, rootStore.posts]);

  if (!currentPost) {
    // TODO: redirect to 404
    return <h1>Post not found =(</h1>
  }

  return (
    <article>

      {/* ARTICLE HEADER */}
      <ArticleHeader str={currentPost.header} inEditor={false} />
      {/* ARTICLE INFO-BAR */}
      <div className={styles.infoBar}>
        <span style={{}}><IoCalendarSharp/><p style={{marginLeft: '6px', fontSize: '13px'}}>{TimeAgo(currentPost.time)}</p></span>
        <span style={{}}><RiFlag2Fill/><ArticleCategory str={currentPost.category} inEditor={false} /></span>
        <span style={{}}><AiOutlineShareAlt/><p style={{marginLeft: '6px', fontSize: '13px'}}>Share</p></span>
      </div>

      {/* ARTICLE CONTENT */}
      <div className='ck-content' dangerouslySetInnerHTML={{__html: currentPost.contentHTML}} />

    </article>
  )
})

export default PostView;
