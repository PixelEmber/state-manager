# State Manager
A simple utility class that allows you to manage the state of your javascript application without the use of a framework.

## Installation
Include script directly in your HTML file:

```
<script src="path/to/state-manager.js"></script>
```

## Usage

### Properties
subscribers: A map containing the subscribers for each property in the state.

### Methods
**constructor(initialState = {})**

Creates a new instance of the StateManager class, with an optional initial state.

**updateState(newState)**

Updates the state with the provided object, and calls the subscribers for each property that has been updated.

**subscribe(subscriber, stateProp)**

Subscribes the provided function to changes on the specified state property. If no state property is provided, the subscriber will be called for all state changes.

**unsubscribe(subscriber, stateProp)**

Unsubscribes the provided function from changes on the specified state property. If no state property is provided, the subscriber will be unsubscribed from all state changes.

## Getting Started

Here's a simple example of how to use the StateManager class on a static web page:

```javascript
<div id="root"></div>

<script>
  const state = new StateManager({ count: 0 });

  function render() {
    const root = document.getElementById("root");
    root.innerHTML = `<p>Count: ${state.count}</p>`;
  }

  state.subscribe(render);
  render();

  setInterval(() => {
    state.updateState({ count: state.count + 1 });
  }, 1000);
</script>
```

This code creates a new instance of StateManager with an initial state of { count: 0 }. It then defines a render function that updates the contents of a div element with the current count. The render function is subscribed to the state, so it will be called every time the state is updated. Finally, the code sets an interval that increments the count by 1 every second and updates the state, which causes the render function to be called and updates the contents of the div element with the new count.


