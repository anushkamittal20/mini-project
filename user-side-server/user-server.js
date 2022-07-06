const express = require('express')
const redis = require('redis')
const app=express()
const port = 8383
const client = redis.createClient({
    url: 'redis://YOUR REDIS INSTANCE URL'
    //need this from benny
  })

  async function connect_db() {
    await client.connect()
    const amb_wp = await client.get("next_wp")
  }

  async function db_get_wp() {
   return amb_wp = await client.get("next_wp")
  }

app.get('/',(req,res) => {
    res.status(200).send('<h1>Functionalities for user-server communication</h1>')
})

function hello(){
console.log("hello server")
}



app.listen(port,() => console.log(`Server started on port ${port}`))