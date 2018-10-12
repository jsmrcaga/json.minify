const expect = require('chai').expect;
const { minify } = require('../lib/utils');
const json = require('../minify');

describe('Minify', () => {
	it('Should minify a plain object with one property', () => {
		let obj = {
			prop: true
		};

		let expected = [['prop'], [true]];
		let minified = minify(obj);

		expect(minified).to.be.eql(expected);
	});

	it('Should minify a plain object with multiple properties', () => {
		let obj = {
			prop: true,
			a: 1,
			b: 45
		};

		let expected = [['prop', 'a', 'b'], [true, 1, 45]];
		let minified = minify(obj);

		expect(minified).to.be.eql(expected);
	});

	it('Should minify an object with nested children', () => {
		let obj = {
			prop: true,
			subObject: {
				prop: false,
				test: 'this is a string'
			}
		};

		let expected = [
			['prop', ['subObject', 'prop', 'test']], // keys
			[true, [false, 'this is a string']] // values
		];
		let minified = minify(obj);

		expect(minified).to.be.eql(expected);
	});

	it('Should minify an object with multiple nested children', () => {
		let obj = {
			prop: true,
			subObject: {
				prop: false,
				test: 'this is a string',
				subsub: {
					yeaah: true
				}
			}
		};

		let expected = [
			['prop', ['subObject', 'prop', 'test', ['subsub', 'yeaah']]], // keys
			[true, [false, 'this is a string', [true]]] // values
		];
		let minified = minify(obj);

		expect(minified).to.be.eql(expected);
	});

	describe('Arrays', () => {
		it('Should minify an array of plain objects', () => {
			let objs = [{
				prop1: 'test11',
				prop2: 'test12'
			}, {
				prop1: 'test21',
				prop2: 'test22'
			}, {
				prop1: 'test31',
				prop2: 'test32'
			}];

			let expected = [
				['prop1', 'prop2'], //keys
				['test11', 'test12'], //values
				['test21', 'test22'],
				['test31', 'test32']
			]
			let minified = json.minify(objs);
			expect(minified).to.be.eql(expected);
		});

		it('Should minify an array of nested objects', () => {
			let objs = [{
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

			let expected = [
				['prop1', 'prop2', ['subProp', 'sub1', 'sub2']], //keys
				['test11', 'test12', [true, 35]], //values
				['test21', 'test22', [false, 'I AM THE PROP']],
				['test31', 'test32', ['sub sub sub', 'yup']]
			]
			let minified = json.minify(objs);
			expect(minified).to.be.eql(expected);
		});
	});
});
