# json.minify

Converts JSON objects into arrays, minimizing them a lot!

> ⚠️ be careful, this library does not check for differences in schemas and is mainly aimed to APIs 
> in which all objects returned are the same. If you pass arrays with different schemed objects, they
> will not be checked against values, causing weird and unexpected results (specially on `explode`)

## Installation
`npm i json.minify`

## Usage

```
const jsonMinifier = require('json.minify');

// or

const { minify, explode } = require('json.minify');

// you can add .minify() and .explode() to global JSON by using:
jsonMinifier();

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

let result = json.minify(objs);

// results in
result = [
	['prop1', 'prop2', ['subProp', 'sub1', 'sub2']], //keys
	['test11', 'test12', [true, 35]], //values
	['test21', 'test22', [false, 'I AM THE PROP']],
	['test31', 'test32', ['sub sub sub', 'yup']]
];

// and
json.explode(result);

// results in the same objs array

