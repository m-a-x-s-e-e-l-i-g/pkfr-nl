<!-- This file renders each individual blog post for reading. Be sure to update the svelte:head below -->
<script>
export let data

import { titlePostfix } from "$lib/config";

const { title, excerpt, date, updated, author, coverImage, coverWidth, coverHeight, categories } = data.meta
</script>


<svelte:head>
	<!-- Be sure to add your image files and un-comment the lines below -->
	<title>{title} {titlePostfix}</title>
	<meta data-key="description" name="description" content="{excerpt}">
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={excerpt} />
	<meta name="twitter:description" content={excerpt} />
	<!-- <meta property="og:image" content="https://yourdomain.com/image_path" /> -->
	<meta property="og:image:width" content={coverWidth} />
	<meta property="og:image:height" content={coverHeight} />
	<!-- <meta name="twitter:image" content="https://yourdomain.com/image_path" /> -->
</svelte:head>


<article class="post">
	<!-- You might want to add an alt frontmatter attribute. If not, leaving alt blank here works, too. -->
	<img
		class="cover-image"
		src="{coverImage}"
		alt=""
		style="aspect-ratio: {coverWidth} / {coverHeight};"
		width={coverWidth}
		height={coverHeight}
	/>

	<h1>{ title }</h1>
	
	<div class="meta">
		<b>Geplaatst:</b> {date}
		<br>
		<b>Bijgewerkt:</b> {updated}
		<br>
		<b>Auteur:</b> {author}
	</div>

	{@html data.PostContent}

	{#if categories}
		<aside class="post-footer">
			<h2>Geplaatst in: </h2>
			<ul>
				{#each categories as category}
					<li>
						<a href="/blog/category/{category}/">
							{ category }
						</a>
					</li>
				{/each}
			</ul>
		</aside>
	{/if}
</article> 