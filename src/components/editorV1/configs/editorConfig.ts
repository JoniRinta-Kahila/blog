export const EditorConfig = {
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
    ],
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
};