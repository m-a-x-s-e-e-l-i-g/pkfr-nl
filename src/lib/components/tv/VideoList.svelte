<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import VideoListItem from './VideoListItem.svelte';

  export let videos = [];
  export let watchedState = {};
  export let currentVideo: string = '';

  const dispatch = createEventDispatcher();

  $: upNextVideos = videos.filter(video => !watchedState[video.id]);
  $: historyVideos = videos.filter(video => watchedState[video.id]);
</script>

<Tabs.Root value="upNext" class="w-full">
  <Tabs.List>
    <Tabs.Trigger value="upNext">Up next</Tabs.Trigger>
    <Tabs.Trigger value="history">History</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="upNext">
    <div class="h-200 overflow-y-auto">
      {#each upNextVideos as video (video.id)}
        <VideoListItem {video} {watchedState} {currentVideo} on:selectVideo={(e) => dispatch('selectVideo', e.detail)} on:toggleWatched={(e) => dispatch('toggleWatched', e.detail)} />
      {/each}
    </div>
  </Tabs.Content>
  <Tabs.Content value="history">
    <div class="h-200 overflow-y-auto">
      {#each historyVideos as video (video.id)}
        <VideoListItem {video} {watchedState} {currentVideo} on:selectVideo={(e) => dispatch('selectVideo', e.detail)} on:toggleWatched={(e) => dispatch('toggleWatched', e.detail)} />
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