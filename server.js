const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log('log');
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('unable to append to server.log');
		}
	})
	next();
});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

app.get('/', (req,res) => {
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Heello to my page'

	});
});

app.get('/about', (req,res) => {
	res.render('about.hbs', {
		pageTitle: 'About page'
	});
});
app.get('/bad', (req,res) => {
	//res.send('<h1>Hello Express</h1>');

	res.send({
		errorMessage: 'unable to connect'
	});
});
app.listen(3000, () => {
	console.log('Server starting');
});
