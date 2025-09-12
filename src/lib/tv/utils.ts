import type { ContentItem, SortBy, TvState } from './types';

// Deterministic seeded shuffle (xmur3 + sfc32)
function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

export function createSeededRng(seed: string) {
  const seedGen = xmur3(seed);
  return sfc32(seedGen(), seedGen(), seedGen(), seedGen());
}

export function shuffleDeterministic<T>(arr: T[], rng: () => number): T[] {
  const clone = [...arr];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

export function buildRankMap(items: ContentItem[], seed: string) {
  const rng = createSeededRng(seed + ':' + items.length);
  const shuffled = shuffleDeterministic(items, rng);
  const map = new Map<string, number>();
  shuffled.forEach((item, i) => map.set(keyFor(item), i));
  return map;
}

export function keyFor(item: ContentItem) {
  return `${item.type}:${item.id}`;
}

export function parseYear(item: ContentItem): number {
  const y = parseInt((item as any).year);
  return isNaN(y) ? 0 : y;
}

export function parseDurationToMinutes(dur?: string): number {
  if (!dur || typeof dur !== 'string') return Number.POSITIVE_INFINITY;
  let minutes = 0;
  const hMatch = dur.match(/(\d+)\s*h/i);
  const mMatch = dur.match(/(\d+)\s*m/i);
  if (hMatch) minutes += parseInt(hMatch[1]) * 60;
  if (mMatch) minutes += parseInt(mMatch[1]);
  return minutes || Number.POSITIVE_INFINITY;
}

export function matchesSearch(item: ContentItem, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  const haystacks: string[] = [];
  if (item.title) haystacks.push(item.title);
  if ((item as any).description) haystacks.push((item as any).description);
  // new creators array
  if ((item as any).creators && Array.isArray((item as any).creators)) haystacks.push(...(item as any).creators);
  // starring array
  if ((item as any).starring && Array.isArray((item as any).starring)) haystacks.push(...(item as any).starring);
  return haystacks.some(h => (h || '').toLowerCase().includes(needle));
}

export function filterAndSortContent(all: ContentItem[], rankMap: Map<string, number>, state: TvState): ContentItem[] {
  const filtered = all
    .filter(item => state.showPaid ? true : !item.paid)
    .filter(item => matchesSearch(item, state.searchQuery));

  const sorted = [...filtered];
  switch (state.sortBy) {
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
      sorted.sort((a, b) => parseDurationToMinutes((a as any).duration) - parseDurationToMinutes((b as any).duration));
      break;
    case 'duration-desc':
      sorted.sort((a, b) => parseDurationToMinutes((b as any).duration) - parseDurationToMinutes((a as any).duration));
      break;
    default:
      sorted.sort((a, b) => (rankMap.get(keyFor(a)) ?? 0) - (rankMap.get(keyFor(b)) ?? 0));
  }
  return sorted;
}

// Embed URL helpers
export function getYouTubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&fs=1&modestbranding=1&controls=1`;
}
export function getVimeoEmbedUrl(vimeoId: string) {
  return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
}
export function getPlaylistEmbedUrl(playlistId: string) {
  return `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&fs=1&modestbranding=1&controls=1`;
}

export function isInlinePlayable(content: ContentItem | null | undefined) {
  if (!content) return false;
  if (content.type === 'movie') return Boolean((content as any).videoId || (content as any).vimeoId);
  if (content.type === 'playlist') return Boolean((content as any).playlistId);
  return false;
}

export function isImage(src?: string) {
  return !!src && (src.startsWith('http') || src.startsWith('/'));
}

export const sortLabels: Record<SortBy, string> = {
  default: 'Sort: Random',
  'title-asc': 'Title A–Z',
  'year-desc': 'Year (newest)',
  'year-asc': 'Year (oldest)',
  'duration-asc': 'Duration (short → long)',
  'duration-desc': 'Duration (long → short)'
};
