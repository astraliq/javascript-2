const express = require('express');
const fs = require('fs');
const cart = require('./cartRouter');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use('/', express.static('dist/public'));
app.use('/api/cart', cart);

app.set('views', path.join('dist/public/templates'));
app.set('view engine', 'ejs');

app.get('/api/products', (req, res) => {
    fs.readFile('dist/server/db/catalog.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data)
        }
    })
});
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));
app.get('/:page', (req, res) => res.render('index', {page: req.params.page}))


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))