import { useEffect, useState } from "react"

import axios from "axios"

import personsService from "./services/persons"
import Personform from "./PersonForm"
import Filter from "./Filter"
import Persons from "./Persons"
import Notification from "./Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterByName, setFilterByName] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)

  const handleOnChangeName = (e) => setNewName(e.target.value)

  const handleOnChangeNumber = (e) => setNewNumber(e.target.value)

  const handleUpdateNumber = (personWithSameName) => {
    const updateNumber = confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`,
    )

    if (!updateNumber) {
      return
    }

    const updatedPerson = {
      ...personWithSameName,
      number: newNumber,
    }

    const updatedPersonsList = persons.map((person) => {
      if (person.id === updatedPerson.id) {
        return updatedPerson
      }

      return person
    })

    personsService.update(updatedPerson).then(() => {
      setPersons(updatedPersonsList)
      setNotificationMessage({
        message: `Updated "${updatedPerson.name}"`,
        isError: false,
      })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const personWithSameName = persons.find((person) => person.name === newName)

    if (personWithSameName) {
      return handleUpdateNumber(personWithSameName)
    }

    const data = {
      name: newName,
      number: newNumber,
    }

    personsService.create(data).then((newPerson) => {
      setPersons(persons.concat(newPerson))
      setNotificationMessage({
        message: `Added "${newPerson.name}"`,
        isError: false,
      })
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

    const updatedPersonsList = persons.filter(
      (person) => person.id !== personId,
    )

    setPersons(updatedPersonsList)

    personsService
      .deletePerson(personId)
      .then(() => {
        setNotificationMessage({
          message: `Deleted ${personName}`,
          isError: false,
        })
      })
      .catch((error) => {
        if (error.status) {
          setNotificationMessage({
            message: `Information of "${personName}" has already been removed from the server`,
            isError: true,
          })
        }

        console.log(error)
      })
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterByName.toLowerCase()),
  )

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  useEffect(() => {

    if (!notificationMessage) return

    const removeNotificationTimeout = setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)

    return () => {
      clearTimeout(removeNotificationTimeout)
    }

  }, [notificationMessage])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notificationMessage} />
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
