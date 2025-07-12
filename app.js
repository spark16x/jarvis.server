const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


app.use('/', (req, res) => {
  res.send('Everything is ok ');
});

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).send('404 | Error');
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
