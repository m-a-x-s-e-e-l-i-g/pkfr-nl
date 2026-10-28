<script>
	import MainNav from './MainNav.svelte'
	import { siteAuthor, siteLink } from '$lib/config'
	import Icon from 'svelte-awesome';
	import github from 'svelte-awesome/icons/github';
	import { t } from 'svelte-i18n';
</script>

<footer class="footer">
	<div class="footer-content">
		<div class="footer-brand">
			<div class="footer-logo">
				<span class="logo-text">pkfr.nl</span>
			</div>
			<p class="footer-tagline">{$t('site.tagline')}</p>
		</div>

		<div class="footer-nav">
			<MainNav />
		</div>

		<div class="footer-links">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="{siteLink}" target="_blank" rel="noreferrer">GitHub</a></li>
			</ul>
		</div>
	</div>

	<div class="footer-bottom">
		<p class="copyright">
			&copy;{new Date().getFullYear()} {@html siteAuthor}
		</p>
		<div class="footer-credits">
			<a href="https://www.maxmade.nl" target="_blank" rel="noreferrer" class="maxmade-link" aria-label="MAXmade">
				<svg width="100" height="20" viewBox="0 0 542.4 113.6" xmlns="http://www.w3.org/2000/svg" aria-label="MAXmade logo" class="maxmade-logo">
					<g>
						<polygon class="logo-fill" points="274.3,55.6 256.9,27.5 239.4,55.6 256.9,55.6"/>
						<polygon class="logo-fill" points="273.9,112.9 256.9,85 221.4,85 204.5,112.9"/>
						<polygon class="logo-fill" points="205.5,0 205.5,0 170.9,0 170.9,0 137.5,0 137.5,0 102.9,0 102.9,0 69.5,0 0.2,112.7 0,113 33.7,113 86.5,26.9 121,26.9 68,113 101.7,113 154.5,26.9 189,26.9 136.2,112.7 136,113 169.7,113 238.9,0"/>
						<polygon class="logo-fill" points="377.3,113 342.4,56.5 377.1,0 376.9,0 343.5,0 325.6,29.2 307.5,0 274.1,0 308.8,56.5 273.9,112.9 307.6,113 325.5,83.8 343.5,113"/>
					</g>
					<g>
						<path class="logo-fill" d="M446.6,113h-12.5v-5.2h1.6V96.7c0-2.7-0.5-4.6-1.4-5.7c-0.9-1.1-2.3-1.7-4-1.7c-2.2,0-3.8,0.8-4.9,2.3s-1.6,3.2-1.6,5.2v11h4.2v5.2h-12.5v-5.2h1.5V96.7c0-2.7-0.5-4.6-1.4-5.7c-0.9-1.1-2.3-1.7-3.9-1.7c-2.2,0-3.8,0.7-4.8,2.2c-1,1.5-1.6,3.2-1.6,5.1v11.1h5.3v5.2h-16.2v-5.2h4.2V89.9h-4.2v-5.2h10.9v4.7c0.9-1.6,2.1-2.8,3.5-3.8c1.5-1,3.2-1.4,5.3-1.4c2.1,0,4,0.5,5.7,1.5c1.7,1,2.9,2.6,3.5,4.8c0.8-1.9,2.1-3.5,3.6-4.6s3.5-1.7,5.8-1.7c2.6,0,4.8,0.8,6.7,2.5c1.9,1.6,2.9,4.2,2.9,7.7v13.5h4.2V113z"/>
						<path class="logo-fill" d="M451.9,86.8c2.1-1,4-1.7,5.6-2.1c1.6-0.4,3.5-0.6,5.7-0.6c3.1,0,5.7,0.8,7.8,2.4c2,1.6,3.1,4,3.1,7.2v12.7c0,1.7,0.7,2.5,2.1,2.5c0.4,0,0.9-0.1,1.4-0.3l0.1,3.7c-1.4,0.8-2.9,1.2-4.5,1.2c-3.6,0-5.5-1.9-5.8-5.6v-0.1c-0.8,1.5-2,2.8-3.6,4c-1.5,1.2-3.4,1.8-5.7,1.8c-2,0-3.9-0.6-5.8-1.8c-1.9-1.2-2.9-3.3-2.9-6.3c0-3.5,1.4-5.8,4.2-6.9c2.8-1.1,5.8-1.7,9-1.7c0.8,0,1.6,0,2.5,0.1c0.8,0,1.6,0.1,2.3,0.2v-1.6c0-1.7-0.3-3.2-0.9-4.5c-0.6-1.3-2.1-2-4.4-2c-0.9,0-1.7,0.1-2.5,0.2c-0.8,0.1-1.5,0.4-2.2,0.8l-1.1,4.3l-5.4-0.6L451.9,86.8z M467.3,101.8v-1c-0.7-0.1-1.4-0.2-2.2-0.3c-0.8-0.1-1.5-0.1-2.3-0.1c-1.7,0-3.2,0.3-4.5,0.9c-1.3,0.6-2,1.8-2,3.5c0,2.6,1.4,3.8,4.1,3.8c1.6,0,3.1-0.6,4.5-1.7C466.3,105.7,467.1,104,467.3,101.8z"/>
						<path class="logo-fill" d="M513,113h-10.9v-5.4c-0.8,1.6-2,3.1-3.6,4.2c-1.6,1.2-3.6,1.8-6.2,1.8c-3.7,0-6.6-1.3-8.8-3.8c-2.2-2.5-3.2-6-3.2-10.4c0-4,1-7.6,3.1-10.7s5.2-4.6,9.6-4.6c2.2,0,4.1,0.5,5.6,1.4c1.5,0.9,2.7,2.1,3.6,3.6V74.8h-6.1v-5.2h12.8v38.1h4.2V113z M502.2,99.4v-2.1c0-2.3-0.8-4.2-2.1-5.6s-3.1-2.1-5.1-2.1c-2.3,0-4.1,0.8-5.5,2.5c-1.4,1.7-2.1,4-2.1,7c0,3,0.7,5.2,2.1,6.8c1.4,1.6,3.1,2.3,5.1,2.3c2.3,0,4.2-0.9,5.5-2.8C501.4,103.5,502.1,101.5,502.2,99.4z"/>
						<path class="logo-fill" d="M542.4,104.3c-0.3,2.5-1.5,4.6-3.6,6.5c-2.2,1.8-5.2,2.8-9,2.8c-4.1,0-7.5-1.2-10.1-3.6s-4-6-4-10.7c0-4.3,1.2-7.9,3.6-10.8c2.4-2.9,5.8-4.3,10.1-4.3c3.9,0,7,1.2,9.3,3.5c2.3,2.3,3.4,5.3,3.5,8.8c0,1.2-0.1,2.4-0.4,3.8h-19.1c0.4,5.3,2.9,7.9,7.5,7.9c2.2,0,3.7-0.5,4.7-1.6c0.9-1,1.6-2.2,1.9-3.3L542.4,104.3z M535.2,96.1c0.2-1.7-0.2-3.3-1.2-4.7c-0.9-1.5-2.5-2.2-4.7-2.2c-2,0-3.5,0.7-4.6,2c-1,1.3-1.7,3-2,5H535.2z"/>
					</g>
				</svg>
			</a>
			<a href="{siteLink}" target="_blank" rel="noreferrer" class="github-link" aria-label="GitHub"><Icon data={github}/></a>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: linear-gradient(to bottom, var(--color-muted) 0%, var(--color-background) 100%);
		border-top: 1px solid var(--color-border);
		margin-top: auto;
		padding: 3rem 1.5rem 1.5rem;
	}

	.footer-content {
		max-width: 72rem;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-border);
	}

	@media (max-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: 2rem;
			text-align: center;
		}
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	@media (max-width: 768px) {
		.footer-logo {
			justify-content: center;
		}
	}

	.logo-text {
		font-weight: 800;
		font-size: 1.25rem;
		color: var(--color-foreground);
	}

	.footer-tagline {
		color: var(--color-muted-foreground);
		font-size: 0.875rem;
		max-width: 20rem;
	}

	@media (max-width: 768px) {
		.footer-tagline {
			margin: 0 auto;
		}
	}

	.footer-nav :global(.main-nav) {
		position: static;
		transform: none;
		visibility: visible;
		opacity: 1;
		pointer-events: auto;
		height: auto;
		width: auto;
		background: none;
		color: inherit;
	}

	.footer-nav :global(.main-nav ul) {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer-nav :global(.main-nav a) {
		color: var(--color-muted-foreground);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0.25rem 0;
		border-radius: 0.25rem;
		transition: color 0.2s ease;
	}

	.footer-nav :global(.main-nav a:hover) {
		color: var(--color-primary);
	}

	.footer-links ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer-links a {
		color: var(--color-muted-foreground);
		text-decoration: none;
		font-size: 0.875rem;
		transition: color 0.2s ease;
	}

	.footer-links a:hover {
		color: var(--color-primary);
	}

	.footer-bottom {
		max-width: 72rem;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1.5rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	@media (max-width: 768px) {
		.footer-bottom {
			flex-direction: column;
			text-align: center;
		}
	}

	.copyright {
		color: var(--color-muted-foreground);
		font-size: 0.75rem;
		margin: 0;
	}

	.footer-credits {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.maxmade-link {
		opacity: 0.6;
		transition: opacity 0.2s ease;
	}

	.maxmade-link:hover {
		opacity: 1;
	}

	.maxmade-logo .logo-fill {
		fill: var(--color-foreground);
		transition: fill 0.2s ease;
	}

	.github-link {
		color: var(--color-muted-foreground);
		transition: color 0.2s ease;
	}

	.github-link:hover {
		color: var(--color-primary);
	}
</style>