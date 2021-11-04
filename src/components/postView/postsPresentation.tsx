import React from 'react'
import { useStores } from '../../mst/rootStoreContext';
import ArticleCardWide from './articleCardWide';
import { observer } from 'mobx-react-lite';
import { useParams } from "react-router-dom";

type PostsPresentationProps = {
  byTag?: boolean;
  byCategory?: boolean;
}

const PostsPresentation: React.FC<PostsPresentationProps> = observer(({ byTag = false, byCategory = false }) => {
  const rootStore = useStores();
  const params = useParams<any>();
  const filter = params.filter;

  const sorter = () => {
    console.log(filter);
    if (byTag) return rootStore.posts.filter(x => x.tags.find(c => c.toLowerCase() === filter.toLowerCase()));
    if (byCategory) return rootStore.posts.filter(x => x.category.toLowerCase() === filter.toLowerCase());
    return rootStore.posts;
  }

  return (
    <div>
      {
        sorter().map((x, i) => {
          return(
            <ArticleCardWide prefix={i%2 !== 0} key={x.time} blogPost={x}/>
          )
      })
      }
    </div>
  )
})

export default PostsPresentation
