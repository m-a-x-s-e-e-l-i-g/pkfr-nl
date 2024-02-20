/**
 * All of these values are used throughout the site – for example, 
 * in the <meta> tags, in the footer, and in the RSS feed.
 **/ 

export const siteTitle = 'pkfr.nl'
export const titlePostfix = '- Parkour / Freerunning Nederland'
export const siteDescription = 'Dé spot voor de Nederlandse parkour & freerunning community.'
export const siteURL = 'pkfr.nl'
export const siteLink = 'https://github.com/m-a-x-s-e-e-l-i-g/pkfr-nl'
export const siteAuthor = 'Max Seelig - <a href="https://maxmade.nl/" target="_blank">MAXmade</a>'

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 10

// Edit this to alter the main nav menu. (Also used by the footer and mobile nav.)
export const navItems = [
	{
		title: 'Spots',
		route: '/spots'
	}, {
		title: 'Jams & Events',
		route: '/jams' 
	}, {
		title: 'Open Gyms',
		route: '/open-gyms'
	}, {
		title: 'Links',
		route: '/links'
	}, {
		title: 'TV',
		route: '/tv'
	}, {
		title: 'Blog',
		route: '/blog'
	}
]