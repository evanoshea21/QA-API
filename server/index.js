require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');

// var redisClient = 404;

// (async function () {
//   const Redis = require('redis');
//   redisClient = Redis.createClient();
//   redisClient.on('error', (err) => console.log('Redis Client Error', err));
//   await redisClient.connect();
// })();

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
})

// module.exports.redisClient = redisClient;