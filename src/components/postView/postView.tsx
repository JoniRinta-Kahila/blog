import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router-dom";
import { PostSnapshot, RootStoreSnapshot } from '../../mst';
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
import PostCommentsSection from './postCommentsSection';
import dev from '../../helper/devLogger';
import ScrollToTop from '../basic/scrollToTop';
import { getSnapshot, onSnapshot } from 'mobx-state-tree';

const PostView: React.FC = observer(() => {
  const params = useParams<any>();
  const postId = params.postId;
  
  const [currentPost, setCurrentPost] = useState<PostSnapshot>();
  const [snap, setSnap] = useState<RootStoreSnapshot>(getSnapshot(useStores()));
  onSnapshot(useStores(), (newSnapShot) => setSnap(newSnapShot));

  // Init hljs
  // BUG One of your code blocks includes unescaped HTML. This is a potentially serious security risk. 
  // happen on hard-reload page, where post content have codeblock
  useEffect(() => {
    dev.log('Hilight update')
    document.querySelectorAll('pre code').forEach((el: any) => {
      el.classList.add(styles.codeblock);
      hljs.highlightElement(el);
    })
  }, [currentPost]);

  useMemo(() => {
    let found = false;
    if (postId) {
      const current = snap.posts.find(x => x.id === postId);
      setCurrentPost(current);
      
      found = current !== undefined;
    }

    if (!found) {
      
    }
  }, [postId, snap.posts]);

  if (!currentPost) {
    // TODO: redirect to 404
    return <h1>Post not found =(</h1>
  }

  return (
    <div>
      <ScrollToTop />
      {/* ARTICLE HEADER */}
      <ArticleHeader str={currentPost.header} inEditor={false} />
      {/* ARTICLE INFO-BAR */}
      <div className={styles.infoBar}>
        <span style={{}}><IoCalendarSharp/><p style={{marginLeft: '6px', fontSize: '13px'}}>{TimeAgo(currentPost.time)}</p></span>
        <span style={{}}><RiFlag2Fill/><ArticleCategory str={currentPost.category} inEditor={false} /></span>
        <span style={{}}><AiOutlineShareAlt/><p style={{marginLeft: '6px', fontSize: '13px'}}>Share</p></span>
      </div>

      <article>
        <div className='ck-content' dangerouslySetInnerHTML={{__html: currentPost.contentHTML}} />
      </article>

      <PostCommentsSection postId={currentPost.id} />
    </div>
  )
})

export default PostView;
