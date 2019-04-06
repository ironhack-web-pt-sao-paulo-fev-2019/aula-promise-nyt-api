const express = require('express');
const hbs = require('hbs');
const fetch = require('node-fetch');
const dotEnv = require('dotenv').config();

hbs.registerPartials(`${__dirname}/views/partials`);
const bodyParser = require('body-parser');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

const apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/search-results', (request, response) => {
  const {
    key,
  } = dotEnv.parsed;
  const searchQuest = request.query.q;
  const searchUrl = `${apiUrl}&api-key=${key}&q=${searchQuest}`;
  fetch(searchUrl)
    .then(data => data.json())
    .then((json) => {
      const newsList = json.response.docs;
      response.render('news', {newsList});
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3003, () => console.log('My News is running on port 3001'));
