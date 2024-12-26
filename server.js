//function add(a, b)
/* {
    return(a + b);
} */

//function type 2
/* var add = function(a,b)
{
   return(a+b)
} */

//function type 3 (arrow function)
/* var add(a, b) => {return(a+b)}
*/
//function type 4
/* var add = (a, b) => a + b;
var result = add(2,6);
console.log(result);

// Example for calling value from notes.js file through module.exports
const notes = require('./notes.js');
var age = notes.age;
console.log(age);

//Example for LODASH - it is used to deal with array data
var _=require('lodash');

var data = ['person', 1, 2, 1, 2, 'person'];
var filter = _.uniq(data)
console.log(filter)
*/

// install express npm
const express = require('express')
const app = express();
const db = require('./db.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('/', function (req, res) {
  res.send('Welcome to my hotel!!!... How can i help you?')
})

// import the router files
const menuItemRoutes = require('./routes/menuitemRoutes.js');
const personRoutes = require('./routes/personRoutes');

//Use the routers
app.use('/menu', menuItemRoutes);
app.use('/Person', personRoutes);

app.listen(3000, ()=>{console.log('Listening on port 3000')})