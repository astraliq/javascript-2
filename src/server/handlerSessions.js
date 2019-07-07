const cart = require('./cart');
const fs = require('fs');

const actions = {
    add: cart.add,
    check: cart.check,
	remove: cart.remove,
	clear: cart.clear,
	changeName: cart.changeName
}

//const logger = require('./logger');

let handlerSessions = (req, res, action, file, sessionID) => {
	const userID = res.locals.user.id;
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let {newCart, name} = actions[action](JSON.parse(data), req, userID, sessionID);
            fs.writeFile(file, newCart, (err) => {
                if (err){
					console.log('Ошибка записи файла ' + file);
                } else {
//					logger(name, action);
                }
            })

        }
    })
};

module.exports = handlerSessions;