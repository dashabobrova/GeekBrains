"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },
//метод валидации (проверка адекватности настроек)
    validate() {
        const result = {
            isValid: true, //полностью валидное состоние
            errors: [], //список всех возникших ошибок
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false; //невалидное состояние
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false; //невалидное состояние
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false; //невалидное состояние
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false; //невалидное состояние
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result; //возвращает true/false и ошибки, если они есть
    },
};

//отрисовка карты
const map = {
    cells: null, //информация о пустых ячейках
    usedCells: [], //информация о занятых ячейках

    init(rowsCount, colsCount) { //инициализация карты (сколько строк и колонок)
        const table = document.getElementById('game'); //находим табличку
        table.innerHTML = ''; //очищаем табличку

        this.cells = {}; // {x1_y1: td, x1_y2: td} 
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) { //отрисовываем строки
            const tr = document.createElement('tr'); //генерируем строки
            tr.classList.add('row'); //накидываем класс
            table.appendChild(tr); //вставляем следующей

            for (let col = 0; col < colsCount; col++) { //отрисовываем колонки
                const td = document.createElement('td'); //генерируем ячеки
                td.classList.add('cell'); //накидываем класс

                this.cells[`x${col}_y${row}`] = td; //вшиваем координаты //создается объект ячеки и ссылка на нее
                tr.appendChild(td); //впихиваем в табличку
            }
        }

    },

    render(snakePointsArray, foodPoint, barrierPoint) { //массив из точек змейки //точка еды
        for (const cell of this.usedCells) { //пробегаемся по всем занятым ячекам
            cell.className = 'cell'; //очищаем их (переисываем класс)
        }

        this.usedCells = []; //обновляем занятые ячеки(они дальше меняются)

        snakePointsArray.forEach((point, idx) => { //пробегаем по точкам
            const snakeCell = this.cells[`x${point.x}_y${point.y}`]; //ключ = точки змеи = занятые точки
            snakeCell.classList.add(idx === 0 ? 'snakeHead' : 'snakeBody'); //тело или голова змеи? - тернарный оператор (idx === 0 ? 'snakeHead' : 'snakeBody')
            this.usedCells.push(snakeCell); //находимточки змеи
        });

        //размещение еды
        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`]; //размещение еды (получаем координаты)
        foodCell.classList.add('food'); //накидываем класс
        this.usedCells.push(foodCell); //добавляем в массив информацию о еде

        //размещение препятствий
        const barrierCell = this.cells[`x${barrierPoint.x}_y${barrierPoint.y}`]; //размещение препятствия
        barrierCell.classList.add('barrier'); //накидываем класс
        this.usedCells.push(barrierCell); //добавляем в массив информацию о препятствии
    }
};

//ЗМЕЯ
const snake = {
    body: [], //тело (массив)
    direction: null, //направление
    lastStepDirection: null, //предыдущее направление

    init(startBody, direction) { //инициализациязмейки (стартовое состание(посередине) и направление(вверх), в котором она двигается)
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {//данные о телезмейки
        return this.body;
    },

    getLastStepDirection() { //данные о предыдущем направлении //возможность устанавливать направление движения змейки
        return this.lastStepDirection;
    },

    isOnPoint(point) { //логика, проверяющая, не попадаем ли мы точкой на телозмеи (например, при размещении еды)
        return this.getBody().some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
        //метод some() говорит true/false взависимости от того,находи кординатуили нет (указанную в скобках)
    },

    makeStep() { //метод передвижения змейки (заставляет ее двигаться)
        this.lastStepDirection = this.direction; //получить текущее направление, актуализировать шаг
        this.body.unshift(this.getNextStepHeadPoint()); //добавляем в массив тела змейки объект в зависисмости отнаправления
            //unshift() добавляет эл-т вначало массива (голова)
        this.body.pop(); //отрубаем хвостик (.pop() - удаляет последний элемент из массива)
    },

    growUp() { //рост змейки при поглощении еды (голова сдвигается, а хвост останется(задержется на шаг))
        const lastBodyIdx = this.body.length - 1; //определяем, где находится хвостик (Idx = length - 1)
        const lastBodyPoint = this.body[lastBodyIdx]; //получаем точку, где находится хвостик
        const lastBodyPointClone = Object.assign({}, lastBodyPoint); // {...lastBodyPoint} //копируем последний жлемент

        this.body.push(lastBodyPointClone); //добавляем в конец копию хвостика
    },

    getNextStepHeadPoint() { //определяет, где будет находитьсяголова змейки
        const firstPoint = this.getBody()[0];//получаем точку головы (первый элемент массива)

        switch(this.direction) { //изменяем направление в зависимости от нажатой клавиши
            case 'up':
                return {x: firstPoint.x, y: firstPoint.y - 1};
            case 'right':
                return {x: firstPoint.x + 1, y: firstPoint.y};
            case 'down':
                return {x: firstPoint.x, y: firstPoint.y + 1};
            case 'left':
                return {x: firstPoint.x - 1, y: firstPoint.y};
        }
    },

    setDirection(direction) {
        this.direction = direction;
    },
};

const food = { //ЕДА
    x: null, //координаты
    y: null, //координаты

    getCoordinates() { //возвращение объекта с координатами
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) { //установить координаты
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) { //проверка, попадает ли мы какой-то точкой на еду? (НАПРИМЕР, вызываем, когда змея ест еду)
        return this.x === point.x && this.y === point.y;
    },
};

//БАРЬЕР (препятствтие)
const barrier = {
    x: null, //координаты
    y: null, //координаты

    getCoordinates() { //возвращение объекта с координатами
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) { //установить координаты
        this.x = point.x;
        this.y = point.y;
    },


    isOnPoint(point) { //проверка, попадает ли мы какой-то точкой на препятвтие (исп при врезании змеи)
        return this.x === point.x && this.y === point.y;
    },
};

const status = { //отображает статус и позволяет изменять
    condition: null, //конкретноезначение состояния

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = { //Сведение в целое
    config,
    map,
    snake,
    food,
    barrier,
    status,
    tickInterval: null, //tickInterval дает возможность остановить(стоп игры)

    init(userSettings = {}) { //инициализация игры
        this.config.init(userSettings); //принимаем настройки пользователя
        const validation = this.config.validate(); //валидируем (адекватные ли настройки пользователя?)

        if (!validation.isValid) { //если не валидно- выходим
            for (const err of validation.errors) {
                console.error(err);
            }
            return;
        }

        //иначе инициализируем карту
        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventHandlers();//накидываем обработку событий
        this.reset();//обнуление состояния (заново)
    },

    reset() { //обнуление состояния (игра заново)
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up'); //генерируем змейку со стратовым значением и направлением
        this.food.setCoordinates(this.getRandomFreeCoordinates()); //генерируем еду
        setInterval(() => this.barrier.setCoordinates(this.getRandomFreeCoordinates()), 5000);
        this.render();
    },

    getStartSnakeBody() { //стратовое положение змейки (посередине)
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            }
        ];
    },

    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), this.barrier.getCoordinates(), ...this.snake.getBody()];

        while (true) {
            const rndPoint = { //рандомная точка
                x: Math.floor(Math.random() * this.config.getColsCount()), 
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            //проверка (не содержится ли в массиве исключений (exclude))
            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) {
                return rndPoint;
            }
        }
    },

    play() { //играть
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed()); //запуск интервала (вызываем интервал)
        this.setPlayButton('Стоп');    
    },

    stop() { //остановить игру
        this.status.setStopped();
        clearInterval(this.tickInterval); //очищаем интервал
        this.setPlayButton('Старт');
    },

    finish() { //завершить игру (врезались в стену/ себя съел/ нажал кнопку)
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },

    setPlayButton(textContents, isDisabled = false) { //изменяем состояние кнопки
        const playButton = document.getElementById('playButton');

        playButton.textContent = textContents;
        isDisabled
            ? playButton.classList.add('disabled') // = if
            : playButton.classList.remove('disabled'); // = else
    },

    tickHandler() { //ОСНОВНОЕ (сам игровой процесс)
        if (!this.canMakeStep()) { //если я не могу сделать шаг
            return this.finish();  //то я выхожу из игры и дальше код не исполняется
        }

            if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) { //если попала на еду 
                this.snake.growUp(); // - то растем
                document.getElementById('score').innerHTML=snake.body.length-1; //счет в режиме реального времени
                this.food.setCoordinates(this.getRandomFreeCoordinates()); // и назначаем новые координаты
                
                if (this.isGameWon()) this.finish();
            };

            if (this.barrier.isOnPoint(this.snake.getNextStepHeadPoint())){ //если попала на препятствие
                this.finish();
            };

            this.snake.makeStep();
            this.render();
            
        
    },


    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isOnPoint(nextHeadPoint) &&
            nextHeadPoint.x < this.config.getColsCount() &&
            nextHeadPoint.y < this.config.getRowsCount() &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0;
    },

    playClickHandler() { //кнопка "ИГРАТЬ"
        if (this.status.isPlaying()) { //если игра идет, то остановить
            this.stop();
        } else if (this.status.isStopped()) { //если игра остановлена, то играть
            this.play();
        }
    },

    newGameClickHandler() { //кнопка "НОВАЯ ИГРА"
        this.reset();
    },

    keyDownHandler(event) { //обработка нажатия клавиш
        if (!this.status.isPlaying()) return; //проверка, в игрели мы (иначе нет смысла обрабатыватьих)

        const direction = this.getDirectionByCode(event.code); //получаю текущее направление змейки

        if (this.canSetDirection(direction)) this.snake.setDirection(direction); 
        //если я могу установить текущее направление, тогда обращаюсь к змее и 
        //передаю текущее направление; 
        //могули я двигаться в этом направлении?
    },

    getDirectionByCode(code) { //получаем направление при нажатии кнопки
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) { //валидирую направление (могули я двигаться в этом направлении?)
        //получаю текущее направление и проверяю, могу ли в выбранную сторону
        //см. пример ниже
        const lastStepDirection = this.snake.getLastStepDirection(); 

        return direction === 'up' && lastStepDirection !== 'down' || //если веерх - нельзя вниз
            direction === 'right' && lastStepDirection !== 'left' || //если вправо - нельзя влево
            direction === 'down' && lastStepDirection !== 'up' || //если вниз - нельзя вверх
            direction === 'left' && lastStepDirection !== 'right'; //есливлево - нельзя вправо
    },

    setEventHandlers() { //обработка клавиатурныхсобытий и кликов
        //клик по кнопке "ИГРАТЬ"
        document.getElementById('playButton').addEventListener('click', () => { 
            this.playClickHandler();
        });

        //клик по кнопке "НОВАЯ ИГРА"
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });

        //клавиатурное событие
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    render() { //рендер игры 
        this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.barrier.getCoordinates());
    }
};

game.init({speed: 5});
