import React, { useEffect, useState } from 'react';
import { listPosts } from '../graphql/queries';
import { createPost } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import PostsForm from './PostsForm';

const DisplayPosts = ({state, dispatch}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const result = await API.graphql(graphqlOperation(listPosts));
      setPosts(result.data.listPosts.items);
      console.log('Display All posts: ', result);
    };
 
    getPosts();
  }, []);

  // useEffect(() => {
  //   const createPost = async () => {
  //     const result = await API.graphql(graphqlOperation(createPost));
  //     setPosts(result.data.createPost.items);
  //     console.log('All post: ', result);
  //   };
 
  //   createPost();
  // }, []);

  // async function savePost() {
  //   const { postBody } = state;
  //   const result = await API.graphql(
  //     graphqlOperation(createPost, { input: postBody }));
  //   console.log('Save post result: ', result);
  // }
 
  return <div>
  <ul>
    {posts.map(item => 
    <li key={item.id}> 
    {/* {item.id} {item.createdAt}  */}
    {item.postBody} {item.postTitle}
     {/* {item.postOwnerId} {item.postOwnerUsername} */}
     </li> 
    )}
    {/* <PostsForm /> */}
  </ul>
</div>;
};
 
export default DisplayPosts;