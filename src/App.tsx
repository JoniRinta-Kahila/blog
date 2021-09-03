import React from 'react';
import styles from './app.module.scss';
import ManagerMenu from './components/managerComponents/sidebar/managerMenu';
import PostView from './components/posts/postView';

const App: React.FC = () => {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h1>My Blog</h1>
            <h2>console.log('Hello, User!');</h2>
          </div>
          <PostView />
        </div>
      </div>
      <div className={styles.sidebar}>
        <h2>Page sidebar</h2>
        <p>&larr; Fixed Width &rarr;</p>
        <ManagerMenu />
      </div>
    </div>
  )
}

export default App

