var contentFromStaticFunction = function(){return parseData(randomCheckoutData())};

var CheckoutPopup = new window.moyoNS.components.Popup({
    contentStatic: '#popUpStaticContent',
    // contentStatic: contentFromStaticFunction,
    classes: {
        popupBox: 'box-additional',
        popupContent: 'content-additional',
    },
    // contentAsync: true,
    // localStorage: 'checkoutPopup'
});

var CartPopup = new window.moyoNS.components.CartPopup();



$(document).on('click', '#checkoutInit', function(e){
    e.preventDefault();
    e.stopPropagation();

    // CheckoutPopup.create({
    //     content: CartPopup.ajaxEmitation,
    //     fromStorage: true
    // });

    CheckoutPopup.create();

    return false;
});




console.log('parseData(randomCheckoutData())', parseData(randomCheckoutData()));











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
            // {
            //     title: 'Название - ' + makeHash(20),
            //     length: getRandom(2, 10),
            //     price: getRandom(10000, 30000),
            //     img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
            //     href: 'java-script:void(0)',
            // },
            // {
            //     title: 'Название - ' + makeHash(20),
            //     length: getRandom(2, 10),
            //     price: getRandom(10000, 30000),
            //     img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
            //     href: 'java-script:void(0)',
            // },
            // {
            //     title: 'Название - ' + makeHash(20),
            //     length: getRandom(2, 10),
            //     price: getRandom(10000, 30000),
            //     img: 'https://img1.moyo.ua/img/products/3974/14_200x_1511173600.jpg',
            //     href: 'java-script:void(0)',
            // },
        ]
    };

    return data;
}

function parseData(data) {
    var productsInfoMarkup = '';
    data.products.forEach(function (el, i) {
        productsInfoMarkup += '<h2>' + el.title + '</h2><h2>' + el.length + '</h2><h2>' + el.price + '</h2><h2>' + el.img + '</h2><h2>' + el.href + '</h2></br>';
    });

    // console.log('productsInfoMarkup', productsInfoMarkup);

    return productsInfoMarkup;
}