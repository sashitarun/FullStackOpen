const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Query {
      bookCount : Int!
      authorCount : Int!
      allBooks(author : String , genre : String) : [Book!]!
      allAuthors : [Author!]!
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
      author : String!
      id : ID!
      genres : [String!]!
  }

  type Mutation {
      addBook(
          title : String!
          author : String!
          published : Int!
          genres : [String!]!
      ): Book 
      editAuthor(
          name : String!,
          setBornTo : Int!
      ) : Author
  }
`

const resolvers = {
  Query: {
      bookCount : () => books.length,
      authorCount : () => authors.length,
      allBooks : (root,args) => {
          if(args.author && !args.genre)
          {
              const filteredBooks = books.filter(book => book.author === args.author)
              return filteredBooks
          }
          if( args.genre && !args.author)
          {
             const filteredBooks = books.filter(book => book.genres.find(g => g === args.genre))
             return filteredBooks
          }
          if ( args.genre && args.author )
          {
            let filteredBooks = books.filter(book => book.author === args.author)
            filteredBooks = filteredBooks.filter(book => book.genres.find(g => g === args.genre))
            return filteredBooks
          }
          else return books
      },
      allAuthors : () => authors 
  },
  Mutation: {
    addBook : (root,args) => 
    {
        const book = {...args, id : uuid()}
        books = books.concat(book)
        const name = args.author
        if(!authors.find(author => author.name === name))
        {
            const a = {name : name , id : uuid()}
            authors = authors.concat(a)
        }
        return book
    },
    editAuthor : (root,args) => {
        const requiredAuthor = authors.find( author => author.name === args.name)
        if(requiredAuthor)
        {
            const author = {...requiredAuthor, born : args.setBornTo }
            authors = authors.map(au => au.name === args.name ? author : au)
            return author
        }
        else return null
    }
  },
  Author: {
      bookCount : (root) => {
          let name = root.name
          const writtenBooks = books.filter( b => b.author === name)
          return writtenBooks.length
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})