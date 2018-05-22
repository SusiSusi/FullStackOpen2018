import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
   /* const nonExisting = {
      id: 10000,
      name: 'En ole täällä',
      phone: '2344'
    } */
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deletePerson }