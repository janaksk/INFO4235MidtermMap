// Found the long/latitude of KPU Library on Maps, used here
const kpuLibrary = [49.13204381532353, -122.8714459237983];

// Initializing Map
const map = L.map('map').setView(kpuLibrary, 13);

// Setting up OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/#">Openstreetmap</a> contributors'

}).addTo(map);

// Placing Marker on Library Location
L.marker(kpuLibrary).addTo(map)
  .bindPopup('KPU Library')
  .openPopup();

// We are using Haversine Formula to calculate distance between 2 points
// Haversine Calculation was found here: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function calculateDistance(lat1, lon1, lat2, lon2) {

  const R = 6371; // Radius of Earth (In Kilometers)

  /* I didnt want extra method like in the stackoverflow example, so i simply did the math.pi/180     
     inline for all the areas it would have been done                                             */
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  // Same thing applies here, just did the calculation inline
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * 
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // Distance in Kilometers

  return d; // Return value
}

// Fetching User location using geolocation API built into modern web browsers:
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
if (navigator.geolocation) {  // Checking if they have a browser with the function, if they dont, we parse to the else statement below

  navigator.geolocation.getCurrentPosition(position => { // Extracting user location

    // Putting users location into variable
    const userLocation = [position.coords.latitude, position.coords.longitude];

    // Placing Marker on user location (same as we did to library)
    L.marker(userLocation).addTo(map)
      .bindPopup('Your Current Location')
      .openPopup();

    // Calling our Haversine Formula method to get distance from user location to Library
    const distance = calculateDistance(userLocation[0], userLocation[1], kpuLibrary[0], kpuLibrary[1]);

    // Printing element to our 'distance' box
    document.getElementById('distance').innerText = `The distance to the library is ${distance.toFixed(2)} km.`;

  });
} else {
    // Printing element to our 'distance' box
    document.getElementById('distance').innerText = 'Geolocation is not supported by your browser.';
}