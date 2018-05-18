// Observer
((function($){
    function Observer() {
        var observers = [];

        this.subscribe = function(observer) {
            observers.push(observer);
        };

        this.broadcast = function(data) {
            for (var i = 0, len = observers.length; i < len; i++) {
                observers[i](data);
            }
        };

    }

    window.moyoNS = window.moyoNS || {};
    window.moyoNS.components = window.moyoNS.components || {};
    window.moyoNS.components.Observer = Observer;

}))(jQuery);







