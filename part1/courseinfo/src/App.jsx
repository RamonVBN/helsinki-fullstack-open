
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

function Total({ totalExercisesQtd }) {

  return <p>Number of exercises {totalExercisesQtd}</p>
}


const App = () => {
  const course = 'Half Stack application development'

   const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const partsList = [part1, part2, part3]

  const totalExercisesQtd = part1.exercises + part2.exercises + part3.exercises

  return (
    <div>
     <Header course={course}/>
     <Content partsList={partsList}/>
     <Total totalExercisesQtd={totalExercisesQtd}/>
    </div>
  )
}

export default App