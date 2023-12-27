import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './api.css';
import { string } from 'prop-types';


const Api = ({setBg}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setshow] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setshow(false)

    
    if (cityName.trim() === '') {
      alert('Please enter a city name.');
      return;
    }
    setLoading(true);

    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=ef27647426a54ef7868173923232508&q=${cityName}&days=7&alerts=yes`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className='container'><img height='40px' className='loading' src='https://i.gifer.com/ZZ5H.gif' /></div>;
  }
  if (!weatherData) {
    return (
      <div>
        <div className='divPar'>
          <div>
            <h1 className='weather'>Weather Information</h1>
            <form onSubmit={handleSubmit}>
              <label className='enterInfo'>Enter City Name</label>
              <input className='input' value={cityName} onChange={(event) => setCityName(event.target.value)} />
              <button className='button' type="submit">Get Weather</button>
            </form>
            <p className='request'>Please enter a city name to get weather information.</p>
          </div>
        </div>
      </div>
    );
  }


  const handlebuttonClick = () => {
    setshow(true)
  }



  const { location, current, forecast } = weatherData;
  
  console.log(current.condition.text)

  
  if(current.condition.text.includes('cloudy')){
    setBg('url("https://images.freeimages.com/images/large-previews/294/partly-cloudy-1173077.jpg")')
  }

  if(current.condition.text.includes('rain')){
    setBg('url("https://i.ytimg.com/vi/ieULeXtyRms/maxresdefault.jpg")')
  }
  

  if(current.condition.text.includes('Mist')){
    setBg('url("https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWlzdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80")')
  }

  if(current.condition.text.includes('Sunny')){
    setBg('url("https://i2-prod.examinerlive.co.uk/incoming/article10372520.ece/ALTERNATES/s1227b/JS75768352.jpg")')
  }
  if(current.condition.text.includes('Clear')){
    setBg('url("https://i2-prod.examinerlive.co.uk/incoming/article10372520.ece/ALTERNATES/s1227b/JS75768352.jpg")')
  }

  const render=forecast.forecastday.map((item)=>{
    return <div className='days'> <b>{item.date}</b> <br/>  <label>Max temprature</label>{item.day.maxtemp_c}<br/> <label>Max temprature</label> {item.day.mintemp_c} <br/></div>
  })

return (
  <div>
    <div className='returns'>
      <div>
        {show ? <form onSubmit={handleSubmit}>
          <label>Enter City Name</label>
          <input value={cityName} onChange={(event) => setCityName(event.target.value)} />
          <button type="submit">Get Weather</button>
        </form> : (<><p>Location: {location.name}, {location.region}, {location.country}</p>

          <p>Temperature: {current.temp_c}°C</p>
          <p>Condition: {current.condition.text}</p></>)}

        {/* <p>Location: {location.name}, {location.region}, {location.country}</p>
          <p>Temperature: {current.temp_c}°C</p>
          <p>Condition: {current.condition.text}</p>
          */}

        <button className='button' onClick={handlebuttonClick}>search another city</button>
        <br/>
        <div className='moreinfo'>{render}</div>
          
        
      </div>
      
    </div>
    
    
  </div>
);}


export default Api;
