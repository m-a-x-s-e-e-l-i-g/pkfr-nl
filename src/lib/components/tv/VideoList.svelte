<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Check } from 'lucide-svelte';
  import * as Tabs from "$lib/components/ui/tabs/index.js";

  export let videos = [];
  export let watchedState = {};
  export let currentVideo: string = '';

  const dispatch = createEventDispatcher();

  function handleVideoSelect(videoId: string) {
    dispatch('selectVideo', videoId);
  }

  function handleToggleWatched(event: Event, videoId: string) {
    event.stopPropagation();
    dispatch('toggleWatched', videoId);
  }

  $: upNextVideos = videos.filter(video => !watchedState[video.id]);
  $: historyVideos = videos.filter(video => watchedState[video.id]);
</script>

<Tabs.Root value="upNext" class="w-full">
  <Tabs.List>
    <Tabs.Trigger value="upNext">Up next</Tabs.Trigger>
    <Tabs.Trigger value="history">History</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="upNext">
    <div class="h-full overflow-y-auto">
      {#each upNextVideos as video (video.id)}
        <div
          class="video-item {currentVideo === video.id ? 'bg-red-50' : ''} {watchedState[video.id] ? 'bg-green-50' : ''}"
          on:click={() => handleVideoSelect(video.id)}
          on:keydown={(e) => e.key === 'Enter' && handleVideoSelect(video.id)}
          aria-pressed={currentVideo === video.id}
          role="button"
          tabindex="0"
        >
          <div class="thumbnail-container">
            <img
              src={video.thumbnail}
              alt={video.title}
              class="thumbnail"
            />
          </div>
          <div class="video-info">
            <p class="video-title">{video.title}</p>
            <p class="video-description">{video.description}</p>
          </div>
          <button
            on:click={(event) => handleToggleWatched(event, video.id)}
            class="watched-button {watchedState[video.id] ? 'bg-green-100' : 'bg-gray-100'}"
          >
            <Check size={20} class={watchedState[video.id] ? 'text-green-600' : 'text-gray-400'} />
          </button>
        </div>
      {/each}
    </div>
  </Tabs.Content>
  <Tabs.Content value="history">
    <div class="h-full overflow-y-auto">
      {#each historyVideos as video (video.id)}
        <div
          class="video-item {currentVideo === video.id ? 'bg-red-50' : ''} {watchedState[video.id] ? 'bg-green-50' : ''}"
          on:click={() => handleVideoSelect(video.id)}
          on:keydown={(e) => e.key === 'Enter' && handleVideoSelect(video.id)}
          aria-pressed={currentVideo === video.id}
          role="button"
          tabindex="0"
        >
          <div class="thumbnail-container">
            <img
              src={video.thumbnail}
              alt={video.title}
              class="thumbnail"
            />
          </div>
          <div class="video-info">
            <p class="video-title">{video.title}</p>
            <p class="video-description">{video.description}</p>
          </div>
          <button
            on:click={(event) => handleToggleWatched(event, video.id)}
            class="watched-button {watchedState[video.id] ? 'bg-green-100' : 'bg-gray-100'}"
          >
            <Check size={20} class={watchedState[video.id] ? 'text-green-600' : 'text-gray-400'} />
          </button>
        </div>
      {/each}
    </div>
  </Tabs.Content>
</Tabs.Root>

<style>
  .video-item {
    display: flex;
    align-items: start;
    padding: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .video-item:hover {
    background-color: #f3f4f6; /* hover:bg-gray-100 */
  }

  .thumbnail-container {
    position: relative;
    width: 10rem; /* w-40 */
    flex-shrink: 0;
  }

  .thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9; /* aspect-video */
    object-fit: cover; /* object-cover */
    border-radius: 0.25rem; /* rounded */
  }
  .icon-play {
    color: #ef4444; /* text-red-500 */
  }

  .icon-check {
    color: #16a34a; /* text-green-600 */
    background-color: #d1fae5; /* bg-green-100 */
    border-radius: 9999px; /* rounded-full */
    padding: 0.25rem; /* p-1 */
  }

  .video-info {
    margin-left: 1rem; /* ml-4 */
    flex-grow: 1;
  }

  .video-title {
    font-weight: 500; /* font-medium */
    color: #111827; /* text-gray-900 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .video-description {
    font-size: 0.875rem; /* text-sm */
    color: #6b7280; /* text-gray-500 */
    margin-top: 0.25rem; /* mt-1 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .watched-button {
    margin-left: 1rem; /* ml-4 */
    padding: 0.5rem; /* p-2 */
    border-radius: 9999px; /* rounded-full */
  }
</style>