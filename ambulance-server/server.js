const express = require('express')
const bodyParser = require('body-parser')
const app = express()
let cors = require('cors')
app.use(cors())

const redis = require('ioredis')
const password = "NZ5CaYKiyD08ITMfToscbcx3sJqQkKXD"
const redisClient = redis.createClient({host:'redis-10983.c299.asia-northeast1-1.gce.cloud.redislabs.com',port:10983,username:'default',password:password});

redisClient.on('connect',() => {
    console.log('connected to redis successfully!');
    // client.set("test", "hello")
  // authenticate()  
})
redisClient.on('error',(error) => {
    console.log('Redis connection error :', error);
})


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hey there!!');
    // res.json.apply({info: 'hey'})
})


app.get('/info',(req,res)=>{
    // res.send('hey there!!');
    res.status(200).json({info: 'hey'})
})

// app.post('/',(req,res)=>{
//     // const { parcel } = req.body
//     var src = req.body.source
//     var dest = req.body.destination
//     console.log('source : ',src);
//     console.log('destination : ',dest);
//     res.status(200).send({status: 'recieved',
//         source: src,
//         destination: dest  
//     })
// })

app.post('/',(req,res)=>{
    // const { parcel } = req.body
    var waypoints = req.body.waypoints
    var first_point = req.body.first_point
    // var dest = req.body.destination
    console.log('\n\nFirst Point', first_point, '\n\n');
    console.log('polyline : ',waypoints);
    // console.log('destination : ',dest);
    res.status(200).send({status: 'recieved',
        recieved: waypoints,
        next_point: first_point
        // destination: dest  
    })

 
    
    sendNextWaypoint(first_point)
    // redisClient.disconnect()

})


async function sendNextWaypoint(next_point){
    next_point_json = JSON.stringify(next_point)
    redisClient.set("ambulanceOne", next_point_json)
    const test = await redisClient.get("ambulanceOne")
    console.log(test);
}

app.post('/ambulance/routes',async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
    }
})

// app.put('/ambulance/:ambulanceID')




const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})