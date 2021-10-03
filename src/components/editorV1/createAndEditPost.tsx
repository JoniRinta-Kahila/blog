import React, { useState } from "react";
import RichTextEditor from "./richTextEditor";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PostView from "./postsView/postView";
import PostDetailForm from "./components/postDetailForm";
import EditorActions from "./components/editorActions";
import { useFirebaseUserContext } from "../../firebase/context/firebaseUserContextProvider";
import { Redirect } from "react-router-dom";
import { IEditorItem } from "./types/editorItem";
import { EditorDefaults } from "./configs/editorDefaults";
import { Squares } from "react-activity";
import ArticleCardWide from "../postView/articleCardWide";
import { Post } from "../../mst";

const CreateAndEditPost: React.FC = () => {
  const { isAdmin } = useFirebaseUserContext();
  const [postObj, setPostObj] = useState<IEditorItem>(EditorDefaults);
  
  if (isAdmin === undefined) {
    return <Squares />
  }
  
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
          <RichTextEditor newPostObj={postObj} setNewPostObj={setPostObj} />
          <EditorActions previewOnly newPost={postObj} />
        </TabPanel>
        <TabPanel>
          {/* POST PREVIEW */}
          <h3>Details</h3>
          <PostDetailForm newPostObj={postObj} setNewPostObj={setPostObj} />
          <h3>PostView</h3>
          <PostView blogPost={postObj} />
          <h3>Preview view</h3>
          <ArticleCardWide blogPost={postObj as Post}/>
          <EditorActions newPost={postObj} />
        </TabPanel>
        <TabPanel>
          {/* POST HTML PREVIEW */}
          <div>{postObj.contentHTML}</div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default CreateAndEditPost;
