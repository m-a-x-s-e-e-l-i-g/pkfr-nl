<script>
  import PlacelistFilter from '$lib/components/PlacelistFilter.svelte';
  import { titlePostfix } from '$lib/config';
  import InputCollector from '$lib/components/InputCollector.svelte';
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Freerun Spot Map Finder {titlePostfix}</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Freerun Spot Map Finder</h1>
<p class="mb-6 text-gray-700 dark:text-gray-300">
    Hier vind je snel lijsten en kaarten van parkour spots. Ze kunnen variëren van populaire spots tot verborgen non-spot pareltjes.<br/>
    Vind en filter Nederland en daarbuiten. Zoek op naam, auteur of filter op land.</p>

<PlacelistFilter />

<section class="mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all">
  <h2 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Jouw kaart toevoegen?</h2>
  <p class="mb-4 text-gray-700 dark:text-gray-300">Heb jij een mooie lijst of kaart die je wilt delen met de community? Drop een linkje, en deze wordt zo snel mogelijk toegevoegd!</p>
  <InputCollector pagePath={$page.url.pathname} />
</section>

