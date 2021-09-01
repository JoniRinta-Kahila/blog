import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react';
import DataDeserializer from './dataDeserializer';
import EditorCodeElement from './editorElements/editor.codeElement';
import EditorDefaultElement from './editorElements/editor.defaultElement';
import EditorGistElement from './editorElements/editor.gistElement';
import EditorParagraphElement from './editorElements/editor.paragraphElement';

type RichTextEditorProps = {

}

const RichTextEditor: React.FC<RichTextEditorProps> = () => {

  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{text: ''}],
      uuid: `${new Date().getTime()}`
    }
  ]);

  const renderElement = useCallback((props: RenderElementProps) => {
    console.log(props);
    switch (props.element.type) {
      case 'paragraph':
        return <EditorParagraphElement {...props} />
      case 'code':
        return <EditorCodeElement {...props} />
      case 'gist':
        return <EditorGistElement {...props} />
      default:
        return <EditorDefaultElement {...props} />
    }
  }, []);

    return (
    <div style={{paddingRight: '20px'}}>

      <Slate editor={editor} value={value} onChange={setValue}>
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
              const lastValueObj: any = (value[value.length - 1] as any);
              const lastValueObjLastChildStr: string = lastValueObj.children[lastValueObj.children.length - 1].text;

              if (!lastValueObjLastChildStr.length) return;

              // put words to arr and remove posible undefined strings
              const wordArr = lastValueObjLastChildStr.split(' ').filter(str => /\S/.test(str));
              const lastWord = wordArr[wordArr.length - 1];

              // check if language is listed, select the codeblock
              // const langs = Object.assign(progLangs)
              // if (langs[lastWord]) {
              //   const selectedProgLang = langs[lastWord];
              //   console.log('selected codeblock with lang:', selectedProgLang);

              //   // remove codeblock selector from editor
              //   editor.deleteBackward('word');

              //   Transforms.setNodes(
              //     editor,
              //     { type: 'code', language: selectedProgLang, uuid: `${new Date().getTime()}`},
              //     { match: n => Editor.isBlock(editor, n)},
              //   );
              //   return;
              // }

              console.log('last word', lastWord)

              // Gist
              if (lastWord.toLowerCase() === 'gist') {
                editor.deleteBackward('word');

                editor.insertNode({
                  type: 'gist',
                  children: [
                    {text: 'asd', randStr: 'foo'},
                    {text: 'dsa', randStr: 'bar'}
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

              // Paragraph
              if (lastWord === 'p') {
                editor.deleteBackward('character');
                Transforms.setNodes(
                  editor,
                  { type: 'paragraph', uuid: `${new Date().getTime()}`},
                  { match: n => Editor.isBlock(editor, n)},
                )
              }

              // headings
              if (lastWord.length === 2 && lastWord.startsWith('h') && parseInt(lastWord.split('')[1])) {
                const headingLevel = parseInt(lastWord.split('')[1])
                if (headingLevel < 0 || headingLevel > 6) {
                  return;
                }

                editor.deleteBackward('word');
                Transforms.setNodes(
                  editor,
                  { type: 'heading', level: headingLevel, uuid: `${new Date().getTime()}`},
                  { match: n => Editor.isBlock(editor, n)},
                )
              }
            }
          }}
        />
      </Slate>
      <DataDeserializer data={value} />
      <p>{JSON.stringify(value)}</p>
    </div>
  )
}

export default RichTextEditor
