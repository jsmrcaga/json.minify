let utils = {};

utils.minify = function minify(object) {
	let keys = [];
	let values = []
	for(let k in object) {
		if(object[k] instanceof Object) {
			let [subkeys, subvalues] = minify(object[k]);
			subkeys.unshift(k);
			keys.push(subkeys);
			values.push(subvalues);

		} else {
			keys.push(k);
			values.push(object[k]);
		}
	}

	return [keys, values];
};

utils.explode = function explode(keys, values) {
	let obj = {};

	keys.forEach((key, i) => {
		if(key instanceof Array) {
			obj[key[0]] = utils.explode(key.slice(1), values[i]);
		} else {
			obj[key] = values[i];
		}
	});

	return obj;
};

module.exports = utils;
