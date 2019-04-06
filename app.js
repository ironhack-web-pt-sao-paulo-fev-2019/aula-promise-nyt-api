const express = require('express');
const hbs = require('hbs');
const app = express();
const fetch = require('node-fetch');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

const apiKey = '6tsbZLntMYIzy0BEidlmbQGzjSmlTA8x'

app.get('/', (request, response) => {
    response.render('index');
})

app.get('/search-results', (request, response) => {
    fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=6tsbZLntMYIzy0BEidlmbQGzjSmlTA8x')
        .then(res => res.json())
        .then(json => {
            console.log(json.response.docs)
            let data = json.response.docs;
            response.render('search', { data });
        });
})

app.listen('3000');