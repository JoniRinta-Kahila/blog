import React from 'react';
import { RenderElementProps } from 'slate-react';
import styles from '../editor.module.scss';

type EditorHeaderElementProps = {
  props: RenderElementProps
}

const EditorHeaderElement: React.FC<EditorHeaderElementProps> = ({ props }) => {
  return <p className={styles.editorElHeader} {...props.attributes}>{props.children}</p>
};

export default EditorHeaderElement;
