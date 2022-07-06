var amb = { lat: 13.0147, lng: 77.5810 };
var rit = { lat: 13.0306, lng: 77.5649 };
var user_location = { lat: 13.0326, lng: 77.5697 };
var waypoint = { lat: 13.0328, lng: 77.5697 };
var selectElement = document.getElementById("end");
var map = 0, marker_user = 0, popup = 0,marker_user1,marker;
var markers = [];
var routeResult, rawpolyline, decodedPolyline, waypoints, immediateWaypoints,waypoint_markers;
var directionsService;
  var directionsRenderer;

var amb_button=document.getElementById("amb");
var user_button=document.getElementById("user");
var waypoint_button=document.getElementById("waypointer");

function displayWaypoints(){
  for(var i=0;i<waypoints.length;i++){
      marker = new google.maps.Marker({
      position: {lat:waypoints[i][0],lng:waypoints[i][1]}, //pass the user's location
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    });
    markers.push(marker);
  }
  setTimeout(removeWaypoints, 2500);
}

function removeWaypoints(){
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
}



function generateUser(){
  var decider=Math.floor(Math.random()*10)+1;
  var lat_new,lng_new;

  console.log("orig: "+waypoints[1]);
  console.log("first waypoint: "+waypoints[2]);
 
  if(decider%2==0)
  {
    //generate user that is close
    if(waypoints[1][0]>waypoints[2][0]){
      // update lat of 
      lat_new=waypoints[1][0]-0.0002
      lng_new=waypoints[1][1]-0.0002
    } 
    else if(waypoints[1][1]>waypoints[2][1]){
      
      lat_new=waypoints[1][0]-0.0002
      lng_new=waypoints[1][1]-0.0002
    }
    else if(waypoints[1][0]<waypoints[2][0]){
      //moving to the right
      lat_new=waypoints[1][0]+0.0002
      lng_new=waypoints[1][1]+0.0002
    }
    else{
      
      lat_new=waypoints[1][0]+0.0002
      lng_new=waypoints[1][1]+0.0002
    }
    console.log("close")
  }
  else{
    //generate user far from path
    console.log("far")
    lat_new=waypoints[1][0]+0.007
    lng_new=waypoints[1][1]
  }
  console.log(lat_new);
  var user={lat:lat_new,lng:lng_new};
  PlaceMarker(user);
  PlaceWaypointMarker({lat:waypoints[1][0],lng:waypoints[1][1]});
  if(userLocatedWithinRadius(user, {lat:waypoints[1][0],lng:waypoints[1][1]}, 0.250)){
    displayToggle();
  }
}

function moveAmbulance(){
  console.log("inside move amb")
  var y={lat:waypoints[0][0],lng:waypoints[0][1]}
  console.log(y);
  directionsService
  .route({
    origin:y,
    destination: {
      query: document.getElementById("end").value,
    },
    travelMode: google.maps.TravelMode.DRIVING,
  })
  .then((response) => {
    directionsRenderer.setDirections(response);
  }).catch((e) => window.alert("Directions request failed due to " + e));
  waypoints.shift();
  sendWaypointsToServer(waypoints)
  console.log("length of wayp[oints: "+waypoints.length)
}

amb_button.addEventListener("click",moveAmbulance);
user_button.addEventListener("click",generateUser);
waypoint_button.addEventListener("click",displayWaypoints);

function initMap() {
   directionsService = new google.maps.DirectionsService();
   directionsRenderer = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 13.0306, lng: 77.5649 }, //coordinates of rit
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

      updatePolyline();
      
      //2D array consisting of waypoints lat & long
      var count=0;

      //filtering through decodedPolyline to set waypoints at a distance of 500 meters

      waypoints = decodedPolyline.filter((element, index) => {
        if(count==0)
        {
          count=index;
          return true;
        }
        else{
          var dis=distance(decodedPolyline[count][0],decodedPolyline[index][0],decodedPolyline[count][1],decodedPolyline[index][1]);
          console.log(dis)
          if(dis>=0.5){
          count=index;
          return true;
        }
      }
        return false;
      });
      //place markers below 
      // console.log("waypoints length: " + waypoints.length);
      // for(var i=0;i<waypoints.length;i++){
        
      //  var newcor1 = { lat: waypoints[i][0], lng: waypoints[i][1] };
      //  PlaceMarker(newcor1)
      // }
      // var radius = findMinDistance() / 2;
      // console.log("radius=" + radius);
    })
    .catch((e) => window.alert("Directions request failed due to " + e));
}

//driver function
function intersectionAlgorithm(){
    updatePolyline();
    updateWaypoints();
    generateWaypoints();  
    var coordinate;
    for(var i=1;i<=2;i++){
      coordinate=convertWaypointstoCoordinates();
      //retrive user's current location
      userLocatedWithinRadius(getUsersLocation(),coordinate,0.250);
    }
    
}

async function sendWaypointsToServer(calc_polyline){
  const baseUrl = 'http://localhost:8080'
  console.log('in the server sending function')
  console.log(calc_polyline)
  const res = await fetch(baseUrl,{
    method: 'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({
      first_point: calc_polyline[0],
      waypoints : calc_polyline
    })
  })

  console.log(res);

}



function getUsersLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(pos)
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } 
  else 
  {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}



function convertWaypointstoCoordinates(){
    return {lat:immediateWaypoints[0][0],lng:immediateWaypoints[0][1]};
}

function generateWaypoints(){
  immediateWaypoints=[waypoints[0],waypoints[1]]
}  

function updateWaypoints()
{
  //to check the array of waypoints left for the ambulance to cover
  //returns an object of the lat & long of next 2 waypoints
  if(decodedPolyline.includes(waypoints[0])){
    return;
  }
  else{
    waypoints.shift();
  }
}


function updatePolyline()
{  
  rawPolyline = routeResult.overview_polyline;
  decodedPolyline = decodePath(rawPolyline);
  // sendWaypointsToServer(decodedPolyline);
}


//finding minimum distance between 2 consecutive waypoints to find the minimum radius value 
function findMinDistance() {
  // Initialize difference as infinite
  var diff = 99999999, p, k;
  // Find the min diff by comparing difference
  // of all possible pairs in given array
  for (var i = 0; i < waypoints.length; i++) 
  {
    for (var j = i + 1; j < waypoints.length; j++) 
    {
        var dis = distance(waypoints[i][0], waypoints[j][0], waypoints[i][1], waypoints[j][1]);
        console.log(dis)
        if (dis < diff && dis != 0) 
        {
          diff = dis;
          p = i; k = j;
        }
    }
  }
  // Return min diff {lat:13.0147,lng:77.5810};

  var newcor = { lat: waypoints[p][0], lng: waypoints[p][1] };

  var newcor1 = { lat: waypoints[k][0], lng: waypoints[k][1] };
  // PlaceMarker({lat:waypoints[k][0],lng:waypoints[k][1]})
  return diff;
}


function distance(lat1, lat2, lon1, lon2) {

  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return (c * r);
}

function userLocatedWithinRadius(checkPoint, centerPoint, km) {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  console.log("entered the function");
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

function PlaceMarker(x) {

  // setTimeout(function(){
  marker_user = new google.maps.Marker({
    position: x, //pass the user's location
    map: map,
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  });
}

function PlaceWaypointMarker(x) {

  // setTimeout(function(){
  marker_user1 = new google.maps.Marker({
    position: x, //pass the user's location
    map: map,
    icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
  });
}
// ,10000); }



// selectElement.addEventListener('change', (event) => {
//   var x = selectElement.value
//   if (userLocatedWithinRadius(user_location, waypoint, 2000)) {
//     //setTimeout(PlaceMarker(user_location),10000);
//     PlaceMarker(user_location);
//     setTimeout(displayToggle, 15000);
//     //displayToggle();
//   }
// });

function displayToggle() {
  console.log("in display toggle");
  popup = document.getElementById("near");
  popup.style.display = "flex";

  setTimeout(removeUser, 5000);
  // removeUser();

}

function removeUser() {
  marker_user.setMap(null);
  setTimeout(function () { popup.style.display = "none"; }, 3000);
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