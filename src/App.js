import React, {  useEffect } from 'react';
import './App.css';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import AppWrapper from '../src/layout/layout'
// import UploadImage from "../src/components/HandleImages/UploadImage"
function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
       <AmplifySignOut />
  
       <AppWrapper />
     {/* <div>Hello, {user.username} </div>  */}
     {/* {console.log("user", user)} */}
    </div>
  ) : (
    <AmplifyAuthenticator />
);
}

export default App;
