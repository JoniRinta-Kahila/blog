import React from 'react';
import styles from './app.module.scss';
import ManagerMenu from './components/managerComponents/sidebar/managerMenu';
import PostView from './components/posts/postView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import CreateNewPost from './components/createNewPost';

const App: React.FC = () => {

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
              {/* /category/datetime/header */}
              <Route exact path='/editor' component={CreateNewPost}/>
              <Route exact path='/example' component={PostView} />
            </Switch>
          </div>
        </div>
        <div className={styles.sidebar}>
          <h2>Page sidebar</h2>
          <ManagerMenu />
          <Link to='example' >Example post</Link>
        </div>
      </Router>
    </div>
  )
}

export default App

