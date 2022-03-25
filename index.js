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

    // The marker, positioned at user_location
    const marker_user = new google.maps.Marker({
      position: user_location,
      map: map,
    });

    //marker for ambulance 
    const marker_amb = new google.maps.Marker({
        position: amb,
        map: map,
      }); 
}



function calcRoute() {
    var start = user_location;
    var end = rit;
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
}

calcRoute();

//generating a radius for the user location

function arePointsNear(checkPoint, centerPoint, km) {
   var ky = 40000 / 360;
   var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
   var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
   var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
   return Math.sqrt(dx * dx + dy * dy) <= km;
}

//calling the function when ambulance is headed towards the user

// var headed=arePointsNear(amb,user_location,0.4);
// alert(headed);

//calling the function when ambulance is NOT headed towards the user
// amb = {lat:13.0145, lng:77.5400};
// var headed=arePointsNear(amb,user_location,0.4);
// console.log(headed);
// alert(headed);


//Generating a path from point C to D for the user
