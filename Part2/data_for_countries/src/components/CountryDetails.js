import React,{useState,useEffect} from 'react'
import axios from 'axios'

function CountryDetails({country}) {

    const [weather_info,setWeather] = useState('')
    const api_key = process.env.REACT_APP_WEATHER_KEY
    const base_url = "http://api.weatherstack.com/current"

    useEffect(() => {
        axios.get(`${base_url}?access_key=${api_key}&query=${country.capital}`)
        .then(response => setWeather(response.data.current))
    }, [api_key, country.capital])

    return (
        <div>
            <h1> <b> {country.name} </b>  </h1>
            <p> capital {country.capital}</p>
            <p> population {country.population}</p>
            <h1> <b>Spoken languages </b>  </h1>
            <ul>
                {
                    country.languages.map(language =>
                    <li key={language.name}>{language.name}</li>)
                }
            </ul>
            <img src = {country.flag} alt="Flag of the country " width = "120" height = "90" />
            <h1> <b>Weather in {country.capital} </b></h1>
            <p> <b>temperature</b> : {weather_info.temperature} Celsius</p>
            <img src={weather_info.weather_icons} alt='Weather Condition' />
            <p> <b>wind</b> : {weather_info.wind_speed} mph direction {weather_info.wind_dir}</p>
        </div>
    )
}

export default CountryDetails
