import React from 'react'
import Box from "@material-ui/core/Box";

export default function CollapsibleRow({rowData}) {
    console.log("rowData", rowData)
  return (
    <Box margin={1} border={0} borderLeft={3} pt={1}>
      <div>
          This is a collapsible row
         {/* <span>ID:</span> <span>{rowData.id}</span> */}
      </div>
      <div>
         {/* <span>Details:</span> <span>{rowData.postTitle}</span> */}
      </div>
    </Box>
  )
}
