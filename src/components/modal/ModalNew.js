import React, { useState } from 'react'
import { Modal, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#ffffff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outile: "none"
  }
}))
function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

export default function ModalNew({
  open, handleClose, title, children
}) {
  const [modalStyle] = useState(getModalStyle)
  const classes = useStyles();

  return (
    <Modal open={open}>
      <div className={classes.paper} style={modalStyle}>
        <div>{title}</div>
        {children}
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          type="submit"
          onClick={() => handleClose()}
        >
          Cancel
            </Button>
      </div>
    </Modal>
  )
}
