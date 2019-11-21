const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.use(express.static('views'));
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index.ejs'));

// temporary - DELETE THIS LATER ?!?!?
app.get('/results', (req, res) => res.render('results.ejs'));

app.listen(port, () => console.log(`Bluebird is listening on port ${port}`));
