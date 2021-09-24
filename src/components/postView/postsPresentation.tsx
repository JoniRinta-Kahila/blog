import React from 'react'
import { useStores } from '../../mst/rootStoreContext';
import ArticleCardWide from './articleCardWide';

type PostsPresentationProps = {

}

const PostsPresentation: React.FC<PostsPresentationProps> = () => {
  const rootStore = useStores();
  return (
    <div>
      {
        rootStore.posts.map((x, i) => {
          return(
            <ArticleCardWide prefix={i%2 !== 0} key={x.time} blogPost={x}/>
          )
      })
      }
    </div>
  )
}

export default PostsPresentation
