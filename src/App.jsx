import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react'
import errorImage from './images/error.webp'

function App() {

  const [weatherData, setWeatherData] = useState('')
  const [city, setCity] = useState('karachi')
  const [input, setInput] = useState('')
  const [callApi, setCallApi] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(input);

    if (!input) {
      alert('empty')
    }

    setCallApi(!callApi);
  }

  useEffect(() => {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${input ? input : city}&appid=a67592788273a59bb8ce64b07673953b&units=metric`)
      .then(resolve => {
        setWeatherData(resolve.data)


        // Date and time (incorrect data in api, one day forward)
        // var utcSeconds = resolve.data.timezone
        // var utcToSimpleTimeZone = utcSeconds * 1000;
        // var today = utcToSimpleTimeZone + Date.now()
        // var d = new Date(today); 
        // console.log(d);

      })

      .catch(err => {
        console.log(err);
        setError(err)
      })
  }, [callApi])


  let date = new Date()

  return (
    <div className="App">
      {!weatherData ?

        <div className='data-container'>
          <h3 style={{ textAlign: 'center' }}>Loading...</h3>
        </div>

        :

        !error ?

          <div>
            <form onSubmit={handleSubmit}>
              <input onChange={(e) => setInput(e.target.value)} placeholder='Search weather by city' />
            </form>

            <div className='data-container'>
              <div className='data-inner-container-one' >
                <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
                <p style={{ marginTop: '-20px' }}>{weatherData.weather[0].main}</p>
                <h1>{weatherData.main.temp} °C</h1>
                <p> Humidity: {weatherData.main.humidity}%</p>
              </div>

              <div className='data-inner-container-two' >
                <h3>{weatherData.name}, {weatherData.sys.country}</h3>
                <p>{date.toDateString()}</p>
                <p> {date.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>

          :
          
          <div className='data-container'>
            <h2>PAGE NOT FOUND </h2>
          </div>


      }
    </div>
  );
}

export default App;
