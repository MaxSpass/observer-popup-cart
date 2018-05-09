(function ($) {
    function CheckOutPopup(options) {

        var self = this;
        this.$doc = $(document);
        this.$html = $('html');
        this.$body = $('body');
        this.template = JSON.parse(localStorage.getItem('checkoutPopup')) || null;
        this.element = null;

        console.log('CheckOutPopup');
        console.log('template', self.template);

        function initEvents() {
            self.$doc.on('click', '.popup__close', self.close)
        };

        function checkPopup(callback) {
            if (!self.template) {
                var w = ajaxEmitation();
                w.done(function () {
                    callback();
                    console.log('show');
                });
            } else {
                callback();
            }
        };

        function ajaxEmitation() {
            console.log('ajaxEmitation START');
            var promise = $.Deferred();
            var popupData = randomCheckoutData();

            // $.ajax({
            //     url: '',
            //     type: 'post',
            //     dataType: 'json',
            //     success: function (popupData) {
            //         createTemplate(popupData);
            //     }
            // });

            setTimeout(function () {
                createTemplate(popupData);
                promise.resolve();
                console.log('ajaxEmitation END');
            }, 2000);

            return promise.promise();
        };

        function createTemplate(content) {
            var inner = parseData(content) || 'Контент не прилетел !!!';

            self.template =
                '<div class="popup__bg"></div>' +
                '<div class="popup__box">' +
                '<div class="popup__wrapper">' +
                '<div class="popup__content">' + inner +
                '<div class="popup__close"></div>' +
                '</div>' +
                '</div>' +
                '</div>';

            var toStorage = JSON.stringify(self.template);
            localStorage.setItem('checkoutPopup', toStorage);
        };

        function parseData(data) {
            var productsInfoMarkup = '';
            data.products.forEach(function (el, i) {
                console.log('el,i', el, i);
                productsInfoMarkup += '<h2>' + el.title + '</h2><h2>' + el.length + '</h2><h2>' + el.price + '</h2><h2>' + el.img + '</h2><h2>' + el.href + '</h2></br>';
            });

            console.log('productsInfoMarkup', productsInfoMarkup);

            return productsInfoMarkup;
        }

        this.show = function (el) {
            self.element = el || {id: 777, length: 12};
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
    window.moyoNS.components.CheckOutPopup = CheckOutPopup;

})(jQuery);


function randomCheckoutData() {
    var makeHash = function (length) {
        var text = "";
        var possible = "ABCDEFGHIJ KLMNOPQRSTUVWX YZabcdefghijk lmnopqrstuvw xyz0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };

    var getRandom = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };

    var data = {
        priceTotal: '100 500грн',
        products: [
            {
                title: 'Название - ' + makeHash(20),
                length: getRandom(2, 10),
                price: getRandom(10000, 30000),
                img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
                href: 'java-script:void(0)',
            },
            {
                title: 'Название - ' + makeHash(20),
                length: getRandom(2, 10),
                price: getRandom(10000, 30000),
                img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
                href: 'java-script:void(0)',
            },
            {
                title: 'Название - ' + makeHash(20),
                length: getRandom(2, 10),
                price: getRandom(10000, 30000),
                img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
                href: 'java-script:void(0)',
            },
            {
                title: 'Название - ' + makeHash(20),
                length: getRandom(2, 10),
                price: getRandom(10000, 30000),
                img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
                href: 'java-script:void(0)',
            },
            {
                title: 'Название - ' + makeHash(20),
                length: getRandom(2, 10),
                price: getRandom(10000, 30000),
                img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
                href: 'java-script:void(0)',
            },
        ]
    };

    return data;
}
