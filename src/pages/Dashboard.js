import React from 'react'
import NavLinks from "../layout/NavLinks"
import CustomCard from "../components/CustomCard"
import Grid from "@material-ui/core/Grid"

export default function Dashboard() {
    const { data } = NavLinks;
    return (
        <Grid container spacing={3} >
            {data.map(item => (
                <CustomCard key={item.name} card={item} />
            ))}
        </Grid>
    )
}
