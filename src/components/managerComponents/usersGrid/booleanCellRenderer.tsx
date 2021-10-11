import React from 'react'
import { ICellRendererParams } from '@ag-grid-community/core';

const BooleanCellRenderer: React.FC<ICellRendererParams> = ({api, node, columnApi, rowIndex, value, column}) => {
  const handleChange = () => {
    // ¯\_(ツ)_/¯
  }

  const checkedHandler = () => {
    const colId = column?.getId()
    if (!colId) {
      console.error('ColId is undefined');
      return;
    }
    node.setDataValue(colId, !value);
  }

  return <input type='checkbox' checked={value} onClick={() => checkedHandler()} onChange={() => handleChange()}/>
}

export default BooleanCellRenderer
