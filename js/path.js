var user_location = { lat: 13.0146, lng: 77.5830};
var amb = {lat:13.0147, lng:77.5810};
var rit = {lat:13.0306, lng:77.5649};

function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: 12.9716, lng: 77.5946},
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
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }

// function initMap() {
//     var pointA = new google.maps.LatLng(13.0146, 77.5830),
//         pointB = new google.maps.LatLng(13.0306, 77.5649),
//         myOptions = {
//             zoom: 7,
//             center: pointA
//         },
//         map = new google.maps.Map(document.getElementById('map'), myOptions),
//         // Instantiate a directions service.
//         directionsService = new google.maps.DirectionsService,
//         directionsDisplay = new google.maps.DirectionsRenderer({
//             map: map
//         }),
//         markerA = new google.maps.Marker({
//             position: pointA,
//             title: "point A",
//             label: "A",
//             map: map
//         }),
//         markerB = new google.maps.Marker({
//             position: pointB,
//             title: "point B",
//             label: "B",
//             map: map
//         });

//     // get route from A to B
//     calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

// }



// function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
//     directionsService.route({
//         origin: pointA,
//         destination: pointB,
//         avoidTolls: true,
//         avoidHighways: false,
//         travelMode: google.maps.TravelMode.DRIVING
//     }, function (response, status) {
//         if (status == google.maps.DirectionsStatus.OK) {
//             directionsDisplay.setDirections(response);
//         } else {
//             window.alert('Directions request failed due to ' + status);
//         }
//     });
// }

// initMap();