import React from 'react'
import NavLinks from "../layout/NavLinks"
import CustomCard from "../components/CustomCard"
import Grid from "@material-ui/core/Grid"
import {ShowMoreHook} from './ShowMoreHook'
import { Button } from "@material-ui/core"

export default function Dashboard() {
    const initialNumber = 3
    const { data } = NavLinks;
    const {loadMore, dataArray, visible} = ShowMoreHook({allItems: data})

    return (
        <Grid container spacing={3} >  
              {dataArray.slice(0, visible).map((item => (
                <CustomCard key={item.name} card={item} />
            )))}
       
          {visible < dataArray.length && (
              <Button color="primary" variant="outlined" style={{width: '200px', height: '50px', margin: '70px'}} onClick={loadMore}>Load {initialNumber} More</Button>
           )}
        </Grid>
    )
}
