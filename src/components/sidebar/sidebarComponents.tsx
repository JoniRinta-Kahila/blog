import React from 'react';
import ListOfLatestPosts from './latestPostsMenu/listOfLatestPosts';
import ManagerMenu from './managerSidebar/managerMenu';
import SidebarLinks from './subscriberMenu/subscriberMenu';

const SidebarComponents: React.FC = () => {
  return (
    <>
      <h2>Page sidebar</h2>
      <ManagerMenu />
      <ListOfLatestPosts />
      <SidebarLinks />
    </>
  )
}

export default SidebarComponents;
