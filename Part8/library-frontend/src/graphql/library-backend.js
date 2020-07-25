const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('../models/Book')
const Author = require('../models/Author')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SECRET_KEY'
mongoose.set('useFindAndModify',false)

const MONGODB_URI = 'mongodb+srv://sashitarun:sash2440@cluster0-07ps7.mongodb.net/library-app?retryWrites=true&w=majority'

console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, {useNewUrlParser : true})
.then(() => {
  console.log('Connected to MongoDB')
})
.catch(error => {
  console.log('error connecting to MongoDB : ', error.message)
})

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]
//
// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
  type Query {
      bookCount : Int!
      authorCount : Int!
      allBooks(author : String , genre : String) : [Book!]!
      allAuthors : [Author!]!
      me : User
  }

  type Author {
      name : String!
      id : ID!
      born : Int
      bookCount : Int!
  }

  type Book {
      title : String!
      published : Int!
      author : Author!
      id : ID!
      genres : [String!]!
  }

  type User {
    username : String!
    favoriteGenre : String!
    id : ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
      addBook(
          title : String!
          authorName : String!
          published : Int!
          genres : [String!]!
      ): Book 
      editAuthor(
          name : String!,
          setBornTo : Int!
      ) : Author
      createUser(
        username : String!
        favoriteGenre : String!
      ) : User
      login(
        username : String!
        password : String!
      ) : Token
  }
`

const resolvers = {
  Query: {
      bookCount : async () => await Book.collection.countDocuments(),
      authorCount : async () => await Author.collection.countDocuments(),
      allBooks : async (root,args) => {
          if(args.author && !args.genre)
          {
              const author = await Author.findOne({name : args.name})
              const filteredBooks = await Book.find({author : author._id})
              return filteredBooks
          }
          // if( args.genre && !args.author)
          // {
          //    const filteredBooks = books.filter(book => book.genres.find(g => g === args.genre))
          //    return filteredBooks
          // }
          // if ( args.genre && args.author )
          // {
          //   let filteredBooks = books.filter(book => book.author === args.author)
          //   filteredBooks = filteredBooks.filter(book => book.genres.find(g => g === args.genre))
          //   return filteredBooks
          // }
          return Book.find({})
      },
      allAuthors : async () =>{
        const allAuthors = await Author.find({})
        return allAuthors
      },
      me : (root , args , context ) => {
        return context.currentUser
      }
  },
  Mutation: {
    addBook : async (root,args,context) => 
    {
      const name = args.authorName
      let author = await Author.findOne({name : name})

      const currentUser = context.currentUser
      if(!currentUser)
      {
        throw new AuthenticationError('Not Authenticated')
      }

      if(!author)
      {
        const a = new Author({name : name})
        author = a
        try{
          await a.save()
        }catch(error){
          throw new UserInputError(error.message , {
            invalidArgs : args
          })
        }

      }
      const book = new Book({...args , author : author})
      try{
        await book.save
      } catch(error){
        throw new UserInputError(error.message , {
          invalidArgs : args
        } )
      }
      return book
    },
    editAuthor : async  (root,args,context ) => {
        const requiredAuthor = await Author.findOne({name : args.name})

        const currentUser = context.currentUser
        if(!currentUser)
        {
          throw new AuthenticationError('Not Authenticated')
        }

        if(requiredAuthor)
        {
            console.log('required Author : ', requiredAuthor)
            await Author.update({name : args.name} , { $set : { born : args.setBornTo}})
            const author = await Author.findOne({name : args.name})
            return author
        }
        else return null
    },
    createUser :(root,args) => {
      const user = new User({username : args.username , favoriteGenre : args.favoriteGenre})

      return user.save()
      .catch( error => {
        throw new UserInputError(error.message,{
          invalidArgs : args
        })
      })
    },
    login : async (root,args) => {
      const user = await User.findOne({username : args.username})

      if(!user || args.password!=="sash2440")
      {
        throw new UserInputError('Invalid Credentials')
      }

      const userForToken = {
        username : user.username,
        id : user._id
      }

      return { value : jwt.sign(userForToken,JWT_SECRET)}
    }
  },
  Author: {
      bookCount : async (root) => {
          let id = root._id
          const writtenBooks = await Book.find({ author : id })
          return writtenBooks.length
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})