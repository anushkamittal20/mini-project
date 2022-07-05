var ambulances, users;
const { QuerySnapshot } = require('@google-cloud/firestore');
const fs = require('firebase-admin');

const serviceAccount = require('./save-a-life-maps-95a9be5a26f1.json');

fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore(); 
// console.log(db)
const ambulanceDb = db.collection('ambulance'); 
// console.log(ambulanceDb)

async function getAmbulances(){
    try{
        users = await db.collection('users').get();
        let responseArr = [];
        users.forEach(doc=> {
            responseArr.push(doc.data());
        })
        return responseArr;
        }
        catch(e){
            console.log(e);
        }
    }

ambulances = getAmbulances();
// console.log(users);
console.log(ambulances)










        // promise.then(QuerySnapshot => {
        //     ambulances = QuerySnapshot.data
        //     return ambulances
        // })
    
    // ambulances = await ambulanceDb.get()
    // return ambulances
    // ambulances = await db.collection('ambulance').get();
    // .then(console.log(doc.data()))
