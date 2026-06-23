const express = require('express');
const app = express();
const port = 8000;


app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello Anas , Welcome to Express Program!');
});

app.post('/', (req, res) => {
  //const name  = req.body.name;
  //const age = req.body.age;
  const { name, age } = req.body; 

  res.send('Got a POST request  ' +name +" age is "+age);


});

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});

app.listen(port, () => {
  console.log(`Hello Anas ${port}`);
});