const express = require("express");
const fs = require("fs");
const cart = require("./cartRouter");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const nodemailer = require("nodemailer");
const handlerData = require('./handlerData');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//const bodyParser = require("body-parser");

//const urlencodedParser = bodyParser.urlencoded({
//	extended: false
//});



let transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		type: 'OAuth2',
		user: 'astraliq457@gmail.com',
		clientId: '835275659984-jadq6p5khqfllsk2l6l4g3ivjop7q8lo.apps.googleusercontent.com',
		clientSecret: 'klDgpVFI1DxseDx4W-Y6oxIR',
		refreshToken: '1/FKzV1ogh2_V-RBv3bT_ROSCZgs_v2XUFpZVQhGMAIOmYRtPaBFuHZnC106Q9X37a',
		accessToken: 'ya29.Gls2B6K7NfGuq3D0LiMAqzD3tyQBjBfZoelwOE79TvZhPX9LKvwxOheb2nJNCb3n-Ef0PV0D1zryziiEj-YAKh6wQ1FOb_JJbx0hjq246frS8I0mNiU6FGPrIg5p',
		expires: 1561833908646
	}
});

app.use(express.json());

app.use("/api/cart", cart);
app.use("/", express.static("dist/public"));
app.set("views", path.join("dist/public/templates"));
app.set("view engine", "ejs");

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
//app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));
app.get("/:page", (req, res) =>
	res.render("index.ejs", {
		page: req.params.page,
		id: undefined
	})
);
app.get("/catalog/:id", (req, res) => {
	res.render("index", {
		page: "catalog",
		id: req.params.id
	});
	app.use("/catalog/", express.static("dist/public"));
});
app.get("/form/registration", (req, res) => {
	res.render("reg");
	app.use("/form/", express.static("dist/public"));
});
app.get("/form/login", (req, res) => {
	res.render("login");
	app.use("/form/", express.static("dist/public"));
});

app.post("/form/registration", function (req, res) {
	if (!req.body) return res.sendStatus(400);
	console.log(req.body.login);
	let message = '<b>Зарегистрирован новый пользователь: </b>' + req.body.login + '<br><b>Фамилия: </b></b>' + req.body.surname + '<br><b>Имя: </b></b>' + req.body.first_name + '<br><p>Данные регистрации: </p><br>' + JSON.stringify(req.body, null, 4);
	console.log(message);
	transporter.sendMail({
		from: "astraliq457@gmail.com",
		to: "astraliq457@gmail.com",
		subject: "Зарегистрирован новый пользователь",
		text: "Регистрация!",
		html: message
	});
	handlerData(req, res, 'add', 'dist/server/db/userData.json');
	res.render("sucsess_reg.ejs", {
		data: req.body
	});
});

//app.use("/catalog", catalogRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
