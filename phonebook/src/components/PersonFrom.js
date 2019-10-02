import React from 'react'

const PersonForm = ({ onSub, onChangeCallbacks, values, handleChange }) =>
    <form onSubmit={onSub}>
        <div>
            name: <input value={values[0]} onChange={handleChange(onChangeCallbacks[0])} />
        </div>
        <div>
            number: <input value={values[1]} onChange={handleChange(onChangeCallbacks[1])} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>

export default PersonForm