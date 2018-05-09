var CheckoutPopup = new window.moyoNS.components.CheckOutPopup();

// var cartInnerLink = $('.cart-inner-link');

$('.cart-inner-link').removeAttr('href');
// .cart-inner-link
    $(document).on('click', '#checkoutInit', function(e){
    e.preventDefault();
    e.stopPropagation();
    CheckoutPopup.show();
    return false;
    // $('#checkoutInit').trigger('click');
});

window.buttonBuyProduct = function(){
    $(".button_buy_product:not(.credit_quick_buy)").off("click");
    $(".button_buy_product:not(.credit_quick_buy)").on("click", function (e) {
        console.log(e.currentTarget);
        var url = $(this).data("href");
        // if ($(this).hasClass('forbidden')) return false;
        // if (!$(this).hasClass('tile_button_buy'))
        //     pushDataLayer('addToCart', $('.tovar_block.tovar_block_new'));
        //
        // //add services to URL
        // if (!$(this).hasClass('credit')) {
        //     var services = '';
        //     $.each($('.addservice-list-item .checkblock.active'), function () {
        //         services = services + $(this).data('service') + '_';
        //     });
        //     if (services) {
        //         url = url + '&s=' + services;
        //     }
        //     var productsRelations = '';
        //     $.each($('.product_relation-list-item.active'), function () {
        //         productsRelations = productsRelations + (productsRelations ? '_' : '') + $(this).data('id');
        //     });
        //     if ($('#product_relation-guaranty').length && $('#product_relation-guaranty select').val() > 0) {
        //         productsRelations = productsRelations + (productsRelations ? '_' : '') + $('#product_relation-guaranty select').val();
        //     }
        //     if (productsRelations.length) {
        //         url = url + '&rp=' + productsRelations;
        //     }
        //
        // }
        //
        var toCartButton = $(this);
        if (url.length != 0) {
            if (toCartButton.hasClass('animationAddProduct') || toCartButton.hasClass('tc-anim')) {

                // if (window.isProcessedAddProductInBasket == 0) {
                //     window.isProcessedAddProductInBasket = 1;
                //     $.post(url,
                //         {},
                //         function (data) {
                //             if (data.error) {
                //                 alertPopUp("error", data.error);
                //             } else {
                //                 var countProducts = 0;
                //                 if (data.data.basket)
                //                     $('.cart_href').replaceWith(data.data.basket);
                //                 if (data.data.basketTypes) {
                //                     var basketTypes = data.data.basketTypes;
                //                 }
                //                 if (data.data.basket_summary_products) {
                //                     countProducts = data.data.basket_summary_products;
                //                     $('#titleCountProduct').html(countProducts);
                //                 }
                //                 if (data.data.basket_summary_money) {
                //                     $('#titleSumPriceProducts').html(data.data.basket_summary_money);
                //                 }
                //                 // toCartAnimate(toCartButton, countProducts);
                //                 // updateBasketProduct();
                //                 buttonBuyProduct();
                //                 initScrollPane($('.header-cart-dropdown .scrollPane'));
                //             }
                //             setTimeout(window.isProcessedAddProductInBasket = 0, 1000);
                //         }, "json"
                //     );
                // }
            } else {
                window.location.href = url;
            }
        }
        // return false;
    });

    $(".button_buy_product.credit_quick_buy").off("click");
    $(".button_buy_product.credit_quick_buy").on("click", function () {
        var id = $(this).data('id');
        var proposition = $(this).data('proposition');
        var redirect = $(this).data('href');
        $.post('/basket/addProductCredit/', {
            product_id: id,
            proposition_id: proposition
        }, function (data) {
            if (data.data) {
                location.href = redirect;
            }
        });
    });
};