let add = (reg, req) => {
	reg.push(req.body);
	return {newData: JSON.stringify (reg, null, 4), name: req.body.login};
};
let change = (reg, req) => {
	let find = reg.find(el => +el.id === +req.params.id);
	find.quantity += +req.body.quantity;
	return {newData: JSON.stringify (reg, null, 4), name: find.login};
};
let remove = (reg, req) => {
	let find = reg.find (el => el.id === +req.body.login);
	if (req.body.login) {
		reg.splice(reg.indexOf(find),1);
	} else reg = [];
		return {newData: JSON.stringify (reg, null, 4), name: (find != undefined) ? find.login : 'все данные'};
};

module.exports = {
    add,
    change,
	remove
};