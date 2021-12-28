

import React, { useReducer, useEffect } from 'react';
import DisplayTable from '../components/DisplayTable';
import postReducer, {initialState} from '../reducers/mainReducer';
import { onCreatePost } from '../graphql/subscriptions';
import ModalNew from '../components/modal/ModalNew';

import PostsForm from "../components/PostsForm";
// import { onCreatePost } from './graphql/subscriptions';
import { Modal, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { createPost } from "../graphql/mutations";
import { API, graphqlOperation } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
  paper: {
      width:400,
      height: 1000,
      backgroundColor: '#ffffff',
  }
}))

// const ModalNew = ({state, dispatch}) => {
//   const classes = useStyles();
//   async function savePost() {
//     const { postBody, postOwnerId, postOwnerUsername, postTitle  } = state;
//     const result = await API.graphql(
//       graphqlOperation(createPost, { input: {postBody, postTitle, postOwnerId, postOwnerUsername }})
//     );
//     // console.log('Save post result: ', result);
//     dispatch({type: 'CLOSE_MODAL'})
//   }
//   return (
//     <Modal open={state.isModalOpen}>
//         <div className={classes.paper}>
//          <h2>Create a new record</h2>
//          <PostsForm savePost={savePost} state={state} dispatch={dispatch} />
//             <Button 
//                 color="secondary" 
//                 variant="contained" 
//                 fullWidth 
//                 type="submit" 
//                 onClick={() => dispatch({type: 'CLOSE_MODAL'})}
//             >
//               Cancel
//             </Button>
//         </div>
//       </Modal>
//   )
// }


export default function Posts() {
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
  return (
    <div className="AppBody">
      <button onClick={() => dispatch({ type: 'OPEN_MODAL' })}><span>+ </span>Add New Record</button>
      <ModalNew state={state} dispatch={dispatch} />
      {/* <UploadImage /> */}
      <DisplayTable dispatch={dispatch} />
      <br />
    </div>

  )
}
