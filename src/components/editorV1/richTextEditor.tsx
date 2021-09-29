import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import ImageUploadAdapter from './plugins/imageUploadAdapter';
import { IEditorItem } from './types/editorItem';
import { EditorConfig } from './configs/editorConfig';

type RichTextEditorProps = {
  setNewPostObj: React.Dispatch<React.SetStateAction<IEditorItem>>,
  newPostObj: IEditorItem
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ newPostObj, setNewPostObj}) => {
  return (
    <div>
      <CKEditor
        editor={Editor}
        data={newPostObj.contentHTML}
        config={EditorConfig}
        onReady={editor => {
          console.log( 'Editor is ready to use!', editor );
          editor.plugins.get('FileRepository').createUploadAdapter = loader => {
            return new ImageUploadAdapter(loader)
          }
        }}
        onBlur={(event, editor) => {
          // onblur
        }}
        onFocus={(event, editor) => {
          // onfocus
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setNewPostObj({...newPostObj, contentHTML: data})
        }}
        onError={(event, editor) => {
          // onerror
        }}
      />
    </div>
  )
}

export default RichTextEditor;
