import React, { useEffect, useState } from 'react';
import { listPosts } from '../graphql/queries';
// import { createPost } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import Post from './Post';
// import { onCreatePost } from '../src/graphql/subscriptions';

const DisplayPosts = ({state,
   posts,
    dispatch}) => {
  // const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data } = await API.graphql(graphqlOperation(listPosts));
    // setPosts(data.listPosts.items);
    dispatch({type: 'UPDATE_POSTS', value: data.listPosts.items})
    console.log('Display All posts: ', data.listPosts.items);
  };

  useEffect(() => {
    getPosts();
  }, []);

  // useEffect(() => {
  //   let subscription = API.graphql(graphqlOperation(onCreatePost))
  // })
 
  return <div>

    {posts.map(item => 
    
    <Post key={item.id} {...item} dispatch={dispatch} />
 
    )}
    {/* <PostsForm /> */}
  
</div>;
};
 
export default DisplayPosts;