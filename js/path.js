
var amb = {lat:13.0147,lng:77.5810};
var rit = {lat:13.0306,lng:77.5649};
var user_location={lat:13.0326,lng:77.5697};
var waypoint={lat:13.0328,lng:77.5697};
var selectElement=document.getElementById("end");
var map=0,marker_user=0,popup=0;
var routeResult,rawpolyline,decodedPolyline;




function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: {lat:13.0306,lng:77.5649}, //coordinates of rit
    });


    directionsRenderer.setMap(map);
      
    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
  
    document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);
  }
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService
      .route({
        origin: {
          query: document.getElementById("start").value,
        },
        destination: {
          query: document.getElementById("end").value,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);

        //
        console.log("Display routeResult = routes[0]")
        routeResult = response.routes[0];
        console.log(routeResult)

 
        console.log("Display polyline")
        rawPolyline = routeResult.overview_polyline;
        console.log(rawPolyline)
        
        decodedPolyline = decodePath(rawPolyline);
        console.log(decodedPolyline,5);
        // var polyline_returned = decodePath(routeResult.overviewPolyline,5);
        // console.log(polyline_returned)
 

      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }

  function userLocatedWithinRadius(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    console.log("entered the function");
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  function PlaceMarker(x){

    setTimeout(function(){
    marker_user = new google.maps.Marker({
      position: x, //pass the user's location
      map: map,
      icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    });
  },10000);
  }



  selectElement.addEventListener('change', (event) => { 
    var x=selectElement.value
    if(userLocatedWithinRadius(user_location, waypoint, 2000))
    {
        //setTimeout(PlaceMarker(user_location),10000);
        PlaceMarker(user_location);
        setTimeout(displayToggle,15000);
        //displayToggle();
    }
});

function displayToggle(){
  popup=document.getElementById("near");
  popup.style.display="flex";

  setTimeout(removeUser,5000);
  // removeUser();

}

function removeUser(){
  marker_user.setMap(null);

  setTimeout(function(){popup.style.display="none";}, 3000);
  

}
  



function decodePath(str, precision) {
  var index = 0,
      lat = 0,
      lng = 0,
      coordinates = [],
      shift = 0,
      result = 0,
      byte = null,
      latitude_change,
      longitude_change,
      factor = Math.pow(10, Number.isInteger(precision) ? precision : 5);


  while (index < str.length) {

      // Reset shift, result, and byte
      byte = null;
      shift = 0;
      result = 0;

      do {
          byte = str.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << shift;
          shift += 5;
      } while (byte >= 0x20);

      latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

      shift = result = 0;

      do {
          byte = str.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << shift;
          shift += 5;
      } while (byte >= 0x20);

      longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

      lat += latitude_change;
      lng += longitude_change;

      coordinates.push([lat / factor, lng / factor]);
  }

  return coordinates;
};