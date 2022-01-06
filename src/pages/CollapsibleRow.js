import React from 'react'
import Box from "@material-ui/core/Box";

 const CollapsibleRow = ({rowData}) => {
    // console.log("rowData", rowData)
  return (
    // console.log("rowData", rowData),
    <Box margin={1} border={0} borderLeft={3} pt={1}>
      <div>
         <span>ID:</span> <span>{rowData.id}</span>
      </div>
      <div>
         <span>Post Title:</span> <span>{rowData.postTitle}</span>
      </div>
      <div>
         <span>Post owner ID:</span> <span>{rowData.postOwnerId}</span>
      </div>
    </Box>
  )
}
export default CollapsibleRow
