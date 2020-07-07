import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {


    const vote = (anecdote) => {
        
        //dispatch(addVote(anecdote))
        props.addVote(anecdote)
        //dispatch(setNotification(`you voted '${anecdote.content}'`,5000))
        props.setNotification(anecdote)
    }

    const filteredAnecdotes = props.anecdotes.filter( anecdote =>
    {
        const anec_allsmall = (anecdote.content).toLowerCase()
        const filter_allsmall = props.filter.toLowerCase()
        if(anec_allsmall.includes(filter_allsmall)) return anecdote
        else return null
    })

    if(props.filter === ''){
        return (
            <div>
                {props.anecdotes.map(anecdote =>
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
const mapStateToProps = (state) => {
    return{
        anecdotes : state.anecdotes,
        filter : state.filter
    }
}
const mapDispatchToProps = (state) => {
    return{
        addVote : addVote,
        setNotification : setNotification
    }
}
const ConnectedAnecdoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList