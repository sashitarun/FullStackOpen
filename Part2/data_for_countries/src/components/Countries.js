import React from 'react'
import CountryDetails from './CountryDetails'
import ShowCountry from './ShowCountry'

function Countries({countries,filterName}) {

    const filteredCountries = countries.filter((country) => 
    {
        var name = (country.name).toLowerCase()
        var f_name =  (filterName).toLowerCase()
        if(name.includes(f_name))
        {
            return country
        }
        else return null
    })

    if(filteredCountries.length > 10)
    return (
        <div>
            Too many matches, specify another filter
        </div>
    )

    else if(filteredCountries.length > 1)
    {
        return(
            <div>
                {
                    filteredCountries.map(country => <ShowCountry key = {country.name} country = {country} />)
                }
            </div>
        )
    }

    else if(filteredCountries.length === 1)
    {
        const country = filteredCountries[0]
        console.log(country)
        return(
            <div>
                <CountryDetails country={country}/>
            </div>
        )
    }

    else
    {
        return(
            <div>
                No Countries with this filter present !!!
            </div>
        )
    }
}

export default Countries
