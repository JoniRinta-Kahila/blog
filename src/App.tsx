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
import PostView from './components/postView/postView';
import FirebaseServices from './firebase/firebaseServices';
import { onAuthStateChanged, User } from 'firebase/auth';

const App: React.FC = () => {

  const auth = FirebaseServices.getAuthInstance();
  const [user, setUser] = useState<User|null>(null);
  const [rootTree, setRootTree] = useState<RootStore|undefined>();

  useEffect(() => {
    console.log('Setting-up Root-tree');
    setRootTree(setupRootStore());
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  })

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
                  <ProtectedRoute user={user} exact path='/editor' component={CreateNewPost} />
                  <Route exact path='/login' render={() => (<Login user={user}/>)} />
                  <Route exact path='/' component={PostsPresentation} />
                  <Route exact path='/posts/:postId' component={PostView} />
                </Switch>
              </div>
            </div>
            <div className={styles.sidebar}>
              <h2>Page sidebar</h2>
              {
                user
                ? <ManagerMenu />
                : null
              }
            </div>
          </Router>
        </div>
      </FirestoreSnapshotProvider>
    </RootStoreProvider>
  )
}

export default App;
