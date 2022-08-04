import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			// Create Checkout Sessions from body params.
			const params = {
				submit_type: 'pay',
				mode: 'payment',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				shipping_options: [
					{ shipping_rate: 'shr_1LT3CwJ8scPS6pb1jHyR9lYl' },
					{ shipping_rate: 'shr_1LT3ykJ8scPS6pb1pMh0LlK3' },
				],
				//for shipping address show
				shipping_address_collection: {
					allowed_countries: ['US', 'CA'],
				},
				line_items: req.body.map(item => {
					const img = item.image[0].asset._ref
						.replace('image-', 'https://cdn.sanity.io/images/j8fiwvfi/production/')
						.replace('-webp', '.webp');

					return {
						price_data: {
							currency: 'usd',
							product_data: { name: item.name, images: [img] },
							unit_amount: item.price * 100,
						},
						adjustable_quantity: { enabled: true, minimum: 1, maximum: 10 },
						quantity: item.quantity,
					};
				}),

				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}`,
			};
			const session = await stripe.checkout.sessions.create(params);
			res.status(200).json(session);
		} catch (err) {
			console.log(err);
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
