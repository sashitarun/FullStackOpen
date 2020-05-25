
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Countries from './Countries'
import Display from './Display'

function App() {

    const [countries,setCountries] = useState([])
    const [filterName,setFilterName] = useState('')
    const [toDisplay,setToDisplay] = useState(false)
    const [showCountry,setShowCountry] = useState('')

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
        .then(response =>
            {
                setCountries(response.data)
            })
    }, [])

    const displayCountry = (country) =>
    {
       // console.log(country)
        setToDisplay(true)
        setShowCountry(country)
    }

    const onCountryChange = (event) =>
    {
        
        setFilterName(event.target.value)
        setToDisplay(false)
    }


    return (
        <div>
            find countries <input onChange= {onCountryChange}/>
            <Countries countries= {countries} filterName={filterName} displayCountry={displayCountry}/>
            <Display toDisplay={toDisplay} showCountry={showCountry}/>
        </div>
    )
}

export default App
