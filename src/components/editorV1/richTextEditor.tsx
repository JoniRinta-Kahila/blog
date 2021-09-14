import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

type RichTextEditorProps = {

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

const RichTextEditor: React.FC<RichTextEditorProps> = () => {
  const [editorValue, setEditorValue] = useState<string>('<p>Hello from CKEditor 5!</p>')
  return (
    <div>
      <CKEditor
        editor={Editor}
        data={editorValue}
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
          setEditorValue(data)
        }}
        onError={(event, editor) => {
          // onerror
        }}
      />
      <div dangerouslySetInnerHTML={{__html: editorValue}} />
    </div>
  )
}

export default RichTextEditor
