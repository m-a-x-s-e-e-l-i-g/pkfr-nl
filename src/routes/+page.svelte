<script>
	import OpenGymsShortList from '$lib/components/calendar/OpenGymsShortList.svelte';
	import UpcommingJam from '$lib/components/calendar/UpcommingJam.svelte';
	import { siteTitle, titlePostfix } from '$lib/config';
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{siteTitle} {titlePostfix}</title>
	<style>
		#pagesOverView {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			padding: 0 1rem;
			list-style: none;
			gap: 1.5rem;
		}

		#pagesOverView li {
			margin: 0;
		}

		.hero-section {
			margin-bottom: 4rem;
		}

		.hero-section h1 {
			margin-bottom: 2rem;
			line-height: 1.1;
		}

		.hero-section p {
			font-size: 1.25rem;
			line-height: 1.7;
			margin-bottom: 3rem;
		}

		@media (max-width: 768px) {
			.hero-section {
				margin-bottom: 2.5rem;
			}

			.hero-section h1 {
				margin-bottom: 1.5rem;
				line-height: 1.15;
			}

			.hero-section p {
				font-size: 1.125rem;
				margin-bottom: 2rem;
			}
		}

		.content-section {
			margin-bottom: 3.5rem;
		}

		.content-section h2 {
			margin-bottom: 1.5rem;
		}
	</style>
</svelte:head>

<div class="hero-section">
	<h1>{$t('home.title')}</h1>
	<p>{$t('home.subtitle')}</p>
</div>

<div class="content-section">
	<UpcommingJam />
</div>

<div class="content-section">
	<h2>{$t('home.upcomingOpenGyms')}</h2>
	<OpenGymsShortList />
	<a
		href="/open-gyms"
		class="button">{$t('home.viewAllOpenGyms')}</a
	>
</div>

<div class="content-section">
	<h2>{$t('home.whatsappCommunity')}</h2>
<p>
	{@html $t('home.whatsappDescription')}
</p>

<h2>{$t('home.aboutTitle')}</h2>
<p>
	{@html $t('home.aboutDescription')}
</p>
</div>