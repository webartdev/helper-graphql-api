import React, {  useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles"
import './App.css';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import AppWrapper from '../src/layout/layout'
// import UploadImage from "../src/components/HandleImages/UploadImage"
import { Icon } from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  bg: {
    backgroundColor: '#999',
  },
  logo: {
   top: 20,
   textAlign: "center",
   backgroundColor: "#fff",
   minHeight: 40,
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
  },
  section: {
    backgroundColor: '#efefef',
  }
}))

function App() {
  const classes = useStyles();
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
    <div className={classes.bg}>
      <div className={classes.logo}>
        <Icon><EditIcon /></Icon>

      </div>
    <AmplifyAuthenticator>
      <AmplifySignIn
        // className={classes.section}
        headerText="WebsiteArt Demo Portal"
        slot="sign-in"
        >
      </AmplifySignIn>
      </AmplifyAuthenticator>
    </div>
);
}

export default App;
