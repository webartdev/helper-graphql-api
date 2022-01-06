

import React, { useReducer, useEffect } from 'react';
import DisplayTable from '../components/DisplayTable';
import { PostCRUD } from "./PostCRUD";
import postReducer, { initialState } from '../reducers/mainReducer';
import { updatePost } from '../graphql/mutations';
import { ACTIONS, ModalReducer } from '../reducers/modalReducer';
// import { onCreatePost } from '../graphql/subscriptions';

// import { API, graphqlOperation } from 'aws-amplify';
import PostsForm from "../components/PostsForm";
// import { createPost } from "../graphql/mutations";

export default function Posts() {
  const { query, create, update } = PostCRUD();
  // const [state, dispatch] = useReducer(postReducer, initialState)
  const [state, dispatch] = ModalReducer();
  // useEffect(() => {
  //   let subscription = API.graphql(
  //     graphqlOperation(onCreatePost)).subscribe({
  //       next: ({ provider, value }) => {
  //         // console.log("provider value", value);
  //         dispatch({ type: 'UPDATE_POSTS', value: [value.data.onCreatePost] });
  //       },
  //     });
  //   return () => subscription.unsubscribe();
  // }, [])
  // async function create() {
  //   const { postBody, postOwnerId, postOwnerUsername, postTitle } = state;
  //   const result = await API.graphql(
  //     graphqlOperation(createPost, { input: { postBody, postTitle, postOwnerId, postOwnerUsername } })
  //   );
  //   console.log('Save post result: ', result);
  //   dispatch({ type: 'CLOSE_MODAL' })
  // }
  const handleClose = () => {
    // dispatch({ type: "CLOSE_MODAL" })
    dispatch({ type: ACTIONS.CLOSE_MODAL })
  }
  //   useEffect(() => {
  //   let subscription = API.graphql(
  //     graphqlOperation(onCreatePost)).subscribe({
  //     next: ({provider, value}) => {
  //     // console.log("provider value", value);
  //     dispatch({type: 'UPDATE_POSTS', value: [value.data.onCreatePost]});
  //   },
  // });
  // return () => subscription.unsubscribe();
  // }, [])

    // async function update() {
    //   const {id, postBody, postOwnerId, postOwnerUsername, postTitle} = state;
    //   const result = await API.graphql(
    //     graphqlOperation(updatePost, { input: { id, postBody, postOwnerId, postOwnerUsername, postTitle }})
    //   );
    //   console.log('Updated: ', result);
    // }
  return (
    <div
      className="AppBody" >
      {/* <button onClick={() =>
      //  dispatch({ type: "OPEN_MODAL" })
        dispatch({ type: ACTIONS.OPEN_MODAL })
      }><span>+ </span>Add New Record</button> */}
      
        <PostsForm
          // savePost={savePost}
          state={state}
          dispatch={dispatch}
          create={create} 
          update={update}
          handleClose={handleClose}
        />
 
      {/* <UploadImage /> */}
      <DisplayTable dispatch={dispatch} isLoading={query.isLoading} data={query.data} />
      <br />
    </div>
  )
}
