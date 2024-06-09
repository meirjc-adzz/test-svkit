<script lang="ts">
	export let title = 'Default Title';
	export let description = 'Default description.';
	export let likes = 0;
	export let brand = 'Brand';
	export let model = 'Model';
	export let rating = 0;
	export let totalBought = 0;
	export let cuponCode = 'No code';

	let likeCount = likes;

	function like() {
		likeCount += 1;
	}

	function dislike() {
		if (likeCount > 0) {
			likeCount -= 1;
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
		<li><strong>Coupon Code:</strong> {cuponCode}</li>
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
