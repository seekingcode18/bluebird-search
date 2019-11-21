const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const axios = require('axios').default;
const env = require('dotenv').config();
const API_KEY = env.parsed.API_KEY;
app.set('view engine', 'ejs');

app.use(express.static('views'));
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index.ejs'));

// temporary - DELETE THIS LATER ?!?!?
app.get('/results', (req, res) => res.render('results.ejs'));

app.get('/search', (req, exp_res) => {
  const googleUrl = 'https://www.googleapis.com/customsearch/v1?';
  // const searchEngineID = '000808265081658527808:n4jaetaobhg'; //main one
  const searchEngineID = '000637027580556738231:lccmjvzwc6s';
  const userSearchQuery = req.query.query;
  axios.get(`${googleUrl}key=${API_KEY}&cx=${searchEngineID}&q=${userSearchQuery}`)
    .then(ax_res => {
      let searchResults = ax_res.data.items
      exp_res.render('results.ejs', {results: formatResults(searchResults), title: res.query.query})
    })
    .catch(error => console.log(`Something seems to have gone wrong! Sorry :(\n${error}`))
})

  function formatResults(incomingArray) {
    let resultsContainer = '';

    for (let i = 0; i < incomingArray.length; i++) {
      const title = incomingArray[i].title;
      const link = incomingArray[i].displayLink;
      const snippet = incomingArray[i].snippet;
      const result = `<div class="result">
    <h3 class="result__heading">${title}</h3>
    <p class="result__link"><a class="result__url" href="${link}">${link}</a></p>
    <p class="result__description">${snippet}</p>
  </div>\n`
      resultsContainer += result;
  }
  return resultsContainer;
}

app.listen(port, () => console.log(`Bluebird is listening on port ${port}`));
