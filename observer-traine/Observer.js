// Observer
((function($){
    function Observer() {
        var observers = [];

        this.broadcast = function(data) {
            for (var i = 0, len = observers.length; i < len; i++) {
                observers[i].fire(data);
            }
        };

        this.subscribe = function(observer) {
            observers.push(observer);
        }
    }
}))(jQuery);







