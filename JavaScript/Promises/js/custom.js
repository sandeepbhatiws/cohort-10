const movieData = () => {
    const data = fetch('https://dummyjson.com/products');

    new Promise((accept, reject) => {
        accept(data);
    })
    .then((result) => {
        console.log(result);
        new Promise((complete) => {
            complete(result.json())
        }).then((result) => {
            console.log(result)
        })
    })
    .catch(() => {
        console.log('Promise Reject')
    });
}

movieData()

// const movieData2 = () => {
//     fetch('https://dummyjson.com/products')
//     .then((result) => {
//         result.json().then((result) => {
//             console.log(result)
//         })
//     })
//     .catch(() => {
        
//     });
// }

// const movieData3 = async () => {
//     try {
//         var data = await fetch('https://dummyjson.com/products?limit=8&skip=2');
//         var data = await data.json();
//         displayMovies(data.products);
//     } catch (error) {
//         console.log(error)
//     }
// }



// const displayMovies = (movies) => {

//     var movieData = '';

//     movies.forEach((v, i) => {
//         movieData += `
//             <div
//                 class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-3">
//                 <div class="relative overflow-hidden">
//                     <img src="${ v.thumbnail }"
//                         class="w-full h-72 object-cover group-hover:scale-110 transition duration-700">
//                     <span class="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
//                         -${ v.discountPercentage }%
//                     </span>
//                 </div>

//                 <div class="p-6">

//                     <h3 class="font-bold text-xl mb-2">
//                         ${ v.title }
//                     </h3>

//                     <p class="text-gray-500 text-sm mb-4">
//                         ${v.description}
//                     </p>

//                     <div class="flex items-center justify-between mb-5">

//                         <div>

//                             <span class="text-2xl font-bold text-indigo-600">$${v.price}</span>

//                             <span class="line-through text-gray-400">$180</span>

//                         </div>

//                         <span class="text-yellow-500">
//                             ★★★★★
//                         </span>

//                     </div>

//                     <button
//                         class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition">
//                         Add to Cart
//                     </button>

//                 </div>

//             </div>
//         `
//     })
    
//     document.getElementById('movies').innerHTML = movieData;
// }

// movieData3();