const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('hello!!');
})


app.get('/info',(req,res)=>{
    res.status(200).json({info: 'hey'})
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})