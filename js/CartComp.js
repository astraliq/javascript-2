Vue.component('cart', {
   props: ['cart_items', 'visibility', 'sum_of_products', 'clear'],
   template: `<div class="basket" v-show="visibility">
				<h2 class="basket_name">Корзина</h2>
				<div class="cross" @click="$emit('change_visibility')"></div>
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
							<cart-item v-for="product of cart_items" :key="product.id" :product="product"></cart-item>
						</tbody>
					</table>
				</div>
				<table class="basket-items">
					<tbody class="basket-items_footer">
						<tr class="basket-last-row">
							<td class="basket-items_reset"><button class="btn-cart-reset" type="button" @click="$emit('clear')">Очистить корзину</button></td>
							<td class="basket-items_price basket_total_price"><b>Итого:</b> {{ sum_of_products }} руб.</td>
						</tr>
					</tbody>
				</table>
			</div>`
});
Vue.component('cart-item', {
    props: ['product', 'img'],
    template: `<tr class="basket-item-row">
					<td class="number"> {{ product.number }} </td>
					<td class="basket-items_id"> {{ product.id }} </td>
					<td class="basket-items_img"><img :src="product.img" alt="phone" height="60"></td>
					<td class="basket-items_name"> {{ product.title }} </td>
					<td class="basket-items_price"><span class="item_prcice"> {{ product.price }} </span> руб.</td>
					<td class="basket-items_count"><span class="basket-items_input_count" > {{ product.count }} </span><button class="btn-cart-count" type="button" @click="$parent.$emit('change_quantity', product, 'up')">+</button><button class="btn-cart-count" type="button" @click="$parent.$emit('change_quantity', product, 'down')">-</button></td>
					<td class="basket-items_del" @click="$parent.$emit('remove', product)">+</td>
				</tr>`
})
