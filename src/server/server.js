const express = require("express");
const fs = require("fs");
const cart = require("./cartRouter");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const nodemailer = require("nodemailer");
const handlerSessions = require('./handlerSessions');
const handlerData = require("./handlerData");
var cookieParser = require('cookie-parser');
const session = require("express-session");
app.use(express.json());
app.use(cookieParser());
app.use(
	express.urlencoded({
		extended: false
	})
);
app.set("views", path.join("dist/public/templates"));
app.set("view engine", "ejs");
//const bodyParser = require("body-parser");
//const urlencodedParser = bodyParser.urlencoded({
//	extended: true
//});

app.use(
	session({
		name: "sid",
		secret: "%&*()Q%C7ytwc4tatv9se54tvym890",
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false,
			maxAge: 1000 * 60 * 60 * 24,
			sameSite: true
		}
	})
);

app.use((req, res, next) => {
	const {
		userId
	} = req.session;
	if (userId) {
		fs.readFile("dist/server/db/userData.json", "utf-8", (err, data) => {
			if (err) {
				res.sendStatus(
					404,
					JSON.stringify({
						result: 0,
						text: err
					})
				);
				console.log("Ошибка при чтении файла dist/server/db/userData.json");
			} else {
				let users = JSON.parse(data);
				res.locals.user = users.find(user => +user.id == userId);
			}
			next();
		});
	} else {
		res.locals.user = {
			id: req.sessionID,
			login: null
		};
		next();
	}
});

app.use("/api/cart", cart);
app.use("/", express.static("dist/public"));

const redirectLogin = (req, res, next) => {
	if (!req.session.userId) {
		res.redirect("/form/login");
	} else {
		next();
	}
};

const redirectHome = (req, res, next) => {
	if (req.session.userId) {
		res.redirect("/main");
	} else {
		next();
	}
};

let nextUserId;

fs.readFile("dist/server/db/userData.json", "utf-8", (err, data) => {
	if (err) {
		console.log("Ошибка при чтении файла dist/server/db/userData.json");
	} else {
		let dataFile = JSON.parse(data);
		nextUserId = +dataFile[dataFile.length - 1].id + 1;
		console.log(JSON.parse(data));
	}
});

let transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		type: "OAuth2",
		user: "astraliq457@gmail.com",
		clientId: "835275659984-jadq6p5khqfllsk2l6l4g3ivjop7q8lo.apps.googleusercontent.com",
		clientSecret: "klDgpVFI1DxseDx4W-Y6oxIR",
		refreshToken: "1/FKzV1ogh2_V-RBv3bT_ROSCZgs_v2XUFpZVQhGMAIOmYRtPaBFuHZnC106Q9X37a",
		accessToken: "ya29.Gls2B6K7NfGuq3D0LiMAqzD3tyQBjBfZoelwOE79TvZhPX9LKvwxOheb2nJNCb3n-Ef0PV0D1zryziiEj-YAKh6wQ1FOb_JJbx0hjq246frS8I0mNiU6FGPrIg5p",
		expires: 1561833908646
	}
});

//let loadUser = function (req, res, next) {
//	if (req.session.user_id) {
//		User.findById(req.session.user_id, function (user) {
//			if (user) {
//				req.currentUser = user;
//				next();
//			} else {
//				res.redirect("/form/login");
//			}
//		});
//	} else {
//		res.redirect("/form/login");
//	}
//};

//const catalogRouter = express.Router();
//catalogRouter.use("/:id", (req, res) => res.render('index', {id: req.params.id}));
//catalogRouter.use("/", (req, res) => res.render('index', {page: 'catalog'}));

app.get("/api/products", (req, res) => {
	fs.readFile("dist/server/db/catalog.json", "utf-8", (err, data) => {
		if (err) {
			res.sendStatus(
				404,
				JSON.stringify({
					result: 0,
					text: err
				})
			);
		} else {
			res.send(data);
		}
	});
});
app.get("/", (req, res) => {
	res.render("index.ejs", {
		page: req.params.page,
		id: undefined,
		user: res.locals.user.id,
		login: res.locals.user.login
	});
});
app.get("/:page", (req, res) => {
	res.render("index.ejs", {
		page: req.params.page,
		id: undefined,
		user: res.locals.user.id,
		login: res.locals.user.login
	});
});
app.get("/catalog/:id", (req, res) => {
	res.render("index.ejs", {
		page: "catalog",
		id: req.params.id,
		user: res.locals.user.id,
		login: res.locals.user.login
	});
	app.use("/catalog/", express.static("dist/public"));
});
app.get("/form/registration", redirectHome, (req, res) => {
	res.render("reg", {
		page: null,
		id: undefined,
		user: null,
		login: null,
		status_login: null
	});
	app.use("/form/", express.static("dist/public"));
});
app.get("/form/login", redirectHome, (req, res) => {
	res.render("login", {
		page: null,
		id: undefined,
		user: null,
		login: null
	});
	app.use("/form/", express.static("dist/public"));
});

app.post("/form/registration", redirectHome, function (req, res) {
	if (!req.body) return res.sendStatus(400);
	const {
		login,
		surname,
		first_name
	} = req.body;
	fs.readFile("dist/server/db/userData.json", "utf-8", (err, data) => {
		if (err) {
			res.sendStatus(
				404,
				JSON.stringify({
					result: 0,
					text: err
				})
			);
			console.log("Ошибка при чтении файла dist/server/db/userData.json");
		} else {
			let usersData = JSON.parse(data);
			const exists = usersData.some(user => user.login == login);
			if (!exists) {
				let message =
					"<b>Зарегистрирован новый пользователь: </b>" +
					login +
					"<br><b>Фамилия: </b></b>" +
					surname +
					"<br><b>Имя: </b></b>" +
					first_name +
					"<br><p>Данные регистрации: </p><br>" +
					JSON.stringify(req.body, null, 4);
				console.log(message);
				transporter.sendMail({
					from: "astraliq457@gmail.com",
					to: "astraliq457@gmail.com",
					subject: "Зарегистрирован новый пользователь",
					text: "Регистрация!",
					html: message
				});
				req.body.id = nextUserId++;
				handlerData(req, res, "add", "dist/server/db/userData.json");
				req.session.userId = req.body.id;
				res.render("sucsess_reg.ejs", {
					data: req.body,
					user: req.session.userId,
					status_login: true,
					login: req.body.login,
					id: undefined
				});
			} else {
				res.render("reg.ejs", {
					user: null,
					login: null,
					status_login: "already exist",
					id: undefined
				});
			}
		}
	});
});

app.post("/form/login", redirectHome, function (req, res) {
	const {
		login,
		pass
	} = req.body;
	if (!req.body) return res.sendStatus(400);
	fs.readFile("dist/server/db/userData.json", "utf-8", (err, data) => {
		if (err) {
			res.sendStatus(
				404,
				JSON.stringify({
					result: 0,
					text: err
				})
			);
			console.log("Ошибка при чтении файла dist/server/db/userData.json");
		} else {
			let usersData = JSON.parse(data);
			let findUser = usersData.find(el => el.login === login);
			let checkPass = findUser.pass === pass ? true : false;
			if (typeof findUser != "undefined" && checkPass == true) {
				let message = "Пользователь: " + login + " совершил вход!";
				console.log(message);
				//	transporter.sendMail({
				//		from: "astraliq457@gmail.com",
				//		to: "astraliq457@gmail.com",
				//		subject: "Зарегистрирован новый пользователь",
				//		text: "Регистрация!",
				//		html: message
				//	});
				//	handlerData(req, res, 'add', 'dist/server/db/userData.json');
				req.session.userId = findUser.id;

				res.render("index.ejs", {
					status_login: true,
					page: "main",
					login: login,
					id: undefined
				});
			} else {
				res.render("login.ejs", {
					status_login: false,
					login: null
				});
			}
		}
	});
});

app.get("/user/logout", redirectLogin, function (req, res) {
	req.session.destroy(err => {
		if (err) {
			return res.redirect("/main");
		}
		res.clearCookie("sid");
		res.redirect("/form/login");
	});
});

app.get("/user/order", redirectLogin, function (req, res) {
	const userID = res.locals.user.id;
	const login = res.locals.user.login;
	fs.readFile("dist/server/db/userCart.json", "utf-8", (err, data) => {
		if (err) {
			console.log("app.get/user/order: Ошибка при чтении файла dist/server/db/userCart.json");
		} else {
			let userCart = JSON.parse(data)[0][userID];
			let dataCart = JSON.stringify(userCart);
			console.log(`userCart order ${userCart}`);
			let message =
					"<b>Пользователь </b>" +
					login +
					"<br><p>Заказал: </p><br>" +
					dataCart;
				console.log(message);
				transporter.sendMail({
					from: "astraliq457@gmail.com",
					to: "astraliq457@gmail.com",
					subject: "Новый заказ!",
					text: "Новый заказ!",
					html: message
				});
			handlerSessions(req, res, 'clear', 'dist/server/db/userCart.json');
			res.render("order.ejs", {
				page: req.params.page,
				id: res.locals.user.id,
				user: res.locals.user.id,
				login: res.locals.user.login,
				dataCart: dataCart
			});
		}
	});
	app.use("/user/", express.static("dist/public"));

});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
