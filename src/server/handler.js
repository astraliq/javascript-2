const cart = require('./cart');
const fs = require('fs');

const actions = {
    add: cart.add,
    change: cart.change,
	remove: cart.remove,
	clear: cart.clear,
	changeName: cart.changeName
}

const logger = require('./logger');

let handler = (req, res, action, file, sessionID) => {
	const userID = res.locals.user.id;
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let {newCart, name} = actions[action](JSON.parse(data), req, userID, sessionID);
            fs.writeFile(file, newCart, (err)=> {
                if (err){
					console.log('handler.js - Ошибка записи файла ' + file);
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
					logger(name, action);
                    res.send({result: 1, text: 'Success!'})
                }
            })

        }
    })
};

module.exports = handler;