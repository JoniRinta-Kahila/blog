import React from 'react'

type EditorActionsProps = {

}

const EditorActions: React.FC<EditorActionsProps> = () => {
  return (
    <div style={{
      borderTop:'none',
      padding:'10px',
      borderRadius: '2px'
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'end',
        alignItems: 'center'
      }}>
        <button
          onClick={() => alert('no action')}
          style={{
            marginRight:'10px',
            maxWidth: '50%',
            width: '100px',
            background: 'rgb(247,242,25)',
            color: '#000',
            border: '1px solid grey',
            cursor: 'pointer',
            fontWeight: 700,
            borderRadius: '3px'
          }}
        >Preview</button>
        <button
          onClick={() => alert('no action')}
          style={{
            maxWidth: '50%',
            width: '100px',
            background: 'rgb(103,193,41)',
            color: '#fff',
            border: '1px solid grey',
            cursor: 'pointer',
            fontWeight: 700,
            borderRadius: '3px'
          }}
        >Publish</button>
      </div>
    </div>
  )
}

export default EditorActions
