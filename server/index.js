const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 8081;

// For http requests
app.use('/', routes);

app.listen(port, () => {
  console.log(`Service is listening on, port ${port}`);
});
