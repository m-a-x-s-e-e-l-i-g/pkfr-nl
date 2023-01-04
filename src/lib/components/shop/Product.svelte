<script>
	import ProductImageSlider from "$lib/components/shop/ProductImageSlider.svelte"
	export let product;

	function getUtm(utm_content){
		let utm = "?utm_campaign=&utm_content="+utm_content+"&utm_source=pkfr.nl&utm_medium=affiliates&utm_term=pkfr_kleding_nl";
		return utm;
	}
</script>

<style>
.product{
	position:relative;
	display:inline-block;
	margin:60px;
	width:300px;
}
.sale{
	position:absolute;
	right: 50px;
	top: 10px;
	z-index:3;
	text-transform: uppercase;
	display: inline-block;
	padding:2px 5px;
	margin: 0 2px;
	background: var(--accent);
	color:var(--white);
	font-size:12px;
	font-weight:700;
	user-select: none;
}
.favourite{
	position:absolute;
	top:4px;
	right:10px;
	width:30px;
	z-index:3;
	opacity:.1;
	transition: var(--transition);
	cursor:pointer;
	font-size:1.2em;
	user-select: none;
}
.favourite:hover{
	opacity:1;
}
.product-info{
	margin-top:10px;
}
.product-info .title{
	text-decoration: none;
	font-weight:700;
	font-size:1em;
	color:var(--black);
	display:block;
	margin:20px 0;
	min-height:38px;
	
}
.product-info .price{
	color:var(--red);
	font-weight:700;
	float:left;
	margin-left:70px;
}
.product-info .compare_at_price{
	display:block;
	color:rgb(200, 200, 200);
	text-decoration: line-through;
	float:left;
    margin-left: 20px;
}
.product-info .buy{
	text-transform: uppercase;
	display: block;
	padding:6px 9px;
	margin: 0 2px;
	outline: 1px solid var(--green);
	color:var(--green);
	font-size:12px;
	font-weight:700;
	transition: var(--transition);
	float:right;
}
.product-info .buy:hover{
	color:var(--white);
	background:var(--green);
}
.soldOut .product-info, .soldOut .favourite, .soldOut .sale{
	pointer-events: none;
	filter: grayscale(100%);
	opacity:.3;
}
</style>
<div class="product {product.available === false ? 'soldOut' : ''}">
	{#if product.discountPercentage}
		<span class="sale" title="You'll save {product.shop.currencySymbol}{(product.price_from - product.price).toFixed(2)}">{product.discountPercentage}</span>
	{/if}
	<!-- <div class="favourite" title="Save">💗</div> -->
	<ProductImageSlider images={product.images}/>
	<div class="product-info">
		<a class="title" href="{product.shop.shopUrl}{product.handle}{getUtm("title")}" target="_blank">{product.title}</a>
		<span class="price">{product.shop.currencySymbol}{product.price}</span>
		{#if product.price_from}
		<span class="compare_at_price">{product.shop.currencySymbol}{product.price_from}</span>
		{/if}
		{#if product.available}
		<a class="buy" href="{product.shop.shopUrl}{product.handle}{getUtm("button")}" target="_blank">Shop {product.shop.nameShort}</a>
		{:else}
		<a class="buy" href="{product.shop.shopUrl}{product.handle}{getUtm("button")}" target="_blank">Sold out</a>
		{/if}
		<span>&nbsp;</span>
	</div>
</div>