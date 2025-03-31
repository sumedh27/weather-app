const GIPHY_KEY = "LrBfYV1JS7ZGsI3YeUcpX43BWURk2EYr";

async function getGiphy(condition) {
  console.log(condition);
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=weather%20${condition}`,
    { mode: "cors" },
  );
  const giphyJson = await response.json();
  return giphyJson;
}

async function showGiphyGIF(condition) {
  const weatherGIF = await getGiphy(condition);
  const random = Math.floor(Math.random() * weatherGIF.data.length);
  const gifUrl = weatherGIF.data[random].images.original.url;
  console.log(gifUrl);
  return gifUrl;
}

export { showGiphyGIF };
