import React, { useState } from 'react';
import { IEditorItem } from '../types/editorItem';
import styles from './postDetailForm.module.scss';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { BiErrorAlt } from 'react-icons/bi';
import Album from '../../album/album';

type PostDetailFormProps = {
  newPostObj: IEditorItem,
  setNewPostObj: React.Dispatch<React.SetStateAction<IEditorItem>>,
}

const PostDetailForm: React.FC<PostDetailFormProps> = ({ newPostObj, setNewPostObj }) => {
  const [storageAlbumOpenState, setStorageAlbumOpenState] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <Album 
        isOpen={storageAlbumOpenState}
        setIsOpen={setStorageAlbumOpenState}
        onImageClick={(event) => setNewPostObj({ ...newPostObj, displayImage: event.src })}
      />
      <div className={styles.form}>
        <div className={styles.column}>
          <label>
            Header:
            <input
              type='text'
              name="header"
              value={newPostObj.header}
              onChange={(event) => setNewPostObj({ ...newPostObj, header: event.target.value })}
            />
          </label>
          <label>
            Subheader:
            <input
              type='text'
              name="header"
              value={newPostObj.subHeader}
              onChange={(event) => setNewPostObj({ ...newPostObj, subHeader: event.target.value })}
            />
          </label>
        </div>
        <div className={styles.column}>
          <label>
            Category:
            <input
              type='text'
              name="category"
              value={newPostObj.category}
              onChange={(event) => setNewPostObj({ ...newPostObj, category: event.target.value })}
            />
          </label>
          <label>
            Tags:
            <input
              type='text'
              name="category"
              value={newPostObj.category}
              onChange={(event) => setNewPostObj({ ...newPostObj, tags: event.target.value.split(' ') as any })}
            />
          </label>
        </div>
        <div className={styles.column}>
          <fieldset>
            <legend>Display image {newPostObj.displayImage ? <IoCheckmarkOutline color='green' /> : <BiErrorAlt color='red' />}</legend>
            <button onClick={() => setStorageAlbumOpenState(true)}>
              Storage image
            </button>
            <button>
              New image
            </button>
          </fieldset>
        </div>

      </div>
    </div>
  );
};

export default PostDetailForm;
