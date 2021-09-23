import React, { useEffect } from 'react';
import { IoCalendarSharp } from 'react-icons/io5';
import { RiFlag2Fill } from 'react-icons/ri';
import { AiOutlineShareAlt } from 'react-icons/ai';
import styles from './postView.module.scss';
import { BlogPost } from '../createNewPost';
import TimeAgo from '../../../helper/timeElapsed';
import ArticleHeader from '../components/articleHeader';
import ArticleCategory from '../components/articleCategory';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';


type PostViewProps = {
  blogPost: BlogPost 
};


const PostView: React.FC<PostViewProps> = ({ blogPost }) => {
  useEffect(() => {
    console.log('Hilight update')
    document.querySelectorAll('pre code').forEach((el: any) => {
      el.classList.add(styles.codeblock);
      hljs.highlightElement(el);
    })
  }, [blogPost])

  return (
    <article>

      {/* ARTICLE HEADER */}
      <ArticleHeader str={blogPost.caption} inEditor={blogPost.inEditor} />
      {/* ARTICLE INFO-BAR */}
      <div className={styles.infoBar}>
        <span style={{}}><IoCalendarSharp/><p style={{marginLeft: '6px', fontSize: '13px'}}>{TimeAgo(blogPost.time)}</p></span>
        <span style={{}}><RiFlag2Fill/><ArticleCategory str={blogPost.category} inEditor={blogPost.inEditor} /></span>
        <span style={{}}><AiOutlineShareAlt/><p style={{marginLeft: '6px', fontSize: '13px'}}>Share</p></span>
      </div>

      {/* ARTICLE CONTENT */}
      <div className='ck-content' dangerouslySetInnerHTML={{__html: blogPost.contentHTML}} />

    </article>
  )
};

export default PostView;
