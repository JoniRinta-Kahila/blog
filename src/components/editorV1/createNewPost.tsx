import React, { useState } from "react";
import RichTextEditor from "./richTextEditor";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import PostView from "./postsView/postView";
import PostDetailForm from "./components/postDetailForm";
import EditorActions from "./components/editorActions";

interface CreateNewPostProps {

}

export type BlogPost = {
  header: string,
  category: string,
  tags: string[]
  contentHTML: string,
  releaseDate: number,
  inEditor: boolean;
  editorVersion: string;
}

const CreateNewPost: React.FC<CreateNewPostProps> = () => {

  const [newPostObj, setNewPostObj] = useState<BlogPost>({
    header: '',
    category: '',
    tags: [],
    contentHTML: '<p>Hello from ckEditor5!</p>',
    releaseDate: new Date().getTime(),
    inEditor: true,
    editorVersion: '1.0'
  });
  
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
          {/* EDITOR */}
          <PostDetailForm newPostObj={newPostObj} setNewPostObj={setNewPostObj} />
          <RichTextEditor newPostObj={newPostObj} setNewPostObj={setNewPostObj} />
          <EditorActions />
        </TabPanel>
        <TabPanel>
          {/* POST PREVIEW */}
          <PostView blogPost={newPostObj} />
        </TabPanel>
        <TabPanel>
          {/* POST HTML PREVIEW */}
          <p>{newPostObj.contentHTML}</p>
        </TabPanel>
      </Tabs>
    </div>
    </>
  );
}

export default CreateNewPost;