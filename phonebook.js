const express = require('express');
const bodyParser = require('body-parser');
const { initClient, closeClient } = require('./db/mongo_client');

const port = process.env.PORT || 8080;
const app = express();

initClient();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/contacts', require('./routes/contacts'))
  .use('/', require('./routes/index'))
  .listen(port, function (err) {
    if (err) console.log(err);
    console.log('Server listening on PORT', port);
  });
