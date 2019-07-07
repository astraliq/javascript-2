/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/cart.js":
/*!****************************!*\
  !*** ./src/server/cart.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar add = function add(cart, req, userID) {\n  console.log(\"userID \".concat(userID));\n  var cartObj = [];\n  cartObj.push(req.body);\n\n  for (key in cart[0]) {\n    console.log(\"key \".concat(key));\n\n    if (key == userID) {\n      cart[0][key].push(req.body);\n      console.log('key === userID');\n    }\n  }\n\n  ;\n\n  if (cart.length === 0) {\n    cart.push(_defineProperty({}, userID, cartObj));\n  }\n\n  ;\n\n  if (!cart[0][userID]) {\n    Object.assign(cart[0], _defineProperty({}, userID, cartObj));\n  }\n\n  ; //\tconsole.log(cart);\n\n  console.log(cart[0][userID]);\n  return {\n    newCart: JSON.stringify(cart, null, 4),\n    name: req.body.title\n  };\n};\n\nvar change = function change(cart, req, userID) {\n  var find;\n  console.log(\"userID \".concat(userID));\n\n  for (var i = 0; i < cart.length; i++) {\n    for (key in cart[i]) {\n      if (key == userID) {\n        find = cart[i][key].find(function (el) {\n          return +el.id === +req.params.id;\n        });\n        find.quantity += +req.body.quantity;\n        console.log('key === userID');\n      }\n    }\n  } //\tlet find = cart.find(el => +el.id === +req.params.id);\n\n\n  return {\n    newCart: JSON.stringify(cart, null, 4),\n    name: find.title\n  }; //find.title\n};\n\nvar remove = function remove(cart, req, userID) {\n  var find;\n\n  for (var i = 0; i < cart.length; i++) {\n    for (key in cart[i]) {\n      if (key == userID) {\n        find = cart[i][key].find(function (el) {\n          return el.id === +req.body.id;\n        });\n\n        if (req.body.id) {\n          cart[i][key].splice(cart[i][key].indexOf(find), 1);\n        } else cart[i][key] = [];\n\n        console.log('key === userID');\n      }\n    }\n  } //\tlet find = cart.find (el => el.id === +req.body.id);\n  //\tif (req.body.id) {\n  //\t\tcart.splice(cart[userID].indexOf(find),1);\n  //\t} else cart = [];\n\n\n  return {\n    newCart: JSON.stringify(cart, null, 4),\n    name: find != undefined ? find.title : 'все товары'\n  };\n};\n\nmodule.exports = {\n  add: add,\n  change: change,\n  remove: remove\n};\n\n//# sourceURL=webpack:///./src/server/cart.js?");

/***/ }),

/***/ "./src/server/cartRouter.js":
/*!**********************************!*\
  !*** ./src/server/cartRouter.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar handler = __webpack_require__(/*! ./handler */ \"./src/server/handler.js\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar router = express.Router();\nrouter.get('/', function (req, res) {\n  var userID = res.locals.user.id;\n  fs.readFile('dist/server/db/userCart.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      var userCartJSON;\n\n      if (JSON.parse(data)[0]) {\n        var userCart = JSON.parse(data)[0][userID];\n        userCartJSON = JSON.stringify(userCart);\n      }\n\n      ;\n      res.send(userCartJSON);\n    }\n  });\n});\nrouter.post('/', function (req, res) {\n  handler(req, res, 'add', 'dist/server/db/userCart.json');\n});\nrouter.put('/:id', function (req, res) {\n  handler(req, res, 'change', 'dist/server/db/userCart.json');\n});\nrouter[\"delete\"]('/:id', function (req, res) {\n  handler(req, res, 'remove', 'dist/server/db/userCart.json');\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/server/cartRouter.js?");

/***/ }),

/***/ "./src/server/handler.js":
/*!*******************************!*\
  !*** ./src/server/handler.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cart = __webpack_require__(/*! ./cart */ \"./src/server/cart.js\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar actions = {\n  add: cart.add,\n  change: cart.change,\n  remove: cart.remove\n};\n\nvar logger = __webpack_require__(/*! ./logger */ \"./src/server/logger.js\");\n\nvar handler = function handler(req, res, action, file) {\n  var userID = res.locals.user.id;\n  fs.readFile(file, 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      var _actions$action = actions[action](JSON.parse(data), req, userID),\n          newCart = _actions$action.newCart,\n          name = _actions$action.name;\n\n      fs.writeFile(file, newCart, function (err) {\n        if (err) {\n          res.sendStatus(404, JSON.stringify({\n            result: 0,\n            text: err\n          }));\n        } else {\n          logger(name, action);\n          res.send({\n            result: 1,\n            text: 'Success!'\n          });\n        }\n      });\n    }\n  });\n};\n\nmodule.exports = handler;\n\n//# sourceURL=webpack:///./src/server/handler.js?");

/***/ }),

/***/ "./src/server/handlerData.js":
/*!***********************************!*\
  !*** ./src/server/handlerData.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var reg = __webpack_require__(/*! ./reg */ \"./src/server/reg.js\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar actions = {\n  add: reg.add,\n  change: reg.change,\n  remove: reg.remove\n};\n\nvar logger = __webpack_require__(/*! ./logger */ \"./src/server/logger.js\");\n\nvar handlerData = function handlerData(req, res, action, file) {\n  fs.readFile(file, 'utf-8', function (err, data) {\n    if (err) {//            res.sendStatus(404, JSON.stringify({result: 0, text: err}));\n    } else {\n      var _actions$action = actions[action](JSON.parse(data), req),\n          newData = _actions$action.newData,\n          name = _actions$action.name;\n\n      fs.writeFile(file, newData, function (err) {\n        if (err) {//                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));\n        } else {\n          logger(name, action); //                    res.send({result: 1, text: 'Success!'})\n        }\n      });\n    }\n  });\n};\n\nmodule.exports = handlerData;\n\n//# sourceURL=webpack:///./src/server/handlerData.js?");

/***/ }),

/***/ "./src/server/logger.js":
/*!******************************!*\
  !*** ./src/server/logger.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var moment = __webpack_require__(/*! moment */ \"moment\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar logger = function logger(name, action) {\n  fs.readFile('dist/server/db/stats.json', 'utf-8', function (err, data) {\n    if (err) {\n      console.log(\"Can't read file\");\n    } else {\n      var stat = JSON.parse(data);\n      stat.push({\n        time: moment().format('DD MM YYYY, h:mm:ss a'),\n        prod_name: name,\n        action: action\n      });\n      fs.writeFile('dist/server/db/stats.json', JSON.stringify(stat), function (err) {\n        if (err) {\n          console.log(\"Can't write file\");\n        }\n      });\n    }\n  });\n};\n\nmodule.exports = logger;\n\n//# sourceURL=webpack:///./src/server/logger.js?");

/***/ }),

/***/ "./src/server/reg.js":
/*!***************************!*\
  !*** ./src/server/reg.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var add = function add(reg, req) {\n  reg.push(req.body);\n  return {\n    newData: JSON.stringify(reg, null, 4),\n    name: req.body.login\n  };\n};\n\nvar change = function change(reg, req) {\n  var find = reg.find(function (el) {\n    return +el.id === +req.params.id;\n  });\n  find.quantity += +req.body.quantity;\n  return {\n    newData: JSON.stringify(reg, null, 4),\n    name: find.login\n  };\n};\n\nvar remove = function remove(reg, req) {\n  var find = reg.find(function (el) {\n    return el.id === +req.body.login;\n  });\n\n  if (req.body.login) {\n    reg.splice(reg.indexOf(find), 1);\n  } else reg = [];\n\n  return {\n    newData: JSON.stringify(reg, null, 4),\n    name: find != undefined ? find.login : 'все данные'\n  };\n};\n\nmodule.exports = {\n  add: add,\n  change: change,\n  remove: remove\n};\n\n//# sourceURL=webpack:///./src/server/reg.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar cart = __webpack_require__(/*! ./cartRouter */ \"./src/server/cartRouter.js\");\n\nvar app = express();\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar PORT = process.env.PORT || 5000;\n\nvar nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n\nvar handlerData = __webpack_require__(/*! ./handlerData */ \"./src/server/handlerData.js\");\n\nvar cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\nvar session = __webpack_require__(/*! express-session */ \"express-session\");\n\napp.use(express.json());\napp.use(cookieParser());\napp.use(express.urlencoded({\n  extended: false\n}));\napp.set(\"views\", path.join(\"dist/public/templates\"));\napp.set(\"view engine\", \"ejs\"); //const bodyParser = require(\"body-parser\");\n//const urlencodedParser = bodyParser.urlencoded({\n//\textended: true\n//});\n\napp.use(session({\n  name: \"sid\",\n  secret: \"%&*()Q%C7ytwc4tatv9se54tvym890\",\n  resave: false,\n  saveUninitialized: true,\n  cookie: {\n    secure: false,\n    maxAge: 1000 * 60 * 60 * 24,\n    sameSite: true\n  }\n}));\napp.use(function (req, res, next) {\n  var userId = req.session.userId;\n\n  if (userId) {\n    fs.readFile(\"dist/server/db/userData.json\", \"utf-8\", function (err, data) {\n      if (err) {\n        res.sendStatus(404, JSON.stringify({\n          result: 0,\n          text: err\n        }));\n        console.log(\"Ошибка при чтении файла dist/server/db/userData.json\");\n      } else {\n        var users = JSON.parse(data);\n        res.locals.user = users.find(function (user) {\n          return +user.id == userId;\n        });\n      }\n\n      next();\n    });\n  } else {\n    res.locals.user = {\n      id: req.sessionID,\n      login: null\n    };\n    next();\n  }\n});\napp.use(\"/api/cart\", cart);\napp.use(\"/\", express[\"static\"](\"dist/public\"));\n\nvar redirectLogin = function redirectLogin(req, res, next) {\n  if (!req.session.userId) {\n    res.redirect(\"/form/login\");\n  } else {\n    next();\n  }\n};\n\nvar redirectHome = function redirectHome(req, res, next) {\n  if (req.session.userId) {\n    res.redirect(\"/main\");\n  } else {\n    next();\n  }\n};\n\nvar nextUserId;\nfs.readFile(\"dist/server/db/userData.json\", \"utf-8\", function (err, data) {\n  if (err) {\n    console.log(\"Ошибка при чтении файла dist/server/db/userData.json\");\n  } else {\n    var dataFile = JSON.parse(data);\n    nextUserId = +dataFile[dataFile.length - 1].id + 1;\n    console.log(JSON.parse(data));\n  }\n});\nvar transporter = nodemailer.createTransport({\n  service: \"Gmail\",\n  auth: {\n    type: \"OAuth2\",\n    user: \"astraliq457@gmail.com\",\n    clientId: \"835275659984-jadq6p5khqfllsk2l6l4g3ivjop7q8lo.apps.googleusercontent.com\",\n    clientSecret: \"klDgpVFI1DxseDx4W-Y6oxIR\",\n    refreshToken: \"1/FKzV1ogh2_V-RBv3bT_ROSCZgs_v2XUFpZVQhGMAIOmYRtPaBFuHZnC106Q9X37a\",\n    accessToken: \"ya29.Gls2B6K7NfGuq3D0LiMAqzD3tyQBjBfZoelwOE79TvZhPX9LKvwxOheb2nJNCb3n-Ef0PV0D1zryziiEj-YAKh6wQ1FOb_JJbx0hjq246frS8I0mNiU6FGPrIg5p\",\n    expires: 1561833908646\n  }\n});\n\nvar loadUser = function loadUser(req, res, next) {\n  if (req.session.user_id) {\n    User.findById(req.session.user_id, function (user) {\n      if (user) {\n        req.currentUser = user;\n        next();\n      } else {\n        res.redirect(\"/form/login\");\n      }\n    });\n  } else {\n    res.redirect(\"/form/login\");\n  }\n}; //const catalogRouter = express.Router();\n//catalogRouter.use(\"/:id\", (req, res) => res.render('index', {id: req.params.id}));\n//catalogRouter.use(\"/\", (req, res) => res.render('index', {page: 'catalog'}));\n\n\napp.get(\"/api/products\", function (req, res) {\n  fs.readFile(\"dist/server/db/catalog.json\", \"utf-8\", function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\napp.get(\"/\", function (req, res) {\n  res.render(\"index.ejs\", {\n    page: req.params.page,\n    id: undefined,\n    user: res.locals.user.id,\n    login: res.locals.user.login\n  });\n});\napp.get(\"/:page\", function (req, res) {\n  res.render(\"index.ejs\", {\n    page: req.params.page,\n    id: undefined,\n    user: res.locals.user.id,\n    login: res.locals.user.login\n  });\n});\napp.get(\"/catalog/:id\", function (req, res) {\n  res.render(\"index.ejs\", {\n    page: \"catalog\",\n    id: req.params.id,\n    user: res.locals.user.id,\n    login: res.locals.user.login\n  });\n  app.use(\"/catalog/\", express[\"static\"](\"dist/public\"));\n});\napp.get(\"/form/registration\", redirectHome, function (req, res) {\n  res.render(\"reg\", {\n    page: null,\n    id: undefined,\n    user: null,\n    login: null,\n    status_login: null\n  });\n  app.use(\"/form/\", express[\"static\"](\"dist/public\"));\n});\napp.get(\"/form/login\", redirectHome, function (req, res) {\n  res.render(\"login\", {\n    page: null,\n    id: undefined,\n    user: null,\n    login: null\n  });\n  app.use(\"/form/\", express[\"static\"](\"dist/public\"));\n});\napp.post(\"/form/registration\", redirectHome, function (req, res) {\n  if (!req.body) return res.sendStatus(400);\n  var _req$body = req.body,\n      login = _req$body.login,\n      surname = _req$body.surname,\n      first_name = _req$body.first_name;\n  fs.readFile(\"dist/server/db/userData.json\", \"utf-8\", function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n      console.log(\"Ошибка при чтении файла dist/server/db/userData.json\");\n    } else {\n      var usersData = JSON.parse(data);\n      var exists = usersData.some(function (user) {\n        return user.login == login;\n      });\n\n      if (!exists) {\n        var message = \"<b>Зарегистрирован новый пользователь: </b>\" + login + \"<br><b>Фамилия: </b></b>\" + surname + \"<br><b>Имя: </b></b>\" + first_name + \"<br><p>Данные регистрации: </p><br>\" + JSON.stringify(req.body, null, 4);\n        console.log(message);\n        transporter.sendMail({\n          from: \"astraliq457@gmail.com\",\n          to: \"astraliq457@gmail.com\",\n          subject: \"Зарегистрирован новый пользователь\",\n          text: \"Регистрация!\",\n          html: message\n        });\n        req.body.id = nextUserId++;\n        handlerData(req, res, \"add\", \"dist/server/db/userData.json\");\n        req.session.userId = req.body.id;\n        res.render(\"sucsess_reg.ejs\", {\n          data: req.body,\n          user: req.session.userId,\n          status_login: true,\n          login: req.body.login,\n          id: undefined\n        });\n      } else {\n        res.render(\"reg.ejs\", {\n          user: null,\n          login: null,\n          status_login: \"already exist\",\n          id: undefined\n        });\n      }\n    }\n  });\n});\napp.post(\"/form/login\", redirectHome, function (req, res) {\n  var _req$body2 = req.body,\n      login = _req$body2.login,\n      pass = _req$body2.pass;\n  if (!req.body) return res.sendStatus(400);\n  fs.readFile(\"dist/server/db/userData.json\", \"utf-8\", function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n      console.log(\"Ошибка при чтении файла dist/server/db/userData.json\");\n    } else {\n      var usersData = JSON.parse(data);\n      var findUser = usersData.find(function (el) {\n        return el.login === login;\n      });\n      var checkPass = findUser.pass === pass ? true : false;\n\n      if (typeof findUser != \"undefined\" && checkPass == true) {\n        var message = \"Пользователь: \" + login + \" совершил вход!\";\n        console.log(message); //\ttransporter.sendMail({\n        //\t\tfrom: \"astraliq457@gmail.com\",\n        //\t\tto: \"astraliq457@gmail.com\",\n        //\t\tsubject: \"Зарегистрирован новый пользователь\",\n        //\t\ttext: \"Регистрация!\",\n        //\t\thtml: message\n        //\t});\n        //\thandlerData(req, res, 'add', 'dist/server/db/userData.json');\n\n        req.session.userId = findUser.id;\n        res.render(\"index.ejs\", {\n          status_login: true,\n          page: \"main\",\n          login: login,\n          id: undefined\n        });\n      } else {\n        res.render(\"login.ejs\", {\n          status_login: false,\n          login: null\n        });\n      }\n    }\n  });\n});\napp.get(\"/user/logout\", redirectLogin, function (req, res) {\n  req.session.destroy(function (err) {\n    if (err) {\n      return res.redirect(\"/main\");\n    }\n\n    res.clearCookie(\"sid\");\n    res.redirect(\"/form/login\");\n  });\n}); //app.use(\"/catalog\", catalogRouter);\n\napp.listen(PORT, function () {\n  return console.log(\"Listening on \".concat(PORT));\n});\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nodemailer\");\n\n//# sourceURL=webpack:///external_%22nodemailer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });