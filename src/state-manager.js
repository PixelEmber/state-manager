/**
 * Class for managing the state of the application and subscribing to state updates.
 */
class StateManager {
	/**
	 * Creates an instance of CBState.
	 * @param {Object} [initialState={}] - Initial state object.
	 */
	constructor(initialState = {}) {
		this.subscribers = new Map();
		for (const prop in initialState) {
			this[prop] = initialState[prop];
			this.subscribers.set(prop, new Set());
		}
	}

	/**
	 * Updates the state of the class with the properties and values of the newState object passed to it.
	 * If there are any subscribers registered for that property, they are called with the class instance as the argument.
	 * If there are any subscribers registered for the "all" property, they are also called with the class instance as the argument.
	 *
	 * @param {Object} newState - new state to update the class.
	 */
	updateState(newState) {
		Object.assign(this, newState);
		for (const key in newState) {
			if (this.subscribers.has(key)) {
				this.subscribers
					.get(key)
					.forEach((subscriber) => subscriber(this));
			}
		}
		if (this.subscribers.has("all")) {
			this.subscribers
				.get("all")
				.forEach((subscriber) => subscriber(this));
		}
	}

	/**
	 * Register a subscriber function to be called when a specific state property is updated, or when any state property is updated.
	 *
	 * @param {function} subscriber - Function to be called when the state is updated.
	 * @param {string} [stateProp] - Property name to subscribe to.
	 */
	subscribe(subscriber, stateProp) {
		if (stateProp) {
			if (!this.subscribers.has(stateProp)) {
				this.subscribers.set(stateProp, new Set());
			}
			this.subscribers.get(stateProp).add(subscriber);
		} else {
			this.subscribers.set("all", subscriber);
		}
	}

	/**
	 * Unregister a subscriber function from being called when a specific state property is updated, or when any state property is updated.
	 *
	 * @param {function} subscriber - Function to unregister from being called when the state is updated.
	 * @param {string} [stateProp] - Property name to unsubscribe from.
	 */
	unsubscribe(subscriber, stateProp) {
		if (stateProp) {
			if (this.subscribers.has(stateProp)) {
				this.subscribers.get(stateProp).delete(subscriber);
			}
		} else {
			this.subscribers.delete("all");
		}
	}
}
