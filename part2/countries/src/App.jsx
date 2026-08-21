import axios from "axios"
import { useEffect, useState } from "react"

const api_key = import.meta.env.VITE_API_KEY

const CountryDetails = ({ country }) => {

  const [ lat, lon ] = country.capitalInfo.latlng

  const [ capitalWeather, setCapitalWheather ] = useState(null)

  const windSpeed = capitalWeather ? capitalWeather.wind.speed : null
  
  const tempCelsius = capitalWeather ? capitalWeather.main.temp : null

  const iconUrl = capitalWeather ? 
  `https://openweathermap.org/payload/api/media/file/${capitalWeather.weather[0].icon}.png` 
  : null

  useEffect(() => {

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
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
        {
          languagesList.map((lang) => {
            return <li key={lang} >{lang}</li>
          })
        }
      </ul>

        <img src={country.flags.png} alt="" /> 

        <p>Temperature {tempCelsius} {' Celsius'}</p>
        {
          iconUrl && (
            <img src={iconUrl} alt="" />
          ) 
        }
        <p>Wind {windSpeed} {'m/s'}</p>
    </>
  )
}

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
        {
          countryDetails ? (
            <CountryDetails country={countryDetails}/>
          ) : 

          (
            filteredCountries.length > 10 ? (
              <p>Too many matches, specify another filter</p>
            ) :
            filteredCountries.map((country) => {

              return <p key={country.name.common}>
                {country.name.common}
                <button onClick={() => setCountryDetails(country)}>show</button>
              </p>
            })
          )
        }
    </>
  )
}

export default App
