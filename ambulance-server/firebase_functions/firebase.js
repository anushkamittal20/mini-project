const { async } = require('@firebase/util')
const { credentials } = require('@grpc/grpc-js')
const express = require('express')
const app = express()

const admin = require('firebase-admin')
const credential = require('../save-a-life-maps-95a9be5a26f1.json')

admin.initializeApp({
    credential: admin.credential.cert(credential)
});

const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/read/all', async(req,res)=>{
    try{
        const ambulanceDb = db.collection("ambulance");
        const response = await ambulanceDb.get();
        let responseArr = [];
        response.forEach(doc=>{
            responseArr.push(doc.data());
        });
        res.send(responseArr);

    }
    catch(e){
        console.log(e);
        res.send(e);
    }
})








const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})