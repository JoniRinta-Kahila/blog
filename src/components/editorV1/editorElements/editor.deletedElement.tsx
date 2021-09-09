import React from 'react';
import { RenderElementProps } from 'slate-react';
import styles from '../editor.module.scss';

const EditorDeletedElement: React.FC<RenderElementProps> = (props) => {
  return (
    <p className={styles.editorElPara} {...props.attributes}><del>{props.children}</del></p>
  )
};

export default EditorDeletedElement;