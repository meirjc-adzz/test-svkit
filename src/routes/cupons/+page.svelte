<script lang="ts">
	import SimpleCard from '../../components/SimpleCard.svelte';
	import { cardData } from '../../data/cards';
</script>

<h1 class="text-3xl font-semibold pt-4 pb-8 text-center">Coupons Page</h1>
<h2 class="text-xl pb-4">Featured Deals</h2>
<div class="grid gap-4 grid-cols-2 lg:grid-cols-3">
	{#each cardData as card}
		<SimpleCard
			title={card.title}
			description={card.description}
			likes={card.likes}
			brand={card.brand}
			model={card.model}
			rating={card.rating}
			totalBought={card.totalBought}
			cuponCode={card.cuponCode}
		/>
	{/each}
</div>
