const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// GET request to homepage
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("Cant find that!");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});