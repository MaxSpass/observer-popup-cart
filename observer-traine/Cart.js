// CartPopup
((function ($) {


    function Cart() {
        var self = this;
        var $self = $(self);
        this.localStorage = 'checkoutPopup';
        this.$doc = $(document);
        this.$html = $('html');
        this.$body = $('body');
        this.isEmpty = null;
        this.data = {json: true};
        // this.template = null;
        /*        this.template = JSON.parse(localStorage.getItem('checkoutPopup')) || null;
                this.element = null;*/

        function initEvents() {

            new Event('open');
            new Event('remove');
            new Event('empty');
            new Event('update');

            $self.on('update', function () {
                if (self.isEmpty) {
                    $self.trigger('empty');
                } else {
                    $self.trigger('open');
                }
            });

            $self.on('empty', function () {
                localStorage.removeItem(self.localStorage);
                $('.button_redirect-data_url, .button_redirect-data_url, .popup-checkout__products').hide();
                $('.popup-checkout__empty-text').show();
                $('.cart_href').addClass('empty');
            });

            $self.on('open', function () {
                $('.button_redirect-data_url').show();
                $('.cart_href').removeClass('empty');
            });

            // in popup
            self.$doc.on('click', '.popup-checkout__decinc a, .decinc a', function (e) {
                var $this = $(this);
                var $numparent = $this.parent();
                var $numholder = $this.closest('div').find('input');
                var num = $numholder.val();
                var macQuan = parseInt($numparent.attr("data-max-value"));

                if ($this.hasClass('inc')) {
                    num++;
                    num = Math.min(num, macQuan);
                }
                else if ($this.hasClass('dec')) {
                    num--;
                    if (num < 1) num = 1;
                }
                $numholder.val(num).change();

                return false
            });


            self.$doc.on('change keyup', '.popup-checkout__decinc input, .decinc input', function () {
                self.changeCountCartItem(this);
            });

            self.$doc.on('click', '.popup-checkout__content .button_redirect-data_url', function(){
                localStorage.removeItem('checkoutPopup');
            });

            self.$doc.on('click', '.popup-checkout__remove', function (e) {
                var $this = $(this);
                var id = $this.data("id");
                var isBasket = 1;
                var isDelivery = $this.data("delivery");
                var product_id = $this.data("product_id");

                var $item = $this.closest('.popup-checkout__product');
                pushDataLayer('removeFromCart', $this);
                self.removeCartItem(id, isDelivery, product_id, isBasket);

                $item.animate({
                    opacity: 0.25,
                    height: '-=30',
                }, 350, function () {
                    $item.remove();
                });
            });
        }

        function scatterData(res, event) {
            if (res.data) {
                localStorage.setItem(self.localStorage, JSON.stringify(res.data));

                var total = res.data.cartTotalCount;
                var text = res.data.productsText;
                var price = res.data.cartTotlaPrice;

                $('#popup-checkout-count, #headerIcoBasketCount').text(total);
                $('#popup-checkout-count-text').text(text);
                $('#popup-checkout-title-summ').text(price);

                if (event) $self.trigger(event);
            }
        }

        this.parseData = function (data) {
            var content = '';

            content += '<div id="checkoutPopupData">' +
                '<div class="popup-checkout__body">';

            if (data.cartTotalCount) {
                self.isEmpty = false;
                $self.trigger('update');

                content += '<div class="popup-checkout__empty-text" style="display: none"><p>Ваша корзина пока пуста.</p></div><div class="popup-checkout__products">';
                data.products.forEach(function (el) {
                    content += '<div class="popup-checkout__product">' +
                        '<div class="popup-checkout__product-col left">' +
                        '<a href="' + el.href + '" class="popup-checkout__img-wrap">' +
                        '<img src="' + el.img + '" alt="' + el.title + '" class="popup-checkout__img"></a>' +
                        '<span class="popup-checkout__info">' +
                        '<a href="' + el.href + '" class="popup-checkout__title">' + el.title + '</a>' +
                        // '<div class="popup-checkout__ready">' + el.sub + '</div>' +
                        '</span>' +
                        '</div>' +
                        '<div class="popup-checkout__product-col right">' +
                        '<div class="popup-checkout__decinc" data-quant="' + data.productsTextCount + '">' +
                        '<div class="loadBox" data-max-value="10">' +
                        '<a href="#" class="dec">-</a>' +
                        '<div class="editCountProduct">' +
                        '<input type="text" autocomplete="off" disabled="1"' +
                        'value="' + el.count + '" data-id="' + el.product_id + '"/>' +
                        '</div>' +
                        '<a href="#" class="inc">+</a>' +
                        '</div>' +
                        '</div>' +
                        '<div class="popup-checkout__price">' + el.price + ' грн' +
                        '</div>' +
                        '<span data-id="' + el.id + '" data-product_id="' + el.product_id + '" class="popup__close-button popup-checkout__remove"><span></span></span>' +
                        '</div>' +
                        '</div>'
                });
                content += '</div>';
            } else {
                self.isEmpty = true;
                content += '<div class="popup-checkout__empty-text"><p>Ваша корзина пока пуста.</p></div>';
            }


            content += '</div>' +
                '<div class="popup-checkout__cost-info">' +
                '<span class="popup-checkout__checkout-text">В корзине: <span class="bold">' +
                '<b id="popup-checkout-count">' + data.cartTotalCount + '</b>' +
                '<b id="popup-checkout-count-text">' + data.productsText + '</b>' +
                '<b id="popup-checkout-title-summ">' + data.cartTotlaPrice + '</b> ' + data.productsTextSuffix +
                '</span>' +
                '</span>' +
                '</div>' +
                '<div class="popup-checkout__footer">' +
                '<div class="popup-checkout__button bluebutton bordered popup__close">Продолжить покупки' +
                '</div>';
            if (data.cartTotalCount) {
                content += '<span data-href="/moyobasket/proceed.html" class="popup-checkout__button bluebutton button_redirect-data_url">Оформить заказ</span>'
            }
            ;
            content += '</div>';


            return content;
        };

        this.addProduct = function (args) {
            var $this = args[0];
            var url = $this.data('href');
            var defer = $.Deferred();

            $.ajax({
                type: 'post',
                url: url,
                data: {json:true},
                dataType: 'json',
                success: function (res) {
                    if (res.error) {
                        alertPopUp("error", res.error);
                    } else {

                        // var countProducts = res.data.cartTotalCount;
                        // if (res.data.basket)
                        //     $('.cart_href').replaceWith(res.data.basket);
                        // if (res.data.basketTypes) {
                        //     var basketTypes = res.data.basketTypes;
                        // }
                        // if (res.data.basket_summary_products) {
                        //     countProducts = res.data.basket_summary_products;
                        //     $('#titleCountProduct').html(countProducts);
                        // }
                        // if (res.data.basket_summary_money) {
                        //     $('#titleSumPriceProducts').html(res.data.basket_summary_money);
                        // }
                        // updateBasketProduct();
                        // buttonBuyProduct();
                        // initScrollPane($('.header-cart-dropdown .scrollPane'));

                        // loadDynamicBlocks($.cookie('cityActiveId'));

                        toCartAnimate($this, res.data.cartTotalCount);
                        setTimeout(window.isProcessedAddProductInBasket = 0, 1000);
                        defer.resolve(res.data);
                        scatterData(res);
                    }
                }
            });
            //
            return defer.promise();
        };

        this.getCartData = function () {
            console.log('getCartInfo START');
            var defer = $.Deferred();

            $.ajax({
                url: siteBaseUrl + '/getCartData',
                type: 'post',
                data: {json:true},
                dataType: 'json',
                success: function (res) {
                    if (res.status) {
                        defer.resolve(res.data);
                        scatterData(res, 'open');
                    } else {
                        alert('Ошибка синхронизации с сервером')
                    }
                }
            });

            return defer.promise();
        };

        this.removeCartItem = function (id, isDelivery, product_id, isBasket) {

            $.ajax({
                type: 'post',
                url: siteBaseUrl + "/basket/delProduct/",
                dataType: 'json',
                data: $.extend({
                    basketId: id,
                    shopId: $("#shopId").val(),
                    isDeliveryPage: isDelivery
                },self.data),
                success: function (res) {
                    if (isBasket) {
                        // location.reload();
                        var count = res.data.products.length;
                        (count) ? scatterData(res, 'update') : scatterData(res, 'empty');
                    } else {
                        // updateCountSumPriceProduct(data.data);
                        // $('#headerBasketProduct_' + id).remove();
                        // $('.service_for_product_' + product_id).remove();
                    }
                }
            });
        };

        this.changeCountCartItem = function (block) {
            var $block = $(block);
            var count = $block.val();
            count = count.replace(/\D+/g, '');

            var $parent = $block.closest('.popup-checkout__decinc');
            $parent.addClass('popup-checkout__decinc_loader');

            if (count > 100) count = 100;
            if (count == 0 || count == "") count = 1;

            $block.val(count);

            if (!window.isUpdataCountProducts) {
                window.isUpdataCountProducts = true;
                window.isUpdataCountProductsNum = count;

                var formSendButton = $('.make_order');
                var headerCartButtons = $('.header-cart-dropdown-controls .bluebutton');
                if (headerCartButtons.length) $(headerCartButtons).addClass('forbidden');
                if (formSendButton.length) $(formSendButton).addClass('forbidden');

                $.ajax({
                    type: 'post',
                    url: siteBaseUrl + "/basket/updateCountProduct/",
                    dataType: 'json',
                    data: {
                        json: true,
                        count: count,
                        productId: $block.data("id"),
                        shopId: $("#shopId").val()
                    },
                    success: function (res) {
                        window.isUpdataCountProducts = false;
                        if (headerCartButtons.length) $(headerCartButtons).removeClass('forbidden');
                        if (formSendButton.length) $(formSendButton).removeClass('forbidden');

                        scatterData(res, 'update');
                        $parent.removeClass('popup-checkout__decinc_loader');
                        // if (data.data) {
                        //     updateCountSumPriceProduct(data.data);
                        // }
                    },
                    // complete: function() {
                    //
                    // }
                });


            } else {
                $block.val(window.isUpdataCountProductsNum);
            }
        };

        (function init() {
            initEvents();
        })();

    }

    window.moyoNS = window.moyoNS || {};
    window.moyoNS.components = window.moyoNS.components || {};
    window.moyoNS.components.Cart = Cart;

}))
(jQuery);