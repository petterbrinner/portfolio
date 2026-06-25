export const SITE = {
	name: 'Petter Johansson',
	defaultDescription: 'Full-stack developer and designer',
	defaultOgImage: '/images/jag.jpg',
	jobTitle: 'Full-stack developer and designer',
	email: 'petter.johansson@icloud.com',
	locale: 'sv_SE',
} as const;

export function pageTitle(title: string): string {
	return title === SITE.name ? title : `${title} · ${SITE.name}`;
}

export function personSchema(siteUrl: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: SITE.name,
		url: siteUrl,
		jobTitle: SITE.jobTitle,
		email: SITE.email,
	};
}

export function websiteSchema(siteUrl: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE.name,
		url: siteUrl,
		description: SITE.defaultDescription,
		author: { '@type': 'Person', name: SITE.name, url: siteUrl },
	};
}

export function articleSchema({
	title,
	description,
	url,
	tags,
	siteUrl,
}: {
	title: string;
	description?: string;
	url: string;
	tags: string[];
	siteUrl: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		...(description && { description }),
		url,
		...(tags.length > 0 && { keywords: tags.join(', ') }),
		author: { '@type': 'Person', name: SITE.name, url: siteUrl },
	};
}

export function collectionPageSchema({
	name,
	description,
	url,
}: {
	name: string;
	description: string;
	url: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name,
		description,
		url,
	};
}
