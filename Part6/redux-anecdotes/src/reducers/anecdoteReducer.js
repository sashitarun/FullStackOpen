import anecdoteService from '../services/anecdotes'

export const addVote = (anecdote) =>
{
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type : 'ADD_VOTE',
      data : {
        id : updatedAnecdote.id
      }
    })
  }
}

export const addNewAnecdote = (content) =>
{
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type : 'ADD_ANECDOTE',
      data : {anecdote}
    })
  }
}

export const initialiseAnecdotes = () =>
{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data : {
        anecdotes: anecdotes }
    })
  }
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