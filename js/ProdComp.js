Vue.component('products', {
    props: ['products'],
    template: `<div class="products">
				<stub v-if="!products.length"></stub>
				<product v-for="product of products" :key="product.id" :product="product"></product>
			</div>`
});

Vue.component('product', {
    props: ['product'],
    template: `<div class="product-item">
					<h3 class="product-item-h3"> {{ product.title }} </h3>
					<img class="basket_img" :src="product.img" :alt="product.title" :title="product.title">
					<span class="product-item-price">  {{ product.price }}  руб.</span>
					<button class="in_basket" :id="product.id" :data-title="product.title" :data-price="product.price" @click="$parent.$emit('add-product', product)">В корзину</button>
				</div>`
})

Vue.component('stub', {
    props: [],
    template: `<div class="stub">
					<h3>Нет данных на сервере</h3>
				</div>`
})