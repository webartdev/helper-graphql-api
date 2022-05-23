import React, {useEffect, useState} from 'react'
import NavLinks from "../layout/NavLinks"
import CustomCard from "../components/CustomCard"
import Grid from "@material-ui/core/Grid"
import axios from "axios";
import {ShowMoreHook} from './ShowMoreHook'

// import "./styles.css";
import Card from "@material-ui/core/Card";

export default function Dashboard() {
    // const initialNumber = 5
    // const [dataArray, setDataArray] = useState([]);
    // const [visible, setVisible] = useState(5);
    
    // const allData = async () => {
    //     const { data } = NavLinks;
    //     setDataArray(data);
    //   };
    
    //   const loadMore = () => {
    //     setVisible(visible + 5);
    //   };
    
    //   useEffect(() => {
    //     allData();
    //   }, []);
 
    const { data } = NavLinks;
    const {loadMore, dataArray, visible} = ShowMoreHook({allItems: data})
    
    return (
        <Grid container spacing={3} >
            {/* {data.map(item => (
                <CustomCard key={item.name} card={item} />
            ))} */}     
              {dataArray.slice(0, visible).map((item => (
                <CustomCard key={item.name} card={item} />
            )))}
       
          {visible < dataArray.length && (
             <button onClick={loadMore}>Load 5 More</button>
           )}
        </Grid>
    )
}
