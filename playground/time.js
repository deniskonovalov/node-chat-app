const moment = require('moment');

let date = moment();
date.add(4, 'hour');
console.log(date.format('h:mm a'));

// let date = new Date();
// console.log(date.getMonth());