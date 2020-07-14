import axios from 'axios'
const baseurl = '/api/users'

const getAll = async () =>
{
    const request = await axios.get(baseurl)
    return request.data
}

export default {getAll}