import React, { useState, useEffect, useRef } from 'react'
import MaterialTable from 'material-table';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from '../graphql/queries';
import { onDeletePost, onCreatePost } from "../graphql/subscriptions";
import { updatePost } from '../graphql/mutations';
import { CircularProgress } from "@material-ui/core"

const DisplayTable = props => {
  const {posts, state, dispatch, id, postBody, postOwnerId, 
    postOwnerUsername, postTitle, createdAt} = props;

  const [data, setData] = useState([]);

    // useEffect(() => {
    //   let subscription = API.graphql(
    //     graphqlOperation(onCreatePost)).subscribe({
    //     next: ({provider, value}) => {
    //     // console.log("provider value", value);
    //     dispatch({type: 'UPDATE_POSTS', value: [value.data.onCreatePost]});
    //   },
    // });
    // return () => subscription.unsubscribe();
    // }, [])

//   async function editPost() {
//     const {id, postBody, postOwnerId, postOwnerUsername, postTitle} = state;
//     const result = await API.graphql(
//       graphqlOperation(updatePost, { input: { id, postBody, postOwnerId, postOwnerUsername, postTitle }})
//     );
//     console.log('Updated: ', result);
//   }

//not correct to check
      // useEffect(() => {
      //   let subscription = API.graphql(graphqlOperation(onDeletePost)).subscribe({
      //     next: ({provider, value}) => {
      //     console.log("provider value", value);
      //     dispatch({type: 'UPDATE_POSTS', value: id});
      //   },
      // });
      // return () => subscription.unsubscribe();
      // }, [])
    
  // return (
  //   <div>
  //     <h6>{postBody} {postOwnerId} {postOwnerUsername} 
  //     {new Date(createdAt).toDateString()} 
  //      {postTitle}
  //      <button onClick={() => dispatch({type:'DELETE_POST', value: id})}>DELETE</button>
  //      </h6>
  //   </div>
  // )

  const tablePageSize = 5

  const defaultOptions = {
    options: {
      sorting: true,
      filtering: true,
      grouping: true,
      padding: "dense",
      pageSize: tablePageSize,
      pageSizeOptions: [5,10,20, { value: data.length, label: 'All' }],
      // paginationPosition: "both",
      actionsColumnIndex:-1,
      addRowPosition:"first",
      awareOfUnicodeTokens: true
    },
    columns:[
        { title: 'ID', field: 'id' },
        { title: 'Post Title', field: 'postTitle' },
        { title: 'Created At', field: 'createdAt', type: 'date', format: 'dd/MM/yy'},
        { title: 'Post Body', field: 'postBody' },
        { title: 'Post Owner Id', field: 'postOwnerId', type: 'numeric' },
        { title: 'Post Owner Username', field: 'postOwnerUsername' },
    ]
  }

  // const tableRef = useRef(null)

  // const newPageSize = 10

  // useEffect(() => {
  //   tableRef.current.dataManager.changePageSize(newPageSize)
  // }, [])

  const getPosts = async () => {
    const result= await API.graphql(graphqlOperation(listPosts));
    // setPosts(result.data.listPosts.items);
    // dispatch({type: 'UPDATE_POSTS', value: result.data.listPosts.items})
    console.log('Display All posts: ', result.data.listPosts.items);
    // setData(result.data.listPosts.items)
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData(result.data.listPosts.items)

                    resolve();
                }, 1000);
              })
    
  };
  
  useEffect(() => {
    getPosts();
  }, []);

  return (
   
    <MaterialTable
      // tableRef={tableRef}
      title="Post Records"
      columns={defaultOptions.columns}
      options={defaultOptions.options}
      data={data}
      localization={{
        body: {
          emptyDataSourceMessage: (
            <>
             <h3>Loading ...</h3>
             <CircularProgress color="primary" />
            </>
          )
        }
      }}
      editable={{
          onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              dispatch({type:'EDIT_POST', value: index})
              resolve();
            }, 1000)
          }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.id;
                  console.log("id", oldData.id)
                    dataDelete.splice(index, 1);
                    dispatch({type:'DELETE_POST', value: index})
                    resolve();
                }, 1000);
            })
      }}
    />
  )
}

export default DisplayTable
