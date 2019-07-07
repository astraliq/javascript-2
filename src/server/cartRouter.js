const express = require('express');
const handler = require('./handler');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
	const userID = res.locals.user.id;
    fs.readFile('dist/server/db/userCart.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
			let userCartJSON;
			if (JSON.parse(data)[0]) {
				let userCart = JSON.parse(data)[0][userID];
				userCartJSON = JSON.stringify(userCart);
			};
            res.send(userCartJSON);
        }
    })
});
router.post('/', (req, res) => {
    handler(req, res, 'add', 'dist/server/db/userCart.json')
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'dist/server/db/userCart.json')
});
router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', 'dist/server/db/userCart.json')
});


module.exports = router;