import { getWeather } from './weather_data';

const UI = (() => {
  const content = document.querySelector('#content');

  const getInput = () => {
    const btn = document.querySelector('.search-btn');
    let myInput = document.querySelector('#myInput');

    btn.addEventListener('click', () => {
      const cityInput = document.querySelector('#myInput').value;
      UI.showWeather(cityInput, switchBtn.checked);
      document.querySelector('#myInput').value = '';
    });

    myInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        btn.click();
      }
    });
  };

  const updateCard = (city, description, temp, feels_like, humidity) => {
    let cityD = document.querySelector('.city');
    let descriptionD = document.querySelector('.description');
    let tempD = document.querySelector('.temp');
    let feelsLikeD = document.querySelector('.feels-like');
    let humidityD = document.querySelector('.humidity');

    cityD.textContent = city;
    descriptionD.textContent = description;
    tempD.innerHTML = `<i class="fa-solid fa-temperature-full"></i> ${temp} `;
    feelsLikeD.innerHTML = `<i class="fa-solid fa-thermometer"></i> ${feels_like}`;
    humidityD.innerHTML = `<i class="fa-solid fa-droplet"></i> ${humidity}%`;
  };

  const showWeather = async (nCity, bool) => {
    try {
      let result = await getWeather(nCity);

      let city = result[0];
      let description = result[1];

      let temp = '';
      let feels_like = '';

      if (!bool) {
        temp = result[2];
        feels_like = result[3];
      } else {
        temp = (result[2] * 1.8 + 32).toFixed(1);
        feels_like = (result[3] * 1.8 + 32).toFixed(1);
      }

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
      //alert('cant find place');
    }
  };

  const switchBtn = document.querySelector('#switch');
  switchBtn.addEventListener('click', () => {
    let currentCity = document.querySelector('.city').textContent;
    let unitText = document.querySelector('#unitText');

    if (!switchBtn.checked) {
      unitText.innerHTML = 'Celsius (&#8451;)';
    } else {
      unitText.innerHTML = 'Fahrenheit (&#8457;)';
    }
    showWeather(currentCity, switchBtn.checked);
  });

  return { showWeather, getInput };
})();

export { UI };
