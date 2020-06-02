import axios from 'axios'


const baseurl = 'http://localhost:3002/persons'

const baseurl = '/api/persons'


const getAll = () =>
{
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const update = (id , PersonObject) =>
{
    const request =  axios.put(`${baseurl}/${id}`,PersonObject)
    return request.then(response => response.data)
}

const create = (PersonObject) =>
{
    const request = axios.post(baseurl,PersonObject)
    return request.then(response => response.data)
}

const deletePerson = (id) =>
{
    const request = axios.delete(`${baseurl}/${id}`)
    return request.then(response => response.data)
}

export default {getAll,update,create,deletePerson}