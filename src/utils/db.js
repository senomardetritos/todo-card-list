export function get() {
	try {
		const data = JSON.parse(localStorage.db);
		return data;
	} catch (e) {
		localStorage.db = '{}';
	}
}

export function save(data) {
	try {
		localStorage.db = JSON.stringify(data);
	} catch (e) {
		localStorage.db = '{}';
	}
}

export function getLastId(data) {
	if (data) {
		const keys = Object.keys(data);
		if (keys) {
			const last = keys[keys.length - 1];
			if (last) {
				return parseInt(last) + 1;
			} else {
				return 1;
			}
		} else {
			return 1;
		}
	} else {
		return 1;
	}
}
