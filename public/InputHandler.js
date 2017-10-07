// Handle all user input and call appropriate functions for them
var InputHandler = function() {
    var listeners = {};
    var events = new Set();

    // Add a new listener to a specific event
    this.addListener = function(event, name, fn, params) {
        // If the event already exists then just push it to the existing list of listeners
        if(!events.has(event)) {
            events.add(event);
            listeners[event] = {};
            window.addEventListener(event, function(evt) {
                for(var name in listeners[event]) {
                    if(!listeners[event].hasOwnProperty(name))
                        continue;
                    let currentListener = listeners[event][name];
                    if(!currentListener.active)
                        continue;
                    // Call the listening function
                    currentListener.function.apply(this, [evt].concat(currentListener.params));
                }
            }, false);
        }
        if(listeners[event][name])
            listeners[event][name].active = true;
        else
            listeners[event][name] = {
                function: fn,
                params: params,
                active: true
            };
    }

    this.disableEvent = function(event, name) {
        if(listeners[event] && listeners[event][name])
            listeners[event][name].active = false;
    }
    this.enableEvent = function(event, name) {
        if(listeners[event] && listeners[event][name])
            listeners[event][name].active = true;
    }
}