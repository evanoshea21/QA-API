import http from 'k6/http';
import {sleep} from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [ //scenarios
    // {duration: '1m', target: '300'}, //below normal load (RAMP)
    // {duration: '15s', target: '300'},
    // {duration: '30s', target: '600'}, //normal mode (RAMP)
    // {duration: '15s', target: '600'},
    // {duration: '30s', target: '900'}, //around breaking point (RAMP)
    // {duration: '15s', target: '900'},
    {duration: '1m', target: '1000'}, //beyond breaking point (RAMP)
    {duration: '15s', target: '1000'},
    {duration: '2m', target: '2000'},
    {duration: '15s', target: '2000'},
    {duration: '2m', target: '3000'},
    {duration: '15s', target: '3000'},
    {duration: '2m', target: '4000'},
    {duration: '15s', target: '4000'},
    {duration: '3m', target: '0'}

  ]
  // vus: 1,
  // duration: '15s'
};

const API_URL = 'http://localhost:3006';

export default () => {
  var prodIds = ['1', '2', '3', '4', '5'];
  var productId = prodIds[Math.floor(Math.random() * prodIds.length)];
  var quesIds = ['36', '13', '23', '26'];
  var questionId = quesIds[Math.floor(Math.random() * quesIds.length)];

  http.batch([
    ['GET', `${API_URL}/qa/questions?product_id=${productId}`],
    ['GET', `${API_URL}/qa/questions/${questionId}/answers`]
  ])
  // http.get(`${API_URL}/qa/questions?product_id=${productId}`);
  // http.get(`${API_URL}/qa/questions/${questionId}/answers`);
  sleep(1);
};