import React from 'react';
import { RenderElementProps } from 'slate-react';
import styles from '../editor.module.scss';

const EditorCodeElement: React.FC<RenderElementProps> = (props) => {
  return (
    <pre className={styles.editorElCode} {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
};

export default EditorCodeElement;
