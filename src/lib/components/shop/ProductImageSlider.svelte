<script>
	import { Swipe, SwipeItem } from "svelte-swipe";
	let active_item = 0; //readonly
	let SwipeComp;

	function changeSlide(i){
		SwipeComp.goTo(i)
	}

	export let images = [];

	function getCompressedImage(imageUrl, size){
		if(imageUrl.includes(".png")){
			return imageUrl.replace(".png","_"+size+"x.png");
		} else if(imageUrl.includes(".jpg")){
			return imageUrl.replace(".jpg","_"+size+"x.jpg");
		} else{
			return imageUrl;
		}
	}
</script>

<style>
  .swipe-holder{
    height: 300px;
    width: 300px;
  }
  .card{
	  position:relative;
  }
  .is-center{
	 position:absolute;
	bottom:0;
	z-index:2;
	width:300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img{
    max-width: 100%;
    height: auto;
  }
 .active{
	 border-bottom:2px solid black;
 }
 .inactive{
	 border-bottom:2px solid white;
 }
 .thumbnails{
	box-shadow:0px 3px 20px 10px #ffffff20;
	background:white;
 }
 .thumbnail{
	opacity:.5;
	transition:var(--transition);
	box-shadow:0px -3px 10px 2px #00000015;
 }
 .thumbnail:hover, .thumbnail.active{
	 opacity:1;
 }
</style>
<div class="slider-wrapper">
	<div class="card">
		<div class="swipe-holder">
			<Swipe bind:active_item bind:this={SwipeComp}>
				{#each images as image}
				<SwipeItem>
					<img class="img-fluid" src={getCompressedImage(image.src,300)} alt="">
				</SwipeItem>
				{/each}
			</Swipe>
			<div class="is-center thumbnails">
				{#each images as image, i}
				<img class="img-fluid thumbnail {active_item == i ? 'active' : 'inactive'}" on:click={() => changeSlide(i)} style="height:30px; width:30px; cursor:pointer" src={getCompressedImage(image.src,30)} alt="">
				{/each}
			</div>
		</div>
	</div>	
</div>
