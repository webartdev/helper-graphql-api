import React from 'react'
import Typography from "@material-ui/core/Typography";

export default function Title(props) {
  return (
    <Typography color="secondary" gutterBottom variant="h6">
      {props.children}
    </Typography>
  )
}
