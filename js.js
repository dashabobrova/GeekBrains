"use strict";

// console.log(add(a)(b)...(n))
const _sum2 = (a, b) => a + b; // 1 функция для каррирования
const _sum5 = (p, q, r, s, w) => p + q + r + s + w; // 2 функция для каррирования

function curry(karFunc) {
    const N = karFunc.length; //арность функции karFunc сохраняем в переменную N
    function innerFn(n, args) { //отслеживает переменную N
        return function actualInnerFn(a) {
            if(n <= 1) { //Является ли вызов последним?
                return karFunc(...args, a); // ДА=> возвращает последний аргумент
            }
                return innerFn(n - 1, [...args, a]); //НЕТ => 
                //накопительный массив (аргументы, передаваемые каррированной ф-и)
                //затем вызывает начальную функцию innerFn
                // (n - 1) - сокращаем кол-воаргументов на 1
        }
    }

    return innerFn(N, []) //возвращает массив с полученными значениями
}

const sum2 = curry(_sum2);
const sum5 = curry(_sum5);

console.log(sum2(1)(2));
console.log(sum5(1)(2)(3)(4)(5)); 


//console.log(add(a)(b)...(n)())
const infiniteCurry = fn => {
    const next = (...args) => {
        return x => {
            if (!x) { // можо ли передавать аргументы?
                return args.reduce((acc, a) => { return fn.call(fn, acc, a) }, 0); 
                // call принимает список аргументов;  вызывает функцию с this и предоставленными аргументами
                // перебираем все накопленные значения и пошагово вызваем операции с ними, сохранив их в переменной accumulator (асс)
            }
                return next(...args, x); //возвращаем последний 
        };
    };
    
    return next();
};

const iSum = infiniteCurry((x, y) => x + y); // операция определения функции для каррирования
console.log(iSum(1)(2)(3)(4)(5)(6)(7)());