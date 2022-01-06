import React, {useEffect} from 'react'
import { TextField, Button } from "@material-ui/core"
import { shared, getFieldData } from "./autoform/PostFormOptions"
import { useFormik } from "formik";
import * as yup from "yup";
import { ACTIONS } from '../reducers/modalReducer';
import Autoform from "./autoform/autoform"
import ModalNew from '../components/modal/ModalNew';

const validationSchema = yup.object({
  postBody: yup.string().required(),
  postTitle: yup.string().required(),
  postOwnerId: yup.string().required(),
  postOwnerUsername: yup
    .string("Enter your postOwnerUsername")
    .required("postOwnerUsername is required")
});

const PostsForm = ({ state, dispatch, create, update, handleClose }) => {
  console.log("form state.modalType", state.modalType)
  const formik = useFormik({
    initialValues: state.formValues,
    validationSchema: shared.validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch({ type: ACTIONS.CLOSE_MODAL });
      state.modalType === "create" ? create.mutate(values) : update.mutate(values)
      resetForm()
    }
  });
 
  // useEffect(() => {
  //   // console.log("state.modalType", state.modalType)
  //   if (state.modalType === 'update') {
  //     formik.setValues({
  //       id: state.formValues.id,
  //       postBody: state.formValues.postBody,
  //       postTitle: state.formValues.postTitle,
  //       postOwnerId: state.formValues.postOwnerId,
  //       postOwnerUsername: state.formValues.postOwnerUsername
  //     })
  //   }
  // })
  const fieldData = getFieldData(state);
  const fieldDefaults ={
    fullWidth: true,
    variant: "outlined"
  }
  const gridContainer ={
    spacing: 1
  }
  const gridDefaults = { xs: 12}
  const title = state.modalType === "create" ? "Create Post" : "Update Post"
  // const title = state.modalType = "create" 

  return (
    <ModalNew
        open={state.isModalOpen}
        handleClose={handleClose}
        title={title}
      >
   <Autoform
     formik={formik}
     itemProps={fieldData}
     fieldDefaults={fieldDefaults}
     gridContainer={gridContainer}
     gridDefaults={gridDefaults}
    />
    </ModalNew>
    // <form onSubmit={formik.handleSubmit}>
    //   <TextField
    //     autocomplete="off"
    //     variant="outlined"
    //     fullWidth
    //     id="postBody"
    //     label="post Body"
    //     name="postBody"
    //     error={true ? false : formik.touched.postBody && Boolean(formik.errors.postTitle)}
    //     helperText={formik.touched.postBody ? formik.errors.postBody : ""}
    //     value={state.postBody}
    //     // onChange={(e) => formik.handleChange && dispatch({ type: 'POST_BODY', value: e.target.value })}
    //   />
    //   <br />
    //   <TextField
    //     autocomplete="off"
    //     variant="outlined"
    //     fullWidth
    //     id="postTitle"
    //     name="postTitle"
    //     label="post Title"
    //     placeholder="Post Title"
    //     value={state.postTitle}
    //     // onChange={(e) => dispatch({ type: 'POST_TITLE', value: e.target.value })}
    //     error={true ? false : formik.touched.postTitle && Boolean(formik.errors.postTitle)}
    //   />
    //   <br />
    //   <TextField
    //     fullWidth
    //     variant="outlined"
    //     id="postOwnerId"
    //     name="postOwnerId"
    //     label="postOwnerId"
    //     placeholder="Post Owner"
    //     value={state.postOwnerId}
    //     // onChange={(e) => dispatch({ type: 'POST_OWNER_ID', value: e.target.value })}
    //     error={true ? false : formik.touched.postOwnerId && Boolean(formik.errors.postTitle)}
    //   />
    //   <br />
    //   <TextField
    //     fullWidth
    //     variant="outlined"
    //     id="postOwnerUsername"
    //     name="postOwnerUsername"
    //     label="post UserName"
    //     placeholder="Post UserName"
    //     value={state.postOwnerUsername}
    //     // onChange={(e) => dispatch({ type: 'POST_OWNER_UName', value: e.target.value })}
    //     error={true ? false : formik.touched.postTitle && Boolean(formik.errors.postTitle)}
    //   />
    //   <br />

    //   <Button
    //     color="primary"
    //     variant="contained"
    //     fullWidth
    //     type="submit"
    //     onClick={savePost}
    //   >Submit</Button>
    // </form>
  )
}

export default PostsForm
