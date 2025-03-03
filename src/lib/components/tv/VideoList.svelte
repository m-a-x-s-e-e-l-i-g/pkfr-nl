<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { PlayCircle, Check } from 'lucide-svelte';

  export let videos = [];
  export let watchedState = {};
  export let currentVideo: string = '';

  const dispatch = createEventDispatcher();

  function handleVideoSelect(videoId: string) {
    dispatch('selectVideo', videoId);
  }

  function handleToggleWatched(videoId: string) {
    dispatch('toggleWatched', videoId);
  }
</script>

<div class="h-full overflow-y-auto">
  {#each videos as video (video.id)}
    <div
      class="flex items-start p-4 hover:bg-gray-100 cursor-pointer {currentVideo === video.id ? 'bg-red-50' : ''} {watchedState[video.id] ? 'bg-green-50' : ''}"
      on:click={() => handleVideoSelect(video.id)}
      on:keydown={(e) => e.key === 'Enter' && handleVideoSelect(video.id)}
      aria-pressed={currentVideo === video.id}
      role="button"
      tabindex="0"
    >
      <div 
        class="relative w-40 flex-shrink-0" 
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          class="w-full aspect-video object-cover rounded"
        />
        {#if currentVideo === video.id}
          <PlayCircle
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500"
            size={32}
          />
        {:else if watchedState[video.id]}
          <Check
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600 bg-green-100 rounded-full p-1"
            size={32}
          />
        {/if}
      </div>
      <div class="ml-4 flex-grow">
        <p class="font-medium text-gray-900 line-clamp-2">{video.title}</p>
        <p class="text-sm text-gray-500 mt-1 line-clamp-2">{video.description}</p>
      </div>
      <button
        on:click={() => handleToggleWatched(video.id)}
        class="watched ml-4 p-2 rounded-full {watchedState[video.id] ? 'bg-green-100' : 'bg-gray-100'}"
      >
        <Check
          size={20}
          class={watchedState[video.id] ? 'text-green-600' : 'text-gray-400'}
        />
      </button>
    </div>
  {/each}
</div>