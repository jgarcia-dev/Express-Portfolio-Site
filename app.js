const express = require('express');
const { render } = require('express/lib/response');
const data = require("./data.json");
const { projects } = data;

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.locals.projects = projects;
    res.render('index');
});

app.get('/project/:id', (req, res) =>  {
    const projId = req.params.id;
    const projectData = projects[projId];
    
    if (projectData) {
        res.locals.projectData = projectData;
        res.render('project');
    } else {
        res.send('404');
    }
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(3000, ()=> {
    console.log('Application running on localhost:3000');
});