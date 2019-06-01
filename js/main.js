"use strict"

const URL = `https://raw.githubusercontent.com/astraliq/javascript-2/master`;
const URL_EDIT = `https://github.com/astraliq/javascript-2/edit/master`;

const app = new Vue({
	el : '#app' ,

	methods : {
		getJson(url) {
			return fetch(url)
				.then ( result => result.json())
				.catch( error => console.log('Ошибка запроса: ' + error.message));
		},
		displayCart() {
			this.$refs.cart.openCloseBusket();
		}
	}	
});

