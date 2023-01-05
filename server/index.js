require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');
const numCPUs = require('os').cpus().length;

var redisClient = undefined;
console.log('redisURL', process.env.REDIS_HOST);
console.log('CPUs Available -> ', numCPUs);

(async function () {
  const Redis = require('redis');

  redisClient = Redis.createClient(/*{
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
  }*/);

  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  redisClient.on('connect',() => console.log('connected to redis!!'));
  await redisClient.connect();
})();

// const getRedis = async (key) => {
//   var value = await redisClient.get(key);
//   if(value) {
//     console.log(`REDIS VALUE for key:${key}`, value);
//   } else {
//     console.log(`No cache, setting the key:${key} to value: ${val}`);
//     redisClient.set(`${val}`, '1')
//   }
// }

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('...server listening on port ', PORT);
})//

module.exports.redisClient = redisClient;