// Foursquare API Info
const clientId = 'U4B2NYZDQAZIV12VKGBBXQLJECEA25RSL2MLDJNPPR14PXF1';
const clientSecret = 'FD2JWDZ5V5YVU5OOYS4WOPNHAYYZXGZVOXNGLH4CIAML1S0P';
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
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const im = getVenuePhoto(venue.id).then(image => {
    return image.response.venue.bestPhoto}).then(best => { 
        const imgSrc = best.prefix + 'width300' + best.suffix;
    let venueContent = createVenueHTML(venue.name, venue.location, imgSrc);
    $venue.append(venueContent);})
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
