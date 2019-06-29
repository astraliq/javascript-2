const product = {
    props: ['product'],
    template: `<div class="product-item">
    				<a :href="'/catalog/' + product.id">
						<h3 class="product-item-h3"> {{ product.title }} </h3>
						<img class="basket_img" :src="product.img" :alt="product.title" :title="product.title">
					</a>
					<span class="product-item-price">  {{ product.price }}  руб.</span>
					<button class="in_basket" :id="product.id" :data-title="product.title" :data-price="product.price" @click="$root.$refs.cart.addProduct(product)">В корзину</button>
				</div>`
};

const stub = {
    props: [],
    template: `<div class="stub">
					<h3>Нет данных на сервере</h3>
				</div>`
};

const products = {
	data() {
		return {
			products: [],
			filteredProducts: [],
//			catalogURL: '/catalog.json',
			searchKeys: 0
		}
	},
	components: {
        product,
		stub
    },
	mounted() {
		this.$parent.getJson(`/api/products`)
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
		getProduct(id) {
			return this.products[id];
		},
	},
    template: `<div class="products">
				<stub v-if="!products.length"></stub>
				<product v-for="product of filteredProducts" :key="product.id" :product="product"></product>
			</div>`
};

export default products