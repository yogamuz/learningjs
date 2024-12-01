export function getProduct(productId) {
    let matchingProduct;
    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
    return matchingProduct;
}

class Product {
    id;
    name;
    image;
    rating;
    priceCents;
    keywords;

    constructor(productDetails) {
        this.id = productDetails.id
        this.name = productDetails.name
        this.image = productDetails.image;
        this.rating = productDetails.rating;
        this.priceCents = productDetails.priceCents;
        this.keywords = productDetails.keywords
    }
    getStarsUrl() {
        return `/img/rating-${this.rating.stars * 10}.png`
    }

    getPrice() {
        return `${(this.priceCents / 100).toFixed(2)}`
    }
    extraInfoHTML() {
        return '';
    }
}

// Class Clothing extends class Product, ini adalah inheritance.
class Clothing extends Product {
    sizeChartLink;

    constructor(productDetails) {
        super(productDetails);  // Memanggil constructor dari class Product.
        this.sizeChartLink = productDetails.sizeChartLink;
    }

    // Overriding method dari class Product, ini adalah polymorphism.
    extraInfoHTML() {
        return `
        <a href="${this.sizeChartLink}" target="_blank">
        Size Chart
        </a>
        `;
    }
}

// export let products = [];

// export function loadProducts(fun) {
//     const xhr = new XMLHttpRequest();
//     xhr.addEventListener('load', () => {
//         products = JSON.parse(xhr.response).map((productDetails) => {
//             if (productDetails.type === 'clothing') 666yyyyy666666{
//                 return new Clothing(productDetails)
//             } if (productDetails.type === 'non-clothing') {
//                 return new Clothing(productDetails)
//             } else {
//                 return new Product(productDetails)
//             }
//         })
//         console.log(products)
//         fun()
//     })
//     xhr.open('GET', 'https://supersimplebackend.dev/products')
//     xhr.send()
// }
// loadProducts()



export const products = [
    {
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        image: `<img class="js-product-img product-image" src="/img/socks.jpg" alt="">`,

        rating: {
            stars: 4.5,
            count: 87,
        },
        priceCents: 1090,
        keywords: [
            "socks",
            "apparel",
            "sports"
        ],


    }, {
        id: 'f2b3a9de-7ba1-4a72-a18f-d3c19fe482b7',
        name: 'Plain Hooded Fleece Sweatshirt',
        image: '<img class="js-product-image product-image" src="/img/yellow-hoodie.jpg" alt="">',

        rating: {
            stars: 5,
            count: 317
        },
        priceCents: 2400,
        keywords: [
            "hoodie",
            "jacket",
            "yellow hoodie"
        ],


    }, {
        id: 'd53729fa-9b34-41a7-9e7d-b2a18fb362cd',
        name: 'Luxury Towel Set - Graphite Gray',
        image: '<img class="js-product-image product-image" src="/img/luxury-toweljpg.jpg" alt="">',

        rating: {
            stars: 4.5,
            count: 144,
        },
        priceCents: 3095,
        keywords: [
            "towel"
        ],

    }, {
        id: 'a6f8290b-5c10-4f62-b14e-f7d29ce381fd',
        name: 'Adults Plain Cotton T - Shirt - 2 Pack',
        image: '<img class="js-product-image product-image" src="/img/adults-cottonl.jpg" alt="">',

        rating: {
            stars: 4,
            count: 56
        },
        priceCents: 799,
        keywords: [
            "shirts",
            "adult",
            "cotton",
            "t shirt"
        ],
        type: 'clothing',
        sizeChartLink: 'img/clothing-size-chart.png'


    }, {
        id: 'b437c8da-8ea2-4c47-b29d-a2e58ac472ef',
        name: 'Intermediate Size Basketball',
        image: '<img class="js-product-image product-image" src="/img/basketball.jpg" alt="">',

        rating: {
            stars: 4,
            count: 127,
        },

        priceCents: 2095,
        keywords: [
            "glasses",
            "sunglasses",
            "glass"
        ],
        type: 'non-clothing',
        sizeChartLink: 'https://www.youtube.com/'


    }, {
        id: 'c12d47ab-3e9b-47f2-a63e-d5f17be394dc',
        name: 'Round Sunglasses',
        image: '<img class="js-product-image product-image" src="/img/sunglasses.jpg" alt="">',

        rating: {
            stars: 4,
            count: 219
        },

        priceCents: 2010,
        keywords: [
            "glasses",
            "sunglasses",
            "glass"
        ],


    }].map((productDetails) => {
        if (productDetails.type === 'clothing') {
            return new Clothing(productDetails)
        } if (productDetails.type === 'non-clothing') {
            return new Clothing(productDetails)
        } else {
            return new Product(productDetails)
        }
    }); 