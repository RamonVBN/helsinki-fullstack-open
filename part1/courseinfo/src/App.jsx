
function Header({ course }){

  return <h1>{course}</h1>
}

function Content({ partsList }){

  return (
    <>
      {
        partsList.map((part) => <p> {part.name} {part.exercisesQtd}</p>)
      }
    </>
  )
}

function Total({ totalExercisesQtd }) {

  return <p>Number of exercises {totalExercisesQtd}</p>
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const partsList = [
    {
      name: part1,
      exercisesQtd: exercises1
    },

    {
      name: part2,
      exercisesQtd: exercises2
    },

    {
      name: part3,
      exercisesQtd: exercises3
    },
  ]

  const totalExercisesQtd = exercises1 + exercises2 + exercises3

  return (
    <div>
     <Header course={course}/>
     <Content partsList={partsList}/>
     <Total totalExercisesQtd={totalExercisesQtd}/>
    </div>
  )
}

export default App