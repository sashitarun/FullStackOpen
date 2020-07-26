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
    query {
        allBooks {
            title
            author{
                name
            }
            published
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