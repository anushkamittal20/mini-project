const express = require('express')
const bodyParser = require('body-parser')
const app = express()
let cors = require('cors')
app.use(cors())
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

app.post('/',(req,res)=>{
    // const { parcel } = req.body
    var src = req.body.source
    var dest = req.body.destination
    console.log('source : ',src);
    console.log('destination : ',dest);
    res.status(200).send({status: 'recieved',
        source: src,
        destination: dest  
    })
})

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