import React from 'react';
import './App.css';
import Amplify from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const App = () => {
  return (
    <div>
      <AmplifySignOut />
      <header className="App-header">
        <h2>Amplify Demo</h2>
      </header>
      <div className="AppBody">Created a full-stack React app running on the cloud with Cognito, AppSync, GraphQL and DynamoDB.
      <br/>Used Amplify CI/CD for continues deployment.
      <h4>Github Source Repository: <a href="https://github.com/webartdev/helper-graphql-api/tree/master">webartdev/helper-graphql-api</a></h4>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
