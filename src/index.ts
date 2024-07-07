export function strtr(string: string, from: string, to: string): string;
export function strtr(string: string, replace_pairs: { [key: string]: string }): string;
export function strtr(string: string, from: string | { [key: string]: string }, to?: string): string {
	if (arguments.length >= 3) {
		// Handle the character-to-character replacement

		// Cast to string
		string = String(string);
		from = String(from);
		to = String(to);

		// Truncate to the shortest length
		const actualLength = Math.min(from.length, to.length);
		const fromArray = from.substring(0, actualLength).split('');
		const toArray = to.substring(0, actualLength).split('');

		return string
			.split('')
			.map((char) => {
				const index = fromArray.lastIndexOf(char);
				return index !== -1 ? toArray[index] : char;
			})
			.join('');
	}

	if (arguments.length === 2) {
		if (from == null || typeof from !== 'object') {
			// Keeps the original warning message
			throw new TypeError('strtr(): The second argument is not an array.');
		}

		// Cast to string
		string = String(string);

		// Sort the keys by their length in descending order for priority
		const sortedKeys = Object.keys(from).sort((a, b) => b.length - a.length);

		// Create an array of characters from the input string to facilitate replacements
		const characters = string.split('');

		// Track which indices have been replaced to prevent re-evaluation
		const replacedIndices = new Array(string.length).fill(false);

		// Process each key according to its sorted order
		for (const key of sortedKeys) {
			let index = 0;
			while (index <= characters.length - key.length) {
				// Check if current segment matches key and has not been replaced
				if (
					!replacedIndices.slice(index, index + key.length).includes(true) &&
					characters.slice(index, index + key.length).join('') === key
				) {
					// Replace the segment
					characters.splice(index, key.length, ...from[key].split(''));
					// Update the replaced indices
					replacedIndices.fill(true, index, index + from[key].length);
					// Move index forward by the length of the replacement
					index += from[key].length;
				} else {
					index += 1; // Move to the next character
				}
			}
		}

		return characters.join('');
	}

	throw new TypeError(`strtr() expects at least 2 parameters, ${arguments.length} given`);
}
