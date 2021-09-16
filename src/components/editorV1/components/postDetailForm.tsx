import React from 'react'
import { BlogPost } from '../createNewPost'

type PostDetailFormProps = {
  newPostObj: BlogPost,
  setNewPostObj: React.Dispatch<React.SetStateAction<BlogPost>>,
}

const PostDetailForm: React.FC<PostDetailFormProps> = ({ newPostObj, setNewPostObj }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      minHeight: '32px'
    }}>
      <label>
        Header:
        <input
          style={{marginLeft: '8px', marginRight: '8px'}}
          type='text'
          name="header"
          value={newPostObj.header}
          onChange={(event) => setNewPostObj({ ...newPostObj, header: event.target.value })}
        />
      </label>
      <label>
        Category:
        <input
          style={{marginLeft: '8px', marginRight: '8px'}}
          type='text'
          name="category"
          value={newPostObj.category}
          onChange={(event) => setNewPostObj({ ...newPostObj, category: event.target.value })}
        />
      </label>
      <label>
        Release date:
        <input style={{marginLeft: '8px', marginRight: '8px'}} type='text' value={new Date(newPostObj.releaseDate).toISOString()} name="category" disabled/>
        <input type='button' value='date update' onClick={() => setNewPostObj({ ...newPostObj, releaseDate: new Date().getTime()}) } />
      </label>
    </div>
  )
}

export default PostDetailForm
