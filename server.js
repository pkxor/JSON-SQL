var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// Configure MySQL connection
var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '',
	database: 'test'
  })

//Establish MySQL connection
connection.connect(function(err) {
   if (err) 
      throw err
   else {
       console.log('Connected to MySQL');
       // Start the app when connection is ready
       app.listen(3333);
       console.log('Server listening on port 3333');
 }
});
console.log('out Connection');
app.use(bodyParser.json())

console.log('get Function');
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+ '/myfile.html'));
  console.log('get Function inside');
  
});

console.log('Post Function outside');

app.post('/', function(req, res) {
console.log('out in Post function');
var jsondata = req.body;
var values = [];

for(var i=0; i< jsondata.length; i++)
  values.push([jsondata[i].name,jsondata[i].age]);

//Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
connection.query('INSERT INTO test (name, age) VALUES ?', [values], function(err,result) {
  if(err) {
     res.send('Error');
  }
 else {
     res.send('Success');
  }
});
});
