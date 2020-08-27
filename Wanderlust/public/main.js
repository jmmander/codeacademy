// Foursquare API Info
const clientId = 'U4B2NYZDQAZIV12VKGBBXQLJECEA25RSL2MLDJNPPR14PXF1';
const clientSecret = '5GBTVPFV3VFLM3R230ES3FFHATDCBUDX0IXVHMUIQAWWFGEN';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '1345198d8b35197b5d23d018f6acf6d2';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//helper functions:
const createVenueHTML = (name, location, iconSource) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
}

const createWeatherHTML = (currentDay) => {
  console.log(currentDay)
  return `<h2>${weekDays[(new Date()).getDay()]}</h2>
        <h2>Temperature: ${kelvinToFahrenheit(currentDay.main.temp)}&deg;F</h2>
        <h2>Condition: ${currentDay.weather[0].description}</h2>
      <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);

// AJAX functions:
const getVenues = async () => {
const city = $input.val();
const urlToFetch = url + city+'&limit=10' + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20200720';
try {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
    return venues
  }
} catch(error) {
  console.log(error)
}

}

const getForecast = async () => {
  const urlToFetch = weatherUrl + '?&q=' + $input.val() + "&APPID=" + openWeatherKey;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse
    }
  } catch(error) {
    console.log(error);
  }

}

const getVenuePhoto = async (venueId) => {
  const urlToFetch = 'https://api.foursquare.com/v2/venues/' + venueId + '?&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20200720';
    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
    } catch(error) {
      console.log(error);
    }
  }

function formSrc(venueImage) { 
  const imgSrc = venueImage.prefix + 'width100' + venueImage.suffix;
  return imgSrc
  }

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const im = getVenuePhoto(venue.id).then(image => {
    return image.response.venue.bestPhoto}).then(best => { 
        const imgSrc = best.prefix + 'width300' + best.suffix;
    let venueContent = createVenueHTML(venue.name, venue.location, imgSrc);
    $venue.append(venueContent);})
  });
  if (venues[0].location.city === undefined){
    citySearch = $('#city').val();
    $destination.append(`<h2>${citySearch}</h2>`);
  } else {
    $destination.append(`<h2>${venues[0].location.city}</h2>`);
  }
  
}

const renderForecast = (day) => {
  let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}



const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then((venues) => renderVenues(venues));
  getForecast().then(forcast => renderForecast(forcast));
  return false;
}
$submit.click(executeSearch)
