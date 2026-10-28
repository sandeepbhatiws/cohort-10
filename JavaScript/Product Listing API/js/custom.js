
const productDisplay = (products, page) => {
   
    var productData = '';

    products.forEach((v, i) => {
        productData += `<article class="product-card group">
                <div class="image-frame relative rounded-xl bg-gray-100">
                    <img class="product-image h-72 w-full object-cover sm:h-80" src="${ v.thumbnail }" alt="${ v.title }">
                    <span class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold">${ v.category }</span>
                    <a href="#" aria-label="View the Sol ceramic vase" class="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow transition hover:accent-bg hover:text-white">+</a>
                </div>
                <div class="flex items-start justify-between pt-4">
                    <div><h3 class="font-semibold">${ v.title }</h3><p class="mt-1 text-sm text-gray-500">${ v.description }</p></div>
                    <p class="font-semibold">Rs.${ v.price }</p>
                </div>
                <div class="mt-3 flex items-center"><span class="text-sm tracking-widest text-yellow-600">★★★★★</span><span class="ml-2 text-xs text-gray-400">(38)</span></div>
            </article>`;
    })

    if(page == 1){
        document.getElementById('products').innerHTML = productData;
    }

    if(page == 2){
        document.getElementById('all-products').innerHTML = productData;   
    }
}


const getProducts = async() => {
    var getData = await fetch('https://dummyjson.com/products?limit=8');
    var getData = await getData.json();
    productDisplay(getData.products, 1)
}

getProducts()


const getAllProducts = async() => {
    var getData = await fetch('https://dummyjson.com/products?limit=40&skip=40');
    var getData = await getData.json();
    productDisplay(getData.products, 2)
}

getAllProducts()