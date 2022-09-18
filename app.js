// Import Express and set up the app
const express = require('express');
const app = express();

// Import data.json
const { projects } = require('./data.json');

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

    if(+projectId < projects.length && +projectId >= 0) {
        const project = projects.find( ({ id }) => id === projectId );
        res.render('project', { project });
    } else {
        const err = new Error(); 
        err.status = 404; 
        next(err);
    };
});

/*
* Error handlers
*/

// 404 Error handler
app.use((req, res, next) => {
    const err = new Error(); 
    err.status = 404; 
    next(err);
});

// Global Error handler
app.use((err, req, res, next) => {

    if(err.status === 404) {
        err.message = "It looks like that project doesn't exist...yet :-)"
        console.log(err.status);
        console.log(err.message);
        res.render('page-not-found', { err });
    } else {
        err.status = err.status || 500; 
        err.message = err.message || "It looks like there was a problem reaching our server. Please try refreshing the page.";
        console.log(err.status);
        console.log(err.message);
        res.render('error', { err });
    }
});

// Start server
app.listen(3000, () => {
    console.log('The app is running on localhost: 3000')
});
