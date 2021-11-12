import React, { useEffect, useState } from 'react';
import styles from './app.module.scss';
import {
  Routes,
  Route,
} from 'react-router-dom';
import CreateAndEditPost from './components/editorV1/createAndEditPost';
import { RootStoreProvider } from './mst/rootStoreContext';
import { RootStore } from './mst';
import { setupRootStore } from './mst/setup';
import FirestoreSnapshotProvider from './firebase/context/firestoreSnapshotProvider';
import PostsPresentation from './components/postView/postsPresentation';
import PostView from './components/postView/postView';
import FirebaseUserContextProvider from './firebase/context/firebaseUserContextProvider';
import Header from './components/basic/header';
import SidebarComponents from './components/sidebar/sidebarComponents';
import { Squares } from "react-activity";
import Dashboard from './components/managerComponents/dashboard';
import Notfound from './components/notfound/notfound';
import AuthPopupContextProvider from './components/auth/authPopupContextProvider';
import Welcome from './components/auth/welcome';
import EmailVerified from './components/auth/emailVerified';
import dev from './helper/devLogger';
import ProtectedRoutes from './components/auth/protectedRoutes';

const App: React.FC = () => {

  const [rootTree, setRootTree] = useState<RootStore|undefined>();

  useEffect(() => {
    dev.log('Setting-up Root-tree');
    setRootTree(setupRootStore());
  }, []);

  if (!rootTree) {
    return <Squares />
  }


  return (
    <RootStoreProvider value={rootTree}>
      <FirebaseUserContextProvider>
        <AuthPopupContextProvider>
          <FirestoreSnapshotProvider>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                  <div className={styles.content}>
                    <Header />
                    <Routes>
                      <Route path='/' element={<PostsPresentation />} />
                      <Route path='/posts/:postId' element={<PostView />} />
                      <Route path='/tag/:filter' element={<PostsPresentation byTag />} />
                      <Route path='/category/:filter' element={<PostsPresentation byCategory />} />

                      <Route path='/manage' element={<ProtectedRoutes />} >
                        <Route path='/manage' element={<Dashboard />} />
                        <Route path='/manage/create' element={<CreateAndEditPost />} />
                        <Route path='/manage/edit/:postId' element={<CreateAndEditPost />} />
                      </Route>

                      <Route path='/welcome' element={<Welcome />} />
                      <Route path='/verified' element={<EmailVerified />} />
                      <Route path='/notfound' element={<Notfound />} />
                      <Route path='*' element={<Notfound />} />
                    </Routes>
                  </div>
                </div>
              <div className={styles.sidebar}>
                <SidebarComponents />
              </div>
            </div>
          </FirestoreSnapshotProvider>
        </AuthPopupContextProvider>
      </FirebaseUserContextProvider>
    </RootStoreProvider>
  )
}

export default App;
