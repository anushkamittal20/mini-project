//var polyline = require('@mapbox/polyline');
var start_location = [13.0147,77.5810]
var end_location = [13.0328,77.5697]
var current_location = [13.031,77.57739]
var waypoints = [[13.0147,77.581],[13.01475,77.58369],[13.01579,77.58384],[13.01618,77.58384],[13.01867,77.58387],[13.02047,77.5839],[13.0211,77.58407],[13.02191,77.58429],[13.02304,77.58438],[13.02442,77.58279],[13.02475,77.58236],[13.02529,77.58117],[13.02551,77.58104],[13.02585,77.58082],[13.02618,77.58037],[13.02676,77.5799],[13.02779,77.57936],[13.02861,77.57901],[13.0299,77.57815],[13.0307,77.57758],[13.031,77.57739],[13.03155,77.57699],[13.03208,77.57619],[13.03289,77.57354],[13.03321,77.57226],[13.03343,77.57192],[13.0347,77.5718],[13.03436,77.57024],[13.03429,77.56983],[13.03416,77.56935],[13.03409,77.56859],[13.03273,77.5696]]
let latLngArray = [];

const { GeoPoint } = require('@google-cloud/firestore');
const fs = require('firebase-admin');

const serviceAccount = require('../save-a-life-maps-95a9be5a26f1.json');

fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore(); 
const ambulanceDb = db.collection('ambulance'); 
latLngArray = waypoints.map((x)=>x.toString())

var obj = {

    available : true,
    cap_paramedics : 2,
    contact_no : 33578882938,
    hospital_id : "3",
    private_id : "0",
    type : 1,
    vehicle_no : "KA 07 DD 5489",
   
    location :{
        start_location : start_location,
        end_location : end_location,
        current_location : current_location,
        waypoints : latLngArray
    } 
}

const newAmbulance = ambulanceDb.doc('mcdToMilano')

async function addAmbulance(){
    await newAmbulance.set(obj)
}

async function getAmbulance(){
    var result = await ambulanceDb.get()
    
    try{
        const query = await ambulanceDb.get(); 
        return query.docs.data();
    }
    catch(e){
        console.log(e);
    }
    
    return result;
}

var returned = getAmbulance();

// addAmbulance();
console.log(returned);

// for (let i = 0; i < array.length; i++) {
//   const gData = new google.maps.LatLng(array[i][0], array[i][1]);
//   latLngArray.push(gData);
// }



// const x1="{13.0283,77.5731}" //Truffles
// const x2="{13.0665,77.5980}" //Skyline Beverly Park
// const x3="{13.0147,77.5810}" //McDonald's

// const y1="{13.0306,77.5649}"//Ramaiah Institute of technology
// const y2="{13.0328,77.5697}"//Milanos
// const y3="{12.973826,77.590591}"//Cubbon Park




// var overview_polyline = "aawnAszrxMLu@zANG\\?p@u@fD{@`GoAjGUpBGtA@Rb@CdCK`FKtCA|IOfNUlJBtB?hB?@OjCBtC@`GMzFUrA@hAFrBVbBVhAVxFbAdAR|C|@vG~BbCp@l@RHNp@Pf@FfCRpDThAX`Bx@vAd@bAj@Mh@Ij@A^Bf@b@`DFn@@x@SbBm@tGYhB_@rBY|@m@nA{EnIu@vA}@jAaEdFaDxE}@~A[hAUxACd@@nAXbHLxDT`IRfLHpC@RRGLGBC@IA_@Ii@?q@DODEXER?@dABPBBF@H@DvAB~ALjBFPf@b@dBfA~BtB|AbBbA|@VJ`BXrA^HHf@|@zAxC|INvGPzDHnFNNI^`@FFQNuA`AMFpCZfBLB@@BIvCxBE\\DdBZ^R`@DfBLx@Dx@Lz@FhGd@VgEHgArAHLqBAECCHE^AN@@g@@QDGLCdCL^BFB@ROzDGJQBo@E"

// var list_of_points = polyline.decodePath(overview_polyline);

// console.log(list_of_points)























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
