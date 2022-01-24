const getData = () => {

    const list = document.querySelector('.cross-sell__list')
    const btn = document.querySelector('.cross-sell__add')

    let stack = 4                                    //по сколько штук будет выводиться за раз
    let count = 1                                    //

    const render = (data) => {                     // data принимает массив 
        list.innerHTML = ''                       // удаляем карточки товаров
    
    data.forEach(item  => {                       //data перебирает массив

                                                // на основании массива вывод определенную верстку (beforeend - внутри родителя в конце)
        list.insertAdjacentHTML('beforeend', `   
            <li>
            <article class="cross-sell__item">
                <img class="cross-sell__image" src="./${item.photo}" alt="${item.id}"> 
                <h3 class="cross-sell__title">${item.name}</h3>                                                
                <p class="cross-sell__price">${item.price}₽</p>
                <button type="button" class="button button_buy cross-sell__button">Купить</button>
            </article>
        </li>
        `)
    });
    }

    const sliceArray = (data, index) => {                         //обработает весь массив и передает рендер в обрисовку по содержимому и индексу 
        return data.slice(0, index)                              //обрезаем (slice) первые 4 элемента / 0 - первый элемент до stack
    }


    const changeData = (data) => {                                 // 2 принимает массив data
        const newStack = stack * count                              // создает переменную newStack (4 вывода на странице умножить на 1)
        
        render(sliceArray(data, newStack))                              //результат выполнения функции sliceArray (27-29)
    
        if (data.length > newStack){                                    // если полученное от сервера длина больше  newStack то 
            count++                                                     // увеличиваем count на один (count++)
        }else{
         btn.style.display = 'none'                                     //убираем кнопку
        }
    }

    const getGoods = () => {
        fetch('https://test-4f4d7-default-rtdb.firebaseio.com/db.json')      //1 запрашивает данные, из файла json
        .then((response) => {
            if(response.ok) {
                return response.json()                          // ждет момента когда сервер отдаст данные отрабатывает методы ниже 
            } else {
                throw new Error('Данные были получены с ошибкой!')
            }
        })
        .then((data) => {                                     //ждет первого окончания метода then и начинает свою работу и уже будет работать
            changeData(data)                                       //функция вызовет changeData
        })
        .catch((error) => {
            console.error(error.message);
        })
    }
        btn.addEventListener('click', getGoods)

    getGoods()
}
getData()