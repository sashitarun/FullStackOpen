import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const App = (props) => {

  const [selected, setSelected] = useState(0)
  const len = anecdotes.length
  var [votes,setVotes] = useState([0,0,0,0,0,0])
  var maximum = 0

  const setValue = () =>
  {
    var rand = Math.floor(Math.random() * len)
    setSelected(rand)
  }

  function maxValueIndex(array)
  {
    var maxValue = array[0]
    var maxIndex = 0

    for(var i = 1 ; i < array.length ;i++)
    {
      if( array[i] > maxValue)
      {
        maxIndex = i
        maxValue = array[i]
      }
    }
    maximum = maxValue
    return maxIndex
  }
  const voting = () =>
  { 
    var copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes </p>
      <button onClick={voting}>vote</button>
      <button onClick={setValue}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxValueIndex(votes)]}<br/> with {maximum} votes </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(<App />,document.getElementById('root'));



