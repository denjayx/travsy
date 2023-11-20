const express = require('express');
const { host, port } = require('../config/application');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
