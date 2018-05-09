// CartPopup
((function($){
    function CartPopup() {
        var self = this;
        this.$doc = $(document);
        this.$html = $('html');
        this.$body = $('body');
        // this.template = null;
/*        this.template = JSON.parse(localStorage.getItem('checkoutPopup')) || null;
        this.element = null;*/

        function parseData(data) {
            var productsInfoMarkup = '';
            data.products.forEach(function (el, i) {
                productsInfoMarkup += '<h2>' + el.title + '</h2><h2>' + el.length + '</h2><h2>' + el.price + '</h2><h2>' + el.img + '</h2><h2>' + el.href + '</h2></br>';
            });

            // console.log('productsInfoMarkup', productsInfoMarkup);

            return productsInfoMarkup;
        }

        this.ajaxEmitation = function() {
            console.log('ajaxEmitation START');
            var defer = $.Deferred();
            var template;

            setTimeout(function () {
                template = parseData(randomCheckoutData());
                defer.resolve(template);
            }, 2000);

            return defer.promise();
        }
    }

    window.moyoNS = window.moyoNS || {};
    window.moyoNS.components = window.moyoNS.components || {};
    window.moyoNS.components.CartPopup = CartPopup;

}))(jQuery);