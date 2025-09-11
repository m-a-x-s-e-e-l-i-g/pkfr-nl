<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { Switch } from "$lib/components/ui/switch/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { movies } from '$lib/assets/movies';
	import { playlists } from '$lib/assets/playlists';
	import { t } from 'svelte-i18n';

	let selectedContent: any = null;
	let showPlayer = false;
	let allContent: any[] = [];
	let selectedIndex = 0;
	// Mobile responsive state
	let isMobile = false;
	let showDetailsPanel = false; // mobile details overlay

	// UI state: search, filter, sorting
	type SortBy =
		| 'default'
		| 'title-asc'
		| 'year-desc'
		| 'year-asc'
		| 'duration-asc'
		| 'duration-desc';
	let searchQuery: string = '';
	// Show/hide paid content (default yes)
	let showPaid: boolean = true;
	let sortBy: SortBy = 'default';

	const sortLabels: Record<SortBy, string> = {
		default: 'Sort: Default',
		'title-asc': 'Title A–Z',
		'year-desc': 'Year (newest)',
		'year-asc': 'Year (oldest)',
		'duration-asc': 'Duration (short → long)',
		'duration-desc': 'Duration (long → short)'
	};

	function parseYear(item: any): number {
		const y = parseInt(item?.year);
		return isNaN(y) ? 0 : y;
	}

	function parseDurationToMinutes(dur?: string): number {
		if (!dur || typeof dur !== 'string') return Number.POSITIVE_INFINITY; // playlists or unknown push to end
		let minutes = 0;
		const hMatch = dur.match(/(\d+)\s*h/i);
		const mMatch = dur.match(/(\d+)\s*m/i);
		if (hMatch) minutes += parseInt(hMatch[1]) * 60;
		if (mMatch) minutes += parseInt(mMatch[1]);
		return minutes || Number.POSITIVE_INFINITY;
	}

	function matchesSearch(item: any, q: string): boolean {
		if (!q) return true;
		const hay = `${item.title || ''} ${item.description || ''} ${item.creator || ''}`.toLowerCase();
		return hay.includes(q.toLowerCase());
	}
	let playerContainer: HTMLElement;
	let gridEl: HTMLElement;
	let sidebarEl: HTMLElement;
	let headerHeight = 0;
	let sidebarTop = 0;

	function isInlinePlayable(content: any) {
		if (!content) return false;
		if (content.type === 'movie') return Boolean(content.videoId || content.vimeoId);
		if (content.type === 'playlist') return Boolean(content.playlistId);
		return false;
	}

	function openExternalContent(content: any) {
		if (content?.externalUrl) {
			window.open(content.externalUrl, '_blank', 'noopener');
		}
	}

	// Combine movies and playlists into one base array (original order for default sorting)
	$: allContent = [...movies, ...playlists];

	// Build visible list using filter/search/sort
	let visibleContent: any[] = [];
	$: {
		const filtered = allContent
			.filter((item) => {
				// If showPaid is false, hide items explicitly marked as paid
				return showPaid ? true : !item.paid;
			})
			.filter((item) => matchesSearch(item, searchQuery));

		let sorted = [...filtered];
			switch (sortBy) {
			case 'title-asc':
				sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
				break;
			case 'year-desc':
				sorted.sort((a, b) => parseYear(b) - parseYear(a));
				break;
			case 'year-asc':
				sorted.sort((a, b) => parseYear(a) - parseYear(b));
				break;
			case 'duration-asc':
				sorted.sort((a, b) => parseDurationToMinutes(a.duration) - parseDurationToMinutes(b.duration));
				break;
			case 'duration-desc':
				sorted.sort((a, b) => parseDurationToMinutes(b.duration) - parseDurationToMinutes(a.duration));
				break;
			default:
					// Default sorting: by id descending (newest first by id)
					sorted.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
					break;
		}

		visibleContent = sorted;
	}

	// Ensure a valid selected item from the visible list
	$: if (visibleContent.length > 0) {
		if (!selectedContent || !visibleContent.some((x) => x.id === selectedContent.id && x.type === selectedContent.type)) {
			selectedContent = visibleContent[0];
			selectedIndex = 0;
		}
	} else {
		selectedContent = null;
		selectedIndex = 0;
	}

	function selectContent(content: any) {
		selectedContent = content;
		selectedIndex = visibleContent.findIndex(item => item.id === content.id && item.type === content.type);
		showPlayer = false;
		if (isMobile) {
			showDetailsPanel = true; // open overlay on mobile
			// Prevent body scroll beneath
			document.documentElement.classList.add('overflow-hidden');
		} else {
			document.documentElement.classList.remove('overflow-hidden');
		}
	}

	function selectByIndex(index: number) {
		if (index >= 0 && index < visibleContent.length) {
			selectedIndex = index;
			selectedContent = visibleContent[index];
			showPlayer = false;
		}
	}

	function openContent(content: any) {
		selectedContent = content;
		if (isInlinePlayable(content)) {
			showPlayer = true;
			// On mobile hide detail panel while playing
			if (isMobile) {
				showDetailsPanel = false;
				document.documentElement.classList.remove('overflow-hidden');
			}
			// Request fullscreen after a short delay to ensure the player is rendered
			setTimeout(() => {
				if (playerContainer) {
					requestFullscreen(playerContainer);
				}
			}, 100);
		} else if (content?.externalUrl) {
			openExternalContent(content);
		} else {
			console.warn('No playable source available for this item.');
		}
	}

	function closePlayer() {
		showPlayer = false;
		// Exit fullscreen when closing player
		if (document.fullscreenElement) {
			document.exitFullscreen();
		}
		document.documentElement.classList.remove('overflow-hidden');
	}

	function closeDetailsPanel() {
		showDetailsPanel = false;
		document.documentElement.classList.remove('overflow-hidden');
	}

	function requestFullscreen(element: HTMLElement) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if ((element as any).webkitRequestFullscreen) {
			(element as any).webkitRequestFullscreen();
		} else if ((element as any).msRequestFullscreen) {
			(element as any).msRequestFullscreen();
		}
	}

	function getYouTubeEmbedUrl(videoId: string) {
		return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&fs=1&modestbranding=1&controls=1`;
	}

	function getVimeoEmbedUrl(vimeoId: string) {
		return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
	}

	function getPlaylistEmbedUrl(playlistId: string) {
		return `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&fs=1&modestbranding=1&controls=1`;
	}

	// Consider both external (http...) and local absolute ("/path/to/...") image URLs
	function isImage(src: string) {
		return typeof src === 'string' && (src.startsWith('http') || src.startsWith('/'));
	}

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (showPlayer && event.key === 'Escape') {
			closePlayer();
			return;
		}

		// Also handle fullscreen exit
		if (event.key === 'Escape' && document.fullscreenElement) {
			document.exitFullscreen();
			closePlayer();
			return;
		}

		// Arrow key navigation
		if (!showPlayer) {
			switch (event.key) {
				case 'ArrowRight':
					event.preventDefault();
					selectByIndex(selectedIndex + 1);
					break;
				case 'ArrowLeft':
					event.preventDefault();
					selectByIndex(selectedIndex - 1);
					break;
				case 'ArrowDown':
					event.preventDefault();
					// Prefer dynamic column calculation from the grid when available so navigation follows layout
					let dynamicCols = 0;
					try {
						if (gridEl && gridEl.children && gridEl.children.length > 0) {
							const first = gridEl.children[0] as HTMLElement;
							const itemW = Math.ceil(first.getBoundingClientRect().width);
							const containerW = Math.floor(gridEl.getBoundingClientRect().width);
							dynamicCols = Math.max(1, Math.floor(containerW / (itemW || 1)));
						}
					} catch (e) {
						dynamicCols = 0;
					}
					const downCols = dynamicCols || (window.innerWidth >= 1536 ? 6 : window.innerWidth >= 1280 ? 5 : window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2);
					selectByIndex(selectedIndex + downCols);
					break;
				case 'ArrowUp':
					event.preventDefault();
					let dynamicColsUp = 0;
					try {
						if (gridEl && gridEl.children && gridEl.children.length > 0) {
							const first = gridEl.children[0] as HTMLElement;
							const itemW = Math.ceil(first.getBoundingClientRect().width);
							const containerW = Math.floor(gridEl.getBoundingClientRect().width);
							dynamicColsUp = Math.max(1, Math.floor(containerW / (itemW || 1)));
						}
					} catch (e) {
						dynamicColsUp = 0;
					}
					const upCols = dynamicColsUp || (window.innerWidth >= 1536 ? 6 : window.innerWidth >= 1280 ? 5 : window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2);
					selectByIndex(selectedIndex - upCols);
					break;
				case 'Enter':
					event.preventDefault();
					if (selectedContent) {
						openContent(selectedContent);
					}
					break;
			}
		}
	}

	onMount(() => {
		// Initial mobile detection & resize listener
		function updateIsMobile() {
			isMobile = window.innerWidth < 768; // Tailwind md breakpoint
			if (!isMobile) {
				showDetailsPanel = false; // ensure overlay hidden when switching to desktop
			}
		}

		// Calculate header height for sidebar positioning
		function updateHeaderHeight() {
			const header = document.querySelector('header');
			headerHeight = header ? header.offsetHeight : 0;
			console.log(headerHeight);
			updateSidebarPosition();
		}

		// Handle scroll for simulated sticky sidebar
		function handleScroll() {
			updateSidebarPosition();
		}

		function updateSidebarPosition() {
			if (!sidebarEl || isMobile) return;
			
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			
			// If we've scrolled past the header, stick to top
			if (scrollTop >= headerHeight) {
				sidebarTop = 0;
			} else {
				// Otherwise, position below the header minus scroll
				sidebarTop = headerHeight - scrollTop;
			}
			
			// Apply the calculated top position
			sidebarEl.style.top = `${sidebarTop}px`;
			sidebarEl.style.height = `calc(100vh - ${sidebarTop}px)`;
		}

		updateIsMobile();
		updateHeaderHeight();
		
		window.addEventListener('resize', () => {
			updateIsMobile();
			updateHeaderHeight();
		});
		window.addEventListener('scroll', handleScroll);
		document.addEventListener('keydown', handleKeydown);
		
		// Listen for fullscreen changes
		document.addEventListener('fullscreenchange', () => {
			if (!document.fullscreenElement && showPlayer) {
				closePlayer();
			}
		});
		
		return () => {
			document.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('resize', () => {
				updateIsMobile();
				updateHeaderHeight();
			});
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>JUMPFLIX Parkour Freerunning TV - PKFR.nl</title>
	<meta name="description" content="{$t('tv.description')}" />
</svelte:head>

<div class="md:-mx-60 min-h-screen bg-background text-foreground tv-page">
	<!-- Header Section -->
	<div class="container mx-auto px-6 py-0 text-center">
		<div class="my-2 flex justify-center">
			<!-- Light theme logo -->
			<img 
				src="/images/jumpflix-light.webp" 
				alt="JUMPFLIX parkour tv" 
				class="dark:hidden"
				style="height: 150px; width: auto; max-height: 150px;"
				loading="eager"
			/>
			<!-- Dark theme logo -->
			<img 
				src="/images/jumpflix-dark.webp" 
				alt="JUMPFLIX parkour tv" 
				class="hidden dark:block"
				style="height: 150px; width: auto; max-height: 150px;"
				loading="eager"
			/>
		</div>
		<p class="text-gray-600 dark:text-gray-300" style="font-size:14px;">{$t('tv.description')}</p>
	</div>

	<!-- Controls: Search, Filter, Sort -->
	<div class="container mx-auto px-6 pt-4">
		<div class="flex flex-wrap items-center gap-3">
			<!-- Search -->
			<div class="relative flex-1 min-w-[260px] group">
				<span class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors z-10">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"/></svg>
				</span>
				{#if searchQuery}
					<button
						type="button"
						class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 z-10"
						on:click={() => (searchQuery = '')}
						aria-label="Clear search"
					>
						<svg class="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
					</button>
				{/if}
				<input
					bind:value={searchQuery}
					type="text"
					autocomplete="off"
					spellcheck="false"
					placeholder="{$t('tv.searchPlaceholder')}"
					aria-label="Search content"
					class="w-full h-10 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-300 dark:focus:border-gray-500 transition hover:border-gray-300 dark:hover:border-gray-500"
					style="padding-left: 3rem; padding-right: 1rem; border-radius: 0.5rem;"
				/>
			</div>

			<!-- Show paid switch (shadcn-svelte) -->
			<label class="flex items-center gap-3 select-none bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2">
				<span class="text-sm text-gray-700 dark:text-gray-300">Paid</span>
				<Switch bind:checked={showPaid} aria-label="Show paid items" />
			</label>

			<!-- Sorting -->
			<div>
				<Select.Root type="single" bind:value={sortBy}>
					<Select.Trigger class="w-[180px]">
						<span>{sortLabels[sortBy]}</span>
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="default">Sort: Default</Select.Item>
						<Select.Item value="title-asc">Title A–Z</Select.Item>
						<Select.Item value="year-desc">Year (newest)</Select.Item>
						<Select.Item value="year-asc">Year (oldest)</Select.Item>
						<Select.Item value="duration-asc">Duration (short → long)</Select.Item>
						<Select.Item value="duration-desc">Duration (long → short)</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
	</div>

	<!-- Content Grid -->
	<div>
		<!-- Main Content Area -->
		<div class="container mx-auto px-6 py-6 pr-4 tv-main mt-4">
			<!-- Grid over unified, filtered & sorted content -->
			<div bind:this={gridEl} class="grid auto-fit-grid gap-4">
				{#if visibleContent.length === 0}
					<div class="col-span-full text-center text-gray-400 py-8">No results. Try adjusting filters.</div>
				{:else}
					{#each visibleContent as item (item.type + ':' + item.id)}
						{#if item.type === 'movie'}
							<div 
								class="group cursor-pointer"
								class:transform={!isMobile}
								class:hover:scale-105={!isMobile}
								class:transition-all={!isMobile}
								class:duration-300={!isMobile}
								class:scale-105={!isMobile && selectedContent && selectedContent.id === item.id && selectedContent.type === item.type}
								on:click={() => selectContent(item)}
								on:keydown={(e) => e.key === 'Enter' && selectContent(item)}
								tabindex="0"
								role="button"
							>
								<div class="relative aspect-[2/3] aspect-[2/3] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-3 shadow-lg transition-all duration-300"
									class:group-hover:ring-4={!isMobile}
									class:group-hover:ring-blue-400={!isMobile}
									class:ring-4={!isMobile && selectedContent && selectedContent.id === item.id && selectedContent.type === item.type}
									class:ring-red-500={!isMobile && selectedContent && selectedContent.id === item.id && selectedContent.type === item.type}
									title="{item.title}"
								>
									{#if isImage(item.thumbnail)}
										<img src={item.thumbnail} alt="{item.title} poster" class="w-full h-full object-cover" loading="lazy" style="height:100%;" />
									{:else}
										<div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
											<div class="text-center p-3">
												<svg class="w-8 h-8 mx-auto mb-2 opacity-60" fill="currentColor" viewBox="0 0 20 20"><path d="M8 5v10l8-5-8-5z"/></svg>
												<p class="text-xs opacity-80 font-medium text-center leading-tight">{item.title}</p>
											</div>
										</div>
									{/if}

									<div class="absolute top-2 left-2 flex gap-2">
										{#if item.paid}
											<span class="bg-yellow-500 text-black px-2 py-1 rounded text-[10px] font-bold">PAID</span>
										{/if}
									</div>

									<div class="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-[10px] text-white/90">{item.duration}</div>
								</div>
							</div>
						{:else if item.type === 'playlist'}
							<div 
								class="group cursor-pointer"
								class:transform={!isMobile}
								class:hover:scale-105={!isMobile}
								class:transition-all={!isMobile}
								class:duration-300={!isMobile}
								class:scale-105={!isMobile && selectedContent && selectedContent.id === item.id && selectedContent.type === item.type}
								on:click={() => selectContent(item)}
								on:keydown={(e) => e.key === 'Enter' && selectContent(item)}
								tabindex="0"
								role="button"
							>
								<div class="relative aspect-[2/3] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-3 shadow-lg transition-all duration-300"
									class:group-hover:ring-4={!isMobile}
									class:group-hover:ring-red-400={!isMobile}
									class:ring-4={!isMobile && selectedContent && selectedContent.id === item.id && selectedContent.type === item.type}
									class:ring-red-500={!isMobile && selectedContent && selectedContent.id === item.id && selectedContent.type === item.type}
									title="{item.title}"
								>
									{#if isImage(item.thumbnail)}
										<img src={item.thumbnail} alt="{item.title} thumbnail" class="w-full h-full object-cover" loading="lazy" />
									{:else}
										<div class="absolute inset-0 bg-gradient-to-br from-red-600 to-pink-700 flex items-center justify-center">
											<div class="text-center p-3">
												<svg class="w-8 h-8 mx-auto mb-2 opacity-60" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/></svg>
												<p class="text-xs opacity-80 font-medium text-center leading-tight">{item.title}</p>
											</div>
										</div>
									{/if}

									<div class="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-[10px] text-white/90">{item.videoCount || '?'} videos</div>
								</div>
							</div>
						{/if}
					{/each}
				{/if}
			</div>
		</div>

	<!-- Sidebar (desktop & tablet) -->
	<div bind:this={sidebarEl} class="hidden md:flex w-96 border-l border-gray-200 dark:border-gray-700 p-6 fixed right-0 overflow-hidden flex-col bg-white/70 dark:bg-transparent backdrop-blur-sm" style="top: {sidebarTop}px; height: calc(100vh - {sidebarTop}px);">
			{#if selectedContent}
				<!-- Background with poster and glass effect -->
					<div class="absolute inset-0 z-0">
					{#if isImage(selectedContent.thumbnail)}
							<img 
							src={selectedContent.thumbnail} 
							alt="{selectedContent.title} background"
							class="w-full h-full object-cover scale-200"
						/>
							<div class="absolute inset-0 backdrop-blur-2xl bg-white/70 dark:bg-black/70 border-l border-black/10 dark:border-white/10"></div>
					{:else}
						<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 scale-110"></div>
						<div class="absolute inset-0 backdrop-blur-2xl bg-white/70 dark:bg-black/70 border-l border-black/10 dark:border-white/10"></div>
					{/if}
				</div>

				<!-- Content details -->
				<div class="space-y-4 relative z-10 flex-1">
					<div>
						<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2" style="font-weight:100;">{selectedContent.title}</h2>
						<div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
							{#if selectedContent.type === 'movie'}
								<span class="bg-blue-600 px-2 py-1 rounded text-white text-xs">MOVIE</span>
								{#if selectedContent.paid}
									<span class="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">PAID</span>
								{/if}
								<span>{selectedContent.year}</span>
								<span>{selectedContent.duration}</span>
							{:else}
								<span class="bg-red-600 px-2 py-1 rounded text-white text-xs">PLAYLIST</span>
								<span>{selectedContent.creator}</span>
								<span>{selectedContent.videoCount || '?'} videos</span>
							{/if}

							{#if selectedContent.trakt}
								<a
									href={selectedContent.trakt}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center justify-center w-5 h-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ED1C24] focus:ring-offset-black rounded transition hover:scale-105"
									aria-label="View on Trakt"
									title="View on Trakt"
								>
									<img 
										src="https://trakt.tv/assets/logos/logomark.square.gradient-b644b16c38ff775861b4b1f58c1230f6a097a2466ab33ae00445a505c33fcb91.svg" 
										alt="" 
										class="w-full h-full select-none" 
										loading="lazy" 
										decoding="async"
									/>
									<span class="sr-only">View on Trakt</span>
								</a>
							{/if}
						</div>
					</div>

					<!-- Description -->
					<div>
						<br/>
						<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
							{selectedContent.description}
						</p>
					</div>

					{#if selectedContent.type === 'movie'}
						<!-- Movie specific details -->
						<div>
							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span class="text-gray-500 dark:text-gray-400">Type:</span>
									<span class="text-gray-900 dark:text-white">Documentary</span>
								</div>
								{#if selectedContent.paid}
									<div class="flex justify-between">
										<span class="text-gray-500 dark:text-gray-400">Provider:</span>
										<span class="text-gray-900 dark:text-white">{selectedContent.provider || 'External'}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-500 dark:text-gray-400">{$t('tv.price')}:</span>
										<span class="text-gray-900 dark:text-white">{selectedContent.price || ''}</span>
									</div>
								{/if}
							</div>
						</div>
					{:else}
						<!-- Playlist specific details -->
						<div>
							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span class="text-gray-500 dark:text-gray-400">Creator:</span>
									<span class="text-gray-900 dark:text-white">{selectedContent.creator}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-500 dark:text-gray-400">Videos:</span>
									<span class="text-gray-900 dark:text-white">{selectedContent.videoCount || '?'}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-500 dark:text-gray-400">Type:</span>
									<span class="text-gray-900 dark:text-white">YouTube Playlist</span>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- Action buttons - Fixed to bottom -->
				<div class="relative z-10 pt-4">
					<button 
						on:click={() => {
							if (isInlinePlayable(selectedContent)) {
								openContent(selectedContent);
							} else if (selectedContent?.externalUrl) {
								openExternalContent(selectedContent);
							}
						}}
						class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
					>
						{#if isInlinePlayable(selectedContent)}
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path d="M8 5v10l8-5-8-5z"/>
							</svg>
							{$t('tv.playNow')}
						{:else}
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path d="M8 5v10l8-5-8-5z"/>
							</svg>
							{$t('tv.watchOn')} {selectedContent.provider || 'External'}
						{/if}
					</button>
				</div>
			{:else}
				<!-- Default background when no content selected -->
				<div class="absolute inset-0 z-0 bg-white dark:bg-gray-800 border-l border-black/10 dark:border-white/10"></div>
				
				<div class="text-center text-gray-500 dark:text-gray-400 py-12 relative z-10">
					<svg class="w-16 h-16 mx-auto mb-4 opacity-30" fill="currentColor" viewBox="0 0 20 20">
						<path d="M8 5v10l8-5-8-5z"/>
					</svg>
					<p>Select a movie or playlist to view details</p>
				</div>
			{/if}
		</div>

		<!-- Mobile Details Overlay -->
		{#if isMobile && showDetailsPanel && selectedContent}
			<div class="md:hidden fixed inset-0 z-40 bg-white/95 dark:bg-black/90 backdrop-blur-xl flex flex-col" transition:fade>
				<!-- Scrollable content area -->
				<div class="flex-1 overflow-y-auto">
					<!-- Top bar -->
					<div class="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-black/70 backdrop-blur border-b border-black/10 dark:border-white/10">
						<button on:click={closeDetailsPanel} class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white px-3 py-2 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
							{$t('tv.back')}
						</button>
						<h2 class="text-base line-clamp-2 pr-2 pl-2 text-gray-900 dark:text-white" style="margin:0;font-size:.9em!important;font-family: 'Inter', sans-serif;">{selectedContent.title}</h2>
					</div>

					<!-- Poster background -->
					<div class="relative">
						{#if isImage(selectedContent.thumbnail)}
							<img src={selectedContent.thumbnail} alt="{selectedContent.title} background" class="w-full h-72 object-cover opacity-60" />
						{/if}
						<div class="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/10 dark:from-black dark:via-black/60 dark:to-black/10"></div>
						<div class="absolute bottom-4 left-4 right-4">
							<h3 class="mb-2 text-gray-900 dark:text-white" style="font-size:2em!important;font-weight:100;">{selectedContent.title}</h3>
							<div class="flex flex-wrap items-center gap-2 text-xs text-gray-700 dark:text-gray-300 mb-3">
								{#if selectedContent.type === 'movie'}
									<span class="bg-blue-600 px-2 py-1 rounded">MOVIE</span>
									{#if selectedContent.paid}<span class="bg-yellow-400 text-black px-2 py-1 rounded font-bold">PAID</span>{/if}
									<span>{selectedContent.year}</span>
									<span>{selectedContent.duration}</span>
								{:else}
									<span class="bg-red-600 px-2 py-1 rounded">PLAYLIST</span>
									<span>{selectedContent.creator}</span>
									<span>{selectedContent.videoCount || '?'} videos</span>
								{/if}

								{#if selectedContent.trakt}
									<a
										href={selectedContent.trakt}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center justify-center w-7 h-7 focus:outline-none focus:ring-2 focus:ring-[#ED1C24] focus:ring-offset-2 focus:ring-offset-black rounded transition active:scale-95 hover:scale-105"
										aria-label="View on Trakt"
										title="Trakt"
									>
										<img 
											src="https://trakt.tv/assets/logos/logomark.square.gradient-b644b16c38ff775861b4b1f58c1230f6a097a2466ab33ae00445a505c33fcb91.svg" 
											alt="" 
											class="w-full h-full select-none" 
											loading="lazy" 
											decoding="async"
										/>
										<span class="sr-only">Trakt</span>
									</a>
								{/if}
							</div>
						</div>
					</div>

					<!-- Content body -->
					<div class="px-4 pb-28 pt-4 space-y-6">
						<div>
							<p class="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">{selectedContent.description}</p>
						</div>

						{#if selectedContent.type === 'movie'}
							<div>
								<ul class="text-xs text-gray-600 dark:text-gray-300 space-y-1" style="padding-left:0;">
									{#if selectedContent.paid}
										<li class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Provider</span><span>{selectedContent.provider || 'External'}</span></li>
										<li class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">{$t('tv.price')}</span><span>{selectedContent.price || ''}</span></li>
									{/if}
								</ul>
							</div>
						{:else}
							<div>
								<ul class="text-xs text-gray-600 dark:text-gray-300 space-y-1" style="padding-left:0;">
									<li class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Creator</span><span>{selectedContent.creator}</span></li>
									<li class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Videos</span><span>{selectedContent.videoCount || '?'}</span></li>
									<li class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Type</span><span>YouTube Playlist</span></li>
								</ul>
							</div>
						{/if}
					</div>
				</div>

				<!-- Bottom action bar - now outside scrollable area -->
				<div class="p-4 bg-white/90 dark:bg-black/80 backdrop-blur border-t border-black/10 dark:border-white/10">
					<button 
						on:click={() => {
							if (isInlinePlayable(selectedContent)) {
								openContent(selectedContent);
							} else if (selectedContent?.externalUrl) {
								openExternalContent(selectedContent);
							}
						}}
						class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
					>
						{#if isInlinePlayable(selectedContent)}
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 5v10l8-5-8-5z"/></svg>
							{$t('tv.playNow')}
						{:else}
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 5v10l8-5-8-5z"/></svg>
							{$t('tv.watchOn')} {selectedContent.provider || 'External'}
						{/if}
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Only apply hover effects on non-mobile devices */
	@media (min-width: 768px) {
		.tv-page :global(.group:hover img) { filter: brightness(1.05); }
	}

	.auto-fit-grid {
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		justify-content: center;
		justify-items: center;
	}

	.auto-fit-grid > * {
		width: 100%;
		max-width: 300px;
	}

	/* Mobile responsive grid - smaller posters for 2 columns */
	@media (max-width: 767px) {
		.auto-fit-grid {
			grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		}
		
		.auto-fit-grid > * {
			max-width: 200px;
		}
	}

	@media (min-width: 768px) {
		.tv-page {
			margin-left: auto;
			margin-right: auto;
		}

		.tv-page .container {
			max-width: 100%;
			width: 100%;
		}

		.tv-page .tv-main {
			width: 100%;
			padding-right: 1rem;
		}
	}

	:global(.tv-layout main) {
		max-width: 100vw;
		padding: 0 1rem 0 0;
		margin: 1rem auto;
	}
</style>

<!-- Video Player Modal -->
{#if showPlayer && selectedContent}
	<div 
		bind:this={playerContainer}
		class="fixed inset-0 bg-black z-50 flex items-center justify-center"
		transition:fade={{ duration: 300 }}
		on:click={closePlayer}
		on:keydown={(e) => e.key === 'Escape' && closePlayer()}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div 
			class="relative w-full h-full bg-black"
			transition:scale={{ duration: 300 }}
			on:click|stopPropagation
			on:keydown|stopPropagation
			role="presentation"
		>
			<!-- Close button -->
			<button 
				on:click={closePlayer}
				class="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
				aria-label="Close player"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
				</svg>
			</button>

			<!-- Video iframe -->
			{#if selectedContent.type === 'movie' && selectedContent.videoId}
				<iframe
					src={getYouTubeEmbedUrl(selectedContent.videoId)}
					title={selectedContent.title}
					class="w-full h-full"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			{:else if selectedContent.type === 'movie' && selectedContent.vimeoId}
				<iframe
					src={getVimeoEmbedUrl(selectedContent.vimeoId)}
					title={selectedContent.title}
					class="w-full h-full"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			{:else if selectedContent.type === 'playlist' && selectedContent.playlistId}
				<iframe
					src={getPlaylistEmbedUrl(selectedContent.playlistId)}
					title={selectedContent.title}
					class="w-full h-full"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			{:else}
				<div class="w-full h-full flex items-center justify-center text-gray-300">
					<p>Not available for inline playback. Opening external provider…</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
