import React, { useState } from "react";
import { Descendant } from "slate";
import DataDeserializer from "./editorV1/dataDeserializer";
import EditorToolbar from "./editorV1/editorToolbar";
import RichTextEditor from "./editorV1/richTextEditor";

interface CreateNewPostProps {

}

const CreateNewPost: React.FC<CreateNewPostProps> = () => {

    const [editorValue, setEditorValue] = useState<Descendant[]>([
        {
            type: 'paragraph',
            children: [{ text: '' }],
            uuid: `${new Date().getTime()}`
        }
    ]);

    return (
        <div style={{border: '2px solid black', borderTop: 'none', marginRight: '15px'}}>
            <EditorToolbar />
            <RichTextEditor editorValue={editorValue} editorValueSetter={setEditorValue} />
            <p>{JSON.stringify(editorValue)}</p>
            <DataDeserializer data={editorValue} />
        </div>
    );
}

export default CreateNewPost;