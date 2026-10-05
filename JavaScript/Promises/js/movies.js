const movieData3 = async () => {
    try {
        var data = await fetch('https://dummyjson.com/products?limit=15');
        var data = await data.json();
        var totalPages = Math.ceil(data.total / data.limit);

        displayMovies(data.products, totalPages, 1);
    } catch (error) {
        console.log(error)
    }
}


const displayMovies = (movies, totalPages, currentPage) => {
    var movieData = '';
    movies.forEach((v, i) => {
        movieData += `
            <div
                class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-3">
                <div class="relative overflow-hidden">
                    <img src="${ v.thumbnail }"
                        class="w-full h-72 object-cover group-hover:scale-110 transition duration-700">
                    <span class="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                        -${ v.discountPercentage }%
                    </span>
                </div>

                <div class="p-6">

                    <h3 class="font-bold text-xl mb-2">
                        ${ v.title }
                    </h3>

                    <p class="text-gray-500 text-sm mb-4">
                        ${v.description}
                    </p>

                    <div class="flex items-center justify-between mb-5">

                        <div>

                            <span class="text-2xl font-bold text-indigo-600">$${v.price}</span>

                            <span class="line-through text-gray-400">$180</span>

                        </div>

                        <span class="text-yellow-500">
                            ★★★★★
                        </span>

                    </div>

                    <button
                        class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition">
                        Add to Cart
                    </button>

                </div>

            </div>
        `
    })
    
    document.getElementById('all_movies').innerHTML = movieData;

    pagination(totalPages, currentPage);
}

const pagination = (totalPages,currentPage) => {
    var pagination = `<div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
        <div class="flex flex-1 justify-between sm:hidden">
            <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
            <div>
            <nav aria-label="Pagination" class="isolate inline-flex -space-x-px rounded-md shadow-xs">
                <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="sr-only">Previous</span>
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                    <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                </a>`;

                for(var i = 1; i <= totalPages; i++){
                    if(currentPage == i){
                        pagination += `<a aria-current="page" class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 all_pagination">${ i }</a>`
                    } else {
                        pagination += `<a class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 cursor-pointer focus:z-20 focus:outline-offset-0 all_pagination">${ i }</a>`
                    }   
                }
                
                pagination += `<span class="sr-only">Next</span>
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                    <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                </a>
            </nav>
            </div>
        </div>
        </div>`

    document.getElementById('pagination').innerHTML = pagination;


    var allPagination = document.querySelectorAll('.all_pagination');

    allPagination.forEach((v,i) => {
        v.addEventListener('click', async(event) => {

            limit = 15;
            skip = 0;
            page = event.target.innerText;

            skip = (page - 1) * limit;

            var data = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            var data = await data.json();
            var totalPages = Math.ceil(data.total / data.limit);

            displayMovies(data.products, totalPages, page);

        })
    })
}

movieData3();




