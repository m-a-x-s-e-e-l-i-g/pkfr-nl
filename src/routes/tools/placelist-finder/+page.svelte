<script>
  import PlacelistFilter from '$lib/components/PlacelistFilter.svelte';
  import { titlePostfix } from '$lib/config';
  import InputCollector from '$lib/components/InputCollector.svelte';
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Placelist Finder {titlePostfix}</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-4">Placelist Finder</h1>
<p class="mb-6">
    Placelists zijn lijsten van parkour locaties. Ze kunnen variëren van populaire spots tot verborgen pareltjes.<br/>
    Vind en filter parkour placelists van Nederland en daarbuiten. Zoek op naam, auteur of filter op land.</p>

<PlacelistFilter />

<section class="mt-10 p-6 bg-gray-100 rounded-lg">
  <h2 class="text-xl font-semibold mb-2">Jouw placelist toevoegen?</h2>
  <p class="mb-4">Heb jij een mooie placelist die je wilt delen met de community? Drop een linkje naar je lijst en deze wordt zo snel mogelijk toegevoegd!</p>
  <InputCollector pagePath={$page.url.pathname} />
</section>

