import React from 'react'

function Post({id, dispatch, postBody, postOwnerId, postOwnerUsername, postTitle, createdAt}) {
  return (
    <div>
      <h6>{postBody} {postOwnerId} {postOwnerUsername} 
      {new Date(createdAt).toDateString()} 
       {postTitle}
       <button onClick={() => dispatch({type:'DELETE_POST', value: id})}>DELETE</button>
       </h6>
    </div>
  )
}

export default Post
