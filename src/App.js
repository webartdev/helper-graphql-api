import React, { useReducer } from 'react';
import './App.css';
import { API, graphqlOperation } from 'aws-amplify';
import { createPost } from '../src/graphql/mutations';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import DisplayPosts from './components/DisplayPosts'

const initialState = {
  postBody: "",
  postTitle: "",
  postOwnerId: "",
  postOwnerUsername: "",
}

function App() {
  function postReducer(state = initialState, action){
    switch (action.type){
      case 'POST_BODY':
        return {...state, postBody: action.value}
      case 'POST_TITLE':
        return {...state, postTitle: action.value}
      case 'POST_OWNER_ID':
        return {...state, postOwnerId: action.value}
      case 'POST_OWNER_UName':
        return {...state, postOwnerUsername: action.value}
      default:
        console.log('Default action for: ', action)
      return state
    }
  }

  const [state, dispatch] = useReducer(postReducer, initialState)
  const { postBody, postOwnerId, postOwnerUsername, postTitle  } = state;

  async function savePost() {
    // const { postBody } = state;
    const result = await API.graphql(
      graphqlOperation(createPost, { input: {postBody, postTitle, postOwnerId, postOwnerUsername }}));
    console.log('Save post result: ', result);
  }

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
      <DisplayPosts state={state} dispatch={dispatch} />
      <button><span>+</span></button>
      <form>
      <input label="post Body" 
      placeholder="Post Body" 
      value={postBody} 
      onChange={(e) => dispatch({type: 'POST_BODY', value: e.target.value})}
      />
        <input label="post Title" 
      placeholder="Post Title" 
      value={postTitle} 
      onChange={(e) => dispatch({type: 'POST_TITLE', value: e.target.value})}
      />
      <input label="post owner" 
      placeholder="Post Owner" 
      value={postOwnerId} 
      onChange={(e) => dispatch({type: 'POST_OWNER_ID', value: e.target.value})}
      />
       <input label="post UserName" 
      placeholder="Post UserName" 
      value={postOwnerUsername} 
      onChange={(e) => dispatch({type: 'POST_OWNER_UName', value: e.target.value})}
      />
      <button onSubmit={savePost}>Submit</button>
    </form>
    </div>
  );
}

export default withAuthenticator(App);
