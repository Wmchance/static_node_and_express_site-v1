// Import Express and set up the app
const express = require('express');
const app = express();

// Import data.json
const { projects } = require('./data.json');

// Additional dependencies - 'cookie-parser' & 'body-parser'
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// view engine setup
app.set('view engine', 'pug');

// Add static middleware
app.use('/static', express.static('public'));

/*
* Routes 
*/

// 'Index/home' route
app.get('/', function(req, res, next) {
    res.render('index', { projects });
});

// 'About' route
app.get('/about', function(req, res, next) {
    res.render('about');
});

// Project routes
app.get('/projects/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === projectId );
    res.render('project', { project });
  });

// Start server
app.listen(3000, () => {
    console.log('The app is running on localhost: 3000')
});
