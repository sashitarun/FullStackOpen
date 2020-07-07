const anecdotesAtStart = [
  { 
    content : 'If it hurts, do it more often',
    votes : 0
  },
  { 
    content : 'Adding manpower to a late software project makes it later!',
    votes : 0
  },
  {
    content : 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes : 0
  },
  { 
    content : 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes : 0
  },
  { 
    content :'Premature optimization is the root of all evil.',
    votes : 0
  },
  { 
    content : 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes : 0
  }
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: getId(),
    votes: anecdote.votes
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const addVote = (id) =>
{
  return({
    type : 'ADD_VOTE',
    data : {id}
  }
  )
}

export const addNewAnecdote = (content) =>
{
  return({
    type : 'ADD_ANECDOTE',
    data : {content}
  })
}

const anecdoteReducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch(action.type){
    case 'ADD_VOTE':
      const anecdote_id = action.data.id
      const requiredAnecdote = state.find(anecdote => anecdote.id === anecdote_id)
      const changedAnecdote = {...requiredAnecdote, votes : requiredAnecdote.votes + 1}
      const newstate = state.map(anecdote => anecdote.id !== anecdote_id ? anecdote : changedAnecdote)
      const sortedState = newstate.sort((a1,a2) => a2.votes - a1.votes)
      return sortedState
    case 'ADD_ANECDOTE':
      const anecdote_content = action.data.content
      const newAnecdote = {
        content : anecdote_content,
        id : getId(),
        votes : 0
      }
      return state.concat(newAnecdote)
    default : return state
  }
}

export default anecdoteReducer