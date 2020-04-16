var app = new Vue({
    el: '#app',
    data: {
        product: 'Froggy Chair',
        description: 'A green chair smiling right at you!',
        image: 'imgs/froggy-chair.png',
        url: 'https://animalcrossing.fandom.com/wiki/Froggy_set',
        inStock: true,
        onSale: true,
        details: ["100% balsa wood", "Sturdy", "Natural green coloring"],

        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: ""
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: ""
            }
        ],
        cart: 0,
    },
    methods: {
        addToCart: function() {
            this.cart += 1 //references cart property in data above
        }
    }
})