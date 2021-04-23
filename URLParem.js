'use strict';

//Responding to URL Parameters//
//Learn an easy way to define parameters in the URL, read them, and respond to them.

//Want to implement a way of getting only one tour instead of all tours as a response. This is because right now we have only the endpoint /tours which gives us all of them.

//Create a new GET request in Postman using 127.0.0.1:3000/api/v1/tours/5

//   /5 is a variable - it could be anything besides a 5. That piece of the URL is known as a VARIABLE. So we need to define a route which can accept a variable.

//We add a variable to the route. The variable is defined using a :   Now we have a variable called id - could have been called anything. This code does NOT replace the other GET method. It is a NEW method.

//req.params is where all of the variables we define are stored. The variables in the URL are aka parameters and they are stored inside of req.params and now available for use

//will now run 127.0.0.1:3000/api/v1/tours/5 in Postman so we can see req.params. This is a GET request. resuls show success and the new object {id: '5'}
// app.get('/api/v1/tours/:id', (req, res) => {
//    console.log(req.params);
//     res.status(200).json({
//       status: 'success',
//       results: tours.length,
//       data: {
//         tours,
//       },
//     });
//   });

//So req.params is an object which auto assigns the value to our defined variable(parameter). We could define multiple variables as shown:
//127.0.0.1:3000/api/v1/tours/5/:x/:y    then you would have to define those variables in the Postman URL:
//127.0.0.1:3000/api/v1/tours/5/23/46
//Then you send that request and get back a new object showing id, x and y variables with values.

//if we define them like this in URL then must specify. If for example we did not include the y variable then we would hit an error bc we are not hitting the exact route.

//One thing we can do about that is to use OPTIONAL parameters. If we want to make the /:y parameter optional then we just add a ? mark to it so now we no longer have to specify it:
////127.0.0.1:3000/api/v1/tours/5/:x/:y?

//Now this will run the same as before but y will be shwon as undefined inside of the returned object if it is left out of the URL

//We only need the id for our purposes. So now we need to get the tour with the same id from our data.json

//find() can be used on arrays. Inside of find() we pass a callback function. This will create a loop through each array and in each iteration we will have access to the current element and we will return either true or false in each iteration. The find() method will then create an array which only contains the element where the comparison was true. In this situation we want to find the element whose id is equal to the one that we get from the parameters

//by specifying this callback function with this comparison we ensure that only the elemnt with the id equal to the parameter id will get returned from the find() method and stored into tour.

//const tour = tours.find(el => el.id === id)

//the above wont work stand alone bc the values are strings and we need to convert that to a number

//Here is a nice trick where JS, when we multiply a string that looks like a number, when we multiply it with another number, it auto converts the string to a number.
//const id = req.params.id * 1;

//now we already have our tour, ready to send. The data that we want to send is tour
// const id = req.params.id * 1;
// const tour = tours.find((el) => el.id === id);

// res.status(200).json({
//   status: 'success',
//   data: {
//     tours: tour,
//   },

//we only want 127.0.0.1:3000/api/v1/tours/5 now in Postman and now we will get returned back the tour with id 5 and only that tour. Can try the same for /2 or others and get returned back the single object for each.

//if an id is used which does not exist then nothing is returned - a data: {} is returned with a 200 status code. However this does not make much sense so lets change it

//if(id > tours.length){
//     return resizeBy.status(404).json({
//         status: 'fail',
//         message: 'Invalid ID'
//     })
// }

//testing now in Postman with an invalid ID returns the json object from above.

//Thus we have learned to specify parameters in the URL, then we learned how to read the parametrs from the URL by using req.params. Then we used that id parameter to find the tour with that exact id.
