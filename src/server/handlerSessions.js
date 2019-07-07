const sessions = require('./sessions');
const fs = require('fs');

const actions = {
    add: sessions.add,
    check: sessions.check,
	remove: sessions.remove,
}

//const logger = require('./logger');

let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let {newCart, name} = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err)=> {
                if (err){
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