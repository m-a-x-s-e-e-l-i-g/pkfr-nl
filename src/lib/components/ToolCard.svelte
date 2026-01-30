<script>
	export let name;
	export let description;
	export let href;
	export let emoji;
	export let color = 'blue';
	export let external = false;
	export let className = '';
</script>

<a
	href={href}
	class={`tool-card ${color} ${className}`}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
>
	<span class="tool-emoji">{emoji}</span>
	<h3 class="tool-title">{name}</h3>
	<p class="tool-description">{description}</p>
	<span class="tool-arrow">→</span>
</a>

<style>
	.tool-card {
		position: relative;
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: 1rem;
		padding: 2rem;
		text-decoration: none;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		overflow: hidden;
	}

	.tool-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		border-radius: 1rem 1rem 0 0;
		transition: height 0.3s ease;
	}

	.tool-card.blue::before {
		background: linear-gradient(90deg, #3b82f6, #8b5cf6);
	}
	.tool-card.green::before {
		background: linear-gradient(90deg, #22c55e, #14b8a6);
	}
	.tool-card.purple::before {
		background: linear-gradient(90deg, #8b5cf6, #ec4899);
	}
	.tool-card.orange::before {
		background: linear-gradient(90deg, #f97316, #ef4444);
	}

	.tool-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
	}

	.tool-card:hover::before {
		height: 6px;
	}

	.tool-emoji {
		font-size: 2.5rem;
		line-height: 1;
	}

	.tool-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-foreground);
		margin: 0;
	}

	.tool-description {
		color: var(--color-muted-foreground);
		line-height: 1.6;
		flex-grow: 1;
		margin: 0;
	}

	.tool-arrow {
		font-size: 1.5rem;
		color: var(--color-muted-foreground);
		transition: all 0.3s ease;
	}

	.tool-card:hover .tool-arrow {
		transform: translateX(4px);
		color: var(--color-primary);
	}

	@media (max-width: 768px) {
		.tool-card {
			padding: 1.5rem;
		}
	}
</style>
