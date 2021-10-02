import React, { useEffect, useState } from 'react';
import FirebaseServices from '../../firebase/firebaseServices';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import styles from './album.module.scss';

export interface AlbumProps {
  onImageClick?: ((image: IImageSource) => void)|null;
  setStorageAlbumOpenState: React.Dispatch<React.SetStateAction<boolean>>
  storageAlbumOpenState: boolean;
}

export interface IImageSource {
  src: string
  alt: string
}

/**
 * @param onImageClick
 * @param setIsOpen callback to set state of isOpen
 * @param isOpen boolean 
 * @returns React.FC<AlbumProps>
 */
const Album: React.FC<AlbumProps> = ({onImageClick = null, setStorageAlbumOpenState: setIsOpen, storageAlbumOpenState: isOpen}) => {
  const [imagesUrls, setImagesUrls] = useState<IImageSource[]|undefined>();

  const getUrls = async () => {
    const storageInstance = FirebaseServices.getStorageInstance();
    const listRef = ref(storageInstance, 'images');
    const listResult = await listAll(listRef);
    const itemsRefs = listResult.items;

    let urls: IImageSource[] = [];
    for (const item of itemsRefs) {
      const url = await getDownloadURL(item);
      urls.push({src: url, alt: item.name})
    }

    setImagesUrls(urls);
  }

  useEffect(() => {
    (async () => {
      try {
        await getUrls();
      } catch (error: any) {
        console.error('album: getUrls()',error.message);
      }
    })();
  }, []);

  return isOpen ? (
    <div className={styles.container}>

      <div className={styles.topBar}>
        <h3>Image Picker</h3>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >X</button>
      </div>
      <div className={styles.gallery}>
        {
          imagesUrls?.map(src => {
            return (
              <img
                key={src.src}
                src={src.src}
                alt={src.alt}
                onClick={() => {
                  if (onImageClick) {
                    onImageClick(src);
                  }
                  setIsOpen(false);
                }}
              />
            )
          })
        }
      </div>
    </div>
  ) : null
}

export default Album;
