import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql `
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql `
    query allBooks($authorName : String, $genre : String){
        allBooks(
            authorName : $authorName,
            genre : $genre
        ) {
            title
            author{
                name
            }
            published
            genres
        }
    }
`

export const ADD_BOOK = gql `
    mutation addBook($title : String!,$authorName : String!,$published : Int!,$genres : [String!]!) {
        addBook (
            title : $title,
            authorName : $authorName,
            published : $published,
            genres : $genres
        ){
            title
            author{
                name
            }
            published
            genres
        }
    }
`

export const CHANGE_YEAR = gql `
    mutation changeYear($name : String! , $setBornTo : Int!){
        editAuthor(
            name : $name,
            setBornTo : $setBornTo
            ){
                name
                born
            }
    }
`

export const LOGIN = gql `
    mutation login($username : String! , $password : String!){
        login(username : $username , password : $password)
        {
            value
        }
    }
`

export const USER = gql `
    query {
        me {
            username
            favoriteGenre
        }
    }
`