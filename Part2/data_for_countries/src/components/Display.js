import React from 'react'
import CountryDetails from './CountryDetails'

function Display({toDisplay,showCountry}) {
    //console.log(showCountry)
    if(toDisplay)
    return (
         <CountryDetails country={showCountry}/>
    )
    else
    return(
        <div>
            
        </div>
    )
}

export default Display
