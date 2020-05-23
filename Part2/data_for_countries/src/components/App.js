
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Countries from './Countries'

function App() {

    const [countries,setCountries] = useState([])
    const [filterName,setFilterName] = useState('')
    

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
        .then(response =>
            {
                setCountries(response.data)
            })
    }, [])

    const onCountryChange = (event) =>
    {
        setFilterName(event.target.value)
    }


    return (
        <div>
            find countries <input onChange= {onCountryChange}/>
            <Countries countries= {countries} filterName={filterName}/>
        </div>
    )
}

export default App
