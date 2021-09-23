import React, { useEffect, useState } from 'react';
import styles from './app.module.scss';
import ManagerMenu from './components/managerComponents/sidebar/managerMenu';
import {
  BrowserRouter as Router,
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
      <FirestoreSnapshotProvider>
        <div className={styles.container}>
          <Router basename='blog'>
            <div className={styles.wrapper}>
              <div className={styles.content}>
                <div className={styles.contentHeader}>
                  <h1>My Blog</h1>
                  <h2>console.log('Hello, User!');</h2>
                </div>
                <Switch>
                  <Route exact path='/' component={PostsPresentation} />
                  <Route exact path='/login' component={Login} />
                  <ProtectedRoute exact path='/editor' component={CreateNewPost} />
                </Switch>
              </div>
            </div>
            <div className={styles.sidebar}>
              <h2>Page sidebar</h2>
              <ManagerMenu />
            </div>
          </Router>
        </div>
      </FirestoreSnapshotProvider>
    </RootStoreProvider>
  )
}

export default App;
