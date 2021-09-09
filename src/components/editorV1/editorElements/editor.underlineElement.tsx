import React from 'react';
import { RenderElementProps } from 'slate-react';
import styles from '../editor.module.scss';

const EditorUnderlineElement: React.FC<RenderElementProps> = (props) => {
  return (
    <p className={styles.editorElPara} {...props.attributes}><u>{props.children}</u></p>
  )
};

export default EditorUnderlineElement;