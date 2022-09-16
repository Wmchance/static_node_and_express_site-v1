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

    if(+projectId < projects.length && +projectId >= 0) {
        const project = projects.find( ({ id }) => id === projectId );
        res.render('project', { project });
    };
    next();
});

/*
* Error handlers
*/

// 404 Error handler
app.use((req, res, next) => {
    const err = new Error(); 
    err.status = 404; 
    err.message = "It looks like that project doesn't exist...yet :-)"
    console.log(err.status);
    console.log(err.message);
    res.render('page-not-found', { err });
});

// Global error handler
app.use((err, req, res, next) => {
    console.log(err.message);
    console.log(err.message);
});

// Start server
app.listen(3000, () => {
    console.log('The app is running on localhost: 3000')
});
