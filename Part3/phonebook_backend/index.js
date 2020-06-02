const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(express.json())
app.use(express.static('build'))

persons = [
    {
        name : "Arto Hellas",
        number : "1234567890",
        id : 1
    },
    {
        name : "Jane Smith",
        number : "7123420849",
        id : 2
    },
    {
        name : "Harvey",
        number : "2345898763",
        id : 3
    },
    {
        name : "Mike",
        number : "876345987",
        id : 4
    }
]

morgan.token('type', (request,response) => 
{
    if(request.body) return JSON.stringify(request.body)
    else return null
})

app.get('/api/persons', (request,response) =>
{
    response.json(persons)
})

app.get('/api/persons/:id', (request,response) => 
{
    const id = Number(request.params.id)
    const person = persons.find((p) =>{
        return p.id === id
     })
    
    if(person) {response.json(person)}
    else {response.status(404).end()}
})

app.get('/info',(request,response) =>
{
    const len = persons.length
    const str = ` Phonebook has info for ${len} people `
    const date = new Date()
    
    response.send(`
        <p> ${str} </p> 
        <p> ${date} </p>
    `)
})

app.delete('/api/persons/:id',(request,response) =>
{
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generatedID = () =>
{

    const randID = Math.floor(Math.random() * 1000)
    return randID
}

app.post('/api/persons',(request,response) =>
{
    const body = request.body
    //console.log(body)

    if((!(body.name)) || (!(body.number)))
    {
        return response.status(400).json({ 
            error: 'Number or Name is missing' 
          })
    }

    if(persons.find(p => p.name === body.name))
    {
        return response.status(400).json({ 
            error: 'Name must be unique' 
          })
    }
    const person = 
    {
        name : body.name,
        number : body.number,
        id : generatedID() + 1 
    }

    persons = persons.concat(person)

    morgan.token()
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT , () =>
{
    console.log(`Running on port ${PORT}`)
})
