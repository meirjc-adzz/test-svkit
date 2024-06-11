import { SECRET_DRCTS } from '$env/static/private'; // Api bearer token
import { PUBLIC_DRCTS } from '$env/static/public';
// console.log(SECRET_DRCTS);

let url = 'https://cms.coupon.guru/items/coupons?limit=180';

export async function load({ fetch }) {
	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${SECRET_DRCTS}`
			}
		});
		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}
		const items = await res.json();
		// console.log(items); // Console log the fetched data
		return items; // Return items inside a named object
	} catch (error) {
		console.error('Error loading coupons:', error);
		return {
			items: []
		};
	}
}
