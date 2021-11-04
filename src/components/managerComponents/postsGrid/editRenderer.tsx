import { ICellRendererParams } from '@ag-grid-community/all-modules';
import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const EditRenderer: React.FC<ICellRendererParams> = ({ node }) => {
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', textAlign:'center'}}>
      <Link to={`/manage/edit/${node.data.id}`}><AiOutlineEdit size={25}/></Link>
    </div>
  )
}

export default EditRenderer
