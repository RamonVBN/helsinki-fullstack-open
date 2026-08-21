
const Weather = ({ capitalWeather }) => {
  const windSpeed = capitalWeather ? capitalWeather.wind.speed : null

  const tempCelsius = capitalWeather ? capitalWeather.main.temp : null

  const iconUrl = capitalWeather
    ? `https://openweathermap.org/payload/api/media/file/${capitalWeather.weather[0].icon}.png`
    : null

  return (
    <>
      <p>
        Temperature {tempCelsius} {" Celsius"}
      </p>
      {iconUrl && <img src={iconUrl} alt="" />}
      <p>
        Wind {windSpeed} {"m/s"}
      </p>
    </>
  )
}

export default Weather
