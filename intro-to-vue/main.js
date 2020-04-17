Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
            <div class="product">

                <div class="product-image">
                    <img v-bind:src="image">
                </div>

                <div class="product-info">
                    <h1>{{ title }}</h1>

                    <p v-if="onSale">On Sale!</p>
                    <p v-if="onSale">{{ brandedString }}</p>

                    <p v-if="inStock">In Stock</p>
                    <p :class="{ outOfStock: !inStock }" v-else>Out of Stock</p>
                    <p>Shipping: {{ shipping }} </p>

                    <ul>
                        <!-- Loops over every element in 'details' array with 'detail' iterator -->
                        <li v-for="detail in details">{{ detail }}</li>
                    </ul>

                    <p>{{ description }}</p>

                    <div v-for="(variant, index) in variants"
                         :key="variant.variantId"
                         class="color-box"
                         :style="{ backgroundColor: variant.variantColor }"
                         @mouseover="updateProduct(index)">
                    </div>

                    <!-- Example of event handling using v-on with an event handler "click" -->
                    <button v-on:click="addToCart"
                     :disabled="!inStock"
                     :class="{ disabledButton: !inStock }">Add to Cart</button>
                    <button @click="removeFromCart">Remove from Cart</button>

                    <div>
                        <h2>Reviews</h2>
                        <p v-if="!reviews.length">There are no reviews yet.</p>
                        <ul>
                            <li v-for="review in reviews">
                                <p>{{ review.name }}</p>
                                <p>Rating: {{ review.rating }}</p>
                                <p>{{ review.review }}</p>
                            </li>
                        </ul>
                    </div>

                    <product-review @review-submitted="addReview"></product-review>

                    <p><a v-bind:href="url">More about the froggy furniture set from Nintendo's <em>Animal Crossing</em></a></p>
                </div>

            </div>
    `,
    data() {
        return {
            brand: 'Animal Crossing',
            product: 'Froggy Chair',
            description: 'A green chair smiling right at you!',
            selectedVariant: 0,
            url: 'https://animalcrossing.fandom.com/wiki/Froggy_set',
            onSale: true,
            details: ["100% balsa wood", "Sturdy", "Natural green coloring"],
    
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: 'imgs/froggy-chair.png',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "pink",
                    variantImage: 'imgs/pink-froggy-chair.png',
                    VariantQuantity: 0
                }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index //updates image property to variant that was hovered on
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() { // boolean value
            return this.variants[this.selectedVariant].variantQuantity
        },
        brandedString() {
            return 'Get the ' + this.brand + ' ' + this.product +' while it\'s on sale!'
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return '$' + 2.99
        }
    }
})

Vue.component('product-details', {
    props: {
        details: {
            type: String
        }
    }
})

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name">
            </p>
            
            <p>
                <label for="review">Review:</label>      
                <textarea id="review" v-model="review" required></textarea>
            </p>
            
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
                
            <p>
                <input type="submit" value="Submit">  
            </p>    
    
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null
        }
    },
    methods: {
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        takeFromCart(id) {
            let index = this.cart.indexOf(id);
            this.cart.splice(index, 1);
        }
    }
})