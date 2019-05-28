"use strict"

const URL = `https://raw.githubusercontent.com/astraliq/javascript-2/master`;
const URL_EDIT = `https://github.com/astraliq/javascript-2/edit/master`;

const app = new Vue({
	el : '#app' ,
	
	data : {
		cartURL: '/cart.json',
		catalogURL: '/catalog.json',
		products: [],
		filteredProducts: [],
		productsInCart: [],
		numberOfNextElem: 1,
		sumOfProductsCart: 0,
		imgCatalog: 'https://placeholder.it/200x150',
//		searchLine : '',
		visibility: false,
	},
	
	methods : {
		getJson(url) {
			return fetch(url)
				.then ( result => result.json())
				.catch( error => console.log('Ошибка запроса: ' + error.message));
		},
		addProduct(product) {
			this.visibility = true;
			
			if (this.findAlreadyExist(product.id)) {
				this.productsInCart[product.number - 1].count++;
				this.sumOfProducts();
			} else {product.count = 1;
					product.number = this.numberOfNextElem;
					this.productsInCart.push(product);
					this.numberOfNextElem++;
					this.sumOfProducts();
				   }
			console.log(this.productsInCart[product.number - 1].count);
		},
		changeCount(product, oper) {
			if (this.productsInCart[product.number - 1] <= 0) {
				this.deleteProductCart(product);
			} else switch(oper) {
					case 'up':
					this.productsInCart[product.number - 1].count++;
					break;
					case 'down':
					this.productsInCart[product.number - 1].count--;
					break;
					default:
						return;
				}
			this.sumOfProducts();
		},
		resetBasket() {
			this.productsInCart = [];
			this.sumOfProducts();
			this.numberOfNextElem = 1;
		},
		findAlreadyExist(prodID){
			for (let i = 0; i < this.productsInCart.length; i++) {
				if (this.productsInCart[i].id == prodID) {return true;}
			}
			return false;
		},
		sumOfProducts() {
			let sum = 0;
			this.productsInCart.forEach(product => {
				sum += product.price * product.count;
			});
			return this.sumOfProductsCart = sum;
		},
		openCloseBusket() {
			if (this.visibility == true) this.visibility = false
			else this.visibility = true;
		},

		FilterGoods(searchLine) {
			const regexp = new RegExp (searchLine, 'i' );
			if(searchLine.length > 0) {
				this.filteredProducts = this.products.filter(product =>
				regexp.test(product.title));
			}
		},
		deleteProductCart(product) {
			if (this.productsInCart.length == 1) {
				this.resetBasket()
			} else {
				this.productsInCart.splice(product.number - 1,1);
				this.sumOfProducts();
			}
		}
	},
	
	mounted() {
		this.getJson(`${URL + this.catalogURL}`)
			.then(data => {
				for (let elem of data) {
					this.products.push(elem);
					this.filteredProducts.push(elem);
				}
			});
		
	}
});










//			
//class List {
//	constructor (url, container) {
//		this.url = url;
//		this.container = container;
//		this.products = [];
//		this.allProducts = [];
//		this.filteredProducts = [];
//		this._init();
//	}
//	
//	_init() {
//		return false;
//	}
//	
//	getJson(url) {
//		return fetch(url ? url : `${URL + this.url}`)
//			.then ( result => result.json())
//			.catch( error => console.log('Ошибка запроса: ' + error.message));
//	}
//	
//	sendJson(url){
//		console.log(JSON.stringify(this.products));
//		fetch(url ? url : `${URL_EDIT + this.url}`, {
//			method: "POST",
//			body: 'json=' + JSON.stringify(this.products),
//			mode: 'no-cors'
//		}).then(function(response) {
//			// Стоит проверить код ответа.
//			if (!response.ok) {
//				// Сервер вернул код ответа за границами диапазона [200, 299]
//				return Promise.reject(new Error(
//					'Response failed: ' + response.status + ' (' + response.statusText + ')'
//				));
//			}
//			// Далее будем использовать только JSON из тела ответа.
//			return response.json();
//		})
//    }
//	
//	handleData(data) {
//		this.products = [...data];
//		this.render();
//	}
//	
//	sumPriceOfProducts() {
//		let sum = 0;
//		this.products.forEach(product => {
//			sum += product.price * product.count;
//		});
//		return sum;
//	}
//	
//	render(prod) {
//		let block = document.querySelector(this.container) ;
//		for (let product of this.products){
//            const prod = new lists[this.constructor.name](product);
//            this.allProducts.push(prod);
//            block.insertAdjacentHTML('beforeend', prod.render())
//        }	
//	}
//    filter(value){
//        const regexp = new RegExp(value, 'i');
//        this.filteredProducts = this.allProducts.filter(good => regexp.test(good.product_name));
//        this.allProducts.forEach(el => {
//            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//            if(!this.filteredProducts.includes(el)){
//                block.classList.add('invisible');
//            } else {
//                block.classList.remove('invisible');
//            }
//        })
//    }
//}
//
//class Item {
//	constructor (el, img = 'https://placeholder.it/200x150') {
//		this.id = el.id;
//		this.title = el.title;
//		this.price = el.price;
//		this.img = el.img ? el.img : img;
//	}
//	render() {
//		return `<div class="product-item" data-id="${this.id}">
//					<h3 class="product-item-h3"> ${this.title} </h3>
//					<img class="basket_img" src=" ${this.img}" alt="${this.title}" title="${this.title}">
//					<span class="product-item-price"> ${this.price} руб.</span>
//					<button class="in_basket" id="${this.id}" data-title="${this.title} data-price="${this.price}">В корзину</button>
//				</div>` ;
//	}
//}
//
//class ProductsList extends List {
//    constructor(cart, url = '/catalog.json', container = '.products'){
//        super(url, container);
//        this.cart = cart;
//        this.getJson()
//            .then(data => this.handleData(data));
//    }
//    _init(){
//        document.querySelector(this.container).addEventListener('click', e => {
//            if(e.target.classList.contains('in_basket')){
//                this.cart.addProduct(e.target)
//            }
//        });
////        document.querySelector('.search-form').addEventListener('submit', e => {
////            e.preventDefault();
////            this.filter(document.querySelector('.search-field').value);
////        })
//    }
//}
//
//class CartList extends List {
//    constructor(url = '/cart.json', container = '.basket'){
//        super(url, container);
//		this.url - url;
//        this.getJson()
//            .then(data => {
//					this.products = data
//					this.updateBasketFromArray();
//					}
//				 );
//		this.numberOfNextElem = 1;
//		this.init();
//    }
//	
//	addProduct(event) {
//		document.querySelector(this.container).style.display = 'block';
//		let addingProd = products.allProducts[event.id - 1];
//		if (!this.findAlreadyExist(event.id)) addingProd.count = 1;
//			
//		const prod = new CartItem(addingProd, this.numberOfNextElem);
//		
//		if (this.findAlreadyExist(event.id)) {
//			this.changeCountOfProduct(null,prod);
//		} else {this.render(prod);
//				this.products.push(addingProd);
//				this.numberOfNextElem++;
//				this.addEventsToProduct(prod);
////				this.sendJson();
//			   }
//		this.updateSumOfProducts();
//		
//	}
//	changeCountOfProduct(event, prod) {
//		let newCountOfProduct = null;
//		
//		if (event != null){
//			newCountOfProduct = event.path[0].value;
//			let numberOfProduct = event.path[2].childNodes[1].innerHTML;
//			this.products[numberOfProduct - 1].count = newCountOfProduct;
//		 } else {
//			 this.products[this.findIndexByProperty(prod)].count++;
//		 }
//		this.updateBasketFromArray();
//		this.updateSumOfProducts();
//	}
//	deleteProduct(event) {
////		console.log(event);
//		let numberOfProduct = event.path[1].childNodes[1].innerHTML;	
//		this.products.splice(numberOfProduct - 1,1);
//		this.updateBasketFromArray();
//		this.updateNumbersOfProducts();
//		this.updateSumOfProducts();
//	}
//	updateBasketFromArray() {
//		this.clearHTMLBasket();
//		for (let i = 0; i < this.products.length; i++) {
//			const prod = new CartItem(this.products[i], i + 1,this.products[i].count);
//			this.render(prod);
//			this.numberOfNextElem = this.products.length + 1;
//			this.addEventsToProduct(prod);
//			this.updateSumOfProducts();
////			this.sendJson();
//		}
//	}
//	findIndexByProperty(prod) {
//		for (let i = 0; i < this.products.length; i++) {
//			if (this.products[i].id == prod.id) return i;
//		}
//		return null;
//	}
//	clearHTMLBasket() {
//		let delTR = document.querySelectorAll('.basket-item-row');
//		for (let i = 0; i < delTR.length; i++) {
//			delTR[i].parentNode.removeChild(delTR[i]);
//		}	
//	}
//	updateNumbersOfProducts() {
//		let numbers = document.querySelectorAll('.basket-items_number');
//		for (let i = 0; i < numbers.length; i++) {
//			numbers.innerHTML = i;
//		}
//	}
//	resetBasket() {
//		this.clearHTMLBasket();
//		this.products = [];
//		this.updateSumOfProducts();
//		this.numberOfNextElem = 1;
////		this.sendJson();
//	}
//	findAlreadyExist(prodID){
//		for (let i = 0; i < this.products.length; i++) {
//			if (this.products[i].id == prodID) return true;
//		}
//		return false;
//	}
//	sumOfProducts() {
//		let sum = 0;
//		this.products.forEach(product => {
//			sum += product.price * product.count;
//		});
//		return sum;
//	}
//	init() {
//		this.addEventsToBasketBTN();
//		this.addEventsToStatic();
//	}
//	openCloseBusket() {
//		if (document.querySelector(this.container).style.display === 'none') document.querySelector(this.container).style.display = 'block'
//		else document.querySelector(this.container).style.display = 'none';
//	}
//	addEventsToProduct(prod) {
//		let inputCount = document.querySelector(`tr[data-number="${prod.number}"] .basket-items_input_count`);
//		let itemDelete = document.querySelector(`tr[data-number="${prod.number}"] .basket-items_del`);
//		inputCount.addEventListener('input', (event) => { this.changeCountOfProduct(event) })
//		itemDelete.addEventListener('click', (event) => { this.deleteProduct(event) })
//	}
//	addEventsToBasketBTN() {
//		let buttons = document.querySelectorAll('.in_basket');
//		buttons.forEach(element => {
//			element.addEventListener('click', (event) => { this.addProduct(event) })
//		});
//	}
//	addEventsToStatic() {
//		document.querySelector('.btn-cart').addEventListener('click', () => this.openCloseBusket());
//		document.querySelector('.cross').addEventListener('click', () => this.openCloseBusket());
//		document.querySelector('.btn-cart-reset').addEventListener('click', () => this.resetBasket());
//	}
//	updateSumOfProducts() {
//		let totalPrice = document.querySelector('.basket_total_price');
//		totalPrice.innerHTML = `<b>Итого:</b> ${this.sumOfProducts()} руб.`;
//	}
//	render(prod) {
//		document.querySelector('.basket-items_block').insertAdjacentHTML(`beforeend`, prod.render() );
//		this.updateSumOfProducts();
//	}
//	getListOfProducts() {
//		return this.products;
//	}
//}
//
//class ProductItem extends Item {}
//
//class CartItem extends Item {
//	constructor (el, number, quantity = 1, img = 'https://placeholder.it/200x150') {
//		super(el,img),
//		this.quantity = quantity,
//		this.number = number
//	}
//	render() {
//		return `<tr class="basket-item-row" data-number="${this.number}">
//					<td class="basket-items_number">${this.number}</td>
//					<td class="basket-items_id">${this.id}</td>
//					<td class="basket-items_img"><img src="${this.img}" alt="phone" height="60"></td>
//					<td class="basket-items_name">${this.title}</td>
//					<td class="basket-items_price"><span class="item_price">${this.price}</span> руб.</td>
//					<td class="basket-items_count"><input type="number" class="basket-items_input_count" value="${this.quantity}" min="1"></td>
//					<td class="basket-items_del">+</td>
//				</tr>` ;
//	}
//}
//
//let lists = {
//	ProductsList: ProductItem,
//	CartList: CartItem,
//}
//
//
//let newCart = new CartList();
//let products = new ProductsList(newCart);




