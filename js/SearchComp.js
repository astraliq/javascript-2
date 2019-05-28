Vue.component('search', {
	data() {
		return {
			searchLine: '',
		}
	},
    template: `<div class="search_div">
				<input type="text" class="searchline" placeholder="Искать..." v-model="searchLine" @keyup.enter="$root.FilterGoods(searchLine)">
				<button class="searchline_btn" type="button" @click="$root.FilterGoods(searchLine)">Найти</button>
			</div>`

});			


