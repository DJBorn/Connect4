// Handle all user input and call appropriate functions for them
var InputHandler = function() {
    var listeners = {};
    var events = new Set();

    // Add a new listener to a specific event
    this.addListener = function(event, name, fn, params, regionGetter, regionGetterParams) {
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

                    // If this listener requires the event to be in a particular x and y, then call the getter for those coordinates and check
                    if(currentListener.regionGetter) {
                        let reg = currentListener.regionGetter.apply(this, currentListener.regionGetterParams);
                        if(evt.clientX < reg.x || evt.clientX > reg.x + reg.width || evt.clientY < reg.y || evt.clientY > reg.y + reg.height)
                            continue;
                    }
                    // Call the listening function
                    currentListener.function.apply(this, currentListener.params);
                }
            }, false);
        }
        listeners[event][name] = {
            function: fn,
            regionGetter: regionGetter,
            regionGetterParams, regionGetterParams,
            params: params,
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