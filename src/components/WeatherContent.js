import React, { useEffect, useState } from "react";
import axios from "axios";
import CardItem from './Card/CardItem';
import './WeatherContent.css'




const WeatherContent = ({ cityCode, cityName, badge}) => {
    const [cityData, setCityData] = useState(null)
    useEffect(() => {
        const apiKey = process.env.REACT_APP_API_KEY;
        if (cityCode) {
            axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=${apiKey}`)
            .then(response => {
                setCityData(response.data[0])
            })
        }
    }, [cityCode])

    return (
    <div className="weather-content-container"> 
        {cityData ? <CardItem badge={badge} data={cityData} cityName={cityName}/> : <div style={{color: '#fff'}}>Please enter a valid city name</div> }
    </div>
       
    )
};

export default WeatherContent