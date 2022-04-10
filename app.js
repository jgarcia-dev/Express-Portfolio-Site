const express = require('express');
const data = require("./data.json");
const { projects } = data;

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.locals.projects = projects;
    res.render('index');
});

app.get('/project/:id', (req, res, next) =>  {
    const projId = req.params.id;
    const projectData = projects[projId];
    
    if (projectData) {
        res.locals.projectData = projectData;
        res.render('project');
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Sorry, that project does not exist.";
        next(err);
    }
});

app.get('/about', (req, res) => {
    res.render('about');
});

// 404 handler
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Sorry, that page does not exist.";
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    if (err.status === 404) {
        console.log('404 Error');
        console.log('404 - Page does not exist');
        res.status(404).render('page-not-found', { err });
    } else {
        console.log('500 Error');
        err.status = err.status || 500;
        err.message = err.message || 'Oops, looks like something went wrong on the server.';
        res.status(err.status).render('error', { err });
    }
});

app.listen(3000, ()=> {
    console.log('Application running on localhost:3000');
});