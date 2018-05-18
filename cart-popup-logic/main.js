window.siteBaseUrl = '';

var CheckoutPopup = new window.moyoNS.components.Popup({
    // async: true,
    localStorage: 'checkoutPopup',
    classes: {
        popupBox: 'popup-checkout__box',
        popupContent: 'popup-checkout__content',
    },
});

var CheckoutPopupStatic = new window.moyoNS.components.Popup({
    localStorage: 'checkoutPopup',
    classes: {
        popupBox: 'popup-checkout__box',
        popupContent: 'popup-checkout__content',
    },
});

var Cart = new window.moyoNS.components.Cart();


function checkoutTitleDots() {
    $('.popup-checkout__title').dotdotdot({
        ellipsis: '... ',
        wrap: 'letter',
        watch: true,
    })
}

function showCartPopup(caching) {
    CheckoutPopup.create({
        content: Cart.getCartData,
        parseStorage: Cart.parseData,
        fromStorage: caching
    });
    checkoutTitleDots()
}

CheckoutPopup.create({
    content: $('#popUpStaticContent'),
});

checkoutTitleDots();

$(document).on('click', '.one', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // showCartPopup(false);


    CheckoutPopup.create({
        content: $('#popUpStaticContent'),
    });
    checkoutTitleDots();
    return false;
});


$(document).on('click', '.two', function (e) {
    e.preventDefault();
    e.stopPropagation();

    showCartPopup(true);

    return false;
});

var observer = new window.moyoNS.components.Observer();


function randomCheckoutData() {
    return {
        priceTotal: '100500',
        products: [
            {
                id: 333,
                title: 'Ноутбук ACER Swift 3 SF314-52 (NX.GNUEU.021)',
                sub: 'Готов к выдаче через 20 мин',
                count: 3,
                price: 34999,
                img: 'https://img1.moyo.ua/img/products/3945/73_96x_1509958170.jpg',
                href: 'java-script:void(0)',
            },
            {
                id: 555,
                title: 'Ноутбук ACER Swift 3 SF314-52 (NX.GNUEU.021)',
                sub: 'Готов к выдаче через 20 мин',
                count: 5,
                price: 54999,
                img: 'https://img1.moyo.ua/img/products/3945/73_96x_1509958170.jpg',
                href: 'java-script:void(0)',
            },
            {
                id: 777,
                title: 'Ноутбук ACER Swift 3 SF314-52 (NX.GNUEU.021)',
                sub: 'Готов к выдаче через 20 мин',
                count: 8,
                price: 74999,
                img: 'https://img1.moyo.ua/img/products/3945/73_96x_1509958170.jpg',
                href: 'java-script:void(0)',
            },
        ]
    };
}

// function randomCheckoutData() {
//     var makeHash = function (length) {
//         var text = "";
//         var possible = "ABCDEFGHIJ KLMNOPQRSTUVWX YZabcdefghijk lmnopqrstuvw xyz0123456789";
//         for (var i = 0; i < length; i++)
//             text += possible.charAt(Math.floor(Math.random() * possible.length));
//         return text;
//     };
//
//     var getRandom = function (min, max) {
//         return parseInt(Math.random() * (max - min) + min);
//     };
//
//     var data = {
//         priceTotal: '100 500грн',
//         products: [
//             {
//                 title: 'Название - ' + makeHash(20),
//                 length: getRandom(2, 10),
//                 price: getRandom(10000, 30000),
//                 img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
//                 href: 'java-script:void(0)',
//             },
//             {
//                 title: 'Название - ' + makeHash(20),
//                 length: getRandom(2, 10),
//                 price: getRandom(10000, 30000),
//                 img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
//                 href: 'java-script:void(0)',
//             },
//             {
//                 title: 'Название - ' + makeHash(20),
//                 length: getRandom(2, 10),
//                 price: getRandom(10000, 30000),
//                 img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
//                 href: 'java-script:void(0)',
//             },
//             {
//                 title: 'Название - ' + makeHash(20),
//                 length: getRandom(2, 10),
//                 price: getRandom(10000, 30000),
//                 img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
//                 href: 'java-script:void(0)',
//             },
//             {
//                 title: 'Название - ' + makeHash(20),
//                 length: getRandom(2, 10),
//                 price: getRandom(10000, 30000),
//                 img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
//                 href: 'java-script:void(0)',
//             },
//         ]
//     };
//
//     return data;
// }

// function parseData(data) {
//     var productsInfoMarkup = '';
//     data.products.forEach(function (el, i) {
//         productsInfoMarkup += '<h2>' + el.title + '</h2><h2>' + el.length + '</h2><h2>' + el.price + '</h2><h2>' + el.img + '</h2><h2>' + el.href + '</h2></br>';
//     });
//     return productsInfoMarkup;
// }

function trueData() {
    return JSON.parse('{"cartTotalCount":12,"cartTotlaPrice":264096,"productsText":"товаров","productsTextPrefix":"на","productsTextSuffix":"грн","productsTextCount":"Кол-во","products_dump":[{"id":"3438605","basket_id":"301d1ad5f583d4995f7026a7f5208d92","triggmine_cart_id":"","product_id":"377714","quantity":"6.00","add_date":"2018-05-10 12:50:08","bank_id":null,"credit_program_type_id_old":null,"credit_program_id_old":null,"credit_program_id":null,"credit_proposition_id":null,"credit_number_months":null,"user_id":null,"cookie_id":"f528764d624db129b32c21fbca0cb8d6","products_relation_id":null,"xrm_coupon_amount":null,"xrm_coupon_type":null,"xrm_coupon_name":null},{"id":"3438606","basket_id":"301d1ad5f583d4995f7026a7f5208d92","triggmine_cart_id":"","product_id":"397414","quantity":"1.00","add_date":"2018-05-10 18:03:08","bank_id":null,"credit_program_type_id_old":null,"credit_program_id_old":null,"credit_program_id":null,"credit_proposition_id":null,"credit_number_months":null,"user_id":null,"cookie_id":"f528764d624db129b32c21fbca0cb8d6","products_relation_id":null,"xrm_coupon_amount":null,"xrm_coupon_type":null,"xrm_coupon_name":null},{"id":"3438607","basket_id":"301d1ad5f583d4995f7026a7f5208d92","triggmine_cart_id":"","product_id":"346896","quantity":"1.00","add_date":"2018-05-10 18:03:37","bank_id":null,"credit_program_type_id_old":null,"credit_program_id_old":null,"credit_program_id":null,"credit_proposition_id":null,"credit_number_months":null,"user_id":null,"cookie_id":"f528764d624db129b32c21fbca0cb8d6","products_relation_id":null,"xrm_coupon_amount":null,"xrm_coupon_type":null,"xrm_coupon_name":null},{"id":"3438608","basket_id":"301d1ad5f583d4995f7026a7f5208d92","triggmine_cart_id":"","product_id":"303598","quantity":"1.00","add_date":"2018-05-10 18:05:13","bank_id":null,"credit_program_type_id_old":null,"credit_program_id_old":null,"credit_program_id":null,"credit_proposition_id":null,"credit_number_months":null,"user_id":null,"cookie_id":"f528764d624db129b32c21fbca0cb8d6","products_relation_id":null,"xrm_coupon_amount":null,"xrm_coupon_type":null,"xrm_coupon_name":null},{"id":"3438609","basket_id":"301d1ad5f583d4995f7026a7f5208d92","triggmine_cart_id":"","product_id":"288982","quantity":"1.00","add_date":"2018-05-10 18:05:15","bank_id":null,"credit_program_type_id_old":null,"credit_program_id_old":null,"credit_program_id":null,"credit_proposition_id":null,"credit_number_months":null,"user_id":null,"cookie_id":"f528764d624db129b32c21fbca0cb8d6","products_relation_id":null,"xrm_coupon_amount":null,"xrm_coupon_type":null,"xrm_coupon_name":null},{"id":"3438610","basket_id":"301d1ad5f583d4995f7026a7f5208d92","triggmine_cart_id":"","product_id":"279930","quantity":"1.00","add_date":"2018-05-10 18:05:16","bank_id":null,"credit_program_type_id_old":null,"credit_program_id_old":null,"credit_program_id":null,"credit_proposition_id":null,"credit_number_months":null,"user_id":null,"cookie_id":"f528764d624db129b32c21fbca0cb8d6","products_relation_id":null,"xrm_coupon_amount":null,"xrm_coupon_type":null,"xrm_coupon_name":null},{"id":"3438611","basket_id":"301d1ad5f583d4995f7026a7f5208d92","triggmine_cart_id":"","product_id":"382895","quantity":"1.00","add_date":"2018-05-10 18:05:18","bank_id":null,"credit_program_type_id_old":null,"credit_program_id_old":null,"credit_program_id":null,"credit_proposition_id":null,"credit_number_months":null,"user_id":null,"cookie_id":"f528764d624db129b32c21fbca0cb8d6","products_relation_id":null,"xrm_coupon_amount":null,"xrm_coupon_type":null,"xrm_coupon_name":null}],"products":[{"id":"3438605","product_id":"377714","img":"/images/default/moyo_174x174.png","href":"/noutbuk_lenovo_ideapad_710s_p-13ikb_80w3004gra/377714.html","title":"Ноутбук LENOVO IdeaPad 710S P-13IKB (80W3004GRA)","count":"6","price":"27257"},{"id":"3438606","product_id":"397414","img":"/images/default/moyo_174x174.png","href":"/igrovaya_pristavka_sony_playstation_4_slim_500_gb_black_hzd_gow3_uc4_psplus_3m/397414.html","title":"Игровая приставка SONY PlayStation 4 Slim 500 Gb Black HZD+GOW3+UC4+PSPlus 3М","count":"1","price":"10999"},{"id":"3438607","product_id":"346896","img":"/images/default/moyo_174x174.png","href":"/televizor_samsung_55mu6450_ue55mu6450uxua/346896.html","title":"Телевизор SAMSUNG 55MU6450 (UE55MU6450UXUA)","count":"1","price":"39899"},{"id":"3438608","product_id":"303598","img":"/images/default/moyo_174x174.png","href":"/magnitola_philips_az318b/303598.html","title":"Магнитола Philips AZ318B","count":"1","price":"1499"},{"id":"3438609","product_id":"288982","img":"/images/default/moyo_174x174.png","href":"/noutbuk_hp_15-ay044ur_x5b97ea/288982.html","title":"Ноутбук HP 15-ay044ur (X5B97EA)","count":"1","price":"8859"},{"id":"3438610","product_id":"279930","img":"/images/default/moyo_174x174.png","href":"/audiosistema_lg_fh6/279930.html","title":"Аудиосистема LG FH6","count":"1","price":"11299"},{"id":"3438611","product_id":"382895","img":"/images/default/moyo_174x174.png","href":"/apple_iphone_8_plus_64gb_space_grey/382895.html","title":"Apple iPhone 8 Plus 64GB (Space Grey)","count":"1","price":"27999"}]}');
}