const redis = require('ioredis')
// const password = "4jz12aLGMVt6RyZqtW8Z2W1GxZB9eWU"
const password = "NZ5CaYKiyD08ITMfToscbcx3sJqQkKXD"
var url = `redis://default:${password}@redis-10983.c299.asia-northeast1-1.gce.cloud.redislabs.com:10983`

const redisClient = redis.createClient({host:'redis-10983.c299.asia-northeast1-1.gce.cloud.redislabs.com',port:10983,username:'default',password:password});

redisClient.on('connect',() => {
    console.log('connected to redis successfully!');
    // client.set("test", "hello")

  // authenticate()
  connectToDbOne()
  connectToDbTwo()


})

redisClient.on('error',(error) => {
    console.log('Redis connection error :', error);
})



async function connectToDbOne(){
  // await client.connect()
  redisClient.set("test", "hello")
  // client.quit()
}  

async function connectToDbTwo(){
  // await client.connect()
  const value = await redisClient.get("test")
  console.log(value);
  // client.quit()
}



module.exports = redisClient;