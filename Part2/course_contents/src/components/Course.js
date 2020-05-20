import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const copy = [...course.parts]
    var totalsum = copy.reduce((sum,copies) =>  sum + copies.exercises,0)
    return(
      <p><b>total of {totalsum} exercises</b></p>
    ) 
  }
  
  const Part = ({name,exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {
          course.parts.map(part =>
             <Part name = {part.name} exercises={part.exercises} key={part.id}/> 
          )
        }
      </div>
    )
  }
  
  const Course = ({course}) =>
  {
    return(
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }

  export default Course;