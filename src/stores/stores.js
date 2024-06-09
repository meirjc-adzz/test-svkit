import { writable } from 'svelte/store';

export const user = writable({
	userId: 1,
	firstName: 'John',
	lastName: 'Doe',
	profileName: 'john_doe',
	isLoggedIn: false // initially set to false
});
