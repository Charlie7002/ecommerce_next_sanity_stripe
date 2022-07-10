import santityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = santityClient({
	projectId: 'j8fiwvfi',
	dataset: 'production',
	apiVersion: '2022-06-08',
	useCdn: true,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);
