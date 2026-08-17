
function Header({ course }){

  return <h1>{course}</h1>
}

function Part({name, exercises}){

  return <p> {name} {exercises}</p>
}

function Content({ partsList }){

  return (
    <>
      {
        partsList.map((part) => <Part key={part.name} name={part.name} exercises={part.exercises}/>)
      }
    </>
  )
}

function Total({ partsList }) {

  const totalExercisesQtd = partsList.reduce((accumulator, currentValue) => {

        return accumulator += currentValue.exercises
    }, 0)

  return <p>Number of exercises {totalExercisesQtd}</p>
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    partsList: [
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
     <Header course={course.name}/>
     <Content partsList={course.partsList}/>
     <Total partsList={course.partsList}/>
    </div>
  )
}

export default App