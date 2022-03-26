
var chosenService;

function chooseService(obj, serviceName){    
    console.log(`Chosen service is ${serviceName}`)
    chosenService = serviceName;
    
    var id = obj.id;
    var chosen_button = document.getElementById(id);
    
    clearAllButtons() //removes the green highlight from previously chosen button

    chosen_button.classList.toggle("chosen-green")
    document.querySelector('#confirm-text').innerHTML = `Confirm calling ${chosenService}`
}

function confirmService(){
    if (chosenService == null){
        alert("Please choose a service before proceeding")
    }

    else{
        console.log(`You have confirmed the ${chosenService}`);
        getLocation()
    }
}


var location_placeholder = document.getElementById("location-text");
function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        location_placeholder.innerHTML += "Geolocation is not supported by this browser.";
      }
      console.log(navigator.geolocation.getCurrentPosition(showPosition))
}



function showPosition(position) {
    console.log(position);
      location_placeholder.innerHTML = "Your location is<br>Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}




function clearAllButtons(){ 
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i += 1)
        buttons[i].classList.remove("chosen-green");
}
