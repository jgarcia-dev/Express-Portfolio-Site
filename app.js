const express = require('express');
const data = require("./data.json");
const { projects } = data;

const app = express();
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.send('<img src="/static/images/employee-directory-550x550.jpg">');

});

app.listen(3000, ()=> {
    console.log('Application running on localhost:3000');
});