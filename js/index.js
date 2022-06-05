// Initialize and add the map along with user location's marker

// The location of mekhri circle
var user_location = { lat: 13.0146, lng: 77.5830};
var amb = {lat:13.0147, lng:77.5810};
var rit = {lat:13.0306, lng:77.5649};
var directionsService;
var directionsRenderer;
var map;
 
function initMap() {
    // The map, centered at user_location
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    var mapOptions={
        zoom: 15,
        center: user_location
    };

    map = new google.maps.Map(document.getElementById("map"),mapOptions);
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService
    .route({
      origin: { lat: 13.0146, lng: 77.5830     
      },
      destination: {lat:13.0306, lng:77.5649        
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}
