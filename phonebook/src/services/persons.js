import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const erase = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (id, obj) => {
    const request = axios.put(`${baseUrl}/${id}`, obj)
    return request.then(response => response.data)
}


export default { create, getAll, erase, update }