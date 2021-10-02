import React, { useState } from 'react';
import { useDropzone, DropzoneProps } from 'react-dropzone';
import Album, { AlbumProps, IImageSource } from '../album/album';
import styles from './storageImagePicker.module.scss';
import { FileToMD5Hash } from '../../helper/fileToMD5Hash';
import FirebaseServices from '../../firebase/firebaseServices';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { IoCheckmarkOutline } from 'react-icons/io5';
import { VscError } from 'react-icons/vsc';

interface StorageImagePickerProps extends DropzoneProps, AlbumProps {
  legend?: string,
  onImageClick?: (event: IImageSource) => void,
};

const StorageImagePicker: React.FC<StorageImagePickerProps> = ({legend = '', onImageClick, setStorageAlbumOpenState, storageAlbumOpenState}) => {

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [progressState, setProgressState] = useState<string|null>(null);

  const updloadImage = async (file: File) => {
    const md5 = await FileToMD5Hash(file);
    const extension = file.type.split('/')[1]

    const storageInstance = FirebaseServices.getStorageInstance();
    const storageRef = ref(storageInstance, `images/${md5}.${extension}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploadProgress(0);
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        setProgressState(snapshot.state);
      },
      error => {
        setProgressState('error');
        switch (error.code) {
          case 'storage/unauthorized':
            reject('User doesn\'t have permission to access the object');
            break;
          case 'storage/canceled':
            reject('User canceled the upload');
            break;
          case 'storage/unknown':
            reject('Unknown error occurred, inspect error.serverResponse');
            break;
          default:
            reject('Unknown error occurred');
            break;
        };
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(downloadUrl => {
            console.log('Upload ready!', downloadUrl);
            setProgressState('ready');
            setUploadProgress(0);
            resolve({
              default: downloadUrl,
            });
          });
      });
    });
  };

  const [dragOver, setDragOver] = useState<boolean>(false);
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: ['image/jpeg', 'image/png', 'image/jpg'],
    onDrop: async (file, event) => updloadImage(file[0]),
    onDragOver: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
    
  });

  const IconEl = () => {
    switch (progressState) {
      case 'ready':
        return (
          <div className={styles.okBall}>
             <IoCheckmarkOutline fontWeight={900} />
          </div>
        );
      case 'error':
        return (
          <div className={styles.notOkBall}>
            <VscError />
          </div>
        );
      default:
        return (
          <p>"Drag 'n' drop image here"</p>
        );
    }
  }

  const ProgressStateElement = ():JSX.Element => {
    if (acceptedFiles.length === 0) {
      return <p>Drag 'n' drop image here</p>
    }
    
    const f = acceptedFiles[0];

    return (
      <span className={styles.flexRow}>
        <p key={f.name}>{f.name} - {f.size} bytes</p>
          <IconEl />
      </span>
    )
  }
  
  return (
    <fieldset style={{background: dragOver ? 'green' : 'rgb(250, 250, 250)'}} className={styles.container}>
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

        <div className={styles.progressState}>
          {
            progressState === 'running'
              ? <div style={{display: 'flex', flexDirection:'row', width: '100%', alignItems: 'center'}}>
                  <div style={{
                    lineHeight: '50px',
                    borderBottom: '3px solid green',
                    width: `${uploadProgress}%`,
                    marginRight: '5px',
                  }}/>
                <p>{uploadProgress}%</p>
              </div>
              : <ProgressStateElement />
          }
        </div>

        <div className={styles.buttons}>
          <button type="button" onClick={open}>
            Local image
          </button>
          <button onClick={() => setStorageAlbumOpenState(true)}>
            Storage image
          </button>
        </div>



      </div>
    </fieldset>
  )
}

export default StorageImagePicker;
