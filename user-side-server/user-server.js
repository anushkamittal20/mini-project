const express = require('express')
const redis = require('redis')
const app=express()
const port = 8383
const client = redis.createClient({
    url: 'redis://redis-10709.c212.ap-south-1-1.ec2.cloud.redislabs.com:10709'
    //need this from benny
  })

  async function connect_db() {
    await client.connect()
  }

  async function db_get_wp() {
  return amb_wp = await client.get("next_wp")   //get from redis
  // var amb = {lat: 13.01182, lng: 77.58379};
  // return amb
  }

app.get('/',(req,res) => {
  // const wp=db_get_wp()
  // res.status(200).send(wp)
    res.status(200).send('<h1>Functionalities for user-server communication</h1>')
})

function hello(){
  var amb = {lat: 13.01182, lng: 77.58379};
  return amb
}



app.listen(port,() => console.log(`Server started on port ${port}`))