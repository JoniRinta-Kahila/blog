import React, { useEffect, useState } from 'react';
import dev from '../../../helper/devLogger';
import GetUsers, { IUserData } from './getUsers';
import {AgGridColumn, AgGridReact} from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import styles from './userGrid.module.scss';
// import ActionRenderer from './actionRenderer';
import BooleanCellRenderer from './booleanCellRenderer';


type UsersGridProps = {

}

const UsersGrid: React.FC<UsersGridProps> = () => {
  const [userData, setUserData] = useState<IUserData[]>([]);

  useEffect(() => {
    (async () => {
      const data = await GetUsers();
      setUserData(data);
    })()
  }, []);

  useEffect(() => {
    dev.log('USERDATA UPDATED', userData)
  }, [userData]);

  return (
    <div className={'ag-theme-material'} style={{height: 'calc(100% - 30px)', width: '100%'}}>
      <h3 style={{height: '30px', margin:0, color: '#fff'}}>USERS</h3>
      <AgGridReact
        modules={AllCommunityModules}
        rowData={userData}
        
        defaultColDef={{
          flex: 1,
          editable: true,
          sortable: true,
          filter: true,
          cellClass: (params) => {
            if (params.colDef.headerName?.toLowerCase() !== 'actions') {
              return styles.defaultCellStyle
            }
            return styles.actionsCellStyle
          }
        }}
        rowHeight={50}
        headerHeight={48}
        editType = 'fullRow'
        rowSelection='single'
        suppressClickEdit
        stopEditingWhenCellsLoseFocus
        onRowEditingStopped={(params) => {
          params.api.redrawRows({
            rowNodes: [params.node]
          })
        }}
      >
        <AgGridColumn field='uid' editable={false} hide/>
        <AgGridColumn field='email' editable={false} minWidth={170} />
        <AgGridColumn field='displayName' headerName='Name' minWidth={130} />
        <AgGridColumn
          field='isAdmin'
          headerName='Admin'
          editable={false}
          maxWidth={125}
          cellRendererFramework={BooleanCellRenderer}
        />
        <AgGridColumn
          field='disabled'
          headerName='Disabled'
          editable={false}
          maxWidth={125}
          cellRendererFramework={BooleanCellRenderer}
        />
        <AgGridColumn
          field='emailVerified'
          headerName='Verified'
          editable={false}
          maxWidth={125}
          cellRendererFramework={BooleanCellRenderer}
          />
        {/* <AgGridColumn headerName='Actions' editable={false} sortable={false} colId='actions' filter={false} cellRendererFramework={ActionRenderer} /> */}
      </AgGridReact>
    </div>
  )
}

export default UsersGrid;
