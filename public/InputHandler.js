// Handle all user input and call appropriate functions for them
var InputHandler = function() {
    var listeners = {};
    var events = new Set();

    // Add a new listener to a specific event
    this.addListener = function(event, name, fn, params, region) {
        // If the event already exists then just push it to the existing list of listeners
        if(!events.has(event)) {
            listeners[event] = [];
            window.addEventListener(event, function(evt) {
                for(var name in listeners[event]) {
                    if(!listeners[event].hasOwnProperty(name))
                        continue;
                    if(!listeners[event][name].active)
                        continue;

                    // If this listener requires the event to be in a particular x and y, then check it
                    if(listeners[event][name].region) {
                        let reg = listeners[event][name].region;
                        if(evt.clientX < reg.x || evt.clientX > reg.width || evt.clientY < reg.y || evt.clientY > reg.height)
                            continue;
                    }
                    // Call the listening function
                   listeners[event][name].function.apply(this, params);
                }
            }, false);
        }
        else {
            events.add(event);
        }
        listeners[event][name] = {
            function: fn,
            region: region,
            active: true
        };
    }

    this.disableEvent = function(event, name) {
        listeners[event][name].active = false;
    }
    this.enableEvent = function(event, name) {
        listeners[event][name].active = true;
    }
}