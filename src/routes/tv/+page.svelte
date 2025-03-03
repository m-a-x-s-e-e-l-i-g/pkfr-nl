<script lang="ts">
  import { titlePostfix } from '$lib/config';
  import { onMount } from 'svelte';
  import VideoPlayer from '$lib/components/tv/VideoPlayer.svelte';
  import VideoList from '$lib/components/tv/VideoList.svelte';

  const PLAYLIST_ID = 'PL3iwaCsp8s8P0lVvw3DkmMFmGxqBGSXnS';
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  let videos = [];
  let currentVideo = '';
  let error = '';
  let watchedState = {};

  onMount(async () => {
    // Load watched state from localStorage
    const saved = localStorage.getItem('watchedVideos');
    if (saved) {
      watchedState = JSON.parse(saved);
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch playlist data');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Failed to fetch playlist data');
      }
      
      videos = data.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        description: item.snippet.description,
      }));
      
      if (videos.length > 0 && !currentVideo) {
        currentVideo = videos[0].id;
      }
    } catch (err) {
      console.error('Error fetching playlist:', err);
      error = 'Failed to load playlist. Please check your API key and try again.';
    }
  });

  $: {
    if (Object.keys(watchedState).length > 0) {
      localStorage.setItem('watchedVideos', JSON.stringify(watchedState));
    }
  }

  function handleVideoEnd() {
    watchedState = { ...watchedState, [currentVideo]: true };
    
    // Play next video, skipping already watched videos
    let currentIndex = videos.findIndex((v) => v.id === currentVideo);
    while (currentIndex < videos.length - 1) {
      currentIndex++;
      if (!watchedState[videos[currentIndex].id]) {
        currentVideo = videos[currentIndex].id;
        break;
      }
    }
  }

  function handleToggleWatched(videoId: string) {
    watchedState = {
      ...watchedState,
      [videoId]: !watchedState[videoId]
    };
  }
</script>

<svelte:head>
	<title>TV {titlePostfix}</title>
</svelte:head>

{#if error}
  <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
    {error}
  </div>
{/if}

<div class="grid grid-cols-1 gap-6">
  <div class="">
    {#if currentVideo}
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <VideoPlayer 
          videoId={currentVideo} 
          on:ended={handleVideoEnd} 
        />
        <div class="h-28 overflow-y-auto relative">
          <p class="m-4 text-xl font-semibold">
            {videos.find((v) => v.id === currentVideo)?.title}
          </p>
          <p class="m-4 text-sm text-gray-600">
            {videos.find((v) => v.id === currentVideo)?.description}
          </p>
          <div class="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    {/if}
  </div>
  
  <div class="bg-white rounded-lg shadow-sm h-[calc(100vh-12rem)] overflow-hidden">
    <div class="p-4 border-b">
      <p class="text-lg font-semibold">Playlist Videos</p>
      <p class="text-sm text-gray-500">
        {Object.values(watchedState).filter(Boolean).length} of {videos.length} watched
      </p>
    </div>
    <VideoList
      {videos}
      {watchedState}
      {currentVideo}
      on:selectVideo={(e) => currentVideo = e.detail}
      on:toggleWatched={(e) => handleToggleWatched(e.detail)}
    />
  </div>
</div>

<style>
  :global(html) {
    background-color: rgb(249, 250, 251);
  }
</style>