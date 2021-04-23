'use strict';
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env);

// 4) Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`I still work baby! 🤶`);
  console.log(`App running on port ${port}...`);
});
