let add = (cart, req) => {
	cart.push(req.body);
	return {newCart: JSON.stringify (cart, null, 4), name: req.body.title};
};
let change = (cart, req) => {
	let find = cart.find(el => +el.id === +req.params.id);
	find.quantity += +req.body.quantity;
	return {newCart: JSON.stringify (cart, null, 4), name: find.title};
};
let remove = (cart, req) => {
	let find = cart.find (el => el.id === +req.body.id);
	if (req.body.id) {
		cart.splice(cart.indexOf(find),1);
	} else cart = [];
		return {newCart: JSON.stringify (cart, null, 4), name: (find != undefined) ? find.title : 'все товары'};
};

module.exports = {
    add,
    change,
	remove
};