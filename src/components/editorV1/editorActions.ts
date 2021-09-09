import { BaseEditor, Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';


export const Gist = (editor: (BaseEditor & ReactEditor & HistoryEditor)): void => {
  if (!editor)
    return console.warn('No Editor context');
  
  editor.insertNode({
    type: 'gist',
    children: [
      {text: '123456', randStr: 'foo'},
      {text: 'index.html...', randStr: 'bar'}
    ],
    uuid: `${new Date().getTime()}`
  })

  editor.insertBreak()
  Transforms.setNodes(
    editor,
    { type: 'paragraph', uuid: `${new Date().getTime()}`},
    { match: n => Editor.isBlock(editor, n)},
  )
}

export const Paragraph = (editor: (BaseEditor & ReactEditor & HistoryEditor)) => {
  if (!editor)
  return console.warn('No Editor context');

  Transforms.setNodes(
    editor,
    { type: 'paragraph', uuid: `${new Date().getTime()}`},
    { match: n => Editor.isBlock(editor, n)},
  )
}

export const Italic = (editor: (BaseEditor & ReactEditor & HistoryEditor)): void => {
  if (!editor)
    return console.warn('No Editor context');
  
  Transforms.setNodes(
    editor,
    { type: 'italic', uuid: `${new Date().getTime()}`},
    { match: n => Editor.isBlock(editor, n)},
  )
}

export const Bold = (editor: (BaseEditor & ReactEditor & HistoryEditor)): void => {
  if (!editor)
    return console.warn('No Editor context');
  
  Transforms.setNodes(
    editor,
    { type: 'bold', uuid: `${new Date().getTime()}`},
    { match: n => Editor.isBlock(editor, n)},
  )
}

export const Underline = (editor: (BaseEditor & ReactEditor & HistoryEditor)): void => {
  if (!editor)
    return console.warn('No Editor context');

    Transforms.setNodes(
      editor,
      { type: 'underline', uuid: `${new Date().getTime()}`},
      { match: n => Editor.isBlock(editor, n)},
    )  
}

export const Deleted = (editor: (BaseEditor & ReactEditor & HistoryEditor)): void => {
  if (!editor)
    return console.warn('No Editor context');

  Transforms.setNodes(
    editor,
    { type: 'deleted', uuid: `${new Date().getTime()}`},
    { match: n => Editor.isBlock(editor, n)},
  ) 
}

export const Heading = (editor: (BaseEditor & ReactEditor & HistoryEditor), headingLevel: number): void => {
  if (!editor)
    return console.warn('No Editor context');
  
  Transforms.setNodes(
    editor,
    { type: 'heading', level: headingLevel, uuid: `${new Date().getTime()}`},
    { match: n => Editor.isBlock(editor, n)},
  )
}