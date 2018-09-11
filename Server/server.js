require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const ctrl = require('./server-controllers');
const mid = require('./middleware');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/../build'));

app.use(bodyParser.json());

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true
	})
);

massive(CONNECTION_STRING).then((db) => {
	app.set('db', db);
	console.log('Database reporting for duty');
});

//this keep the fake user logged in during development
//comment out the line below to disable

// app.use(mid.bypassAuthInDevelopment)

// users endpoints
app.get('/api/all-users', ctrl.getAllUsers);
app.get('/api/user/:id', ctrl.getUserById);
app.post('/api/new-user', ctrl.createUser);
app.get('/api/logout', ctrl.logout);

//test_results endpoints
app.get('/api/all-results', ctrl.getAllResults);

//typing endpoint
app.get('/api/get-snippet/:id', ctrl.getSnippet);

app.post('/api/update-user-metrics', ctrl.updateUserMetrics);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT, () => console.log(`Listening in on ${SERVER_PORT}`));
