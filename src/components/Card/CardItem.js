import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import './CardItem.css'



function CardItem({data, cityName, badge}) {
  const [imgSrc, setImgSrc] = useState('')
  const date = new Date().toLocaleString('fi-FI').slice(0, 10);

  useEffect(() => {    
    if(data) {
      const imgCode = data.WeatherIcon;
      setImgSrc(`./img/${imgCode}-s.png`) 
    }
  },[data])
  if(data) {
      return (
        <Card className='card' style={{ width: '18rem' }}>
          <Card.Body>
            <p style={{ fontSize: '12px'}}>{date}</p>
            <Card.Title className='weather-title'>{cityName}<Badge className="city-badge" pill bg="info">{badge}</Badge></Card.Title>
            <h3 className='weather-temp'>
               <span>{data.Temperature.Metric.Value}&#8451;</span>
            </h3>
            <img className="weather-icon" src={imgSrc} alt="weather icon" />
            <h6 className='weather-text'>{data.WeatherText}</h6>
          </Card.Body>
        </Card>
      );  
    } 
  }
  
  export default CardItem;