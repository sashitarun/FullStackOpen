import React from 'react'
import {useDispatch} from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const addAnecdote = (event) =>
    {
        event.preventDefault()
        const newAnecdoteContent = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(addNewAnecdote(newAnecdoteContent))
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='newAnecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
