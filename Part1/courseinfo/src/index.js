import React from 'react'
import ReactDOM from 'react-dom'

const Header =(props) =>(
  <div>
    <h1>{props.course.name}</h1>
  </div>
)

const Part = (props) =>(
  <div>
    <p>
      {props.partName} {props.exercisesNumber}
    </p>
  </div>
)

const Content = (props) =>(
  <div>
    <Part partName={props.course.parts[0].name} exercisesNumber={props.course.parts[0].exercises}/>
    <Part partName={props.course.parts[1].name} exercisesNumber={props.course.parts[1].exercises}/>
    <Part partName={props.course.parts[2].name} exercisesNumber={props.course.parts[2].exercises}/>
  </div>
)

const Total =(props)=>
{
  const e1 = props.course.parts[0].exercises
  const e2 = props.course.parts[1].exercises
  const e3 = props.course.parts[2].exercises

  return(
    <div>
      <p>Number of exercises {e1 + e2 + e3}</p>
    </div>
  )
}

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course = {course} />
      <Total course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))