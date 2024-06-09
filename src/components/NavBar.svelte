<script>
	import { user } from '../stores/stores';

	// toggle user login status
	function toggleLogin() {
		user.update((u) => {
			u.isLoggedIn = !u.isLoggedIn;
			console.log('USER: ', u);
			return u;
		});
	}
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<a href="/" class="flex items-center space-x-3">
			<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
				>Cupon-Guru</span
			>
		</a>
		<div class="flex p-4 bg-white/50 rounded-lg">
			<label class="flex items-center cursor-pointer">
				<input type="checkbox" class="mr-2" on:change={toggleLogin} />
				Is user logged in
			</label>
		</div>
		<div class="items-center justify-between w-auto flex order-1" id="navbar-cta">
			<ul
				class="flex font-medium p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 space-x-8 flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
			>
				<li>
					<a
						href="/"
						class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
						aria-current="page">Home</a
					>
				</li>
				<li>
					<a
						href="/cupons"
						class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
						>Cupons</a
					>
				</li>
			</ul>
		</div>
	</div>
</nav>
