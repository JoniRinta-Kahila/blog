import React from 'react';
import { RenderElementProps } from 'slate-react';

type EditorHeaderElementProps = {
  props: RenderElementProps
}

const EditorHeaderElement: React.FC<EditorHeaderElementProps> = ({ props }) => {
  return <p {...props.attributes}>{props.children}</p>
};

export default EditorHeaderElement;
