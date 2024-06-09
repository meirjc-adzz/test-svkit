// Simulate a server-side update

export function updateLikesOnServer(
	itemId: string,
	newLikes: number
): Promise<{ success: boolean; itemId: string; likes: number }> {
	console.log(`Updating likes for item ${itemId} to ${newLikes} on the server...`);
	// Simulate a server delay
	return new Promise((resolve) =>
		setTimeout(() => resolve({ success: true, itemId, likes: newLikes }), 500)
	);
}
