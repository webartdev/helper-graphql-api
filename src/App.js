import React, { useReducer, useEffect } from 'react';
import './App.css';
import { API, graphqlOperation } from 'aws-amplify';
import { createPost, deletePost } from '../src/graphql/mutations';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import DisplayPosts from './components/DisplayPosts';
import DisplayTable from './components/DisplayTable';
import PostsForm from "./components/PostsForm";
import { onCreatePost } from '../src/graphql/subscriptions';
import { Modal, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  paper: {
      width:400,
      height: 1000,
      backgroundColor: '#ffffff',
  }
}))

const initialState = {
  id: '',
  postBody: '',
  postTitle: '',
  postOwnerId: '',
  postOwnerUsername: '',
  createdAt: '',
  isModalOpen: false,
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
    case 'OPEN_MODAL':
        return {...state, isModalOpen: true}
    case 'CLOSE_MODAL':
      return {
        ...state, 
        isModalOpen: false, 
        postBody: '',
        postTitle: '',
        postOwnerId: '',
        postOwnerUsername: ''
      }
    case 'EDIT_POST': { 
      const newValue = {...action.value}
      console.log("newValue here:", newValue)
      return {
        ...state,
        id: newValue.id,
        postOwnerUsername: newValue.postOwnerUsername,
        postOwnerId: newValue.postOwnerId,
        postTitle: newValue.postTitle,
        postBody: newValue.postBody,
      }}
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
  const classes = useStyles();
  const [state, dispatch] = useReducer(postReducer, initialState)
  useEffect(() => {
    let subscription = API.graphql(
      graphqlOperation(onCreatePost)).subscribe({
      next: ({provider, value}) => {
      // console.log("provider value", value);
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
    // console.log('Save post result: ', result);
    dispatch({type: 'CLOSE_MODAL'})
  }

  return (
    <div>
      <AmplifySignOut />
      <header className="App-header">
        <h2>Amplify Demo</h2>
      </header>
      <div className="AppBody">
      <button onClick={() => dispatch({type: 'OPEN_MODAL'})}><span>+</span></button>
      <Modal open={state.isModalOpen}>
        <div className={classes.paper}>
         <h2>Create a new record</h2>
         <PostsForm savePost={savePost} state={state} dispatch={dispatch} />
            <Button 
                color="secondary" 
                variant="contained" 
                fullWidth 
                type="submit" 
                onClick={() => dispatch({type: 'CLOSE_MODAL'})}
            >
              Cancel
            </Button>
        </div>
      </Modal>
  
      <DisplayTable dispatch={dispatch} />

      <DisplayPosts posts={state.posts} dispatch={dispatch} />
      <br /><hr />
    </div>
  </div>
  );
}

export default withAuthenticator(App);
