
// var output = document.getElementById('row3');
// console.log(output.innerText)

// var output = document.getElementsByClassName('content');
// console.log(output[2].innerText)

var output = document.getElementsByTagName('div');
// console.log(output[0].innerHTML)

document.getElementById('output').innerText = output[0].innerHTML;
document.getElementById('output').innerHTML = output[1].innerHTML;


var output = document.querySelector('#row');
var output = document.querySelector('.content');
var output = document.querySelector('div');

var output = document.querySelectorAll('#row');
var output = document.querySelectorAll('.content');
var output = document.querySelectorAll('div');

// console.log(output);

var image = document.getElementById('image1').src;
document.getElementById('image2').src = 'images/category_2.jpg';

// console.log(image)


document.getElementById('username').value = 'Sandeep Bhati';

var name = document.getElementById('username').value;
console.log(name)


document.getElementById('row').style.backgroundColor = 'red';
document.getElementById('row').style.textAlign = 'center';