var CheckoutPopup = new window.moyoNS.components.Popup({
    contentAsync: true,
    // contentStatic: '#popUpStaticContent',
    localStorage: 'checkoutPopup'
});

var CartPopup = new window.moyoNS.components.CartPopup();



$(document).on('click', '#checkoutInit', function(e){
    e.preventDefault();
    e.stopPropagation();

    CheckoutPopup.create({
        content: CartPopup.ajaxEmitation,
        fromStorage: true
    });

    // Popup.buildContent();

    return false;
});

















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