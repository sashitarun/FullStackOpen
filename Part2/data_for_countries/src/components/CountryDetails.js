import React from 'react'

function CountryDetails({country}) {

    
    return (
        <div>
            <h1> {country.name} </h1>
            <p> capital {country.capital}</p>
            <p> population {country.population}</p>
            <h1> languages </h1>
            <ul>
                {
                    country.languages.map(language =>
                    <li key={language.name}>{language.name}</li>)
                }
            </ul>
            <img src = {country.flag} alt="Flag of the country " width = "120" height = "90" />
        </div>
    )
}

export default CountryDetails
