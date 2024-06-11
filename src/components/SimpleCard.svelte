<script>
	import { tick } from 'svelte';
	import { user } from '../stores/stores'; // Ensure the path is correct
	import { updateLikesOnServer } from '../utils/updateLikes'; // Import the server update simulation

	export let description = 'Default description.';
	export let likes = 0;
	export let brand = 'Brand';
	export let model = 'Model';
	export let rating = 0;
	export let totalBought = 0;
	export let cuponCode = 'No code';
	export let itemId = 0; // Assuming each card has a unique itemId
	// -------
	// 	{
	//     id: 2,
	//     status: 'draft',
	//     sort: null,
	//     user_created: '65307a14-8063-40fb-9574-39c9a2dd0d38',
	//     date_created: '2024-05-26T14:12:58.342Z',
	//     lmd_id: '1613065',
	//     store: 'abebooks.com',
	//     merchant_homepage: 'https://www.abebooks.com/',
	//     offer_text: 'Rare Books starting at just $2500',
	//     offer_value: 'Great Value',
	//     title: 'Rare Books',
	//     brand: null
	//   },
	// -------
	export let id = 'NO ID';
	export let status = 'NO STATUS';
	export let lmd_id = 'NO LMD ID';
	export let store = 'NO STORE';
	export let merchant_homepage = 'NO MERCHANT HOMEPAGE';
	export let offer_text = 'NO OFFER TEXT';
	export let offer_value = 'NO OFFER VALUE';
	export let title = 'NO TITLE';

	let likeCount = likes;
	let isLoggedIn = false;

	user.subscribe(($user) => {
		isLoggedIn = $user.isLoggedIn;
	});

	async function like() {
		if (!isLoggedIn) {
			alert('You must log in to vote.');
			return;
		}
		const newLikeCount = likeCount + 1;
		try {
			await updateLikesOnServer(itemId, newLikeCount);
			likeCount = newLikeCount;
			console.log('Like updated on the server.');
			await tick(); // Ensure Svelte processes the state change
		} catch (error) {
			console.error('Failed to update like on the server:', error);
		}
	}

	async function dislike() {
		if (!isLoggedIn) {
			alert('You must log in to vote.');
			return;
		}
		if (likeCount > 0) {
			const newLikeCount = likeCount - 1;
			try {
				await updateLikesOnServer(itemId, newLikeCount);
				likeCount = newLikeCount;
				console.log('Dislike updated on the server.');
				await tick(); // Ensure Svelte processes the state change
			} catch (error) {
				console.error('Failed to update dislike on the server:', error);
			}
		}
	}

	async function copyCodeToClipboard() {
		try {
			await navigator.clipboard.writeText(cuponCode);
			alert('Coupon code copied to clipboard!');
		} catch (err) {
			alert('Failed to copy the coupon code.');
		}
	}
</script>

<div class="bg-white shadow-md rounded-lg p-4 max-w-sm">
	<h2 class="text-lg font-semibold">{title}</h2>
	<p class="text-gray-600">{description}</p>
	<ul class="text-sm my-2">
		<li><strong>ID:</strong> {id}</li>
		<li><strong>Status:</strong> {status}</li>
		<li><strong>LMD ID:</strong> {lmd_id}</li>
		<li><strong>Store:</strong> {store}</li>
		<li><strong>Merchant Homepage:</strong> {merchant_homepage}</li>
		<li><strong>Offer Text:</strong> {offer_text}</li>
		<li><strong>Offer Value:</strong> {offer_value}</li>
		<li>
			<button
				class="bg-blue-100 hover:bg-blue-200 rounded py-1 px-3 text-blue-700"
				on:click={copyCodeToClipboard}
			>
				<strong>Coupon Code: (LMD ID:)</strong>
				{lmd_id}
			</button>
		</li>
	</ul>
	<div class="flex items-center space-x-4 mt-4">
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			on:click={like}
		>
			Like
		</button>
		<button
			class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
			on:click={dislike}
		>
			Dislike
		</button>
		<span class="text-gray-800">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
	</div>
</div>
