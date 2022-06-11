import {useEffect, useState} from 'react'

export const ShowMoreHook = ({allItems}) => {
    const [dataArray, setDataArray] = useState([]);
    const [visible, setVisible] = useState(3);
    
    const allData = async () => {
        setDataArray(allItems);
      };
    
      const loadMore = () => {
        setVisible(visible + 3);
      };
    
      useEffect(() => {
        allData();
      }, []);

 return {loadMore, dataArray, visible }
}