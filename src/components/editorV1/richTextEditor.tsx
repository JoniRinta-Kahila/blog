import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { BlogPost } from './createNewPost';

type RichTextEditorProps = {
  setNewPostObj: React.Dispatch<React.SetStateAction<BlogPost>>,
  newPostObj: BlogPost
}

const editorConfig = {
  toolbar: {
    items: [
      'heading',
      'fontSize',
      'bold',
      'italic',
      'underline',
      'fontColor',
      'blockQuote',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'imageUpload',
      'mediaEmbed',
      '|',
      'insertTable',
      'code',
      'codeBlock',
      'htmlEmbed',
      '|',
      'outdent',
      'indent',
      '|',
      'undo',
      'redo'
    ]
  },
  language: 'en',
  image: {
    toolbar: [
      'imageTextAlternative',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  licenseKey: '',
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ newPostObj, setNewPostObj}) => {
  return (
    <div>
      <CKEditor
        editor={Editor}
        data={newPostObj.contentHTML}
        config={editorConfig}
        onReady={editor => {
          console.log( 'Editor is ready to use!', editor );
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

export default RichTextEditor
