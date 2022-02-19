const fetchGif = async () => {
  const img = document.querySelector('img');
  let description = 'snow';
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=wvYaWc6JzHh8fPYLvchCol3fqBrKOQke&s=${description}`,
      { mode: 'cors' }
    );
    const gifData = await response.json();
    console.log(gifData);
    img.src = gifData.data.images.original.url;
  } catch (error) {
    console.log(error);
  }
};

export default fetchGif;
