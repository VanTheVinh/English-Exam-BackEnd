const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Định tuyến đơn giản
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Định tuyến POST
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received', data: data });
}) ;

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
