import React, { useCallback } from 'react'
import { Descendant } from 'slate';
import { Slate, Editable, RenderElementProps } from 'slate-react';
import EditorDefaultElement from './editorElements/editor.defaultElement';
import EditorGistElement from './editorElements/editor.gistElement';
import EditorParagraphElement from './editorElements/editor.paragraphElement';
import styles from './editor.module.scss';
import { useEditor } from './editorContext';
import * as Actions from './editorActions';
import EditorBoldElement from './editorElements/editor.boldElement';
import EditorItalicElement from './editorElements/editor.italicElement';
import EditorUnderlineElement from './editorElements/editor.underlineElement';
import EditorDeletedElement from './editorElements/editor.deletedElement';

type RichTextEditorProps = {
  editorValue: Descendant[],
  editorValueSetter: React.Dispatch<React.SetStateAction<Descendant[]>>
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ editorValue, editorValueSetter }) => {
  const { editor } = useEditor()
  
  // IN-EDITOR TEXT FORMAT
  const renderElement = useCallback((props: RenderElementProps) => {
    console.log(props);
    switch (props.element.type) {
      case 'paragraph':
        return <EditorParagraphElement {...props} />
      case 'gist':
        return <EditorGistElement {...props} />
      case 'bold':
        return <EditorBoldElement {...props} />
      case 'italic':
        return <EditorItalicElement {...props} />
      case 'underline':
        return <EditorUnderlineElement {...props} />
      case 'deleted':
        return <EditorDeletedElement {...props} />
      default:
        return <EditorDefaultElement {...props} />
    }
  }, []);

    if (!editor) {
      return <h1>Editor loading...</h1>
    }

    return (
    <div className={styles.richTextEditorContainer}>
      <Slate editor={editor} value={editorValue} onChange={editorValueSetter}>
        <Editable
          renderElement={renderElement}

          onKeyDown={event => {
            console.log(event.key)
            if (event.key === 'Enter') {
              console.log('Enter pressed')
              return
            }
            // Ctrl for check the shortcut
            if (event.key === '.' && event.ctrlKey) {
              // parse output value to find last string
              const lastValueObj: any = (editorValue[editorValue.length - 1] as any);
              const lastValueObjLastChildStr: string = lastValueObj.children[lastValueObj.children.length - 1].text;

              if (!lastValueObjLastChildStr.length) return;

              // put words to arr and remove posible undefined strings
              const wordArr = lastValueObjLastChildStr.split(' ').filter(str => /\S/.test(str));
              const lastWord = wordArr[wordArr.length - 1];

              // Gist
              if (lastWord.toLowerCase() === 'gist') {
                editor.deleteBackward('word');
                Actions.Gist(editor);
              }

              // Paragraph
              if (lastWord === 'p') {
                editor.deleteBackward('character');
                Actions.Paragraph(editor);
              }

              if (lastWord === 'b') {
                editor.deleteBackward('character');
                Actions.Bold(editor);
              }

              if (lastWord === 'i') {
                editor.deleteBackward('character');
                Actions.Italic(editor);
              }

              if (lastWord === 'u') {
                editor.deleteBackward('character');
                Actions.Underline(editor);
              }

              if (lastWord === 'd') {
                editor.deleteBackward('character');
                Actions.Deleted(editor);
              }

              // headings
              if (lastWord.length === 2 && lastWord.startsWith('h') && parseInt(lastWord.split('')[1])) {
                const headingLevel = parseInt(lastWord.split('')[1])
                if (headingLevel < 0 || headingLevel > 6) {
                  return;
                }

                editor.deleteBackward('word');
                Actions.Heading(editor, headingLevel);
              }
            }
          }}
        />
      </Slate>
    </div>
  )
}

export default RichTextEditor
