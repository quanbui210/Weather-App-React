import React, {useState, useEffect} from 'react'
import './App.css';
import Input from './components/Input/Input'
import WeatherContent from './components/WeatherContent'
import useFetch from './components/Hooks/useFetch'
import axios from 'axios';
import ModalShow from './components/Modal/ModalShow'
import Wrapper from './components/Helper/Wrapper'

function App() {
  const [enteredCity, setEnteredCity] = useState('')
  const [cityCode, setCityCode] = useState('')
  const [cityName, setCityName] = useState('')
  const [badge, setBadge] = useState('')
  const [latlng, setLatlng] = useState({})
  const {data, setData, setUrl} = useFetch()
  const [error, setError] = useState(true)
  const [show, setShow] = useState(false)
  
  const baseUrl = 'http://dataservice.accuweather.com'  

  const success = (position) => {
    setLatlng({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    })
  };

  // console.log(latlng)
  const errorCall = (error) => {
    console.log(error);
  };

 useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, errorCall);
 },[])
 
 const params = {
   access_key: process.env.REACT_APP_API_KEY,
   query: enteredCity
  }

  useEffect(() => {
    if(latlng.lat && latlng.lng) {
      axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${params.access_key}&q=${latlng.lat},${latlng.lng}`)
      .then(response => {
       setCityCode(response.data.Key)
       setCityName(response.data.LocalizedName)
       if (response.data.Country) {
        setBadge(response.data.Country.ID)
      }
      })
    }
  }, [latlng.lat, latlng.lng, params.access_key]);
  
  const handleInputChange = (e) => {
    setEnteredCity(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault();
    setUrl(`${baseUrl}/locations/v1/cities/search?apikey=${params.access_key}&q=${params.query}`) 
    if(enteredCity.trim().length === 0) {
      setError({
        title: 'Error',
        body: 'City name can not be empty'
        })
        setShow(true)
        return
    } 
    setEnteredCity('')
    setCityCode('')
  }
  
  useEffect(() => {
    if (data && data.length > 0) {   
        setCityCode(data[0].Key)
        setCityName(data[0].LocalizedName)
        if (data[0].Country) {
          setBadge(data[0].Country.ID)
        }
    }
  }, [data, setData])

  const handleClose = () => setError(null);

  return (
    <Wrapper>
      {error && <ModalShow onShow={show} error = {error} onHide={handleClose}/>}
      
      <div className="input-container">
        <Input value={enteredCity} onClick={handleClick} onChange={handleInputChange} />
      </div>

      {data && <WeatherContent setData={setData} badge={badge}  cityCode={cityCode} cityName={cityName}/>}
    </Wrapper>
  );
}

export default App;


 // useEffect(() => {
  //   const params = {
  //     access_key: process.env.REACT_APP_API_KEY,
  //     query: enteredCity
  //   }
  //   axios
  //   .get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${params.access_key}&q=${params.query}`)
  //   .then(response =>{
  //     let apiResponse = response.data;
  //     setCityCode(apiResponse[0].Key)
  //   })
  //   .catch(err => console.log(`ERROR: ${err}`))
  // }, [enteredCity, cityCode]);

  //  useEffect(() => {
  //    const params = {
  //      cityCode: cityCode,
  //      access_key: process.env.REACT_APP_API_KEY,
  //  }
  //  console.log(params.cityCode)
  //    axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${params.cityCode}?apikey=${params.access_key}`)

  //  }, [cityCode])
