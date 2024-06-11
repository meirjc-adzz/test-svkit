<script lang="ts">
	import SimpleCard from '../../components/SimpleCard.svelte';
	// import { cardData } from '../../data/cards';

	export let data;
	// console.log('Items in svelte page', data);
	const itemsCards: [] = data.data;
</script>

<h1 class="text-3xl font-semibold pt-4 pb-8 text-center">Coupons Page</h1>
<h2 class="text-xl pb-4">Featured Deals</h2>
<div class="grid gap-4 grid-cols-2 lg:grid-cols-3">
	{#each itemsCards as card}
		<SimpleCard
			id={card.id}
			status={card.status}
			lmd_id={card.lmd_id}
			store={card.store}
			merchant_homepage={card.merchant_homepage}
			offer_text={card.offer_text}
			offer_value={card.offer_value}
			title={card.title}
			description={card.store}
		/>
	{/each}
	<p>{typeof data}</p>
</div>
