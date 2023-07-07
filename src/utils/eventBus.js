const eventBusInstall = () => {
	const events = new Map();
	/**
	 * 注册监听事件
	 *  @param {string} name 事件名称, 可以用 `'*'` 来为所有的事件类型注册事件函数
	 *  @param {function} handle 回调事件函数
	 */
	const on = (name, handler) => {
		const handlers = events.get(name);
		if (handlers) {
			handlers.push(handler);
		} else {
			events.set(name, [handler]);
		}
	};
	/**
	 * 移除一个指定类型的事件函数
	 * 如果第二参数 handler 被忽略，将移除所有函数
	 * @param {string} name 事件名称, 可以用 `'*'` 来移除所有类型的所有事件函数
	 * @param {Function} [handler] 将移除的事件函数
	 */
	const off = (name, handler) => {
		if (name === "*") {
			events.clear();
		}

		const handlers = events.get(name);

		if (handlers) {
			if (handler) {
				handlers.splice(handlers.indexOf(handler) >>> 0, 1);
			} else {
				events.set(name, []);
			}
		}
	};

	/**
	 * 触发指定类型的所有事件函数
	 * 类型为 `*` 的所有事件函数也会在最后调用
	 * @param {string} name 希望触发的类型
	 * @param {Any} [params] 传递给每个即将触发的事件函数的参数
	 */
	const emit = (name, params) => {
		let handlers = events.get(name);
		if (handlers) {
			handlers.slice().map(handler => {
				handler(params);
			});
		}
		handlers = events.get("*");
		if (handlers) {
			handlers.slice().map(handler => {
				handler(name, params);
			});
		}
	};

	return { events, on, off, emit };
};
export const eventBus = eventBusInstall()