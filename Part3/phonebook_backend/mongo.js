const mongoose = require('mongoose')

if(process.argv.length < 3)
{
    console.log('Provide password')
    process.exit(0)
}

const password = process.argv[2]

const url = `mongodb+srv://sashitarun:${password}@cluster0-07ps7.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true , useUnifiedTopology: true} )

const personSchema = new mongoose.Schema({
    name : String,
    number : String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length > 3 )
{
    const personName = process.argv[3]
    const personNumber = process.argv[4]
    const person = new Person(
    {
        name : personName,
        number : personNumber
    })
    person.save().then(result =>
    {
        console.log(`added ${personName} to phonebook`)
        mongoose.connection.close()
    })
}
else 
{
    console.log("phonebook: ")
    Person.find({}).then(persons =>
        {
            persons.forEach((person) =>
            {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        }
    )
}


