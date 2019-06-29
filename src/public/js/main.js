//"use strict"
import cart from './CartComp.js'
import products from './ProdComp.js'
import search from './SearchComp.js'
import getdatalist from './GetData.js'

const URL = `https://raw.githubusercontent.com/astraliq/javascript-2/master`;

let app = {
	el : '#app' ,
	components: {
		cart,
		products,
		search,
		getdatalist
	},

	methods : {
		getJson(url) {
			return fetch(url)
				.then ( result => result.json())
				.catch( error => console.log('Ошибка запроса: ' + error.message));
		},
		postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                    console.log(error)
                })
        },
		putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                    console.log(error)
                })
        },
		deleteJson(url, data){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
				body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                    console.log(error)
                })
        },
		displayCart() {
			this.$refs.cart.openCloseBusket();
		}
	}	
};

export default app