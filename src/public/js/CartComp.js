const cartItem = {
	props: ['product', 'img', 'index'],
	template: `<tr class="basket-item-row">
					<td class="number"> {{ index + 1}} </td>
					<td class="basket-items_id"> {{ product.id }} </td>
					<td class="basket-items_img"><img :src="product.img" alt="phone" height="60"></td>
					<td class="basket-items_name"> {{ product.title }} </td>
					<td class="basket-items_price"><span class="item_prcice"> {{ product.price }} </span> руб.</td>
					<td class="basket-items_count"><span class="basket-items_input_count" > {{ product.quantity }} </span><button class="btn-cart-count" type="button" @click="$parent.changeCount(product, 'up')">+</button><button class="btn-cart-count" type="button" @click="$parent.changeCount(product, 'down')">-</button></td>
					<td class="basket-items_del" @click="$parent.deleteProductCart(product)">+</td>
				</tr>`
};

const cart = {
	data() {
		return {
			productsInCart: [],
			cartURL: '/cart.json',
			visibility: false,
			sumOfProductsCart: 0
		}
	},
	components: {
		'cart-item': cartItem
    },
	mounted() {
		this.$parent.getJson(`/api/cart`)
			.then(data => {
				if (data) {
					for (let elem of data) {
						this.productsInCart.push(elem);
					}
					this.sumOfProducts();
				}
			});
	},
	methods: {
		addProduct(product) {
			this.visibility = true;
			let find = this.productsInCart.find(el => +el.id === +product.id);
			if (find) {
//				this.productsInCart.push(elem);
				this.$parent.putJson(`/api/cart/${find.id}`, {quantity: 1})
                    .then(data => {
                        if(data.result){
                            find.quantity++;
							this.sumOfProducts();
                        }
                    })
			} else {let prod = Object.assign({quantity: 1}, product);
					 this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result){
                            this.productsInCart.push(prod)
							this.sumOfProducts();
                        }
                    })
//					this.productsInCart.push(prod);
				   }
		},
		changeCount(product, oper) {
			switch(oper) {
				case 'up':
					this.$parent.putJson(`/api/cart/${product.id}`, {quantity: 1})
                    .then(data => {
                        if(data.result){
                            product.quantity++;
							this.sumOfProducts();
                        }
                    })
					break;
				case 'down':
					if (product.quantity > 1)  {
						this.$parent.putJson(`/api/cart/${product.id}`, {quantity: -1})
						.then(data => {
							if(data.result){
								product.quantity--;
								this.sumOfProducts();
							}
						})
					} else {
						this.deleteProductCart(product);
					}
					break;
				default:
					return;
			}
		},
		resetBasket() {
			this.$parent.deleteJson(`/api/cart/all`)
                    .then(data => {
                        if(data.result){
                            this.productsInCart = [];
							this.sumOfProducts();
                        }
                    })
		},
//		findAlreadyExist(prodID){
//			for (let i = 0; i < this.productsInCart.length; i++) {
//				if (this.productsInCart[i].id == prodID) {return true;}
//			}
//			return false;
//		},
		sumOfProducts() {
			let sum = 0;
			this.productsInCart.forEach(product => {
				sum += product.price * product.quantity;
			});
			return this.sumOfProductsCart = sum;
		},
		openCloseBusket() {
			if (this.visibility == true) this.visibility = false
			else this.visibility = true;
		},
		deleteProductCart(product) {
			if (this.productsInCart.length == 1) {
				this.resetBasket()
			} else {
				this.$parent.deleteJson(`/api/cart/${product.id}`, {id: product.id})
                    .then(data => {
                        if(data.result){
                            this.productsInCart.splice(this.productsInCart.indexOf(product),1);
							this.sumOfProducts();
                        }
                    })
			}
		}
	},
	template: `<div class="basket" v-show="visibility">
				<h2 class="basket_name">Корзина</h2>
				<div class="cross" @click="this.openCloseBusket">+</div>
				<table class="basket-items">
					<tbody class="basket-items_header">
						<tr class="basket-header">
							<td class="basket-items_number basket-items-header">№</td>
							<td class="basket-items_id basket-items-header">id</td>
							<td class="basket-items_img basket-items-header">изображение товара</td>
							<td class="basket-items_name basket-items-header">наименование</td>
							<td class="basket-items_price basket-items-header">цена</td>
							<td class="basket-items_count basket-items-header">кол-во</td>
							<td class="basket-items_last_cell"> </td>
						</tr>
					</tbody>
				</table>
				<div class="basket-items_div">
					<table class="basket-items">
						<tbody class="basket-items_block">
							<cart-item v-for="(product, index) of productsInCart" :key="product.id" :index="index" :product="product"></cart-item>
						</tbody>
					</table>
				</div>
				<table class="basket-items">
					<tbody class="basket-items_footer">
						<tr class="basket-last-row">
							<td class="basket-items_reset"><button class="btn-cart-reset" type="button" @click="this.resetBasket">Очистить корзину</button></td>
							<td class="basket-items_price basket_total_price"><b>Итого:</b> {{ this.sumOfProductsCart }} руб.</td>
						</tr>
					</tbody>
				</table>
			</div>`
};

export default cart

