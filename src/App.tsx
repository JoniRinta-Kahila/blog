import React, { useEffect, useState } from 'react';
import styles from './app.module.scss';
import ManagerMenu from './components/managerComponents/sidebar/managerMenu';
import {
  // BrowserRouter as Router,
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
import SidebarLinks from './components/sidebar/sidebarLinks';

const App: React.FC = () => {

  const [rootTree, setRootTree] = useState<RootStore|undefined>();

  useEffect(() => {
    console.log('Setting-up Root-tree');
    setRootTree(setupRootStore());
  }, []);

  if (!rootTree) {
    return <h1>ROOT-TREE ERROR</h1>
  }

  const parsePath = (): string => {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/blog/')) {
      const res = pathname.replace('/blog/', '')
      return res
    }
    return pathname
  }

  return (
    <RootStoreProvider value={rootTree}>
      <FirebaseAuthContextProvider>
        <LoginPopupContextProvider>
          <FirestoreSnapshotProvider>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                  <div className={styles.content}>
                    <div className={styles.contentHeader}>
                      <h1>My Blog</h1>
                      <h2>console.log('Hello, User!');</h2>
                    </div>
                      <p>{parsePath()}</p>
                    <Switch>
                      <ProtectedRoute exact currentPath={parsePath()} path='/editor' component={CreateNewPost} />
                      <Route exact path='/login' component={Login} />
                      <Route exact path='/' component={PostsPresentation} />
                      <Route exact path='/posts/:postId' component={PostView} />
                    </Switch>
                  </div>
                </div>
                <div className={styles.sidebar}>
                  <h2>Page sidebar</h2>
                  <SidebarLinks />
                  <ManagerMenu />
                </div>
            </div>
          </FirestoreSnapshotProvider>
        </LoginPopupContextProvider>
      </FirebaseAuthContextProvider>
    </RootStoreProvider>
  )
}

export default App;
