require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');
// const Redis = require('redis');
// const redisClient = Redis.createClient();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('...server listening on port ', PORT);
})