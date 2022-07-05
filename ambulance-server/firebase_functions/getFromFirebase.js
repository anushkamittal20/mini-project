var ambulances, users;
const { QuerySnapshot } = require('@google-cloud/firestore');
const fs = require('firebase-admin');
const serviceAccount = require('./save-a-life-maps-95a9be5a26f1.json');

fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore(); 
const ambulanceDb = db.collection('ambulance'); 

// One Element only 
// db.collection("ambulance").doc("ambulanceSix").get().then(doc=>{
//     console.log(doc.data());
// })

// All documents of a collection
db.collection("ambulance").get().then(snapshot=>{
    snapshot.forEach(element=>{
        console.log(element.data());
    })
})