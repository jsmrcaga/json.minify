const { minify, explode } = require('./lib/utils');

const json = function() {
	JSON.minify = json.minify;
	JSON.explode = json.explode;
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

module.exports = json;
