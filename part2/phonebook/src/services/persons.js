import axios from "axios"

const BASE_URL = 'http://localhost:3001/persons'

function getAll() {

    return axios.get(BASE_URL)
    .then((response) => response.data) 
}

function create(newPerson) {
    return axios.post(BASE_URL, newPerson)
    .then((response) => response.data) 
}

function update(updatedPerson) {
    return axios.patch(BASE_URL, updatedPerson)
    .then((response) => response.data) 
}

function deletePerson(personId) {
    return axios.delete(BASE_URL.concat(`/${personId}`))
    .then((response) => response.data) 
}

export default  {
    getAll,
    create,
    update,
    deletePerson
} 