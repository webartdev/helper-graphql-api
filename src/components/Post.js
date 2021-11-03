import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from '../graphql/queries';
import { onDeletePost} from "../graphql/subscriptions";
import { updatePost, deletePost } from '../graphql/mutations';

function Post(props) {
  const {state, dispatch, posts, id, postBody, postOwnerId, 
    postOwnerUsername, postTitle, createdAt} = props;
    async function editPost() {
      const {
        // id, 
        postBody, postOwnerId, postOwnerUsername, postTitle} = state;
      const result = await API.graphql(
        graphqlOperation(updatePost, 
          { input: 
            { 
              // id,
               postBody, postOwnerId, postOwnerUsername, postTitle }})
      );
      dispatch({type: 'CLOSE_MODAL'})
      console.log('Edited: ', result);
    }
  return (
    <div>
      <h6>{postBody} - {postOwnerId}  - {postOwnerUsername}  -
      {new Date(createdAt).toDateString()} 
       {postTitle}
       {/* <button onClick={() => dispatch({type:'EDIT_POST', value: id})}>EDIT</button> */}
       <button onClick={editPost}>EDIT</button>
       <button onClick={dispatch({type:'DELETE_POST'})}>Delete</button>
       </h6>
    </div>
  )

}
  // const {state, dispatch, posts, id, postBody, postOwnerId, 
  //   postOwnerUsername, postTitle, createdAt} = props;

  // async function editPost() {
  //   const {id, postBody, postOwnerId, postOwnerUsername, postTitle} = state;
  //   const result = await API.graphql(
  //     graphqlOperation(updatePost, { input: { id, postBody, postOwnerId, postOwnerUsername, postTitle }})
  //   );
  //   console.log('Updated: ', result);
  // }
    
  
  
export default Post
