document.querySelector('.class-1').addEventListener('click', () => {
    document.getElementById('output').style.backgroundColor = 'black';
    document.getElementById('output').style.color = 'white';
})

document.querySelector('.class-2').addEventListener('click', () => {
    document.getElementById('output').classList.add('row');
})

document.querySelector('.class-3').addEventListener('click', () => {
    document.querySelector('#output').classList.remove('row');
})

document.querySelector('.class-4').addEventListener('click', () => {
    document.querySelector('#output').classList.toggle('row');
})


// document.querySelector('.question').addEventListener('click', (event) => {
//     console.log(event.target);
// })

var allQuestions = document.querySelectorAll('.question');

allQuestions.forEach((data, index) => {
    data.addEventListener('click', (event) => {
        data.children[1].classList.toggle('hidden')

        if(data.children[0].children[1].innerText.trim() == '+'){
            data.children[0].children[1].innerText = '-';
        } else {
            data.children[0].children[1].innerText = '+';
        }

        // console.log()

    })
})



