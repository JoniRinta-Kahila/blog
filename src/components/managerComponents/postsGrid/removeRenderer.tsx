import { ICellRendererParams } from '@ag-grid-community/all-modules';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { IoTrashBinOutline } from 'react-icons/io5'
import FirebaseServices from '../../../firebase/firebaseServices';

const handleDelete = async (postId: string, header: string) => {
  const kek = prompt('Confirm the deletion by entering the correct post header:');
  if (typeof kek === 'string' && kek === header) {
    const firestoreInstance = FirebaseServices.getFirestoreInstance();
    await deleteDoc(doc(firestoreInstance, 'post', postId));
  } else {
    alert('Cannot delete, You typed wrong header!')
    alert(header)
  }
}

const RemoveRenderer: React.FC<ICellRendererParams> = ({ api, node, value }) => {
  return (
    <IoTrashBinOutline size={25} onClick={() => handleDelete(node.data.id, node.data.header)} />
  )
}

export default RemoveRenderer
