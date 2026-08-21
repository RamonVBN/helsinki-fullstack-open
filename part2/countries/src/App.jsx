import axios from "axios"
import { useEffect, useState } from "react"
import CountryDetails from "./components/CountryDetails"

function App() {
  const [countryName, setCountryName] = useState("")
  const [countries, setCountries] = useState([])
  const [countryDetails, setCountryDetails] = useState(null)

  const filteredCountries =
    countryName.trim().length > 0
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(countryName.toLowerCase()),
        )
      : []

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => setCountries(response.data))
  }, [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setCountryDetails(filteredCountries[0])
    } else {
      setCountryDetails(null)
    }
  }, [countryName])

  return (
    <>
      <p>
        find countries{" "}
        <input
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          type="text"
        />
      </p>
      {countryDetails ? (
        <CountryDetails country={countryDetails} />
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filteredCountries.map((country) => {
          return (
            <p key={country.name.common}>
              {country.name.common}
              <button onClick={() => setCountryDetails(country)}>show</button>
            </p>
          )
        })
      )}
    </>
  )
}

export default App
