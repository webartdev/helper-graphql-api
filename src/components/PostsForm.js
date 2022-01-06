import React, { useEffect } from 'react'
import { shared, getFieldData } from "./autoform/PostFormOptions"
import { useFormik } from "formik";
import { ACTIONS } from '../reducers/modalReducer';
import Autoform from "./autoform/autoform"
import ModalNew from '../components/modal/ModalNew';

const PostsForm = ({ state, dispatch, create, update, handleClose }) => {
  // console.log("form state.modalType", state.modalType)
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
  //   console.log("state.modalType", state.modalType)
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
  )
}

export default PostsForm
