import React, { useEffect } from 'react';
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
import { collection, query, where, onSnapshot } from "firebase/firestore";
import FirebaseServices from './firebase/firebaseServices';

const App: React.FC = () => {

  useEffect(() => {
    const firebase = FirebaseServices.getFirestoreInstance();
    const q = query(collection(firebase, 'post'), where('published', '==', true))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(doc => {
        console.log(doc.data())
      })
    });

    return () => unsubscribe();
  })
  
  return (
    <div className={styles.container}>
      <Router basename='blog'>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <h1>My Blog</h1>
              <h2>console.log('Hello, User!');</h2>
            </div>
            <Switch>
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
  )
}

export default App;
