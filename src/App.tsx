import React, { useEffect, useState } from 'react';
import styles from './app.module.scss';
import {
  Switch,
  Route,
} from 'react-router-dom';
import CreateAndEditPost from './components/editorV1/createAndEditPost';
import ProtectedRoute from './components/auth/protectedRoute';
import { RootStoreProvider } from './mst/rootStoreContext';
import { RootStore } from './mst';
import { setupRootStore } from './mst/setup';
import FirestoreSnapshotProvider from './firebase/context/firestoreSnapshotProvider';
import PostsPresentation from './components/postView/postsPresentation';
import PostView from './components/postView/postView';
import FirebaseUserContextProvider from './firebase/context/firebaseUserContextProvider';
import Header from './components/basic/header';
import Sidebar from './components/sidebar/sidebar';
import { Squares } from "react-activity";
import Dashboard from './components/managerComponents/dashboard';
import Notfound from './components/notfound';
import AuthPopupContextProvider from './components/auth/authPopupContextProvider';
import Welcome from './components/auth/welcome';
import EmailVerified from './components/auth/emailVerified';
import dev from './helper/devLogger';

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
                    <Switch>
                      <Route exact path='/' component={PostsPresentation} />
                      <Route exact path='/posts/:postId' component={PostView} />
                      <ProtectedRoute exact path='/manage' component={Dashboard} />
                      <ProtectedRoute exact path='/manage/create' component={CreateAndEditPost} />
                      <ProtectedRoute exact path='/manage/edit/:postId' component={CreateAndEditPost} />
                      <Route exact path='/welcome' component={Welcome} />
                      <Route exact path='/verified' component={EmailVerified} />
                      <Route exact path='/notfound' component={Notfound} />
                      <Route component={Notfound} />
                    </Switch>
                  </div>
                </div>
              <Sidebar />
            </div>
          </FirestoreSnapshotProvider>
        </AuthPopupContextProvider>
      </FirebaseUserContextProvider>
    </RootStoreProvider>
  )
}

export default App;
