(function ($) {
    function Popup(options) {
        var self = this;
        this.config = options || {};
        this.async = this.config.async || false;
        this.localStorage = this.config.localStorage || null;
        this.classes = this.config.classes || null;
        this.$doc = $(document);
        this.$html = $('html');
        this.$body = $('body');
        this.template = null;
        this.storageData = JSON.parse(localStorage.getItem(this.localStorage)) || null;

        function initEvents() {
            self.$doc.on('click', '.popup__close', self.close);
        };

        function returnTemplate(content) {

            var popupBox = (self.classes) ? self.classes.popupBox : '';
            var popupContent = (self.classes) ? self.classes.popupContent : '';


            self.template =
                '<div class="popup__bg popup__close"></div>' +
                '<div class="popup__box ' + popupBox + '">' +
                '<div class="popup__wrapper">' +
                '<div class="popup__content ' + popupContent + '">' + content +
                '<div class="popup__close-button popup__close"><span></span></div>' +
                '</div>' +
                '</div>' +
                '</div>';

            self.show();
        };

        function staticContent(content) {
            var inner;
            if (content != 'undefined') {
                if (typeof content == 'string') {
                    // markup
                    inner = content;
                } else if (typeof content == 'function') {
                    // return markup
                    inner = content();
                } else if (typeof content == 'object') {
                    // jquery selector
                    inner = $(content)[0].outerHTML;
                } else {
                    console.warn('Required content types: string || function || object(jquery selector)')
                }
                returnTemplate(inner);
            } else {
                console.warn('Content is undefined!')
            }
        }

        function asyncContent(callback, parseStorage) {
            var w = callback();
            var popupContent;
            w.done(function (content) {
                if (!!parseStorage) {
                    if (typeof parseStorage === 'function') {
                        popupContent = parseStorage(content);
                    } else {
                        console.warn('parseStorage is not a FUNCTION')
                    };
                } else {
                    popupContent = content;
                }

                returnTemplate(popupContent);
                console.log('ajaxEmitation END', content);

                if (self.localStorage) {
                    localStorage.setItem(self.localStorage, JSON.stringify(content));
                }
            });
        };

        function checkStorage(callback, parseStorage, fromStorage) {
            if (fromStorage) {
                console.log('self.storageData', self.storageData);
                if (!!self.storageData) {
                    self.template = parseStorage(self.storageData);
                    returnTemplate(self.template);
                } else {
                    asyncContent(callback, parseStorage, fromStorage);
                }
            } else {
                asyncContent(callback, parseStorage, fromStorage);
            }
        }

        function verifyMethods(obj) {
            var isOrder = false;

            if (obj.content) {
                isOrder = true;
            } else {
                console.warn('Fields: CONTENT is required!')
            }

            return isOrder;
        }

        function checkDifferenceHeight() {
            var windowHeight = $(window).height();
            var bodyHeight = self.$body.height();
            var order = false;
            if (bodyHeight > windowHeight) {
                order = true;
            }
            return order;
        }

        this.create = function (obj) {
            var content = (obj.content) ? obj.content : null;
            var parseStorage = (obj.parseStorage) ? obj.parseStorage : false;
            var fromStorage = (obj.fromStorage) ? obj.fromStorage : false;

            if (verifyMethods(obj)) {
                if (!fromStorage) {
                    localStorage.removeItem(self.localStorage)
                }

                if (self.async) {
                    // Async
                    checkStorage(content, parseStorage, fromStorage)
                }
                else {
                    // Static
                    staticContent(content)
                }
            }
        };


        this.show = function () {
            var template = self.template;

            if (checkDifferenceHeight()) {
                self.$html.css({'margin-right': 17, 'overflow': 'hidden'});
            }
            self.$body.prepend(template);
        };

        this.close = function () {
            self.$body.find('.popup__bg, .popup__box').remove();
            self.$html.removeAttr('style');
        };


        (function init() {
            initEvents();
        })();
    }

    window.moyoNS = window.moyoNS || {};
    window.moyoNS.components = window.moyoNS.components || {};
    window.moyoNS.components.Popup = Popup;

})(jQuery);



