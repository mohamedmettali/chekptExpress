const express = require('express');
const app = express();
const port = 5000;


const checkWorkingHours = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay(); 
  const currentHour = currentDate.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentHour >= 9 && currentHour < 20) {
    next();
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};

app.use(checkWorkingHours);

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});