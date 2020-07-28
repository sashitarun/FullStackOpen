import React from 'react'
import { useQuery } from '@apollo/client'
import { USER, ALL_BOOKS } from '../queries'

function Recommend({show}) {

    const user_result = useQuery(USER)
    const book_result = useQuery(ALL_BOOKS)
    if(book_result.loading) return <div>books loading...</div>

    if(user_result.loading){
        return <div>user info is loading ... </div>
    }

    const user = user_result.data.me
    const books = book_result.data.allBooks

    if(!show) return null
    return (
        <div>
            <h2>recommendations</h2>
            <h3>Your favorite genre is {user.favoriteGenre}, so recommended books are</h3>
            <table>
                <tbody>
                <tr>
                    <th>books</th>
                    <th>
                    author
                    </th>
                    <th>
                    published
                    </th>
                </tr>
                {books.map(a =>
                {
                    if(a.genres.includes(user.favoriteGenre))
                    {
                    return(<tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>)
                    }
                    else return null
                }
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend
