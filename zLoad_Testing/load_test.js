import http from 'k6/http';
import {sleep} from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    {duration: '30s', target: '100'}, //below normal load (RAMP)
    {duration: '30s', target: '100'},
    {duration: '30s', target: '200'}, //normal mode (RAMP)
    {duration: '30s', target: '200'},
    {duration: '30s', target: '300'}, //around breaking point (RAMP)
    {duration: '30s', target: '300'},
    {duration: '30s', target: '400'}, //beyond breaking point (RAMP)
    {duration: '30s', target: '400'},
    {duration: '3m', target: '0'} //recovery stage
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