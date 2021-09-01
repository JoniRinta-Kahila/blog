import React from 'react';
import { RenderElementProps } from 'slate-react';

const EditorCodeElement: React.FC<RenderElementProps> = (props) => {
  return (
    <pre style={{background: '#000', color: 'white'}} {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
};

export default EditorCodeElement;
