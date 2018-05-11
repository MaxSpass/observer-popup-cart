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

        this.parseData = function(data) {
            var productsInfoMarkup = '';
            var moreOneProductText = (data.products.length < 1) ? 'товаров на' : 'товар на';

                    productsInfoMarkup +=   '<div id="checkoutPopupData">' +
                                            '<div class="popup-checkout__header">' +
                                            '<span class="popup-checkout__checkout-text">В корзине: <span class="bold">' +
                                            '<b id="popup-checkout-product-count">'+data.products.length+'</b>' +
                                            '<b id="popup-checkout-count-text"> '+moreOneProductText+' </b>' +
                                            '<b id="popup-checkout-total-price">'+data.priceTotal+'</b> грн' +
                                            '</span>' +
                                            '</span>' +
                                            '</div>' +
                                            '<div class="popup-checkout__body">';
                data.products.forEach(function (el, i) {
                    productsInfoMarkup +=   '<div class="popup-checkout__product">' +
                                            '<div class="popup-checkout__product-col left">' +
                                            '<a href="'+el.href+'" class="popup-checkout__img-wrap">' +
                                            '<img src="'+el.img+'" alt="'+el.title+'" class="popup-checkout__img"></a>' +
                                            '<span class="popup-checkout__info">' +
                                            '<a href="'+el.href+'" class="popup-checkout__title">'+el.title+'</a>' +
                                            '<div class="popup-checkout__ready">'+el.sub+'</div>' +
                                            '</span>' +
                                            '</div>' +
                                            '<div class="popup-checkout__product-col right">' +
                                            '<div class="popup-checkout__decinc">' +
                                            '<div class="decinc clear_after" data-max-value="10">' +
                                            '<a href="#" class="dec">-</a>' +
                                            '<input class="editCountProduct"' +
                                            'type="text" autocomplete="off"' +
                                            'id=""' +
                                            'value="'+el.count+'" data-id="'+el.id+'"' +
                                            'disabled>' +
                                            '<a href="#" class="inc">+</a>' +
                                            '</div>' +
                                            '</div>' +
                                            '<div class="popup-checkout__price">'+el.price+' грн' +
                                            '</div>' +
                                            '<span class="popup__close popup__close-button popup-checkout__remove"><span></span></span>' +
                                            '</div>' +
                                            '</div>'
                });
                    productsInfoMarkup +=   '</div>' +
                                            '<div class="popup-checkout__footer">' +
                                            '<div class="popup-checkout__button bluebutton bordered button_redirect-data_url popup__close-trigger">Продолжить покупки' +
                                            '</div>' +
                                            '<div class="popup-checkout__button bluebutton button_redirect-data_url" data-href="/moyobasket/proceed.html">Оформить заказ' +
                                            '</div>' +
                                            '</div>';


            // console.log('productsInfoMarkup', productsInfoMarkup);

            return productsInfoMarkup;
        }

        this.ajaxEmitation = function() {
            console.log('ajaxEmitation START');
            var defer = $.Deferred();
            var template;

            setTimeout(function () {
                template = self.parseData(randomCheckoutData());
                var template2 = trueData();
                console.log('template2',template2);
                // console.log('template2', template2);
                defer.resolve(template2);
            }, 1000);

            return defer.promise();
        }
    }

    window.moyoNS = window.moyoNS || {};
    window.moyoNS.components = window.moyoNS.components || {};
    window.moyoNS.components.CartPopup = CartPopup;

}))(jQuery);