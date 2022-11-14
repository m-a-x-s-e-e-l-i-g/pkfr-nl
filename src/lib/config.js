/**
 * All of these values are used throughout the site – for example, 
 * in the <meta> tags, in the footer, and in the RSS feed.
 * 
 * PLEASE BE SURE TO UPDATE THEM ALL! Thank you!
 **/ 

export const siteTitle = 'Freerunning Informatie'
export const titlePostfix = '- Parkour / Freerunning Nederland'
export const siteDescription = 'Overzicht voor freerunners in Nederland'
export const siteURL = 'freerunning-informatie.nl'
export const siteLink = 'https://github.com/m-a-x-s-e-e-l-i-g/freerunning-informatie'
export const siteAuthor = 'Max Seelig - <a href="https://maxmade.nl/" target="_blank">MAXmade</a>'

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 10

// Edit this to alter the main nav menu. (Also used by the footer and mobile nav.)
export const navItems = [
	{
		title: 'Spots',
		route: '/spots'
	}, {
		title: 'Jams',
		route: '/jams' 
	}, {
		title: 'Open Gyms',
		route: '/open-gyms'
	}, {
		title: 'Community',
		route: '/community'
	}, {
		title: 'Blog',
		route: '/blog'
	}
]