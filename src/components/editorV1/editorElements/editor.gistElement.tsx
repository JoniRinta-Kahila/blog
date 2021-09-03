import React from 'react';
import { RenderElementProps } from 'slate-react';
import styles from '../editor.module.scss';

const EditorGistElement: React.FC<RenderElementProps> = (props) => {
  return (
    <div className={styles.editorElGist}>
      <div>
        <input
          type='text'
          value='Filename: '
          disabled
        />
        <p {...props.attributes['data-slate-void']}>{props.children[1] ?? ' '}</p>
      </div>
      <div>
        <input
          type='text'
          value='GIST-ID:'
          disabled
        />
        <p {...props.attributes['data-slate-void']}>{props.children[0]  ?? ' '}</p>
      </div>
    </div>
  )
};

export default EditorGistElement;
