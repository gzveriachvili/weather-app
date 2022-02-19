import getWeather from './weather_data';

const UI = (() => {
  const content = document.querySelector('#content');

  const updateCard = (city, description, temp, feels_like, humidity) => {
    let cityD = document.querySelector('.city');
    let descriptionD = document.querySelector('.description');
    let tempD = document.querySelector('.temp');
    let feelsLikeD = document.querySelector('.feels-like');
    let humidityD = document.querySelector('.humidity');

    cityD.textContent = city;
    descriptionD.textContent = description;
    tempD.textContent = temp;
    feelsLikeD.textContent = feels_like;
    humidityD.textContent = humidity;
  };

  const showWeather = async () => {
    try {
      let result = await getWeather();

      let city = result[0];
      let description = result[1];
      let temp = result[2];
      let feels_like = result[3];
      let humidity = result[4];

      updateCard(city, description, temp, feels_like, humidity);

      const fetchGif = async () => {
        const img = document.querySelector('img');

        try {
          const response = await fetch(
            `https://api.giphy.com/v1/stickers/translate?api_key=wvYaWc6JzHh8fPYLvchCol3fqBrKOQke&s=${description}`,
            { mode: 'cors' }
          );
          const gifData = await response.json();
          console.log(gifData);
          img.src = gifData.data.images.original.url;
        } catch (error) {
          console.log(error);
        }
      };

      fetchGif();
    } catch (error) {
      console.log(error);
    }
  };

  return { showWeather };
})();

export { UI };
