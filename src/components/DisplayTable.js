
import React from 'react'
import { CircularProgress, Button } from "@material-ui/core"
import { ACTIONS } from '../reducers/modalReducer'
import GeneralTable from "./GeneralTable"
import CollapsibleRow from '../pages/CollapsibleRow'

const AddNew = () => {
  return (
    <Button color="primary" variant="outlined">Add New Post</Button>
  )
}

const DisplayTable = ({dispatch, data, isLoading}) => {
  const relevantData = data?.data.listPosts.items

  const tablePageSize = 5
  
  const actions = [
    {
      icon: () => <AddNew />,
      tooltip: "Add New Post",
      isFreeAction: true,
      onClick: (rowData) => {
        dispatch({type: ACTIONS.MODAL_TYPE, payload: "create"})
        dispatch({type: ACTIONS.OPEN_MODAL})
      }
    },
    // {
    //   icon: "edit",
    //   tooltip: "Edit Post",
    //   onClick: (rowData) => {
    //     console.log("ACTIONS.FORM_VALUES", ACTIONS.FORM_VALUES)
    //     dispatch({type: ACTIONS.FORM_VALUES, payload: rowData})
    //     dispatch({type: ACTIONS.MODAL_TYPE, payload: "update"})
    //     dispatch({type: ACTIONS.OPEN_MODAL})
    //   }
    // }
  ]

  const defaultOptions = {
    options: {
      sorting: true,
      filtering: true,
      grouping: true,
      padding: "dense",
      pageSize: tablePageSize,
      pageSizeOptions: [5, 10, 20, 
        { value: relevantData && relevantData.length, label: 'All' }
      ],
      paginationPosition: "both",
      // actionsColumnIndex: -1,
      addRowPosition: "first",
      awareOfUnicodeTokens: true
    },
    columns: [
      { title: 'ID', field: 'id', hidden: true, editable: "never" },
      { title: 'Post Title', field: 'postTitle' },
      { title: 'Created At', field: 'createdAt', type: 'date', format: 'dd/MM/yy' },
      { title: 'Post Body', field: 'postBody' },
      { title: 'Post Owner Id', field: 'postOwnerId', type: 'numeric' 
    },
      { title: 'Post Owner Username', field: 'postOwnerUsername' },
    ]
  }

  return (
    <GeneralTable
     detailPanelType="single"
     detailPanel={(rowData) => {
      //  console.log("rowData", rowData)
       return <CollapsibleRow {...rowData}/>
     }}
      title="Post Records"
      columns={defaultOptions.columns}
      options={defaultOptions.options}
      data={relevantData || []}
      actions={actions}
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
      // editable={{
      //   onRowUpdate: (newData, oldData) =>
      //     new Promise((resolve, reject) => {
      //       setTimeout(() => {
      //         const dataUpdate = [...data];
      //         const index = oldData.id;
      //         dataUpdate[index] = newData;
      //         // setData([...dataUpdate]);
      //         dispatch({ type: 'EDIT_POST', value: index })
      //         resolve();
      //       }, 1000)
      //     }),
      //   onRowDelete: oldData =>
      //     new Promise((resolve, reject) => {
      //       setTimeout(() => {
      //         const dataDelete = [...data];
      //         const index = oldData.id;
      //         console.log("id", oldData.id)
      //         dataDelete.splice(index, 1);
      //         dispatch({ type: 'DELETE_POST', value: index })
      //         resolve();
      //       }, 1000);
      //     })
      // }}
    />
  )
}

export default DisplayTable
