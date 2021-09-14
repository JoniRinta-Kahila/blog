import React from "react";
import RichTextEditor from "./editorV1/richTextEditor";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

interface CreateNewPostProps {

}

const CreateNewPost: React.FC<CreateNewPostProps> = () => {

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
          <RichTextEditor />
        </TabPanel>
        <TabPanel>
          <p>Preview coming here</p>
        </TabPanel>
        <TabPanel>
          <p>output coming here</p>
        </TabPanel>
      </Tabs>
    </div>
    </>
  );
}

export default CreateNewPost;