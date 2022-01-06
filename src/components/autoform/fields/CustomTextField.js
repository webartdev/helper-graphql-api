import React from 'react'
import { TextField } from "@material-ui/core";

export const CustomTextField = ({formik, fieldProps, fieldDefaults}) => {
    const { error, touched} = formik.getFieldMeta(fieldProps.id)
  return (
    <TextField
      {...formik.getFieldProps(fieldProps.id)}
      {...fieldDefaults}
      {...fieldProps}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  )
}
