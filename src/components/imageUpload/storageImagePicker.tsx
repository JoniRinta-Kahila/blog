import React from 'react';
import { useDropzone, DropzoneProps } from 'react-dropzone';
import Album, { AlbumProps, IImageSource } from '../album/album';
import styles from './storageImagePicker.module.scss'

interface StorageImagePickerProps extends DropzoneProps, AlbumProps {
  legend?: string,
  onImageClick?: (event: IImageSource) => void,
};

const StorageImagePicker: React.FC<StorageImagePickerProps> = ({legend = '', onImageClick, setStorageAlbumOpenState, storageAlbumOpenState}) => {

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
  });

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  
  return (
    <fieldset className={styles.container}>
      {legend ? <legend>{legend}</legend> : null}
      <Album 
        storageAlbumOpenState={storageAlbumOpenState}
        setStorageAlbumOpenState={setStorageAlbumOpenState}
        onImageClick={(event) => {
          if (onImageClick) {
            onImageClick(event);
          }
        }}
      />
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop image here, or</p>
        <div className={styles.buttons}>
          <button type="button" onClick={open}>
            Add new image
          </button>
          <button onClick={() => setStorageAlbumOpenState(true)}>
            Select storage image
          </button>
        </div>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </fieldset>
  )
}

export default StorageImagePicker;
