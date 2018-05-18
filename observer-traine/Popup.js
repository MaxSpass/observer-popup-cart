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
            self.$doc.on('click', '.popup__wrapper', function(e){
                if($(e.target).hasClass('popup__wrapper')) {
                    self.close()
                }
            })
        };

        function returnTemplate(content) {

            var popupBox = (self.classes) ? self.classes.popupBox : '';
            var popupContent = (self.classes) ? self.classes.popupContent : '';


            self.template =
                '<div class="popup__bg popup__close"></div>' +
                '<div class="popup__box ' + popupBox + '">' +
                '<div class="popup__wrapper">' +
                '<div class="popup__content ' + popupContent + '">' + content +
                '<div class="popup__close-button popup__close ico ico_close"></div>' +
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

        function asyncContent(callback, arguments, parseStorage) {

            var asyncAwait = (arguments) ? callback(arguments) : callback();
            var popupContent;

            asyncAwait.done(function (content) {
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
                console.log('getCartInfo END');

                if (!!self.localStorage) {
                    localStorage.setItem(self.localStorage, JSON.stringify(content));
                }
            });
        };

        function checkStorage(callback, arguments, parseStorage, fromStorage) {
            var storage = localStorage.getItem(self.localStorage);
            if (fromStorage) {
                if (!!self.storageData && !!storage) {
                    self.template = parseStorage(JSON.parse(storage));
                    returnTemplate(self.template);
                } else {
                    asyncContent(callback, arguments, parseStorage);
                }
            } else {
                asyncContent(callback, arguments, parseStorage);
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
            var arguments = (obj.arguments) ? obj.arguments : null;
            var content = (obj.content) ? obj.content : null;
            var parseStorage = (obj.parseStorage) ? obj.parseStorage : false;
            var fromStorage = (obj.fromStorage) ? obj.fromStorage : false;

            if (verifyMethods(obj)) {
                if (!fromStorage) {
                    localStorage.removeItem(self.localStorage)
                }

                if (self.async) {
                    // Async
                    checkStorage(content, arguments, parseStorage, fromStorage)
                }
                else {
                    // Static
                    staticContent(content, arguments)
                }
            }
        };


        this.show = function () {
            var template = self.template;

            if (checkDifferenceHeight()) {
                self.$body.css({'margin-right': 17, 'overflow': 'hidden'});
            }
            self.$body.prepend(template);
        };

        this.close = function () {
            self.$body.find('.popup__bg, .popup__box').remove();
            self.$body.removeAttr('style');
        };


        (function init() {
            initEvents();
        })();
    }

    window.moyoNS = window.moyoNS || {};
    window.moyoNS.components = window.moyoNS.components || {};
    window.moyoNS.components.Popup = Popup;

})(jQuery);



