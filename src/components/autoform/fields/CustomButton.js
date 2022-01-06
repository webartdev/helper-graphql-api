import React from 'react'
import { Button } from "@material-ui/core";

export const CustomButton = ({ text, ...props}) =>  {
  return (
  <Button {...props}>{text}</Button>
  )
}
