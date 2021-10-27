import React from 'react'
import { TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";


const validationSchema = yup.object({
  postBody: yup.string().required(),
  // postBody: yup
  //   .string("Enter your postBody")
  //   // .email("Enter a valid email")
  //   .required("postBody is required"),
  postTitle: yup.string().required(),
  postOwnerId: yup.string().required(),
  // postTitle: yup
  //   .string("Enter your postTitle")
  //   .min(8, "postTitle should be of minimum 8 characters length")
  //   .required("postTitle is required"),
  postOwnerUsername: yup
    .string("Enter your postOwnerUsername")
    .required("postOwnerUsername is required")
});

const PostsForm = ({state, dispatch, savePost}) => {
    const formik = useFormik({
    initialValues: { 
      postBody: "",
      postTitle: "",
      postOwnerId: "",
      postOwnerUsername: "",
      posts: []
    },
    validationSchema: validationSchema
  });

  return (
    <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          id="postBody"
          label="post Body" 
          name="postBody"
          error={true ? false : formik.touched.postBody && Boolean(formik.errors.postTitle) }

          // error={formik.touched.postBody || Boolean(formik.errors.postBody)}
          // helperText={formik.touched.postBody ? formik.errors.postBody: ""}
          value={state.postBody} 
          onChange={(e) => formik.handleChange && dispatch({type: 'POST_BODY', value: e.target.value})}
        />
        <br/>
        <TextField
          variant="outlined"
          fullWidth
          id="postTitle"
          name="postTitle"
          label="post Title" 
          placeholder="Post Title" 
          value={state.postTitle} 
          onChange={(e) => dispatch({type: 'POST_TITLE', value: e.target.value})}
          error={true ? false : formik.touched.postTitle && Boolean(formik.errors.postTitle) }
         
          // error={formik.touched.postTitle && Boolean(formik.errors.postTitle)}
          // helperText={formik.touched.postTitle ? formik.errors.postTitle: ""}
        />
        <br/>
        <TextField
          fullWidth
          variant="outlined"
          id="postOwnerId"
          name="postOwnerId"
          label="postOwnerId" 
          placeholder="Post Owner" 
          value={state.postOwnerId} 
          onChange={(e) => dispatch({type: 'POST_OWNER_ID', value: e.target.value})}
          error={true ? false : formik.touched.postOwnerId && Boolean(formik.errors.postTitle) }
          
          // error={formik.touched.postOwnerId && Boolean(formik.errors.postOwnerId)}
          // helperText={formik.touched.postOwnerId ? formik.errors.postOwnerId: ""}
        />
        <br/>
        <TextField
          fullWidth
          variant="outlined"
          id="postOwnerUsername"
          name="postOwnerUsername"
          label="post UserName" 
          placeholder="Post UserName" 
          value={state.postOwnerUsername} 
          onChange={(e) => dispatch({type: 'POST_OWNER_UName', value: e.target.value})}
          error={true ? false : formik.touched.postTitle && Boolean(formik.errors.postTitle) }
        />
        <br/>
   
      <Button 
         color="primary" 
         variant="contained" 
         fullWidth 
         type="submit" 
         onClick={savePost}
      >Submit</Button>
      </form>
  )
}

export default PostsForm