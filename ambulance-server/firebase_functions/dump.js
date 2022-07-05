//var polyline = require('@mapbox/polyline');
var start_location = [13.0283,77.5731]
var end_location = [13.0306,77.5649]
var current_location = [13.03134,77.56516]
let latLngArray = [];

const { GeoPoint } = require('@google-cloud/firestore');
const fs = require('firebase-admin');

const serviceAccount = require('./save-a-life-maps-95a9be5a26f1.json');

fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore(); 
const ambulanceDb = db.collection('ambulance'); 

var obj = {

    available : true,
    cap_paramedics : 2,
    contact_no : 1234567890,
    hospital_id : "",
    private_id : "",
    type : 0,
    vehicle_no : "KA 00 ML 1234",
   
    location :{
        start_location : new GeoPoint(start_location[0],start_location[1]),
        end_location : new GeoPoint(end_location[0],end_location[1]),
        current_location : new GeoPoint(current_location[0], current_location[1]),
        //waypoints : [[13.02806,77.57305],[13.02827,77.57126],[13.02848,77.57111],[13.02894,77.57065],[13.03009,77.56949],[13.03123,77.56817],[13.03252,77.56669],[13.03256,77.5661],[13.03275,77.56396],[13.03183,77.56465],[13.03134,77.56516],[13.03127,77.56575],[13.03119,77.56582],[13.03099,77.5661],[13.03089,77.56616],[13.03002,77.56605],[13.0301,77.56497],[13.03046,77.56496]]    
    } 
}

const newAmbulance = ambulanceDb.doc('ambulanceFour')

async function addAmbulance(){
    
    await newAmbulance.set(obj)
}

addAmbulance();


for (let i = 0; i < array.length; i++) {
  const gData = new google.maps.LatLng(array[i][0], array[i][1]);
  latLngArray.push(gData);
}

app.get('/read/ambulanceList', async(req,res)=>{
    let resArray = [];
    db.collection("ambulance").get().then(snapshot=>{
        snapshot.forEach(element=>{
            // console.log(element.data());
            resArray.push(element.data());
            console.log('resArray Element ');
            console.log(resArray);
        })
    })
    res.send(resArray);
})


// const x1="{13.0283,77.5731}" //Truffles
// const x2="{13.0665,77.5980}" //Skyline Beverly Park
// const x3="{13.0147,77.5810}" //McDonald's

// const y1="{13.0306,77.5649}"//Ramaiah Institute of technology
// const y2="{13.0328,77.5697}"//Milanos
// const y3="{12.973826,77.590591}"//Cubbon Park




// var overview_polyline = "aawnAszrxMLu@zANG\\?p@u@fD{@`GoAjGUpBGtA@Rb@CdCK`FKtCA|IOfNUlJBtB?hB?@OjCBtC@`GMzFUrA@hAFrBVbBVhAVxFbAdAR|C|@vG~BbCp@l@RHNp@Pf@FfCRpDThAX`Bx@vAd@bAj@Mh@Ij@A^Bf@b@`DFn@@x@SbBm@tGYhB_@rBY|@m@nA{EnIu@vA}@jAaEdFaDxE}@~A[hAUxACd@@nAXbHLxDT`IRfLHpC@RRGLGBC@IA_@Ii@?q@DODEXER?@dABPBBF@H@DvAB~ALjBFPf@b@dBfA~BtB|AbBbA|@VJ`BXrA^HHf@|@zAxC|INvGPzDHnFNNI^`@FFQNuA`AMFpCZfBLB@@BIvCxBE\\DdBZ^R`@DfBLx@Dx@Lz@FhGd@VgEHgArAHLqBAECCHE^AN@@g@@QDGLCdCL^BFB@ROzDGJQBo@E"

// var list_of_points = polyline.decodePath(overview_polyline);

// console.log(list_of_points)










        // let return_value = [];
        // db.collection("ambulance").get().then(snapshot=>{
        //     snapshot.forEach(element=>{
        //         console.log(element.data());
        //         return_value.push(element.data());
        //     })
        // })

        // res.send(return_value)













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
