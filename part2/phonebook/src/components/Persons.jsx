const Persons = ({ persons, onDelete }) => {
  return (
    <>
      {persons.map((person) => {
        return (
          <span key={person.name}>
            <PersonDetails
            onDelete={onDelete}
            personName={person.name}
            personNumber={person.number}
            />
            <button onClick={() => onDelete(person.id, person.name)}>delete person</button>
          </span>
        )
      })}
    </>
  )
}

const PersonDetails = ({ personName, personNumber}) => {

  return (
    <p> {personName} {personNumber} </p>
  )
}

export default Persons
