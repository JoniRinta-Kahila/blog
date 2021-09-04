import React, { useState } from "react";
import { Descendant } from "slate";
import DataDeserializer from "./editorV1/dataDeserializer";
import EditorToolbar from "./editorV1/editorToolbar";
import RichTextEditor from "./editorV1/richTextEditor";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

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
    <>
    <div style={{marginRight: '15px'}}>
      <Tabs>
        <TabList>
          <Tab>Editor</Tab>
          <Tab>Preview</Tab>
          <Tab>Output</Tab>
        </TabList>
        <TabPanel>
          <EditorToolbar />
          <RichTextEditor editorValue={editorValue} editorValueSetter={setEditorValue} />
        </TabPanel>
        <TabPanel>
          <DataDeserializer data={editorValue} />
        </TabPanel>
        <TabPanel>
          <p>{JSON.stringify(editorValue)}</p>
        </TabPanel>
      </Tabs>
    </div>
    </>
  );
}

export default CreateNewPost;