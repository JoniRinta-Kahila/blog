import React, { useState } from 'react';
import { ICellRendererParams } from '@ag-grid-community/core';
import styles from './actionRenderer.module.scss'
import { GoPencil } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { IoReturnUpBack } from 'react-icons/io5';

// https://www.ag-grid.com/react-grid/component-cell-renderer/#cell-renderer-component-2
const ActionRenderer: React.FC<ICellRendererParams> = ({api, node, columnApi, rowIndex}) => {
  const [editState, setEditState] = useState<boolean>(!false);

  const handleEdit = () => {
    if (node.rowIndex === null) return;

    api.startEditingCell({
      rowIndex: node.rowIndex,
      // get first column key
      colKey: columnApi.getDisplayedCenterColumns()[0].getColId(),
    });

    setEditState(true);
  }

  const handleDelete = () => {
    api.applyTransaction({
      remove: [node.data]
    });
  };

  const handleSave = () => {
    api.stopEditing(false);
    setEditState(false);
  }

  const handleCancel = () => {
    api.stopEditing(true);
    setEditState(false);
  }

  const defaultActions = (
    <>
      <button className={styles.edit} onClick={() => handleEdit()} >
        <GoPencil />
      </button>
      <button className={styles.delete} onClick={() => handleDelete()} >
        <MdDelete className={styles.icon} />
      </button>
    </>
  )

  const editActions = (
    <>
      <button className={styles.cancel} onClick={() => handleCancel()} >
        <IoReturnUpBack />
      </button>
      <button className={styles.save} onClick={() => handleSave()} >
        <BiSave />
      </button>
    </>
  )

  return (
    <div className={editState ? styles.editState : styles.defaultState}>
      {
        editState
        ? editActions
        : defaultActions
      }
    </div>
  )
}

export default ActionRenderer
