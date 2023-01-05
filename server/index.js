require('dotenv').config();
const cluster = require('cluster');
const express = require('express');
const cors = require('cors');
const router = require('./router');
const numCPUs = require('os').cpus().length;

var redisClient = undefined;
// console.log('redisURL', process.env.REDIS_HOST);
// console.log('CPUs Available -> ', numCPUs);

(async function () {
  const Redis = require('redis');

  redisClient = Redis.createClient(/*{
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
  }*/);

  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  // redisClient.on('connect',() => console.log('connected to redis!!'));
  await redisClient.connect();
})();

//============== APP =================

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// console.log('processPID ', process.pid);
app.use(router);

const PORT = process.env.PORT || 4000;

//
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs-1; i++) {
    cluster.fork();
  }

  //Check if work id is died
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {
  // This is Workers can share any TCP connection
  // It will be initialized using express
  console.log(`Worker ${process.pid} started`);

  app.listen(PORT, function() {
    console.log(`Your cluster SERVER is running on port ${PORT}`);
  });
}
//

// app.listen(PORT, () => {
//   console.log('...server listening on port ', PORT);
// })

module.exports.redisClient = redisClient;