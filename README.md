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

Test the new route in Postman/broswer using 127.0.0.1:3000/api/v1/tours
