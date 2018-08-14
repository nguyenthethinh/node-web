const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`);
});


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper(('getCurrentYear'), ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=> {
    return text.toUppperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + "\n");
    next();
});

/*app.use((req, res, next)=>{
    res.render('mantenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    //var date = new Date();
    //var month = date.getMonth();
    res.render(('home.hbs'), {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my website',
    });
});

app.get('/about', (req, res)=>{
    res.render(('about.hbs'),{
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res)=>{
    res.render(('projects.hbs'),{
        pageTitle: 'Projects Page',
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        code : 404,
        errorMessage: 'Bad request'
    });
});
