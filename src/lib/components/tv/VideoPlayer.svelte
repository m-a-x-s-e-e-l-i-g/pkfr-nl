<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import 'vidstack/bundle';

  let props = $props();

  const dispatch = createEventDispatcher();

    onMount(() => {
    const player = document.querySelector('media-player');
    if (player) {
      player.addEventListener('ended', () => {
        dispatch('ended');
      });
    }
  });
</script>

<div class="aspect-video w-full bg-black">

<media-player
  viewType="video"
  streamType="on-demand"
  logLevel="warn"
  crossOrigin
  playsInline
  autoPlay
  src="{`youtube/${props.videoId}`}"
>
  <media-provider>
    <media-poster class="vds-poster"></media-poster>
  </media-provider>
  <media-video-layout></media-video-layout>
</media-player>
</div>

<style>
  media-player {
    --media-brand: rgb(220, 38, 38); /* Tailwind's red-600 */
    --media-focus-ring: rgb(254, 242, 242); /* Tailwind's red-50 */
  }
</style>