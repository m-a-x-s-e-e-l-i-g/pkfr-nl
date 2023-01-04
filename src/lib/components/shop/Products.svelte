<script>
	// import { data } from '$lib/data/stores.js';
	import { createClient } from '@supabase/supabase-js';
	import Product from '$lib/components/shop/Product.svelte';
	import ProductFilters from '$lib/components/shop/ProductFilters.svelte';
	import { onMount } from 'svelte';

    onMount(() => {
		getProducts();
	});

	const supabase = createClient(
		import.meta.env.VITE_PUBLIC_SUPABASE_URL,
		import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
	);

    let loading = false
	let products = [];

	async function getProducts() {
		try {
			loading = true;

			const { data, error } = await supabase
				.from('product')
				.select(`
					*,
					shop (*) 
				`)
				.order('created_at', { ascending: false });

            if(data) {
				console.log(data)
                products = data
            }

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}

	// function sortProducts(){
	//     productsSorted = products.sort(function(a,b){
	//         if($data.application.sortProducts == "Last updated"){
	//             return new Date(b.updated_at) - new Date(a.updated_at);
	//         } else if($data.application.sortProducts == "Last created"){
	//             return new Date(b.created_at) - new Date(a.created_at);
	//         } else if($data.application.sortProducts == "Price ascending"){
	//             return a.price - b.price;
	//         } else if($data.application.sortProducts == "Price descending"){
	//             return b.price - a.price;
	//         } else if($data.application.sortProducts == "Highest discount"){
	//             return ((b.compareAtPrice - b.price) / b.price) - ((a.compareAtPrice - a.price) / a.price);
	//         }
	//     });
	// }
	// sortProducts();
</script>

<section id="productsSection">
	<!-- <ProductFilters {products} /> -->
	<div id="productSort">
	<!-- svelte-ignore a11y-no-onchange -->
	<!-- <select bind:value={$data.application.sortProducts} on:change={() => sortProducts()}> -->
	<!-- <option>Last updated</option> -->
	<!-- <option>Last created</option> -->
	<!-- <option>Price ascending</option> -->
	<!-- <option>Price descending</option> -->
	<!-- <option>Highest discount</option> -->
	<!-- </select> -->
	</div>
	<button on:click={() => getProducts()}>Load products</button>
	{#each products as product}
		<Product {product} />
	{/each}
</section>

<style>
	#productSort {
		opacity: 0.5;
	}
</style>
