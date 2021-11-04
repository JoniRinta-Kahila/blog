import React, { useState } from 'react';
import {AgGridColumn, AgGridReact} from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import styles from './postsGrid.module.scss';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../mst/rootStoreContext';
import TimeAgo from '../../../helper/timeElapsed';
import TogglePublishRendderer from './togglePublishRendderer';
import { getSnapshot, onSnapshot } from 'mobx-state-tree';
import { RootStoreSnapshot } from '../../../mst';
import RemoveRenderer from './removeRenderer';
import EditRenderer from './editRenderer';

type PostsGridProps = {
  published?: boolean,
}

const PostsGrid: React.FC<PostsGridProps> = observer(({published = false}) => {
  const [snap, setSnap] = useState<RootStoreSnapshot>(getSnapshot(useStores()));

  onSnapshot(useStores(), (newSnapShot) => {
    setSnap(newSnapShot);
  });

  return (
    <div className={'ag-theme-material'} style={{height: 'calc(100% - 30px)', width: '100%'}}>
      <h3 style={{height: '30px', margin:0, color: '#fff'}}>{published ? 'Published posts' : 'Unpublished posts'} <i style={{color: 'greenyellow'}}>- Observed</i></h3>
      <AgGridReact
        modules={AllCommunityModules}
        rowData={published ? snap.posts : snap.unpublishedPosts}
        getRowNodeId={asd => asd.id}
        immutableData
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
        onCellDoubleClicked={(event) => navigator.clipboard.writeText(event.value)}
        onRowEditingStopped={(params) => {
          params.api.redrawRows({
            rowNodes: [params.node]
          })
        }}
      >
        <AgGridColumn field='published' headerName='' cellClass={styles.iconCell} maxWidth={80} cellRendererFramework={TogglePublishRendderer}/>
        <AgGridColumn field='header' />
        <AgGridColumn field='time' headerName='Created' valueFormatter={(param) => TimeAgo(param.value)} />
        <AgGridColumn headerName='actions' cellRendererFramework={EditRenderer} maxWidth={60} cellClass={styles.iconCell} />
        <AgGridColumn headerName='actions' cellRendererFramework={RemoveRenderer} maxWidth={60} cellClass={styles.iconCell} />
      </AgGridReact>
    </div>
  )
})

export default PostsGrid
