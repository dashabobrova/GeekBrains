'use strict';

// 1 задание (ПРОСТЫЕ ЧИСЛА)
const arrOfNumbers = [];

//массив чисел от 2 до 100, т.к. числа<=0 и 1 не являются простыми
for (let i = 2; i <= 100; i++) {
    if(isPrime(i)) 
    arrOfNumbers.push(i);
}

//фукция проверки числа на простоту
function isPrime(numb) {
    if (isNaN(numb)) return false; //является ли числом
    let max=Math.floor(Math.sqrt(numb)); //наибольшая целочисленная переменная в массиве
    for (let j = 2; j <= max; j++) {
        if (numb % j == 0) return false; //делится ли нацело на предыдущее число
    }
    return true;
}

console.log(arrOfNumbers);


//2 задание (КОРЗИНА)
let arrBasket = [
    ['Apple',  10, 3],
    ['Banana', 20, 2],
    ['Tomato', 30, 1],
];

console.log(arrBasket);

function countBasketPrice(arrBasket){
    return arrBasket.reduce (function(_totalAmount, _basketItem){ //reduce()-метод для вычисления единого значения на основе всего массива
        return _totalAmount + _basketItem[1] * _basketItem[2]; //0 + 10*3=30; 30+20*2=70; 70+30*1=100
    }, 0 ); //0 - сумма товаров пустой корзины = начальное значение
}

console.log('Сумма товаров в корзине = ' + countBasketPrice(arrBasket) + ' рублей');


// 3 задание (ЦИКЛ for БЕЗ ТЕЛА)
let i=0;

if(i<9){
    for (let k = 0; k <= 9; console.log(k++)) 
    {}
}


//4 задание (ПИРАМИДА)
let arrX = [];
let currentRow = 0;

while (currentRow < 20){
    currentRow++;
    arrX.push('x');
    console.log(arrX);
}





