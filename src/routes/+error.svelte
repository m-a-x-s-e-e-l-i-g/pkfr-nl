<!-- This page handles any error encountered by the site. -->
<script>
import { page } from '$app/stores'
</script>

<div class="error-container">
	<div class="error-content">
		<div class="error-text">
			<h1 class="error-code">{$page.status}</h1>
			<h2 class="error-message">Oops, overshot that one.</h2>
			<p class="error-subtitle">Let's jump back to safety.</p>
			<a href="/" class="button">Back to Home</a>
		</div>
		<div class="error-illustration">
			<img src="/images/404guy.png" alt="Parkour athlete jumping" class="parkour-guy" />
		</div>
	</div>
</div>

<style>
	.error-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.error-content {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4rem;
		max-width: 1200px;
		width: 100%;
	}

	.error-text {
		flex: 1;
		max-width: 500px;
	}

	.error-code {
		font-size: 8rem;
		font-weight: 800;
		color: #2c3e50;
		margin: 0;
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.error-message {
		font-size: 2.5rem;
		font-weight: 600;
		color: #34495e;
		margin: 1rem 0 0.5rem 0;
		line-height: 1.2;
	}

	.error-subtitle {
		font-size: 1.25rem;
		color: #7f8c8d;
		margin: 0 0 2rem 0;
		line-height: 1.4;
	}

	.error-illustration {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.parkour-guy {
		max-width: 100%;
		height: auto;
		max-height: 400px;
		filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1));
	}

	@media (max-width: 768px) {
		.error-content {
			flex-direction: column;
			text-align: center;
			gap: 2rem;
		}

		.error-code {
			font-size: 6rem;
		}

		.error-message {
			font-size: 2rem;
		}

		.error-subtitle {
			font-size: 1.1rem;
		}

		.parkour-guy {
			max-height: 300px;
		}
	}

	@media (max-width: 480px) {
		.error-container {
			padding: 1rem;
		}

		.error-code {
			font-size: 4rem;
		}

		.error-message {
			font-size: 1.5rem;
		}

		.error-subtitle {
			font-size: 1rem;
		}
	}
</style>