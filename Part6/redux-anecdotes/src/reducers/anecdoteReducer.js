

export const addVote = (id) =>
{
  return({
    type : 'ADD_VOTE',
    data : {id}
  }
  )
}

export const addNewAnecdote = (anecdote) =>
{
  return({
    type : 'ADD_ANECDOTE',
    data : {anecdote}
  })
}

export const initialiseAnecdotes = (anecdotes) =>
{
  return({
    type : 'INIT_ANECDOTES',
    data : {
      anecdotes : anecdotes
    }
  })
}

const anecdoteReducer = (state = [], action) => {
 
  switch(action.type){
    case 'INIT_ANECDOTES':
      return action.data.anecdotes
    case 'ADD_VOTE':
      const anecdote_id = action.data.id
      const requiredAnecdote = state.find(anecdote => anecdote.id === anecdote_id)
      const changedAnecdote = {...requiredAnecdote, votes : requiredAnecdote.votes + 1}
      const newstate = state.map(anecdote => anecdote.id !== anecdote_id ? anecdote : changedAnecdote)
      const sortedState = newstate.sort((a1,a2) => a2.votes - a1.votes)
      return sortedState
    case 'ADD_ANECDOTE':
      const newAnecdote = action.data.anecdote
      return state.concat(newAnecdote)
    default : return state
  }
}

export default anecdoteReducer