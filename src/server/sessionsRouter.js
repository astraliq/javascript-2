const express = require('express');
const handlerSessions = require('./handlerSessions');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('dist/server/db/userData.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data)
        }
    })
});
router.post('/', (req, res) => {
    handler(req, res, 'add', 'dist/server/db/userData.json')
});
router.put('/:id', (req, res) => {
    handler(req, res, 'check', 'dist/server/db/userData.json')
});
router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', 'dist/server/db/userData.json')
});


module.exports = router;