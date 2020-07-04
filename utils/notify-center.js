const _observerTables = {};

const addObserver = (observer, name, callback) => {
	console.log('addObserver', name, observer);
	if (!name || !observer || !callback) {
		console.log(
			`notificationCenter 注册通知失败：参数不能为空`,
			name,
			observer,
			callback
		);
		return;
	}

	// console.log(`notificationCenter 添加通知：`, name, observer);

	let objects = _observerTables[name];
	if (!objects || !objects.length) {
		objects = [];
	}
	objects.push({
		observer,
		name,
		callback
	});
	_observerTables[name] = objects;
};

const removeObserver = (observer, name) => {
	if (!name || !observer) {
		console.log(
			`notificationCenter 删除通知失败：参数不能为空`,
			name,
			observer
		);
		return;
	}

	let objects = _observerTables[name];
	if (!objects || !objects.length) {
		return;
	}

	// console.log(`notificationCenter 删除通知：`, name, observer);

	// 同一个obj有可能加了N次，故用新数组
	const newObjects = [];
	for (let i = 0; i < objects.length; i++) {
		const obj = objects[i];
		if (obj.observer !== observer) {
			newObjects.push(obj);
		}
	}
	if (newObjects.length !== objects.length) {
		_observerTables[name] = newObjects;
		// console.log(
		// 	`notificationCenter 删除通知剩余对象：`,
		// 	name,
		// 	_observerTables[name]
		// );
	}
};

const postNotification = (name, notification) => {
	if (!name) {
		console.log(`notificationCenter 发送通知失败：notification不能为空`);
		return;
	}

	let result;
	try {
		result = JSON.parse(notification) || {};
	} catch (e) {
		result = notification || {};
	}

	const objects = _observerTables[name];
	if (!objects || !objects.length) {
		return;
	}

	// console.log(`notificationCenter 发通知：`, name, result);

	objects.forEach(function(object) {
		const callback = object.callback;
		callback && callback(result);
	});
};

export default {
	addObserver,
	removeObserver,
	postNotification
};
