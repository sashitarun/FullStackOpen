import React from 'react'
import { connect } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

    const addAnecdote = (event) =>
    {
        event.preventDefault()
        const newAnecdoteContent = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
       // dispatch(addNewAnecdote(newAnecdoteContent))
        props.addNewAnecdote(newAnecdoteContent)
       // dispatch(setNotification(`new anecdote '${newAnecdoteContent}' is created `,5000))
        props.setNotification(`new anecdote '${newAnecdoteContent}' is created `,5000)
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

const mapDispatchToProps = (state) => {
    return{
        addNewAnecdote : addNewAnecdote,
        setNotification : setNotification
    }
}

const ConnectedAnecdoteForm = connect( null , mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
