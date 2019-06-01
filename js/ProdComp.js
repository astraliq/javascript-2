Vue.component('products', {
	data() {
		return {
			products: [],
			filteredProducts: [],
			catalogURL: '/catalog.json',
			searchKeys: 0
		}
	},
	mounted() {
		this.$parent.getJson(`${URL + this.catalogURL}`)
			.then(data => {
				for (let elem of data) {
					this.products.push(elem);
					this.filteredProducts.push(elem);
				}
			});
	},
	methods: {
		filterGoods(value, type) {
			const regexp = new RegExp (value, 'i' );
			if(type == 'submit') {
				this.filteredProducts = this.products.filter(product =>
				regexp.test(product.title));
			} else if (value.length < 1){
				this.filteredProducts = this.products;
			}
			this.searchKeys = value.length;
		},
	},
    template: `<div class="products">
				<stub v-if="!products.length"></stub>
				<product v-for="product of filteredProducts" :key="product.id" :product="product"></product>
			</div>`
});

Vue.component('product', {
    props: ['product'],
    template: `<div class="product-item">
					<h3 class="product-item-h3"> {{ product.title }} </h3>
					<img class="basket_img" :src="product.img" :alt="product.title" :title="product.title">
					<span class="product-item-price">  {{ product.price }}  руб.</span>
					<button class="in_basket" :id="product.id" :data-title="product.title" :data-price="product.price" @click="$root.$refs.cart.addProduct(product)">В корзину</button>
				</div>`
})

Vue.component('stub', {
    props: [],
    template: `<div class="stub">
					<h3>Нет данных на сервере</h3>
				</div>`
})