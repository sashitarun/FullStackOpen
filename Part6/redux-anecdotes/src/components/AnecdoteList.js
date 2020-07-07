import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { voteNotification , clearNotification } from '../reducers/notificationReducer'
import AnecdoteService from '../services/anecdotes'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        
        AnecdoteService.update(anecdote) // This is to update backend
        dispatch(addVote(anecdote.id)) // this is to update frontend
        dispatch(voteNotification(anecdote.content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000);
    }

    const filteredAnecdotes = anecdotes.filter( anecdote =>
    {
        const anec_allsmall = (anecdote.content).toLowerCase()
        const filter_allsmall = filter.toLowerCase()
        if(anec_allsmall.includes(filter_allsmall)) return anecdote
        else return null
    })

    if(filter === ''){
        return (
            <div>
                {anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    else{
        return(
            <div>
                {filteredAnecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default AnecdoteList