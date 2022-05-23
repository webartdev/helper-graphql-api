import React,{useState, useEffect} from "react";
import {
  slice, concat, 
} from 'lodash';
import axios from "axios";

import "./styles.css";
import Card from "@material-ui/core/Card";

const IMAGE_SRC="https://source.unsplash.com/random";
// console.log("IMAGE_SRC", IMAGE_SRC)

const Pagination = () => {
    const [cardData, setCardData] = useState([]);
    const [visible, setVisible] = useState(5);
    const allCardData = async () => {
        const response = await axios.get("https://randomuser.me/api/?results=35");
        setCardData(response.data.results);
      };
    
      const loadMore = () => {
        setVisible(visible + 5);
      };
    
      useEffect(() => {
        allCardData();
      }, []);
    
      const renderCard = (person, index) => {
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={person.picture.large} />
            <Card.Body>
              <Card.Title>
                {person.name.first} {person.name.last}
              </Card.Title>
              <Card.Text>
                <ul>
                  <li>{person.email}</li>
                  <li>{person.cell}</li>
                  <li>{person.gender}</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        );
      };
    
      return (
        <div className="App">
          <div className="wrapper">
            <div className="cards">
              {cardData.slice(0, visible).map(renderCard)}
            </div>
          </div>
          {visible < cardData.length && (
            <button onClick={loadMore}>Load 5 More</button>
          )}
        </div>
      );
    };

export default Pagination;
