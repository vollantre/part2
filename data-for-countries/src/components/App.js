import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './Countries'

const Filter = ({handleChange, filter}) => 
    <div>
        find countries <input value={filter} onChange={handleChange} />
    </div>

function App() {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect( () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(res => setCountries(res.data))
    } , [])

    return (
        <div>
        <Filter 
            filter={filter} 
            handleChange={(e) => setFilter(e.target.value)} 
        />
        <Countries
            filter={filter} 
            countries={countries} 
        />
        </div>
    )
}

export default App;
