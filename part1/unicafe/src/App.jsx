import { useState } from 'react'

function Header({ title }) {

  return <h1>{title}</h1>
}

function Button({name, onClick}) {

  return <button onClick={onClick}>{name}</button>
}

function Stat({label, value, isPercentage = false}){
  return <p>{label} {value} {isPercentage ? '%' : ''}</p>
}

function StatisticsContainer({goodCount, neutralCount, badCount}){

  const totalFeedbacks = goodCount + neutralCount + badCount

  const average = (goodCount - badCount)/totalFeedbacks

  const positivePercentage = (goodCount/totalFeedbacks)*100

  if (totalFeedbacks > 0) {

    return (
      <>
        <h2>Statistics</h2>
        <div>
          <Stat label={'good'} value={goodCount}/>
          <Stat label={'neutral'} value={neutralCount}/>
          <Stat label={'bad'} value={badCount}/>
          <Stat label={'all'} value={totalFeedbacks}/>
          <Stat label={'average'} value={average}/>
          <Stat isPercentage label={'positive'} value={positivePercentage}/>
        </div>
      </>
    )
    
  } else {

    return <p>No feedback given</p>
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header title={'give feedback'}/>
      <Button onClick={handleGoodFeedback} name={'good'}/>
      <Button onClick={handleNeutralFeedback} name={'neutral'}/>
      <Button onClick={handleBadFeedback} name={'bad'}/>
      <StatisticsContainer goodCount={good} neutralCount={neutral} badCount={bad} />
    </div>
  )
}

export default App