<script>
	export let products;
	let filters = ["All"];
	//add product to filters
	products.forEach(product => {
		filters.indexOf(product.product_type) === -1 ? filters.push(product.product_type) : "";
	});
	filters.push("Sale");
	filters.push("💗");
</script>
<style>
#productFilters{
	margin-bottom:60px;
}
.filter{
	margin:20px;
	cursor:pointer;
}
.sale{
	text-transform: uppercase;
	display: inline-block;
	padding:2px 5px;
	margin: 0 2px;
	background: var(--red);
	color:var(--white);
	font-size:12px;
	font-weight:700;
}
</style>
<div id="productFilters">
	{#each filters as filter}
        <span class="filter {filter.toLowerCase()}">{filter}</span>
    {/each}
</div>