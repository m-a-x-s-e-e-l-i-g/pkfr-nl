<script>
	export let posts = []
</script>


<ul class="posts-list">
	{#each posts as post}
		<li>
			<article>
				<a href="/blog/{post.slug}">
					<img
					src={post.coverImage}
					alt=""
					width={post.coverWidth}
					height={post.coverHeight}
					style="ratio: {post.coverWidth} / {post.coverHeight}"
					/>
					<h2>
						{post.title}
					</h2>
				</a>
				<div class="meta">
					Door <b>{post.author}</b> op <b>{post.date}</b>
				</div>
			</article>

			<p>{post.excerpt}</p>
			<a href="/blog/{post.slug}" class="button">
					Lees blog
			</a>
		</li>
	{/each}
</ul>

<style>
	.meta{
		font-size: small;
	}
</style>