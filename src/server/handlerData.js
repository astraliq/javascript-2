const reg = require('./reg');
const fs = require('fs');

const actions = {
	add: reg.add,
    change: reg.change,
	remove: reg.remove
}

const logger = require('./logger');

let handlerData = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
//            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let {newData, name} = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newData, (err)=> {
                if (err){
//                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
					logger(name, action);
//                    res.send({result: 1, text: 'Success!'})
                }
            })

        }
    })
};

module.exports = handlerData;