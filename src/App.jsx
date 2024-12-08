



import React, { useContext, useEffect } from 'react';
import Routing from './Pages/Routing';
import { DataContext } from './components/DataProvider/DataProvider';
import { Type } from './Utility/action.type';
import { auth } from './Utility/firebse.js';

function App() {
  // Access the context directly in the component body
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
  auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

 
  }, []);

  return <Routing />;
}

export default App;





