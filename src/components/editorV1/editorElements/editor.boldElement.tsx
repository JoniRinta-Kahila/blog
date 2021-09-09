import React from 'react';
import { RenderElementProps } from 'slate-react';
import styles from '../editor.module.scss';

const EditorBoldElement: React.FC<RenderElementProps> = (props) => {
  return (
    <p className={styles.editorElPara} {...props.attributes}><b>{props.children}</b></p>
  )
};

export default EditorBoldElement;