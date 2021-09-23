import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { BlogPost } from './createNewPost';
import ImageUploadAdapter from './plugins/imageUploadAdapter';

type RichTextEditorProps = {
  setNewPostObj: React.Dispatch<React.SetStateAction<BlogPost>>,
  newPostObj: BlogPost
}

const editorConfig = {
  toolbar: {
    // plugins: [ImageUploadAdapter],
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'fontSize',
      'fontFamily',
      '|',
      'outdent',
      'indent',
      'subscript',
      'superscript',
      'alignment',
      '|',
      'fontColor',
      'fontBackgroundColor',
      'highlight',
      '|',
      'findAndReplace',
      'undo',
      'redo',
      '-',
      'sourceEditing',
      '|',
      'horizontalLine',
      'blockQuote',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'htmlEmbed',
      'codeBlock',
      'code',
      '|',
      'insertTable',
      'imageUpload',
      'mediaEmbed'
    ],
    shouldNotGroupWhenFull: true,
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
      'mergeTableCells',
      'tableCellProperties',
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

export default RichTextEditor
