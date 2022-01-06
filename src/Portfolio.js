import React from 'react'
import Portfolio from "../src/layout/assets/portfolio.jpeg"
import { Icon } from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';

export default function PortfolioX(props) {
  const style = {
    background: "#fff",
    borderRadius: "100%"
  }
  return (
    <div>
      <Icon>
        <EditIcon />
      </Icon>
    </div>
  )
}
