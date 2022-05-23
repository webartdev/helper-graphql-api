import React, {useEffect, useState} from 'react'
// import NavLinks from "../layout/NavLinks"

export const ShowMoreHook = ({allItems}) => {
    const [dataArray, setDataArray] = useState([]);
    const [visible, setVisible] = useState(5);
    
    const allData = async () => {
        // const { data } = NavLinks;
        setDataArray(allItems);
      };
    
      const loadMore = () => {
        setVisible(visible + 5);
      };
    
      useEffect(() => {
        allData();
      }, []);

 return {loadMore, dataArray, visible }
}