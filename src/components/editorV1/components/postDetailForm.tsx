import React from 'react';
import { IEditorItem } from '../types/editorItem';
import styles from './postDetailForm.module.scss';

type PostDetailFormProps = {
  newPostObj: IEditorItem,
  setNewPostObj: React.Dispatch<React.SetStateAction<IEditorItem>>,
}

const PostDetailForm: React.FC<PostDetailFormProps> = ({ newPostObj, setNewPostObj }) => {
  return (
    <div className={styles.container}>
      <label>
        Header:
        <input
          type='text'
          name="header"
          value={newPostObj.caption}
          onChange={(event) => setNewPostObj({ ...newPostObj, caption: event.target.value })}
        />
      </label>
      <label>
        Category:
        <input
          type='text'
          name="category"
          value={newPostObj.category}
          onChange={(event) => setNewPostObj({ ...newPostObj, category: event.target.value })}
        />
      </label>
    </div>
  );
};

export default PostDetailForm;
