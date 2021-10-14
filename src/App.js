import React, { useReducer, useEffect, useState } from 'react';
import './App.css';
import { API, graphqlOperation } from 'aws-amplify';
import { createPost, deletePost } from '../src/graphql/mutations';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import DisplayPosts from './components/DisplayPosts';
import { onCreatePost } from '../src/graphql/subscriptions';

const initialState = {
  postBody: "",
  postTitle: "",
  postOwnerId: "",
  postOwnerUsername: "",
  posts: []
}

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
    case 'UPDATE_POSTS':
      return { ...state, posts: [...action.value, ...state.posts]}
    case 'DELETE_POST':
      deletePostById(action.value);
      return {...state}
    default:
      console.log('Default action for: ', action)
    return state
  }
}
async function deletePostById(id) {
  const result = await API.graphql(
    graphqlOperation(deletePost, { input: { id }})
  );
  console.log('Deleted: ', result);
  }

function App() {
  const [state, dispatch] = useReducer(postReducer, initialState)

  useEffect(() => {
    let subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: ({provider, value}) => {
      console.log("provider value", value);
      dispatch({type: 'UPDATE_POSTS', value: [value.data.onCreatePost]});
    },
  });
  return () => subscription.unsubscribe();
  }, [])

  async function savePost() {
    const { postBody, postOwnerId, postOwnerUsername, postTitle  } = state;
    const result = await API.graphql(
      graphqlOperation(createPost, { input: {postBody, postTitle, postOwnerId, postOwnerUsername }})
    );

    console.log('Save post result: ', result);
  }

 
    // const savePost = async () => {
    //   const { postBody } = state;
    //   const result = await API.graphql(
    //     graphqlOperation(createPost, { input: postBody }));
    //   console.log('Save post result: ', result);
    // }
 


  

  // savePost = async () => {
  //   const { name, description } = this.state
  //   if (name === '' || description === '') return
  //   try {
  //     const restaurant = { name, description }
  //     const restaurants = [...this.state.restaurants, restaurant]
  //     this.setState({ restaurants, name: '', description: '' })
  //     await API.graphql(graphqlOperation(createPost, {input: restaurant}))
  //     console.log('restaurant successfully created!')
  //   } catch (err) {
  //     console.log('error: ', err)
  //   }
  // }

  return (
    <div>
      <AmplifySignOut />
      <header className="App-header">
        <h2>Amplify Demo</h2>
      </header>
      <button><span>+</span></button>
      <form>
      <input label="post Body" 
      placeholder="Post Body" 
      value={state.postBody} 
      onChange={(e) => dispatch({type: 'POST_BODY', value: e.target.value})}
      />
      <br/>
        <input label="post Title" 
      placeholder="Post Title" 
      value={state.postTitle} 
      onChange={(e) => dispatch({type: 'POST_TITLE', value: e.target.value})}
      />
      <br/>
      <input label="post owner" 
      placeholder="Post Owner" 
      value={state.postOwnerId} 
      onChange={(e) => dispatch({type: 'POST_OWNER_ID', value: e.target.value})}
      />
      <br/>
       <input label="post UserName" 
      
      placeholder="Post UserName" 
      value={state.postOwnerUsername} 
      onChange={(e) => dispatch({type: 'POST_OWNER_UName', value: e.target.value})}
      />
      <br/>
      <button 
      // onClick={savePost}
      onSubmit={savePost}

      >Submit</button>
    </form>
      <DisplayPosts posts={state.posts} dispatch={dispatch} />
 
    <div className="AppBody">This is a full-stack React app running on the cloud with Cognito, AppSync, GraphQL and DynamoDB.
      <br/>Used Amplify CI/CD for continues deployment.
      <h4>Github Source Repository: <a href="https://github.com/webartdev/helper-graphql-api/tree/master">webartdev/helper-graphql-api</a></h4>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
