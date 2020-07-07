import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const update = async (anecdote) =>
{
    const newObject = {...anecdote,votes : anecdote.votes + 1}
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, newObject)
    return response.data
}

const createNew = async (content) =>
{
    const newObject = {
        content : content,
        id : getId(),
        votes : 0
    }
    const resposne = await axios.post(baseUrl,newObject)
    return resposne.data
}


export default {getAll,update,createNew}