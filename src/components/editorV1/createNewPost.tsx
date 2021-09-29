import React, { useState } from "react";
import RichTextEditor from "./richTextEditor";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import PostView from "./postsView/postView";
import PostDetailForm from "./components/postDetailForm";
import EditorActions from "./components/editorActions";
import { useFirebaseUserContext } from "../../firebase/context/firebaseUserContextProvider";
import { Redirect } from "react-router-dom";

export type BlogPost = {
  caption: string,
  category: string,
  tags: string[]
  contentHTML: string,
  time: number,
  inEditor: boolean,
  editorVersion: string,
  published: boolean,
  userId?: string,
  id?: string,
}

const CreateNewPost: React.FC = () => {
  const { isAdmin } = useFirebaseUserContext();
  const [newPostObj, setNewPostObj] = useState<BlogPost>({
    caption: '',
    category: '',
    tags: [],
    contentHTML: '<p>Hello from ckEditor5!</p>',
    time: new Date().getTime(),
    inEditor: true,
    editorVersion: '1.0',
    published: false,
  });
  
  if (!isAdmin) {
    return <Redirect to='' />
  }

  return (
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
          <EditorActions newPost={newPostObj} />
        </TabPanel>
        <TabPanel>
          {/* POST PREVIEW */}
          <PostView blogPost={newPostObj} />
        </TabPanel>
        <TabPanel>
          {/* POST HTML PREVIEW */}
          <div>{newPostObj.contentHTML}</div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default CreateNewPost;