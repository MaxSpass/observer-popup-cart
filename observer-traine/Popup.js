(function ($) {
    function Popup(options) {

        this.config = options || {};
        this.contentAsync = this.config.contentAsync || null;
        this.contentStatic = this.config.contentStatic || null;

        console.log('this.contentStatic', this.contentStatic);

        var self = this;
        this.$doc = $(document);
        this.$html = $('html');
        this.$body = $('body');
        this.template = null;
        this.content = null;
        // this.template = JSON.parse(localStorage.getItem('checkoutPopup')) || null;
        // this.element = null;

        console.log('CheckOutPopup');

        // console.log('template', self.template);

        function initEvents() {
            self.$doc.on('click', '.popup__close, .popup__wrapper', self.close);
        };

        function createTemplate(content) {

            self.template =
                '<div class="popup__bg"></div>' +
                '<div class="popup__box">' +
                '<div class="popup__wrapper">' +
                '<div class="popup__content">' + content +
                '<div class="popup__close"></div>' +
                '</div>' +
                '</div>' +
                '</div>';

            // var toStorage = JSON.stringify(self.template);
            // localStorage.setItem('checkoutPopup', toStorage);

            self.show();
        };


        function asyncContent(callback) {
            var w = callback();
            w.done(function (content) {
                // callback(data);
                createTemplate(content);
                // self.show();
                // console.log('ajaxEmitation END',content);
            });
        };

        this.buildContent = function (callback) {
            if (self.contentAsync || self.contentStatic) {
                if (self.contentAsync) {
                    if(callback) {
                        asyncContent(callback);
                    } else {console.warn('Function needs CALLBACK - template builder!')}
                } else if (self.contentStatic) {
                    // console.log('self.contentStatic', self.contentStatic, $(self.contentStatic).html());
                    var content = $(self.contentStatic).html();
                    createTemplate(content);
                    // self.show();
                }
            } else {console.warn('Props: contentAsync || contentStatic is required!')}
        }

        function checkPopup(callback) {
            if (!self.template) {
                callback();
            } else {
                callback();
            }
        };

        // function ajaxEmitation() {
        //     console.log('ajaxEmitation START');
        //     var promise = $.Deferred();
        //     var popupData = randomCheckoutData();
        //
        //     setTimeout(function () {
        //         createTemplate(popupData);
        //         promise.resolve();
        //         console.log('ajaxEmitation END');
        //     }, 2000);
        //
        //     return promise.promise();
        // };

        // function parseData(data) {
        //     var productsInfoMarkup = '';
        //     data.products.forEach(function (el, i) {
        //         console.log('el,i', el, i);
        //         productsInfoMarkup += '<h2>' + el.title + '</h2><h2>' + el.length + '</h2><h2>' + el.price + '</h2><h2>' + el.img + '</h2><h2>' + el.href + '</h2></br>';
        //     });
        //
        //     console.log('productsInfoMarkup', productsInfoMarkup);
        //
        //     return productsInfoMarkup;
        // }

        this.show = function (el) {
            // self.element = el || {id: 777, length: 12};
            checkPopup(function () {
                self.$html.css({'margin-right': 17, 'overflow': 'hidden'});
                self.$body.prepend(self.template);
            })
        };

        this.close = function () {
            self.$html.removeAttr('style');
            self.$body.find('.popup__bg, .popup__box').remove();
        };

        (function init() {
            initEvents();
        })();
    }

    window.moyoNS = window.moyoNS || {};
    window.moyoNS.components = window.moyoNS.components || {};
    window.moyoNS.components.Popup = Popup;

})(jQuery);



