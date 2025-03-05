<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import 'vidstack/bundle';

  let props = $props();
  const dispatch = createEventDispatcher();
  const bottomMargin = 20; // Adjust this value to set the desired margin from the bottom

  function adjustPlayerHeight() {
    const playerContainer = document.querySelector('.player-container');
    const player = document.querySelector('media-player');
    if (playerContainer && player) {
      const viewportHeight = window.innerHeight;
      const playerBottom = playerContainer.getBoundingClientRect().bottom;

      if (playerBottom > viewportHeight - bottomMargin) {
        const newHeight = viewportHeight - playerContainer.getBoundingClientRect().top - bottomMargin;
        playerContainer.style.height = `${newHeight}px`;
        player.style.height = `${newHeight}px`;
      } else {
        playerContainer.style.height = 'auto';
        player.style.height = 'auto';
      }
    }
  }

  onMount(() => {
    const player = document.querySelector('media-player');
    if (player) {
      player.addEventListener('ended', () => {
        dispatch('ended');
      });
    }

    adjustPlayerHeight();
    window.addEventListener('resize', adjustPlayerHeight);
  });

  onDestroy(() => {
    window.removeEventListener('resize', adjustPlayerHeight);
  });
</script>

<div class="player-container aspect-video w-full bg-black">
  <media-player
    viewType="video"
    streamType="on-demand"
    logLevel="warn"
    crossOrigin
    playsInline
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