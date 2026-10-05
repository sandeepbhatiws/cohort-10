function swapData() {
    text1 = document.getElementById('output1').innerText;
    text2 = document.getElementById('output2').innerText;

    document.getElementById('output1').innerText = text2;
    document.getElementById('output2').innerText = text1;
}


function showPassword() {
    type = document.getElementById('inputBox').type;

    if (type == 'password') {
        document.getElementById('inputBox').type = 'text';
        document.getElementById('inputButton').innerText = 'Hide Password';
    } else {
        document.getElementById('inputBox').type = 'password';
        document.getElementById('inputButton').innerText = 'Show Password';
    }
}

function changeImage1() {
    var getImage = document.querySelector('#image1').src;
    document.querySelector('#mainImage').src = getImage;
}

function changeImage2() {
    var getImage = document.querySelector('#image2').src;
    document.querySelector('#mainImage').src = getImage;
}

function changeImage3() {
    var getImage = document.querySelector('#image3').src;
    document.querySelector('#mainImage').src = getImage;
}

function changeImage4() {
    var getImage = document.querySelector('#image4').src;
    document.querySelector('#mainImage').src = getImage;
}

function changeImage5() {
    var getImage = document.querySelector('#image5').src;
    document.querySelector('#mainImage').src = getImage;
}


function changeImage(image) {
    document.querySelector('#mainImage').src = image;
}

function commonChangeImage(image) {
    document.querySelector('#mainImage').src = image.src;
}


// document.getElementById('image1').addEventListener('click', changeImage1());
// document.getElementById('image2').addEventListener('click', changeImage2());


const getName = (input) => {
    console.log(input.value)
}

var getData = localStorage.getItem('user_info');
var getData = JSON.parse(getData)

if(getData){
    var userRecords = getData;
} else {
    var userRecords = [];
}


const displayUsers = () => {

    var getData = '';

    userRecords.forEach((v, i) => {
        getData += `<tr>
            <td class="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">${ i+1 }</td>
            <td class="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">${ v.name }</td>
            <td class="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">${ v.email }</td>
            <td class="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">${ v.mobile_number }</td>
        </tr>`;
    })

    // userRecords.forEach((v, i) => {
    //     getData += '<tr><td class="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">'+ (i+1) +'</td><td class="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">'+ v.name +'</td><td class="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">'+ v.email +'</td><td class="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">'+ v.mobile_number +'</td></tr>';
    // 

    document.getElementById('userData').innerHTML = getData;
}

displayUsers();


// document.getElementById('user-enquiry').addEventListener('submit', (event) => {
//     event.preventDefault();

//     const userData = {
//         name : document.querySelector('#name').value,
//         email : document.querySelector('#email').value,
//         mobile_number : document.querySelector('#mobile_number').value
//     }

//     userRecords.push(userData)
//     displayUsers();

//     document.querySelector('#name').value = '';
//     document.querySelector('#email').value = '';
//     document.querySelector('#mobile_number').value = '';

//     console.log(userData)
// });

document.getElementById('user-enquiry').addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(event.target);

    const userData = {
        name : event.target.name.value,
        email : event.target.email.value,
        mobile_number : document.querySelector('#mobile_number').value
    }

    userRecords.push(userData)
    displayUsers();

    // To Convert it json into string
    var finalData = JSON.stringify(userRecords);
    localStorage.setItem('user_info', finalData);

    // document.querySelector('#user-enquiry').reset();
    event.target.reset();
});