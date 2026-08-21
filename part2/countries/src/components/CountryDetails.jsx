import { useState } from "react"
import Weather from "./Weather"
import { useEffect } from "react"
import axios from "axios"

const api_key = import.meta.env.VITE_API_KEY

const CountryDetails = ({ country }) => {
  const [lat, lon] = country.capitalInfo.latlng

  const [capitalWeather, setCapitalWheather] = useState(null)

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`,
      )
      .then((response) => setCapitalWheather(response.data))
  }, [])

  const languagesList = Object.entries(country.languages).map((lang) => lang[1])
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {languagesList.map((lang) => {
          return <li key={lang}>{lang}</li>
        })}
      </ul>

      <img src={country.flags.png} alt="" />

      <Weather capitalWeather={capitalWeather} />
    </>
  )
}

export default CountryDetails