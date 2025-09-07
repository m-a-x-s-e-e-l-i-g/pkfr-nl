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

    // Conversion for distance in steps to footbags
    const stepsToFootbags = (steps) => steps * shoeSizeToFootLength($myShoeSize) * 0.01 / 0.05715;

    // Helper function to round to the nearest half
    const roundToNearestHalf = (value) => Math.round(value * 2) / 2;

    // Reactive calculations
    $: myFootLength = shoeSizeToFootLength($myShoeSize);
    $: friendFootLength = shoeSizeToFootLength($friendShoeSize);

    $: if (lastUpdated === 'my' && myMeasuredDistance !== 0) {
        friendMeasuredDistance = roundToNearestHalf((myFootLength / friendFootLength) * myMeasuredDistance);
    } else if (lastUpdated === 'friend' && friendMeasuredDistance !== 0) {
        myMeasuredDistance = roundToNearestHalf((friendFootLength / myFootLength) * friendMeasuredDistance);
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

<h1 class="text-center text-2xl font-bold">Distance Analyzer 5000™</h1>
<p class="text-center mt-4">For centuries traceurs have struggled with a fundamental problem...<br> Thanks to this revolutionary technology you can effortlessly convert jump distances to <b>the only correct unit: your shoe size</b>.<br/> Enter your values and measure once and for all!</p>

<div class="flex justify-around">
  <div class="w-1/2 p-4">
  <h2 class="text-center text-xl font-semibold">Mine</h2>
    <div class="flex flex-col items-center mt-4">
      <div class="mb-4">
        <label class="block mb-2">Shoe size
          <input type="number" bind:value={$myShoeSize} class="p-2 border rounded" step="0.5" min="30" max="50" required/>
        </label>
      </div>
      <div class="mb-4">
        <label class="block mb-2">Number of steps
          <input type="number" value={myMeasuredDistance} on:input={(e) => updateMyDistance(e.target.value)} class="p-2 border rounded" step="0.5" min="1" max="99" required/>
        </label>
      </div>
    </div>
  </div>

  <div class="w-1/2 p-4">
  <h2 class="text-center text-xl font-semibold">Friend</h2>
    <div class="flex flex-col items-center mt-4">
      <div class="mb-4">
        <label class="block mb-2">Shoe size
          <input type="number" bind:value={$friendShoeSize} class="p-2 border rounded" step="0.5" min="30" max="50" required/>
        </label>
      </div>
      <div class="mb-4">
        <label class="block mb-2">Number of steps
          <input type="number" value={friendMeasuredDistance} on:input={(e) => updateFriendDistance(e.target.value)} class="p-2 border rounded" step="0.5" min="1" max="99" required/>
        </label>
      </div>
    </div>
  </div>
</div>

<p class="text-center">Distance: <strong>{stepsToMeters(myMeasuredDistance).toFixed(2)}</strong> meters.</p>
<p class="text-center">That's <strong>{roundToNearestHalf(stepsToStoeptegels(myMeasuredDistance))}</strong> sidewalk tiles.</p>
<p class="text-center">Or <strong>{roundToNearestHalf(stepsToFootbags(myMeasuredDistance))}</strong> hacky sacks.</p>
