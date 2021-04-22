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

Define a route which can accept a variable.
```JavaScript
app.get('/api/v1/tours/:id', (req, res) => {});
```

Retrieve the object(tour) with the same ID as the one retrieved from the parameter(URL variable) from the relevant json file(tours array).
```JavaScript
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  })
```

Ensure that non-existant ID's cannot be used.
```JavaScript
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
```

Make app work for PATCH Http methods to allow data updates.
```JavaScript
app.patch('/api/v1/tours/:id', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...>'
        }
    })
})
```

Handle delete requests.
```JavaScript
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
```

Refactor code:
```JavaScript
'use strict';

const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

***Optional: Install morgan using npm i morgan, then require it, then use it.
```JavaScript
const morgan = require('morgan');
app.use(morgan('dev'));
```

Implement routes for the users resource(for creating user accounts, assigning user roles, ect).
```JavaScript
app.route('/api').get(getAllUsers).post(createUser);
app.route('/api/v1/user/:id').get(getUser).patch(updateUser).delete(deleteUser);
```

Create the five corresponding functions.
```JavaScript
const getAllUsers = (req, res) => {
res.status(500).json({
status: 'error',
message: 'This route is not yet defined'
})
}

const getUser = (req, res) => {
res.status(500).json({
status: 'error',
message: 'This route is not yet defined'
})
}

const createUser = (req, res) => {
res.status(500).json({
status: 'error',
message: 'This route is not yet defined'
})
}

const updateUser = (req, res) => {
res.status(500).json({
status: 'error',
message: 'This route is not yet defined'
})
}

const deleteUser = (req, res) => {
res.status(500).json({
status: 'error',
message: 'This route is not yet defined'
})
}
```

Construct a router for each resource and mount them.
```JavaScript
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/api/v1/tours').get(getAllTours).post(createTour);
tourRouter.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(createUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/tours', userRouter);
```

Refactored the application into multiple files, app.js, tourRoutes.js, & userRoutes.js. app.js is the global app file and both imports and mounts the other two routers.
```JavaScript
```



sss
