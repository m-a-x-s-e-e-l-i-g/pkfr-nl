<script>
  import PlacelistFilter from '$lib/components/PlacelistFilter.svelte';
  import { titlePostfix } from '$lib/config';
  import InputCollector from '$lib/components/InputCollector.svelte';
  import { page } from '$app/stores';
  import { t } from 'svelte-i18n';
</script>

<svelte:head>
  <title>{$t('tools.spotMapFinder.pageTitle')} {titlePostfix}</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{$t('tools.spotMapFinder.heading')}</h1>
<p class="mb-6 text-gray-700 dark:text-gray-300">{@html $t('tools.spotMapFinder.intro')}</p>

<PlacelistFilter />

<section class="mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all">
  <h2 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{$t('tools.spotMapFinder.addMapTitle')}</h2>
  <p class="mb-4 text-gray-700 dark:text-gray-300">{$t('tools.spotMapFinder.addMapDescription')}</p>
  <InputCollector pagePath={$page.url.pathname} />
</section>

