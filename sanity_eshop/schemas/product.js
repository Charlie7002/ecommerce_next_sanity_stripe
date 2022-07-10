export default {
	name: 'product',
	title: 'Product',
	type: 'document',
	fields: [
		{
			name: 'image',
			type: 'array',
			title: 'Image',
			of: [{ type: 'image' }],
			options: { hotspot: true },
		},
		{ name: 'name', type: 'string', title: 'Name' },
		{ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name', maxLenght: 90 } },
		{ name: 'price', type: 'number', title: 'Price' },
		{ name: 'details', type: 'text', title: 'Details' },
	],
};
