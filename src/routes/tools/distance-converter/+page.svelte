<script>
    import { onMount } from 'svelte';
    import { titlePostfix } from '$lib/config';
    import { myShoeSize, friendShoeSize } from '$lib/stores/settings';

    // Reactive variables
    let myMeasuredDistance = 10; // distance in steps
    let friendMeasuredDistance = 0; // distance in steps
    let lastUpdated = 'my'; // Track the last updated field

    // Conversion function: Shoe size to foot length in CM (Paris point system)
    const shoeSizeToFootLength = (size) => size * 0.666;

    // Conversion for distance in steps to meters
    const stepsToMeters = (steps) => steps * shoeSizeToFootLength($myShoeSize) * 0.01;

    // Conversion for distance in steps to stoeptegels
    const stepsToStoeptegels = (steps) => steps * shoeSizeToFootLength($myShoeSize) * 0.01 / 0.3;

    // Helper function to round to the nearest half
    const roundToNearestHalf = (value) => Math.round(value * 2) / 2;

    // Reactive calculations
    $: myFootLength = shoeSizeToFootLength($myShoeSize);
    $: friendFootLength = shoeSizeToFootLength($friendShoeSize);

    // Scale the distance proportionally based on foot length
    $: if (lastUpdated === 'my' && myMeasuredDistance !== 0) {
        friendMeasuredDistance = roundToNearestHalf((friendFootLength / myFootLength) * myMeasuredDistance);
    } else if (lastUpdated === 'friend' && friendMeasuredDistance !== 0) {
        myMeasuredDistance = roundToNearestHalf((myFootLength / friendFootLength) * friendMeasuredDistance);
    }

    function updateMyDistance(value) {
        myMeasuredDistance = value;
        lastUpdated = 'my';
    }

    function updateFriendDistance(value) {
        friendMeasuredDistance = value;
        lastUpdated = 'friend';
    }
</script>

<style>
/* Add your styles here */
</style>

<svelte:head>
    <title>Afstand Analyser 5000™ {titlePostfix}</title>
</svelte:head>

<h1 class="text-center text-2xl font-bold">Afstand Analyser 5000™</h1>
<p class="text-center mt-4">Eeuwenlang worstelden traceurs met een fundamenteel probleem..<br> Dankzij deze revolutionaire technologie zet je sprongafstanden moeiteloos om naar <b>de enige juiste eenheid: jouw schoenmaat</b>.<br/> Vul in, en meet EENMALIG!</p>

<div class="flex justify-around">
  <div class="w-1/2 p-4">
    <h2 class="text-center text-xl font-semibold">Mijn</h2>
    <div class="flex flex-col items-center mt-4">
      <div class="mb-4">
        <label class="block mb-2">Schoenmaat
          <input type="number" bind:value={$myShoeSize} class="p-2 border rounded" step="0.5" min="30" max="50" />
        </label>
      </div>
      <div class="mb-4">
        <label class="block mb-2">Aantal voet
          <input type="number" value={myMeasuredDistance} on:input={(e) => updateMyDistance(e.target.value)} class="p-2 border rounded" step="0.5" min="1" max="99" />
        </label>
      </div>
    </div>
  </div>

  <div class="w-1/2 p-4">
    <h2 class="text-center text-xl font-semibold">Vriend</h2>
    <div class="flex flex-col items-center mt-4">
      <div class="mb-4">
        <label class="block mb-2">Schoenmaat
          <input type="number" bind:value={$friendShoeSize} class="p-2 border rounded" step="0.5" min="30" max="50" />
        </label>
      </div>
      <div class="mb-4">
        <label class="block mb-2">Aantal voet
          <input type="number" value={friendMeasuredDistance} on:input={(e) => updateFriendDistance(e.target.value)} class="p-2 border rounded" step="0.5" min="1" max="99" />
        </label>
      </div>
    </div>
  </div>
</div>

<p class="text-center">Afstand: <strong>{stepsToMeters(myMeasuredDistance).toFixed(2)}</strong> meter.</p>
<p class="text-center">Dat zijn <strong>{roundToNearestHalf(stepsToStoeptegels(myMeasuredDistance))}</strong> stoeptegels.</p>
