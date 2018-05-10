(function ($) {
    function Popup(options) {

        this.config = options || {};
        this.contentAsync = this.config.contentAsync || null;
        this.contentStatic = this.config.contentStatic || null;
        this.localStorage = this.config.localStorage || null;
        this.classes = this.config.classes || null;


        var self = this;
        this.$doc = $(document);
        this.$html = $('html');
        this.$body = $('body');
        this.template = null;
        this.templateStorage = JSON.parse(localStorage.getItem(this.localStorage)) || null;

        console.log('CheckOutPopup');

        function initEvents() {
            self.$doc.on('click', '.popup__close', self.close);
        };

        function returnTemplate(content) {

            self.template =
                '<div class="popup__bg popup__close"></div>' +
                '<div class="popup__box ' + self.classes.popupBox + '">' +
                '<div class="popup__wrapper">' +
                '<div class="popup__content ' + self.classes.popupContent + '">' + content +
                '<div class="popup__close-button popup__close"><span></span></div>' +
                '</div>' +
                '</div>' +
                '</div>';


            if (self.localStorage) {
                self.templateStorage = self.template;
                var toStorage = JSON.stringify(self.template);
                localStorage.setItem(self.localStorage, toStorage);
            }

            self.show();
        };

        function staticContent() {

            var content;

            if (typeof self.contentStatic == 'string') {
                content = $(self.contentStatic)[0].outerHTML;
            }
            if (typeof self.contentStatic == 'function') {
                content = self.contentStatic()
            }
            returnTemplate(content);
        }

        function asyncContent(callback) {
            var w = callback();
            w.done(function (content) {
                console.log('content', content);
                returnTemplate(content);
                console.log('ajaxEmitation END');
            });
        };

        function checkStorage(callback, isFromStorage) {
            if (isFromStorage) {
                if (!!self.templateStorage) {
                    self.show(isFromStorage);
                } else {
                    asyncContent(callback);
                }
            } else {
                asyncContent(callback);
            }
        }

        function verifyMethods() {
            var isOrder = false;

            // console.log('self', self);
            // console.log('self.contentAsync', self.contentAsync != null);
            // console.log('self.contentStatic', self.contentStatic != null);

            if (self.contentAsync != null && self.contentStatic != null) {
                console.warn('Need ONE main property: contentAsync || contentStatic')
            } else if (self.contentAsync || self.contentStatic) {
                isOrder = true;
            }


            return isOrder;
        }

        this.create = function (obj) {
            var callback = (obj) ? obj.content : null;
            var isFromStorage = (obj) ? obj.fromStorage : null;

            if (verifyMethods()) {
                if (self.contentAsync) {
                    if (callback) {
                        checkStorage(callback, isFromStorage)
                    }
                    else {
                        console.warn('Function needs CALLBACK - template builder!')
                    }
                } else if (self.contentStatic) {
                    console.log('self.contentStatic', self.contentStatic);
                    staticContent();
                }
            }
        };


        this.show = function (isFromStorage) {
            // self.element = el || {id: 777, length: 12};
            var template = (isFromStorage) ? self.templateStorage : self.template;

            self.$html.css({'margin-right': 17, 'overflow': 'hidden'});
            self.$body.prepend(template);
        };

        this.close = function () {
            self.$html.removeAttr('style');
            self.$body.find('.popup__bg, .popup__box').remove();
        };

        // function checkPopup(callback) {
        //     if (!self.template) {
        //         callback();
        //     } else {
        //         callback();
        //     }
        // };

        (function init() {
            initEvents();
        })();
    }

    window.moyoNS = window.moyoNS || {};
    window.moyoNS.components = window.moyoNS.components || {};
    window.moyoNS.components.Popup = Popup;

})(jQuery);



