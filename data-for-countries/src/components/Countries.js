import React from 'react'
import Country from './Country'

const Countries = ({ filter, countries, getTemperature }) => {
    if(filter !== ''){
        const newCountries = countries
                                .filter(country => new RegExp(filter, 'i').test(country.name))

        if(newCountries.length <= 10 && newCountries.length > 1 ){
            return(
                <div>
                {
                    newCountries
                        .map(country => 
                            <Country 
                                country={country}
                                key={country.name}
                            />
                            )
                }
            </div>
            )
        }else if(newCountries.length > 10){
            return(
                <div>
                    Too many matches, specify another filter.
                </div>
            )
        }else if(newCountries.length === 1){
            return(
                <Country
                    showData={true}
                    country={newCountries[0]}
                />
            )
        }
        return(
            <div>nothing</div>
        )
        
    }
    return(
        <div></div>
    )
}

export default Countries