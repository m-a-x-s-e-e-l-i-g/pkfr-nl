<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	let movies = [
		{
			id: 1,
			title: "Jump London",
			year: "2003",
			description: "The documentary that introduced parkour to the world, featuring Sébastien Foucan and other founding traceurs.",
			thumbnail: "https://image.tmdb.org/t/p/original/mSknYoFSBB6o8HeeCTojq3CERgd.jpg",
			videoId: "l8fSXGP9wvQ",
			type: "movie",
			duration: "60m",
			trakt: "https://trakt.tv/movies/jump-london-2003"
		},
		{
			id: 2,
			title: "Jump Britain",
			year: "2005", 
			description: "The follow-up to Jump London, showcasing British traceurs and the growth of parkour in the UK.",
			thumbnail: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/eTMM80n6xFiCwUdNYHEnxEP5QWb.jpg",
			videoId: "2TJurAP9l-Q",
			type: "movie",
			duration: "60m",
			trakt: "https://trakt.tv/movies/jump-britain-2005"
		},
		{
			id: 3,
			title: "Sole Destroyer",
			year: "2020",
			description: "The Motus Projects athletes push their physical and mental limits in this raw documentary about the evolving sport of parkour. Through elation, stress, injury and laughter, their friendship drives their success.",
			thumbnail: "https://image.tmdb.org/t/p/original/bizGkp2qchu73MNy9Vlh4KW7pQK.jpg",
			videoId: "VlM7bOegiIg",
			type: "movie",
			duration: "40m",
			trakt: "https://trakt.tv/movies/sole-destroyer-2020"
		},
		{
			id: 4,
			title: "Amsterdam Is Dead",
			year: "2024",
			description: "AMSTERDAM IS DEAD a Parkour Film aiming to revive this city's lost street parkour scene. Documentaire door Fé Amsterdam.",
			thumbnail: "https://image.tmdb.org/t/p/original/8jJ0IEc24tC1w24niLc2c343YPi.jpg",
			videoId: "lJX3DUlSj4M",
			type: "movie",
			duration: "48m",
			trakt: "https://trakt.tv/movies/amsterdam-is-dead-2024"
		},
		{
			id: 5,
			title: "Roof Culture Asia",
			year: "2017",
			description: "Team Storror push Parkour to the rooftops of Asian megacities, filming guerilla-style while exploring the drive, struggles, and preparation behind making impossible “leaps of faith” possible.",
			thumbnail: "https://image.tmdb.org/t/p/original/aeAe6WOKXROmmXySeZN6dWccWPX.jpg",
			videoId: "fmJPFZLc9dE",
			type: "movie",
			duration: "1h 53m",
			trakt: "https://trakt.tv/movies/roof-culture-asia-2017"
		},
		{
			id: 6,
			title: "S.O.L",
			year: "2022",
			description: "S.O.L is a parkour tour film with the carefree vibe of 2010s summer edits, focusing less on moves and more on friendship, support, and shared training moments.",
			thumbnail: "/images/posters/the-motus-projects-sol-poster.jpg",
			videoId: "Tswad8jCgaM",
			type: "movie",
			duration: "1h 12m"
		}
	];

	let playlists = [
		{
			id: 1,
			title: "NL Parkour Community TV",
			creator: "Dutch Parkour Community",
			description: "Alles wat uit Nederlandse community komt in een playlist - Dutch parkour content from the community.",
			thumbnail: "",
			playlistId: "PL3iwaCsp8s8P0lVvw3DkmMFmGxqBGSXnS",
			type: "playlist",
			videoCount: 53
		},
		{
			id: 2,
			title: "Must Watch: De Ultieme Playlist",
			creator: "Koen Bangert",
			description: "Alles internationaal.. alles wat cool is enzo - The ultimate international parkour must-watch collection.",
			thumbnail: "",
			playlistId: "PLIZ9EYUk7YaYgqhOHd1MqROfTmNw79UBy",
			type: "playlist",
			videoCount: 125
		}
	];

	let selectedContent: any = null;
	let showPlayer = false;
	let allContent: any[] = [];
	let selectedIndex = 0;
	let playerContainer: HTMLElement;

	// Combine movies and playlists into one array for navigation
	$: allContent = [...movies, ...playlists];

	// Set first item as selected by default
	$: if (allContent.length > 0 && !selectedContent) {
		selectedContent = allContent[0];
	}

	function selectContent(content: any) {
		selectedContent = content;
		selectedIndex = allContent.findIndex(item => item.id === content.id && item.type === content.type);
		showPlayer = false;
	}

	function selectByIndex(index: number) {
		if (index >= 0 && index < allContent.length) {
			selectedIndex = index;
			selectedContent = allContent[index];
			showPlayer = false;
		}
	}

	function openContent(content: any) {
		selectedContent = content;
		showPlayer = true;
		// Request fullscreen after a short delay to ensure the player is rendered
		setTimeout(() => {
			if (playerContainer) {
				requestFullscreen(playerContainer);
			}
		}, 100);
	}

	function closePlayer() {
		showPlayer = false;
		// Exit fullscreen when closing player
		if (document.fullscreenElement) {
			document.exitFullscreen();
		}
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
					// Calculate columns based on screen width - approximate
					const cols = window.innerWidth >= 1536 ? 6 : window.innerWidth >= 1280 ? 5 : window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2;
					selectByIndex(selectedIndex + cols);
					break;
				case 'ArrowUp':
					event.preventDefault();
					const colsUp = window.innerWidth >= 1536 ? 6 : window.innerWidth >= 1280 ? 5 : window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2;
					selectByIndex(selectedIndex - colsUp);
					break;
				case 'Enter':
				case ' ':
					event.preventDefault();
					if (selectedContent) {
						openContent(selectedContent);
					}
					break;
			}
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		
		// Listen for fullscreen changes
		document.addEventListener('fullscreenchange', () => {
			if (!document.fullscreenElement && showPlayer) {
				closePlayer();
			}
		});
		
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<svelte:head>
	<title>Parkour TV - PKFR.nl</title>
	<meta name="description" content="Watch parkour movies, documentaries, and YouTube playlists. Discover the best parkour content in one place." />
</svelte:head>

<div class="-mx-60 min-h-screen bg-gray-900 text-white">
	<!-- Header Section -->
	<div class="container mx-auto px-6 py-0">
		<h1 class="text-3xl font-bold text-white mb-2">JUMPFLIX <small>🍿Parkour TV🦘</small></h1>
		<p class="text-gray-300">Discover parkour movies, documentaries and playlists. Grab some popcorn!</p>
	</div>

	<!-- Content Grid -->
	<div>
		<!-- Main Content Area -->
		<div class="container mx-auto px-6 py-8 pr-4">
			<!-- Combined Movies and Playlists Grid -->
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
				<!-- Movies -->
				{#each movies as movie}
					<div 
						class="group cursor-pointer transform hover:scale-105 transition-all duration-300"
						class:scale-105={selectedContent && selectedContent.id === movie.id && selectedContent.type === movie.type}
						on:click={() => selectContent(movie)}
						on:keydown={(e) => e.key === 'Enter' && selectContent(movie)}
						tabindex="0"
						role="button"
					>
						<div class="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-3 shadow-lg group-hover:ring-4 group-hover:ring-blue-400 transition-all duration-300"
							class:ring-4={selectedContent && selectedContent.id === movie.id && selectedContent.type === movie.type}
							class:ring-red-500={selectedContent && selectedContent.id === movie.id && selectedContent.type === movie.type}
							title="{movie.title}"
						>
							{#if isImage(movie.thumbnail)}
								<!-- Real movie poster -->
								<img 
									src={movie.thumbnail} 
									alt="{movie.title} poster"
									class="w-full h-full object-cover"
									loading="lazy"
								/>
							{:else}
								<!-- Placeholder for movie poster -->
								<div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
									<div class="text-center p-3">
										<svg class="w-8 h-8 mx-auto mb-2 opacity-60" fill="currentColor" viewBox="0 0 20 20">
											<path d="M8 5v10l8-5-8-5z"/>
										</svg>
										<p class="text-xs opacity-80 font-medium text-center leading-tight">{movie.title}</p>
									</div>
								</div>
							{/if}

							<!-- Movie type badge -->
							<div class="absolute top-2 left-2 bg-blue-600 px-2 py-1 rounded text-xs font-medium">
								MOVIE
							</div>

							<!-- Duration badge -->
							<div class="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
								{movie.duration}
							</div>
						</div>
						
					</div>
				{/each}

				<!-- Playlists -->
				{#each playlists as playlist}
					<div 
						class="group cursor-pointer transform hover:scale-105 transition-all duration-300"
						class:scale-105={selectedContent && selectedContent.id === playlist.id && selectedContent.type === playlist.type}
						on:click={() => selectContent(playlist)}
						on:keydown={(e) => e.key === 'Enter' && selectContent(playlist)}
						tabindex="0"
						role="button"
					>
						<div class="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-3 shadow-lg group-hover:ring-4 group-hover:ring-red-400 transition-all duration-300"
							class:ring-4={selectedContent && selectedContent.id === playlist.id && selectedContent.type === playlist.type}
							class:ring-red-500={selectedContent && selectedContent.id === playlist.id && selectedContent.type === playlist.type}
							title="{playlist.title}"
						>
							{#if isImage(playlist.thumbnail)}
								<!-- Real playlist thumbnail -->
								<img 
									src={playlist.thumbnail} 
									alt="{playlist.title} thumbnail"
									class="w-full h-full object-cover"
									loading="lazy"
								/>
							{:else}
								<!-- Playlist thumbnail placeholder -->
								<div class="absolute inset-0 bg-gradient-to-br from-red-600 to-pink-700 flex items-center justify-center">
									<div class="text-center p-3">
										<svg class="w-8 h-8 mx-auto mb-2 opacity-60" fill="currentColor" viewBox="0 0 20 20">
											<path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
										</svg>
										<p class="text-xs opacity-80 font-medium text-center leading-tight">{playlist.title}</p>
									</div>
								</div>
							{/if}

							<!-- Playlist type badge -->
							<div class="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded text-xs font-medium">
								PLAYLIST
							</div>

							<!-- Video count badge -->
							<div class="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
								{playlist.videoCount || '?'} videos
							</div>
						</div>
						
					</div>
				{/each}
			</div>
		</div>

		<!-- Sidebar -->
		<div class="w-96 border-l border-gray-700 p-6 fixed top-0 right-0 h-screen overflow-hidden flex flex-col">
			{#if selectedContent}
				<!-- Background with poster and glass effect -->
				<div class="absolute inset-0 z-0">
					{#if isImage(selectedContent.thumbnail)}
						<img 
							src={selectedContent.thumbnail} 
							alt="{selectedContent.title} background"
							class="w-full h-full object-cover scale-200"
						/>
						<div class="absolute inset-0 backdrop-blur-2xl bg-black/70 border-l border-white/10"></div>
					{:else}
						<div class="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 scale-110"></div>
						<div class="absolute inset-0 backdrop-blur-2xl bg-black/70 border-l border-white/10"></div>
					{/if}
				</div>

				<!-- Content details -->
				<div class="space-y-4 relative z-10 flex-1 overflow-y-auto">
					<div>
						<h2 class="text-2xl font-bold text-white mb-2">{selectedContent.title}</h2>
						<div class="flex items-center gap-4 text-sm text-gray-400 mb-4">
							{#if selectedContent.type === 'movie'}
								<span class="bg-blue-600 px-2 py-1 rounded text-white text-xs">MOVIE</span>
								<span>{selectedContent.year}</span>
								<span>{selectedContent.duration}</span>
							{:else}
								<span class="bg-red-600 px-2 py-1 rounded text-white text-xs">PLAYLIST</span>
								<span>{selectedContent.creator}</span>
								<span>{selectedContent.videoCount || '?'} videos</span>
							{/if}
						</div>
					</div>

					<!-- Description -->
					<div>
						<h3 class="text-lg font-semibold text-white mb-2">Description</h3>
						<p class="text-gray-300 leading-relaxed">
							{selectedContent.description}
						</p>
					</div>

					{#if selectedContent.type === 'movie'}
						<!-- Movie specific details -->
						<div>
							<h3 class="text-lg font-semibold text-white mb-2">Details</h3>
							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span class="text-gray-400">Year:</span>
									<span class="text-white">{selectedContent.year}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-400">Duration:</span>
									<span class="text-white">{selectedContent.duration}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-400">Type:</span>
									<span class="text-white">Documentary</span>
								</div>
							</div>
						</div>
					{:else}
						<!-- Playlist specific details -->
						<div>
							<h3 class="text-lg font-semibold text-white mb-2">Playlist Info</h3>
							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span class="text-gray-400">Creator:</span>
									<span class="text-white">{selectedContent.creator}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-400">Videos:</span>
									<span class="text-white">{selectedContent.videoCount || '?'}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-400">Type:</span>
									<span class="text-white">YouTube Playlist</span>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- Action buttons - Fixed to bottom -->
				<div class="relative z-10 pt-4">
					<button 
						on:click={() => openContent(selectedContent)}
						class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M8 5v10l8-5-8-5z"/>
						</svg>
						Play Now
					</button>
				</div>
			{:else}
				<!-- Default background when no content selected -->
				<div class="absolute inset-0 z-0 bg-gray-800 border-l border-white/10"></div>
				
				<div class="text-center text-gray-400 py-12 relative z-10">
					<svg class="w-16 h-16 mx-auto mb-4 opacity-30" fill="currentColor" viewBox="0 0 20 20">
						<path d="M8 5v10l8-5-8-5z"/>
					</svg>
					<p>Select a movie or playlist to view details</p>
				</div>
			{/if}
		</div>
	</div>
</div>

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
			{#if selectedContent.type === 'movie'}
				<iframe
					src={getYouTubeEmbedUrl(selectedContent.videoId)}
					title={selectedContent.title}
					class="w-full h-full"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			{:else if selectedContent.type === 'playlist'}
				<iframe
					src={getPlaylistEmbedUrl(selectedContent.playlistId)}
					title={selectedContent.title}
					class="w-full h-full"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			{/if}
		</div>
	</div>
{/if}
