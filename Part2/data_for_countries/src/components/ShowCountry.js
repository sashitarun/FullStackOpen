import React from 'react'
import CountryDetails from './CountryDetails'

function ShowCountry(props) {
    var country =  props.country

    const handleClick = () =>
    {
        return <CountryDetails country= {country}/>
    }
    return (
        <div>
            <p>
                {country.name} 
                <button onClick = {handleClick}> show </button>
            </p>
        </div>
    )
}

export default ShowCountry
