'use strict';

// 1 ЗАДАНИЕ (выделение ед,дес,сот и преобразование в объект)
function numbPerObj(enterNumb){
    //проверить,является ли числом!
    if (enterNumb < 0 && enterNumb > 999 || !Number.isInteger(enterNumb) ) {
        return {} ;//пустой объект
    } else {
        const units = Math.floor(enterNumb % 10); //вычиляет ед
        const tens = Math.floor(enterNumb / 10 % 10); //вычиляет дес
        const hundrets= Math.floor(enterNumb / 100 % 10); //вычиляет сот
            return { //возвращает ед, дес, сот в форме объекта
                единицы: units,
                десятки: tens,
                сотни: hundrets,
            } 
    }
}

const enterNumb = +prompt('Введите число от 0 до 999');
const obj = numbPerObj(enterNumb); //присваиваем переменной результат функции
console.log (obj); 


// 2 ЗАДАНИЕ (Корзина на ООП)
const objBasket = {
    goods : [ //массив объектов корзины
        {
            name: 'apple',
            price: 10,
            count: 3,
        },

        {
            name: 'banana',
            price: 20,
            count: 2,
        },

        {
        name: 'tomato',
        price: 30,
        count: 1,
        },
    ],

    countBasketPrice() {
        // (то же самое, что:)
        // return this.goods.reduce( function(totalAmount, basketItem) {
        // return totalAmount + basketItem.price * basketItem.count}, 0);
        return this.goods.reduce((totalAmount, basketItem) => totalAmount + basketItem.price * basketItem.count, 0);
    },
};

console.log ('Сумма товаров в корзине = ' + objBasket.countBasketPrice() + ' рублей'); 
//можно написать objBasket.countBasketPrice(objBasket), но этолишнее, 
//т.к. функция внутри объекта - лучше objBasket.countBasketPrice()


// 3 ЗАДАНИЕ
// Думаю, что принцип создания корзины и каталога почти одинков. Поэтому им нужнобудет дать класс и по нему уже работать