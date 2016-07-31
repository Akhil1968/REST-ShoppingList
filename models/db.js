var mongoose = require('mongoose');
var chalk = require('chalk');

var dbURI =  'mongodb://edu:edu@ds015879.mlab.com:15879/edurekadb';
//var dbURI = 'mongodb://localhost/shoppingDB';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error', function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});

var ShoppingListSchema = new mongoose.Schema({
  item: String,
  purchased: Boolean,
  remarks: String
}, {collection: 'ShoppingListSchema'});

mongoose.model('ShoppingListModel', ShoppingListSchema);
