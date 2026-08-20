import { useEffect, useState } from "react"

import axios from "axios"

import personsService from "./services/persons"
import Personform from "./PersonForm"
import Filter from "./Filter"
import Persons from "./Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterByName, setFilterByName] = useState("")

  const handleOnChangeName = (e) => setNewName(e.target.value)

  const handleOnChangeNumber = (e) => setNewNumber(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    const isPersonAlreadyExists = persons.find(
      (person) => person.name === newName,
    )

    if (isPersonAlreadyExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const data = {
      name: newName,
      number: newNumber,
    }

    personsService.create(data).then((newPerson) => {
      setPersons(persons.concat(newPerson))
    })

    setNewName("")
    setNewNumber("")
  }

  const handleOnChangeFilter = (e) => setFilterByName(e.target.value)
  
  const handleDeletePerson = (personId, personName) => {

    const isUserWantToDelete = confirm(`Delete ${personName} ?`)

    if (!isUserWantToDelete) {
      return
    }

    const updatedPersonsList = persons.filter((person) => person.id !== personId)

    setPersons(updatedPersonsList)

    personsService.deletePerson(personId)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterByName.toLowerCase()),
  )

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterByName={filterByName} onChange={handleOnChangeFilter} />
      <h2>add a new</h2>
      <Personform
        newName={newName}
        newNumber={newNumber}
        onChangeName={handleOnChangeName}
        onChangeNumber={handleOnChangeNumber}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDeletePerson} />
    </div>
  )
}

export default App
