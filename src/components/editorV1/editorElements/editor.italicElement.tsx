import React from 'react';
import { RenderElementProps } from 'slate-react';
import styles from '../editor.module.scss';

const EditorItalicElement: React.FC<RenderElementProps> = (props) => {
  return (
    <p className={styles.editorElPara} {...props.attributes}><i>{props.children}</i></p>
  )
};

export default EditorItalicElement;