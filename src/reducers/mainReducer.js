import { API, graphqlOperation } from 'aws-amplify';
import { deletePost } from '../graphql/mutations';

export const initialState = {
    id: '',
    postBody: '',
    postTitle: '',
    postOwnerId: '',
    postOwnerUsername: '',
    createdAt: '',
    isModalOpen: false,
    posts: []
  }

  async function deletePostById(id) {
    const result = await API.graphql(
      graphqlOperation(deletePost, { input: { id }})
    );
    console.log('Deleted: ', result);
  }
  
  export default function postReducer(state = initialState, action){
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
        console.log("edit action value:", action.value)
        const newValue = {...action.value}
        console.log("newValue here:", newValue)
        return {
          ...state,
          isModalOpen: true,
          // id: newValue.id,
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