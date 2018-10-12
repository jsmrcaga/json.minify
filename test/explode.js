const expect = require('chai').expect;
const { explode } = require('../lib/utils');
const json = require('../minify');

describe('Explode', () => {
	it('Should explode a plain object with one property', () => {
		let expected = {
			prop: true
		};

		let minified = [['prop'], [true]];
		let exploded = explode(minified[0], minified[1]);

		expect(exploded).to.be.eql(expected);
	});

	it('Should explode a plain object with multiple properties', () => {
		let expected = {
			prop: true,
			subObject: {
				prop: false,
				test: 'this is a string'
			}
		};

		let minified = [
			['prop', ['subObject', 'prop', 'test']], // keys
			[true, [false, 'this is a string']] // values
		];
		let exploded = explode(minified[0], minified[1]);

		expect(exploded).to.be.eql(expected);
	});

	it('Should explode an object with nested children', () => {
		let expected = {
			prop: true,
			subObject: {
				prop: false,
				test: 'this is a string'
			}
		};

		let minified = [
			['prop', ['subObject', 'prop', 'test']], // keys
			[true, [false, 'this is a string']] // values
		];
		let exploded = explode(minified[0], minified[1]);

		expect(exploded).to.be.eql(expected);
	});

	it('Should explode an object with multiple nested children', () => {
		let expected = {
			prop: true,
			subObject: {
				prop: false,
				test: 'this is a string',
				subsub: {
					yeaah: true
				}
			}
		};

		let minified = [
			['prop', ['subObject', 'prop', 'test', ['subsub', 'yeaah']]], // keys
			[true, [false, 'this is a string', [true]]] // values
		];
		let exploded = explode(minified[0], minified[1]);

		expect(exploded).to.be.eql(expected);
	});

	describe('Arrays', () => {
		it('Should explode an array of plain objects', () => {
			let expected = [{
				prop1: 'test11',
				prop2: 'test12'
			}, {
				prop1: 'test21',
				prop2: 'test22'
			}, {
				prop1: 'test31',
				prop2: 'test32'
			}];

			let minified = [
				['prop1', 'prop2'], //keys
				['test11', 'test12'], //values
				['test21', 'test22'],
				['test31', 'test32']
			]
			let exploded = json.explode(minified);
			expect(exploded).to.be.eql(expected);
		});

		it('Should explode an array of nested objects', () => {
			let expected = [{
				prop1: 'test11',
				prop2: 'test12',
				subProp: {
					sub1: true,
					sub2: 35
				}
			}, {
				prop1: 'test21',
				prop2: 'test22',
				subProp: {
					sub1: false,
					sub2: 'I AM THE PROP'
				}
			}, {
				prop1: 'test31',
				prop2: 'test32',
				subProp: {
					sub1: 'sub sub sub',
					sub2: 'yup'
				}
			}];

			let minified = [
				['prop1', 'prop2', ['subProp', 'sub1', 'sub2']], //keys
				['test11', 'test12', [true, 35]], //values
				['test21', 'test22', [false, 'I AM THE PROP']],
				['test31', 'test32', ['sub sub sub', 'yup']]
			]
			let exploded = json.explode(minified);
			expect(exploded).to.be.eql(expected);
		});
	});
});
