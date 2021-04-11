'use strict';

// ЗАДАНИЕ 1 (шахматная доска)
function drawChess(){
    let mainBlock = document.querySelector('.main-block');
    let block;
    let flag =true;


    for (let i = 0; i<4; i++){ //наполняем main-block элементами (квадратиками)
        for (let k = 0; k<8; k++){ //для управления цветами
            if (k==0) flag = !flag; //чтобы новая строка начиналась сдругого цвета - получается шашка

            block = document.createElement('div'); //В HTML-документах создаёт элемент c тем тегом, что указан в аргументе
            
            if(flag){ 
                block.className = 'block blue'
            } else {
                block.className = 'block white-pink'
            };

            // if (figure[i]!==undefined && figure[i][j]!==undefined){
            //     block.style.backgroundT = 'url(сhess_symbols_set_.png)';
            //     block.style.backgroundPosition = figure[i][j];
            // }

            mainBlock.appendChild(block); //добавляет узел в конец списка дочерних элементов указанного родительского узла
            flag = !flag; //чередование цветов (получаются полоски)
        }
    }
}

drawChess();


//ЗАДАНИЕ 3 (сделать генерацию корзины динамической: вид каталога генерируется JS$ в HTML - div)
const goods = [
    {
        product_name: 'Яблоко',
        price: 10,
        count: 3,
    },

    {
        product_name: 'Банан',
        price: 20,
        count: 2,
    },

    {
        product_name: 'Сеньёр - Помидор',
        price: 30,
        count: 1,
    }
    
];

const goodsBlock = document.querySelector('.goods-list'); //возвращает первый элемент документа, который соответствует указанному селектору
let HTMLString = ''; 

const goodsSum = document.querySelector('.goods-sum'); 
let HTMLStringResult = '';
let sum = goods.reduce((totalAmount, basketItem) => totalAmount + basketItem.price * basketItem.count, 0) ;
// до цикла

// цикл
goods.forEach((good) => {  //наполняем HTMLString данными и перебираем их
    HTMLString += `<div class=".class">  
                        <div>${'<b>Название: </b>' + good.product_name}</div>
                        <div>${'<b>Цена: </b>' + good.price + ' рублей'}</div>
                        <div>${'<b>Количество: </b>' + good.count + ' штук(и)'}</div>
                        <br>
                    </div>`
});

console.log(HTMLString);
goodsBlock.innerHTML = HTMLString; // после цикла

if (goods.length == 0) {
    HTMLStringResult = `<div class= ".sum">
                            <div><b><i>${'Корзина пуста' }</i></b></div>
                        </div>`
} else {
    HTMLStringResult = `<div class= ".sum">
                            <div><b><i>${'В корзине: ' + goods.length + ' товаров(а) на сумму ' + sum + ' рублей' }</i></b></div>
                        </div>`
};

console.log(HTMLStringResult);
goodsSum.innerHTML = HTMLStringResult; // после цикла


//ЗАДАНИЕ 4 (вид каталога генерируется JS; в HTML - div id='catalog'
const goods = [
    {
        id: '001',
        product_name: 'Яблоко',
        price: 10,
        diskriptions : 'diskriptions diskriptions diskriptions diskriptions diskriptions',
        sklad: 'no',
    },

    {
        id: '002',
        product_name: 'Банан',
        price: 20,
        diskriptions : 'diskriptions diskriptions diskriptions diskriptions diskriptions',
        sklad: 'yes',
    },

    {
        id: '003',
        product_name: 'Сеньёр - Помидор',
        price: 30,
        diskriptions : 'diskriptions diskriptions diskriptions diskriptions diskriptions',
        sklad: 'no',
    }
    
];

const goodsBlock = document.getElementById('catalog'); //возвращает первый элемент документа, который соответствует указанному селектору
let HTMLString = ''; 

goods.forEach((good) => {  //наполняем HTMLString данными и перебираем их
    HTMLString += `<div class=".class">  
                        <div>${'<b>id: </b>' + good.id}</div>
                        <div>${'<b>Название: </b>' + good.product_name}</div>
                        <div>${'<b>Цена: </b>' + good.price + ' рублей'}</div>
                        <div>${'<b>Описание: </b>' + good.diskriptions}</div>
                        <div>${'<b>Наличие на складе: </b>' + good.sklad}</div>
                        </br>
                    </div>`
});

console.log(HTMLString);
goodsBlock.innerHTML = HTMLString;