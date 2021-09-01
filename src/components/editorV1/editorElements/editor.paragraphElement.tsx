import React from 'react';
import { RenderElementProps } from 'slate-react';

const EditorParagraphElement: React.FC<RenderElementProps> = (props) => {
  return (
    <p style={{background: 'azure'}} {...props.attributes}>{props.children}</p>
  )
};

export default EditorParagraphElement;
