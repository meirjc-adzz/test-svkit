<script>
	import { tick } from 'svelte';
	import { user } from '../stores/stores'; // Ensure the path is correct
	import { updateLikesOnServer } from '../utils/updateLikes'; // Import the server update simulation

	export let title = 'Default Title';
	export let description = 'Default description.';
	export let likes = 0;
	export let brand = 'Brand';
	export let model = 'Model';
	export let rating = 0;
	export let totalBought = 0;
	export let cuponCode = 'No code';
	export let itemId = 0; // Assuming each card has a unique itemId

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
		<li><strong>Brand:</strong> {brand}</li>
		<li><strong>Model:</strong> {model}</li>
		<li><strong>Rating:</strong> {rating} / 5</li>
		<li><strong>Sold:</strong> {totalBought}</li>
		<li>
			<button
				class="bg-blue-100 hover:bg-blue-200 rounded py-1 px-3 text-blue-700"
				on:click={copyCodeToClipboard}
			>
				<strong>Coupon Code:</strong>
				{cuponCode}
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
