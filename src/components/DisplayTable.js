import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from '../graphql/queries';
import { onDeletePost} from "../graphql/subscriptions";
import { updatePost } from '../graphql/mutations';

const DisplayTable = props => {
  const {posts, state, dispatch, id, postBody, postOwnerId, 
    postOwnerUsername, postTitle, createdAt} = props;

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
  const [data, setData] = useState([]);
  const getPosts = async () => {
    const result= await API.graphql(graphqlOperation(listPosts));
    // setPosts(result.data.listPosts.items);
    // dispatch({type: 'UPDATE_POSTS', value: result.data.listPosts.items})
    console.log('Display All posts: ', result.data.listPosts.items);
    setData(result.data.listPosts.items)
  };
  
  useEffect(() => {
    getPosts();
  }, []);

  const defaultOptions = {
    options: {
      sorting: true,
      filtering: true,
      grouping: true,
      padding: "dense",
      pageSize: 6,
      pageSizeOptions: [6,10,20,50,100,200,500],
      paginationPosition: "both",
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
  return (
    // <MaterialTable
    //   title="Demo Table"
    //   columns={[
    //     { title: 'ID', field: 'id' },
    //     { title: 'Post Title', field: 'postTitle' },
    //     { title: 'Created At', field: 'createdAt'},
    //     { title: 'Post Body', field: 'postBody' },
    //     { title: 'Post Owner Id', field: 'postOwnerId', type: 'numeric' },
    //     { title: 'Post Owner Username', field: 'postOwnerUsername' },
    //   ]}
    //   data={data}     
    //   options={defaultOptions.options}
    //   actions={[
    //     {
    //       icon: 'add',
    //       tooltip: 'Add User',
    //       isFreeAction: true,
    //       onClick: (event) => alert("You want to add a new row")
    //     }
    //   ]}
    //   editable={{
    //     onRowAdd: newData =>
    //         new Promise((resolve, reject) => {
    //             setTimeout(() => {
    //                 /* setData([...data, newData]); */

    //                 resolve();
    //             }, 1000);
    //         }),
    //     onRowUpdate: (newData, oldData) =>
    //         new Promise((resolve, reject) => {
    //             setTimeout(() => {
    //                 const dataUpdate = [...data];
    //                 const index = oldData.tableData.id;
    //                 dataUpdate[index] = newData;
    //                 setData([...dataUpdate]);

    //                 resolve();
    //             }, 1000);
    //         }),
    //     onRowDelete: oldData =>
    //         new Promise((resolve, reject) => {
    //             setTimeout(() => {
    //                 const dataDelete = [...data];
    //                 const index = oldData.id;
    //               console.log("id", oldData.id)
    //                 dataDelete.splice(index, 1);
    //                 dispatch({type:'DELETE_POST', value: index})
    //                 resolve();
    //             }, 1000);
    //         })
    // }}
    // />
    <MaterialTable
      title="Editable Preview"
      columns={defaultOptions.columns}
      options={defaultOptions.options}
      data={data}
      editable={{
        // onRowAdd: newData =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       setData([...data, newData]);
              
        //       resolve();
        //     }, 1000)
        //   }),
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
