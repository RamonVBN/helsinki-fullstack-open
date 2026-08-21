const Header = ({ courseName }) => <h1>{courseName}</h1>

const Content = ({ partsList }) => {

  return (
    <div>
      {
        partsList.map((part) => (
          <Part key={part.name} partName={part.name} exercisesCount={part.exercises}/>
        ))
      }
  </div>
  )
}

const Part = ({ partName, exercisesCount }) => (
  <p>
    {partName} {exercisesCount}
  </p>
)

const Total = ({ totalExercisesCount }) => <p> Number of exercises { totalExercisesCount }</p>

export const Course = ({ course }) => {

  const totalExercisesCount = course.parts.reduce((acc, curr) => {
    return acc += curr.exercises
  }, 0)

  return (
    <>
      <Header courseName={course.name} />
      <Content partsList={course.parts} />
      <Total
        totalExercisesCount={totalExercisesCount}
      />
    </>
  )
}

export default Course
