(function ($) {
        function Popup(options) {

            this.config = options || {};
            this.contentAsync = this.config.contentAsync || null;
            this.contentStatic = this.config.contentStatic || null;
            this.localStorage = this.config.localStorage || null;

            var self = this;
            this.$doc = $(document);
            this.$html = $('html');
            this.$body = $('body');
            this.template = null;
            this.templateStorage = JSON.parse(localStorage.getItem(this.localStorage)) || null;

            console.log('CheckOutPopup');

            function initEvents() {
                self.$doc.on('click', '.popup__close, .popup__wrapper', self.close);
            };

            function returnTemplate(content) {

                self.template =
                    '<div class="popup__bg"></div>' +
                    '<div class="popup__box">' +
                    '<div class="popup__wrapper">' +
                    '<div class="popup__content">' + content +
                    '<div class="popup__close"></div>' +
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


            function asyncContent(callback) {
                var w = callback();
                w.done(function (content) {
                    returnTemplate(content);
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

            this.create = function (callback, isFromStorage) {
                if (self.contentAsync || self.contentStatic) {
                    if (self.contentAsync) {
                        if (callback) {
                            checkStorage(callback, isFromStorage)
                        }
                        else {
                            console.warn('Function needs CALLBACK - template builder!')
                        }
                    } else if (self.contentStatic) {
                        // console.log('self.contentStatic', self.contentStatic, $(self.contentStatic).html());
                        var content = $(self.contentStatic).html();
                        returnTemplate(content);
                        // self.show();
                    }
                } else {
                    console.warn('Props: contentAsync || contentStatic is required!')
                }
            }
            ;


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

    }

)(jQuery);



