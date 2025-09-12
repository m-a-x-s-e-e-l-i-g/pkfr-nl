<script lang="ts">
  import type { ContentItem } from './types';
  import { isImage, isInlinePlayable } from './utils';
  import { t } from 'svelte-i18n';
  export let selected: ContentItem | null;
  export let openContent: (c: ContentItem) => void;
  export let openExternal: (c: ContentItem) => void;
</script>

{#if selected}
  <div class="absolute inset-0 z-0">
    {#if isImage(selected.thumbnail)}
      <img src={selected.thumbnail} alt={`${selected.title} background`} class="w-full h-full object-cover scale-200" />
      <div class="absolute inset-0 backdrop-blur-2xl bg-white/70 dark:bg-black/70 border-l border-black/10 dark:border-white/10"></div>
    {:else}
      <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 scale-110"></div>
      <div class="absolute inset-0 backdrop-blur-2xl bg-white/70 dark:bg-black/70 border-l border-black/10 dark:border-white/10"></div>
    {/if}
  </div>
  <div class="space-y-4 relative z-10 flex-1">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2" style="font-weight:100;">{selected.title}</h2>
      <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
        {#if selected.type === 'movie'}
          <span class="bg-blue-600 px-2 py-1 rounded text-white text-xs">MOVIE</span>
          {#if selected.paid}<span class="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">PAID</span>{/if}
          <span>{(selected as any).year}</span>
          <span>{(selected as any).duration}</span>
        {:else}
          <span class="bg-red-600 px-2 py-1 rounded text-white text-xs">PLAYLIST</span>
          <span>{(selected as any).creator}</span>
          <span>{(selected as any).videoCount || '?'} videos</span>
        {/if}
        {#if (selected as any).trakt}
          <a href={(selected as any).trakt} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-5 h-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ED1C24] focus:ring-offset-black rounded transition hover:scale-105" aria-label="View on Trakt" title="View on Trakt">
            <img src="https://trakt.tv/assets/logos/logomark.square.gradient-b644b16c38ff775861b4b1f58c1230f6a097a2466ab33ae00445a505c33fcb91.svg" alt="" class="w-full h-full select-none" loading="lazy" decoding="async" />
            <span class="sr-only">View on Trakt</span>
          </a>
        {/if}
      </div>
    </div>
    <div>
      <br />
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{selected.description}</p>
    </div>
    {#if selected.type === 'movie'}
      <div class="space-y-2 text-sm">
        <div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Type:</span><span class="text-gray-900 dark:text-white">Documentary</span></div>
        {#if selected.paid}
          <div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Provider:</span><span class="text-gray-900 dark:text-white">{selected.provider || 'External'}</span></div>
        {/if}
      </div>
    {:else}
      <div class="space-y-2 text-sm">
        <div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Creator:</span><span class="text-gray-900 dark:text-white">{(selected as any).creator}</span></div>
        <div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Videos:</span><span class="text-gray-900 dark:text-white">{(selected as any).videoCount || '?'}</span></div>
        <div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Type:</span><span class="text-gray-900 dark:text-white">YouTube Playlist</span></div>
      </div>
    {/if}
  </div>
  <div class="relative z-10 pt-4">
    <button on:click={() => { if (isInlinePlayable(selected)) openContent(selected); else if (selected?.externalUrl) openExternal(selected); }} class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer">
      {#if isInlinePlayable(selected)}
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 5v10l8-5-8-5z"/></svg>{ $t('tv.playNow') }
      {:else}
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 5v10l8-5-8-5z"/></svg>{ $t('tv.watchOn') } {selected.provider || 'External'}
      {/if}
    </button>
  </div>
{:else}
  <div class="absolute inset-0 z-0 bg-white dark:bg-gray-800 border-l border-black/10 dark:border-white/10"></div>
  <div class="text-center text-gray-500 dark:text-gray-400 py-12 relative z-10">
    <svg class="w-16 h-16 mx-auto mb-4 opacity-30" fill="currentColor" viewBox="0 0 20 20"><path d="M8 5v10l8-5-8-5z"/></svg>
    <p>Select a movie or playlist to view details</p>
  </div>
{/if}
