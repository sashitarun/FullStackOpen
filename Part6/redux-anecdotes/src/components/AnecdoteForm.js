import React from 'react'
import {useDispatch} from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { newAnecdoteNotification, clearNotification } from '../reducers/notificationReducer'
import AnecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const addAnecdote = (event) =>
    {
        event.preventDefault()
        const newAnecdoteContent = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        AnecdoteService.createNew(newAnecdoteContent).then( output => {
            dispatch(addNewAnecdote(output))
        })
        dispatch(newAnecdoteNotification(newAnecdoteContent))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000);
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
