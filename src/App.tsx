import React, { useEffect, useState } from 'react';
import styles from './app.module.scss';
import {
  Switch,
  Route,
} from 'react-router-dom';
import CreateNewPost from './components/editorV1/createNewPost';
import ProtectedRoute from './components/auth/protectedRoute';
import Login from './components/auth/login';
import { RootStoreProvider } from './mst/rootStoreContext';
import { RootStore } from './mst';
import { setupRootStore } from './mst/setup';
import FirestoreSnapshotProvider from './firebase/context/firestoreSnapshotProvider';
import PostsPresentation from './components/postView/postsPresentation';
import PostView from './components/postView/postView';
import FirebaseAuthContextProvider from './firebase/context/firebaseAuthContextProvider';
import LoginPopupContextProvider from './components/auth/loginPopupContextProvider';
import Header from './components/basic/header';
import Sidebar from './components/sidebar/sidebar';

const App: React.FC = () => {

  const [rootTree, setRootTree] = useState<RootStore|undefined>();

  useEffect(() => {
    console.log('Setting-up Root-tree');
    setRootTree(setupRootStore());
  }, []);

  if (!rootTree) {
    return <h1>ROOT-TREE ERROR</h1>
  }

  return (
    <RootStoreProvider value={rootTree}>
      <FirebaseAuthContextProvider>
        <LoginPopupContextProvider>
          <FirestoreSnapshotProvider>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                  <div className={styles.content}>
                    <Header />
                    <Switch>
                      <ProtectedRoute exact path='/editor' component={CreateNewPost} />
                      <Route exact path='/login' component={Login} />
                      <Route exact path='/' component={PostsPresentation} />
                      <Route exact path='/posts/:postId' component={PostView} />
                    </Switch>
                  </div>
                </div>
              <Sidebar />
            </div>
          </FirestoreSnapshotProvider>
        </LoginPopupContextProvider>
      </FirebaseAuthContextProvider>
    </RootStoreProvider>
  )
}

export default App;
