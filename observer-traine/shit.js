// var contentFromStaticFunction = function(){return parseData(randomCheckoutData())};

var CheckoutPopup = new window.moyoNS.components.Popup({
    // contentStatic: '#popUpStaticContent',
    contentAsync: true,
    // contentStatic: contentFromStaticFunction,
    classes: {
        popupBox: 'popup-checkout__box',
        popupContent: 'popup-checkout__content',
    },
    localStorage: 'checkoutPopup'
});

var CartPopup = new window.moyoNS.components.CartPopup();



$(document).on('click', '#checkoutInit', function(e){
    e.preventDefault();
    e.stopPropagation();

    // CheckoutPopup.create();

    CheckoutPopup.create({
        content: CartPopup.ajaxEmitation,
        fromStorage: false
    });

    return false;
});


CheckoutPopup.create({
    content: CartPopup.ajaxEmitation,
    fromStorage: false
});


// console.log('parseData(randomCheckoutData())', parseData(randomCheckoutData()));









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