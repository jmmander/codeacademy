// Foursquare API Info
const clientId = '<ID>';
const clientSecret = '<SECRET>';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '<KEY>';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
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

const getVenuePhotos = async (venueId) => {
  const urlToFetch = 'https://api.foursquare.com/v2/venues/' + venueId + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20200720'
  console.log(urlToFetch)
    try {
      const response = await fetch(urlToFetch);
      if (respsone.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse.bestPhoto;
      }
    } catch(error) {
      console.log('error:');
      console.log(error);
    }
  }



// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImage = getVenuePhotos(venue.id)
    const venueImageSrc = venueImage.prefix + 'width100' + venueImage.suffix;
    console.log(venueImageSrc)
    let venueContent = createVenueHTML(venue.name, venue.location, venueImageSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
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
