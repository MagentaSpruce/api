# api
API created using Node.JS with Express

To use Express, Postman is first installed. Then Express is installed and required.
```JavaScript
const express = require('express');
```

Create a variable called app and assign to it the result of calling express.
```JavaScript
const app = express();
```

With the methods from express now inherited by app, .listen() can be used to start a server.
```JavaScript
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
```

Next define a route.
```JavaScript
app.get('/api/v1/tours', (req, res) => {});
```

Test the API using Postman/browser and the local host address, 127.0.0.1:3000.
Before sending data using the API the data must be read. To read data files the fs module must be required.
```JavaScript
const fs = require('fs');
```

Now we can read files and return file data, like this:
```JavaScript
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

```

Test the new route in Postman/broswer using 127.0.0.1:3000/api/v1/tours. Implement a route handler for POST requests.
```JavaScript
app.post('/api/v1/tours');
```

To be able to modify the incoming request and access the data, middleware is used.
```JavaScript
app.use(express.json());
```

At this point post route is working. Persist specified data into the relevant json file.  To do this an ID has to be assigned to the new data object. Then newTour is created which becomes both the body that we sent along with the new ID just created. Push this newTour into the tour array. Persist the newTour into the file. Take note that since we are writing to a json file and tours is a javascript object, JSON.stringify(tours) is used.
```JavaScript
const newId = tours[tours.length -1].id + 1;
const newTour = Object.assign({id: newId}, req.body);
tours.push(newTour);
fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
res.status(201).json({
status: 'success',
data: {
tour: newTour,},});
```
