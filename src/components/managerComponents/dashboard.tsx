import React from 'react';
import { Redirect } from 'react-router-dom';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';

type DashboardProps = {

}

const Dashboard: React.FC<DashboardProps> = () => {
  const { isAdmin } = useFirebaseUserContext();
  
  if (!isAdmin) {
    return <Redirect to ='' />
  }

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard;
