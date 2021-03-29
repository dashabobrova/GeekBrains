'use strict';

// 1 задание
alert('Задание 1:\n1)В префиксной форме прибавление 1 производится сразу, а возврат — уже с обновленным значением. 1+1=2.\n2)В постфиксной форме сначала происходит возвращение значения, а потом выполняется прибавление 1. 1+1=2, но выводится начальное значение 1.\n3)В предыдущих строках а получила значение 3. 2+3=5.\n4)В предыдущих строках b получила значение 1. 2+1+1=4.');

// 2 задание
alert('Задание 2:\nx=5');

// 3 задание
let a=+prompt('Задание 3:\nПожалуйста, введите произвольное значение для целочисленной переменной a');
let b=+prompt('Пожалуйста, введите произвольное значение для целочисленной переменной b');
let result;

if (a>=0 && b>=0){
    alert(result=a-b);
} else if (a<0 && b<0){
    alert(result=a*b);
} else if (a>=0 && b<0 || a<0 && b>=0){
    alert(result=a+b);
} 

// 4 задание
let _a=+prompt('Задание 4(вариант выполнения через switch):\nПожалуйста, введите число от 1 до 15');

switch(_a){
    case 1:
        console.log(_a);
        break;
    case 2:
        console.log('1 ' + _a);
        break;
    case 3:
        console.log('1 2 ' + _a);
        break;
    case 4:
        console.log('1 2 3 ' + _a);
        break;
    case 5:
        console.log('1 2 3 4 ' + _a);
        break;
    case 6:
        console.log('1 2 3 4 5 ' + _a);
        break;
    case 7:
        console.log('1 2 3 4 5 6 ' + _a);
        break;
    case 8:
        console.log('1 2 3 4 5 6 7 ' + _a);
        break;
    case 9:
        console.log('1 2 3 4 5 6 7 8 ' + _a);
        break;
    case 10:
        console.log('1 2 3 4 5 6 7 8 9 ' + _a);
        break;
    case 11:
        console.log('1 2 3 4 5 6 7 8 9 10 ' + _a);
        break;
    case 12:
        console.log('1 2 3 4 5 6 7 8 9 10 11 ' + _a);
        break;
    case 13:
        console.log('1 2 3 4 5 6 7 8 9 10 11 12 ' + _a);
        break;
    case 14:
        console.log('1 2 3 4 5 6 7 8 9 10 11 12 13 ' + _a);
        break;
    case 15:
        console.log('1 2 3 4 5 6 7 8 9 10 11 12 13 14 ' + _a);
        break;
    default:
        console.log('Пожалуйста, введите число от 1 до 15');
}


// 4 задание гораздо лучше сделать через рекурсию; не понимаю, как нормально это сделать через switch-получается очень много лишнего кода
function recursion(c) {
    if (c < 1 || c>15 || !Number.isInteger(c)) return 'Задайте целое число от 1 до 15';
    if (c === 1) return '1';
    return recursion(c - 1) + ' ' + c;
}

let x=+prompt('Задание 4(вариант выполнения через рекурсию):\nПожалуйста, введите число от 1 до 15');
alert(recursion(x));

//5 задание
let _firstPar =+prompt('Задание 5:\nПожалуйста, введите значение первого параметра');
let _secondPar =+prompt('Пожалуйста, введите значение второго параметра');

function addFunc(firstPar, secondPar) {
    return firstPar + secondPar;
}

function subFunc(firstPar, secondPar) {
    return firstPar - secondPar;
}

function multFunc(firstPar, secondPar) {
    return firstPar * secondPar;
}

function divFunc(firstPar, secondPar) {
    if (_firstPar === 0 || _secondPar === 0) return 'На ноль делить нельзя';
    return firstPar / secondPar;

}

let addResult = addFunc(_firstPar, _secondPar);
let subResult = subFunc(_firstPar, _secondPar);
let multResult = multFunc(_firstPar, _secondPar);
let divResult = divFunc(_firstPar, _secondPar);
alert('Результат сложения: ' + addResult + '\nРезультат вычитания: ' +subResult + '\nРезультат умножения: ' +multResult + '\nРезультат деления: ' +divResult ); 

//6 задание
var _arg1=+prompt('Задание 6:\nПожалуйста, введите первое число');
var _arg2=+prompt('Пожалуйста, введите второе число');
var _operation = prompt('Пожалуйста,введите тип операции ( + - * / )');

function mathOperation(_arg1, _arg2, _operation){
    switch(_operation){
        case '+' :
            return addFunc(_arg1, _arg2);
        case '-' :
            return subFunc(_arg1, _arg2);
        case '*' :
            return multFunc(_arg1, _arg2);
        case '/' :
            return divFunc(_arg1, _arg2);
        default:
            console.log('Неизвестная операция');
    }
}
alert(mathOperation(_arg1, _arg2, _operation));

// 7 задание
alert('Задание 7:\nnull >= 0;// true\nОбъяснение: если есть два числа, x(0) и y(null), если x не меньше y, то x больше либо равно y. Помимо этого, js конвертирует null в +0 при > и не делает этого при ==');

//8 задание 
let _val=+prompt('Задание 8:\nПожалйста, введите число');
let _pow=+prompt('Пожалйста, введите степень')

function pow(_val, _pow) {
    if (_pow == 1){
        return _val;
    } else {
        return _val * pow(_val, _pow - 1);
    }
}

alert( _val + ' в ' +  _pow +' степени = ' + pow(_val, _pow) );

