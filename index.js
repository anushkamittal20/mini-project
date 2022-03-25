// Initialize and add the map along with user location's marker





// The location of mekhri circle
const user_location = { lat: 13.0145, lng: 77.5835};
const amb = {lat:13.0145, lng:77.5810};

function initMap() {
    // The map, centered at user_location
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 18,
      center: user_location,
    });
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

  //generating a radius for the user location

  function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  //calling the function when ambulance is headed towards the user

var headed=arePointsNear(amb,user_location,0.4);
alert(headed);

  //calling the function when ambulance is NOT headed towards the user

//    amb = {lat:13.0145, lng:77.5400};
//   var headed=arePointsNear(amb,user_location,0.4);
//   alert(headed);

