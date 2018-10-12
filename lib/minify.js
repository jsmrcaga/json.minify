const { minify, explode } = require('./lib/utils');

const json = function() {
	JSON.minify = json.minify;
	JSON.explode = json.explode;
	JSON.isMinified = json.isMinified;
};

/**
 * Minifies a JSON object or array into arrays of keys/values
 * @param {Object, Object[]} object - Object to minify
 * @returns {MinifiedJSON} Array of [keys], [values]
 */
json.minify = function(object) {
	if(object instanceof Array) {
		let result = object.map(innerObj => minify(innerObj));
		let [[keys]] = result;
		let values = result.map(minified => minified[1]);
		return [keys, ...values];
	}

	return minify(object);
};

/**
 * Explodes a minified JSON object into a normal JSON array/object
 * @param {Object, string} minifiedJSON - Minified JSON
 * @returns {Object, Object[]} Object or Array of objects
 */
json.explode = function(minifiedJSON) {
	if(typeof minifiedJSON === 'string') {
		minifiedJSON = JSON.parse(minifiedJSON);
	}

	let [keys] = minifiedJSON;
	let values = minifiedJSON.slice(1);
	if(values.length === 1) {
		return explode(keys, values);
	}

	return values.map(value => explode(keys, value));
};

/**
 * Tests JSON object for minification process
 * @param {Object, Object[]} json - JSON object to test
 * @returns {bool} Is it then ?
 */
json.isMinified = function(json) {
	if(!(json instanceof Array)){
		return false;
	}

	if(json.length === 1){
		return false;
	}

	if(json[0].length !== json[1].length) {
		return false;
	}

	for(let val of json[0]){
		if(!(typeof val === 'string') && !(val instanceof Array)){
			return false;
		}
	}

	return true;
}

module.exports = json;
