import React from 'react';
import { RenderElementProps } from 'slate-react';

const EditorGistElement: React.FC<RenderElementProps> = (props) => {
  return (
    <div style={{background: 'lightblue', color: 'black', border: '1px solid black'}}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <input
          type='text'
          value='Filename: '
          disabled
          style={{
            background: 'lightblue',
            outline: 'none',
            border: 'none',
            color: 'red',
            fontWeight: 700,
            fontSize: '15px',
            height: '15px',
            width: '75px',
            paddingRight: '8px',
          }}
        />
        <p style={{border: '1px solid black', width: '60%', fontWeight: 700}} {...props.attributes['data-slate-void']}>{props.children[1] ?? ' '}</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <input
          type='text'
          value='GIST-ID:'
          disabled
          style={{
            background: 'lightblue',
            outline: 'none',
            border: 'none',
            color: 'red',
            fontWeight: 700,
            fontSize: '15px',
            height: '15px',
            width: '65px',
            paddingRight: '8px',
          }}
        />
        <p style={{border: '1px solid black', width: '60%', fontWeight: 700}} {...props.attributes['data-slate-void']}>{props.children[0]  ?? ' '}</p>
      </div>
    </div>
  )
};

export default EditorGistElement;
