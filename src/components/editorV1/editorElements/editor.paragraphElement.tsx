import React from 'react';
import { RenderElementProps } from 'slate-react';
import styles from '../editor.module.scss';

const EditorParagraphElement: React.FC<RenderElementProps> = (props) => {
  return (
    <p className={styles.editorElPara} {...props.attributes}>{props.children}</p>
  )
};

export default EditorParagraphElement;
