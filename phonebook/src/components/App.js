import React, { useState, useEffect } from 'react'
import personService from '../services/persons'
import PersonForm from './PersonFrom'
import Persons from './Persons'
import Notification from './Notification'


const Filter = ({ filter, handleChange }) => 
    <div>
        filter shown with <input value={filter} onChange={handleChange} />
    </div>

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ message, setMessage ] = useState(null)
    const [ msgClass, setMsgClass ] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => 
                setPersons(initialPersons))
    } , [])

    const updatePerson = () => {
        const person = persons.find(p => p.name === newName)
        const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if(result){
            const changedPerson = {
                ...person,
                number: newNumber
            }
            personService
                .update(person.id, changedPerson)
                .then(newPerson => {
                    setNewName('')
                    setNewNumber('')
                    showMessage(`${newPerson.name}'s number changed sucessfully`, true)
                    setPersons(persons.map(p => 
                        p.id === newPerson.id ? newPerson : p))
                })
                .catch(error => {
                    showMessage(`Information of ${person.name} has already been removed from server`, false)
                    setPersons(persons.filter(p => p.id !== person.id))
                })
            }
    }

    const addPerson = (e) => {
        e.preventDefault()
        if(persons.some(person => person.name === newName)){
            updatePerson()
        }else{
            const newPerson = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }
            personService
                .create(newPerson)
                .then(person => {
                    setPersons(persons.concat(person))
                    setNewName('')
                    setNewNumber('')
                    showMessage(`Added ${person.name}`, true)
                })
            
        }
    }

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        const result = window.confirm(`Delete ${person.name}?`)
        if(result){
            personService
                .erase(id)
                .then(response => {
                    showMessage(`${person.name} has been removed from the phonebook sucessfully`, true)
                    setPersons(persons.filter(p => p.id !== id))
                })
                .catch(error => {
                    showMessage(`Information of ${person.name} has already been removed from server`, false)
                    setPersons(persons.filter(p => p.id !== id))
                })
        }
        
    }

    const showMessage = (message, sucess) => {
        setMsgClass(sucess ? 'sucess' : 'error')
        setMessage(message)
                    setTimeout(() => {
                        setMessage(null)
                    }, 3000)
    }

    const handleChange = (callback) => (e) => callback(e.target.value)

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} msgClass={msgClass}/>
            <Filter 
                filter={filter} 
                handleChange={handleChange(setFilter)} 
            />
            <h2>add a new</h2>
            <PersonForm 
                onSub={addPerson} 
                values={[newName, newNumber]} 
                handleChange={handleChange} 
                onChangeCallbacks={[setNewName, setNewNumber]} 
            />
            <h2>Numbers</h2>
            <Persons 
                persons={persons} 
                filter={filter}
                handleClick={deletePerson}
            />
        </div>
    )
}

export default App