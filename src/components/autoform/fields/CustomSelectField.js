import React from 'react'
import { TextField } from "@material-ui/core";

// export default function CustomSelectField({}) {
//   return (
//     <div>
      
//     </div>
//   )
// }
export const CustomSelectField = ({formik, fieldProps, fieldDefaults}) => {
    const { error, touched} = formik.getFieldMeta(fieldProps.id)
    const { options, ...props} = fieldProps;
  return (
    <TextField
      select
      SelectProps={{native: true}}
      {...formik.getFieldProps(fieldProps.id)}
      {...fieldDefaults}
      {...props}
      error={touched && Boolean(error)}
      helperText={touched && error}
    >
        <option key="default_value" arial-label="None" value="" />
        {
            options?.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.display}
                </option>
            ))
        }
    </TextField>
  )
}
