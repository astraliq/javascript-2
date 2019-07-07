let add = (cart, req, userID) => {
	console.log(`userID ${userID}`);
	let cartObj = [];
	cartObj.push(req.body);
	for (key in cart[0]) {
		console.log(`key ${key}`);
		if (key == userID) {
			cart[0][key].push(req.body);
			console.log('key === userID');
		}
	};
	if (cart.length === 0) {
		cart.push({ [userID]: cartObj});
	};
	if (!cart[0][userID]) {
		Object.assign(cart[0],{ [userID]: cartObj})
	};
//	console.log(cart);
	console.log(cart[0][userID]);
	return {newCart: JSON.stringify (cart, null, 4), name: req.body.title};
};
let change = (cart, req, userID) => {
	let find;
	console.log(`userID ${userID}`);
	for (let i = 0; i < cart.length; i++) {
		for (key in cart[i]) {
			if (key == userID) {
				find = cart[i][key].find(el => +el.id === +req.params.id);
				find.quantity += +req.body.quantity;
				console.log('key === userID');
			}
		}
	}
//	let find = cart.find(el => +el.id === +req.params.id);
	
	return {newCart: JSON.stringify (cart, null, 4), name: find.title};   //find.title
};
let remove = (cart, req, userID) => {
	let find;
	for (let i = 0; i < cart.length; i++) {
		for (key in cart[i]) {
			if (key == userID) {
				find = cart[i][key].find (el => el.id === +req.body.id);
				if (req.body.id) {
					cart[i][key].splice(cart[i][key].indexOf(find),1);
				} else cart[i][key] = [];
				console.log('key === userID');
			}
		}
	}
//	let find = cart.find (el => el.id === +req.body.id);
//	if (req.body.id) {
//		cart.splice(cart[userID].indexOf(find),1);
//	} else cart = [];
		return {newCart: JSON.stringify (cart, null, 4), name: (find != undefined) ? find.title : 'все товары'};
};

module.exports = {
    add,
    change,
	remove
};