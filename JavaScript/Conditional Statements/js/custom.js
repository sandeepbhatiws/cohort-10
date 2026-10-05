
// function checkEvenNumber(){
//     var number = prompt('Enter the any value');

//     for(var i = 1; i <= number; i++){
//         if(i % 2 != 0){
//             console.log(i)
//         }
//     }
// }


function checkEvenNumber(){
    var number = prompt('Enter the any value');
    var totalEvenNumber = 0;
    var totalOddNumber = 0;

    for(var i = 1; i <= number; i++){
        if(i % 2 == 0){
            totalEvenNumber += i;   // totalEvenNumber = totalEvenNumber + i
        } else {
            totalOddNumber += i;
        }
    }


    console.log('Even Number - '+ totalEvenNumber)

    console.log('Odd Number - ', totalOddNumber)
}

function getTable(){

    for(var i = 1; i <= 30; i++){
        if(i % 3 == 0){
            console.log(i)
        }
    }
}

function checkPrimeNumber(){
    var number = prompt('Enter any number')
    var status = 1;

    for(var i = 2; i <= number; i++){
        if(number % i == 0){
            console.log(i)
            status = 0;
            break;
        }
    }

    if(status == 1){
        console.log('Prime Number')
    } else {
        console.log('Not a Prime Number')
    }
}


function checkPerfectNumber(){
    var number = prompt('Enter the number');
    var sum = 0;

    for(var i = 1; i < number; i++){
        if(number % i == 0){
            sum += i;
        }
    }


    if(number == sum){
        console.log('Perfect Number')
    } else {
        console.log('Not a Perfect Number')   
    }
}


function nestedLoop(){
    var number = prompt('Enter any number')

    for(var i = 1; i <= number; i++){
        
        for(var j = 1; j <= 10; j++){
            console.log(i*j)
        }
        console.log('--------------------------------')

    }
}