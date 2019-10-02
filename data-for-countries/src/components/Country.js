import React, {useState} from 'react'
import axios from 'axios'

const Country = ({country, showData}) => {
    const [show, setShow] = useState(false)
    const [temperature, setTemperature] = useState(0)
    const [icon, setIcon] = useState('')
    const [description, setDescription] = useState('')
    const [windSpeed, setWindSpeed] = useState(0)
    const [windDir, setWindDir] = useState('')

    if(show || showData){
        axios
        .get(`http://api.weatherstack.com/current?access_key=a3db92294ef210cb014ad5aa9b45c752&query=${country.capital}`)
        .then(res => res.data.current)
        .then(({temperature, weather_icons, weather_descriptions, wind_speed, wind_dir}) => {
            setTemperature(temperature)
            setIcon(weather_icons[0])
            setDescription(weather_descriptions[0])
            setWindSpeed(wind_speed)
            setWindDir(wind_dir)
        })
        
        return(
            <div>
                <h1>
                    {country.name}
                </h1>
                <div>
                    capital {country.capital}
                </div>
                <div>
                    population {country.population}
                </div>
                <h2>
                    languages
                </h2>
                <ul>
                    {country.languages.map(lang => <li key={lang.name} >{lang.name}</li>)}
                </ul>
                <img src={country.flag} alt={`${country.name}'s flag`} />
                <div>
                    <h1>
                        Weather in {country.capital}
                    </h1>
                    <div>
                        <strong>temperature: </strong> {temperature}
                        <div>
                            <img 
                                src={icon}
                                alt={description}
                            />
                        </div>
                        <strong>wind: </strong> {`${windSpeed} kph direction ${windDir}`}
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div>
            {country.name} <button onClick={() => setShow(true)} >show</button>
        </div>
    )
}
    

export default Country