import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { EditorContext } from './editorContext';

export interface EditorContextProviderProps {

}

const EditorContextProvider: React.FC<React.PropsWithChildren<EditorContextProviderProps>> = ({ children }) => {

  const value = useMemo(() =>
    ({editor: withReact(createEditor())}), [])

  return (
    <EditorContext.Provider value={value}>
      { children }
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
