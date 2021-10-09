import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import FirebaseServices from "../../../firebase/firebaseServices";
import dev from "../../../helper/devLogger";

interface IFileLoader {
  id: number;
  status: string;
  uploadResponse: Record<string, unknown> | null;
  uploadTotal: number | null;
  uploaded: number;
  uploadedPercent: number;
  file?: any;
}

class ImageUploadAdapter {
  public loader;
  private storage;

  constructor(props: IFileLoader) {
    //ckEditor5 file loader instance
    this.loader = props;
    this.storage = FirebaseServices.getStorageInstance();
  };

  upload() {
    return this.loader.file
    .then((file: File) => {
      const storageRef = ref(this.storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      return new Promise((resolve, reject) => {
        
        uploadTask.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              dev.log('Upload is paused');
              break;
            case 'running':
              dev.log('Upload is running');
              break;
          };
        },
        error => {
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
              console.log('Upload ready!', downloadUrl)
              resolve({
                default: downloadUrl
              });
            });
        });

      });
    });

  };

  abort() {
    console.log('AABBOOORRT!!!')
  };
};

export default ImageUploadAdapter;
