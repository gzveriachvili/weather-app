import 'babel-polyfill';

const getCoord = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=3ae1f5489c4b254024290096c8c86585`,
      { mode: 'cors' }
    );
    const coordData = await response.json();

    return coordData;
  } catch (error) {
    console.log(error);
  }
};

const toCelsius = (number) => {
  return (number - 273.15).toFixed(1);
};

const getWeather = async (citypar, bool) => {
  try {
    const coordData = await getCoord(citypar);
    let x = coordData[0].lat;
    let y = coordData[0].lon;
    let city = coordData[0].name;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=3ae1f5489c4b254024290096c8c86585`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();

    let description = weatherData['weather'][0]['description'];
    let temp = weatherData['main']['temp'];
    temp = toCelsius(temp);
    let feels_like = weatherData['main']['feels_like'];
    feels_like = toCelsius(feels_like);
    let humidity = weatherData['main']['humidity'];

    let weatherArr = [city, description, temp, feels_like, humidity];

    return weatherArr;
  } catch (error) {
    console.log(error);
  }
};

export { getWeather };
