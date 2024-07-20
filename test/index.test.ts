import { describe, it, expect } from 'vitest';
import { strtr } from '../src';

describe('strtr', () => {
	// Testing character-to-character replacements
	it('should replace characters correctly', () => {
		expect(strtr('abcdef', 'abc', 'xyz')).toBe('xyzdef');
	});

	it('should handle empty from and to strings', () => {
		expect(strtr('abcdef', '', '')).toBe('abcdef');
	});

	it('should ignore extra characters when from and to lengths do not match', () => {
		expect(strtr('abcdef', 'abc', 'xy')).toBe('xycdef');
		expect(strtr('abcdef', 'ab', 'xyz')).toBe('xycdef');
	});

	it('should handle diplicated characters in from by prefering the last one', () => {
		expect(strtr('abcdef', 'aaa', 'xyz')).toBe('zbcdef');
	});

	it('should cast arguments to string', () => {
		expect(strtr(123456 as any, 123 as any, 'xyz')).toBe('xyz456');
		expect(strtr('abcdef', 'abc', 123 as any)).toBe('123def');
	});

	// Testing substring replacements
	it('should replace substrings correctly', () => {
		expect(strtr('Hello World', { Hello: 'X', World: 'Planet' })).toBe('X Planet');
	});

	it('should not search replaced values again', () => {
		expect(strtr('Hello World', { Hello: 'X', X: 'Something else' })).toBe('X World');
	});

	it('should handle overlapping keys with longest match being replaced first', () => {
		expect(strtr('abcde', { abc: '123', bcde: '234' })).toBe('a234');
	});

	it('should manage multiple replacements without overlaps', () => {
		expect(strtr('Hello World', { Hello: 'Hi', World: 'Earth' })).toBe('Hi Earth');
	});

	it('should work when no keys are found', () => {
		expect(strtr('Hello World', { Test: 'X', Dummy: 'Y' })).toBe('Hello World');
	});

	// Testing complex cases with multiple replacements and overlaps
	it('should prioritize longer substrings in replacements', () => {
		expect(strtr('ababc', { ab: 'x', abc: 'y' })).toBe('xy');
		expect(strtr('babc', { ab: 'x', abc: 'y' })).toBe('by');
	});

	it('should correctly replace when substrings are prefixes of each other', () => {
		expect(strtr('abcdef', { ab: 'AB', abc: 'XYZ', abcd: '123' })).toBe('123ef');
	});

	// Testing replacements where results could potentially overlap
	it('should handle cases where replaced substrings could match other keys', () => {
		expect(strtr('banana', { ban: '123', '123': 'xyz' })).toBe('123ana');
		expect(strtr('banana', { na: '12', bana: '34' })).toBe('3412');
	});

	// Testing input integrity with special characters
	it('should handle special characters and spaces', () => {
		expect(strtr('Hello, World!', { Hello: 'Hi', ', World!': ' Earth.' })).toBe('Hi Earth.');
	});

	// Testing with non-latin characters
	it('should handle unicode characters in replacements', () => {
		expect(strtr('こんにちは世界', { こんにちは: 'Hello', 世界: 'World' })).toBe('HelloWorld');
	});

	// Testing complex nested replacements
	it('should handle complex nested replacements correctly', () => {
		expect(
			strtr('start middle end', {
				start: 'begin',
				middle: 'center',
				end: 'stop',
				'begin center stop': 'complete',
			}),
		).toBe('begin center stop');
	});

	// Testing with large length changes
	it('should handle large length changes', () => {
		expect(
			strtr('abcdefghi', {
				abc: 'defghijklmnghi',
				def: '1234567890',
				gh: '45',
			}),
		).toBe('defghijklmnghi123456789045i');

		expect(
			strtr('a quick brown fox jumps over the lazy dog', {
				'the lazy dog': 'fox',
				fox: 'dog',
				quick: 'slow',
			}),
		).toBe('a slow brown dog jumps over fox');
	});

	// Testing error
	it('should throw error when not enough arguments are provided', () => {
		expect(() => (strtr as any)('abcdef')).toThrow('strtr() expects at least 2 parameters, 1 given');
	});
	it('should throw error when 2 arguments are provided but second argument is not an object', () => {
		expect(() => strtr('abcdef', 123 as any)).toThrow('strtr(): The second argument is not an array.');
	});
});
