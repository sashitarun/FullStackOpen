import React , {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
<button onClick={props.func}>{props.text}</button>
)

const Statistic = (props) =>{
  return(
    <tbody>
      <tr>
        <td>{props.name}</td>
        <td>{props.val}{props.children}</td>
      </tr>
    </tbody> 
  )
}



const Statistics =({good,neutral,bad}) =>
{
  var sum = good + neutral + bad
  if(sum===0)
  {
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <table>
        <Statistic name='good' val={good} />
        <Statistic name='neutral' val={neutral} />
        <Statistic name='bad' val={bad} />
        <Statistic name='all' val={sum} />
        <Statistic name='average' val={(good - bad)/sum}/>
        <Statistic name='positive' val={good * 100/ sum}> % </Statistic>
      </table>
    </div>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' func={() => setGood(good+1)} />
      <Button text='neutral' func={() => setNeutral(neutral+1)}/>
      <Button text='bad' func={()=>setBad(bad+1)}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


ReactDOM.render(<App />,document.getElementById('root'));
