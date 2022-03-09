let allPrice = 0;
let restaurants;
let allRestaraunts;
let currentPage = 0;
let dishesList = {
    1: {
        'img': 'img/menu1.jpg',
        'title': 'Картофель фри',
        'text': 'Самая вкусная картошечка в мире',
        'price': 0,
    },
    2: {
        'img': 'img/menu2.jpg',
        'title': 'Вкуснейший бургер',
        'text': 'Приготовленный на огне сочный бургер',
        'price': 0,
    },
    3: {
        'img': 'img/menu3.jpg',
        'title': 'Пицца "Маргарита"',
        'text': 'Классика признанная во всем мире',
        'price': 0,
    },
    4: {
        'img': 'img/menu8.jpg',
        'title': 'Нежные ребрышки',
        'text': 'Нежнейшие ребрышки политые кисло-сладким соусом',
        'price': 0,
    },
    5: {
        'img': 'img/menu5.jpg',
        'title': 'Салат "Цезарь"',
        'text': 'Обжаренная курочка, помидоры, салат Айсберг, панированные сухари и многое другое',
        'price': 0,
    },
    6: {
        'img': 'img/menu6.jpg',
        'title': 'Горячие роллы',
        'text': 'Разные горячие роллы',
        'price': 0,
    },
    7: {
        'img': 'img/menu7.jpg',
        'title': 'Куриные наггетсы',
        'text': 'Классические куриные наггетсы',
        'price': 0,
    },
    8: {
        'img': 'img/menu4.jpg',
        'title': 'Coca-Cola',
        'text': 'Кока-кола 0.33л',
        'price': 0,
    },
    9: {
        'img': 'img/menu9.jpg',
        'title': 'Fanta',
        'text': 'Фанта новый вкус',
        'price': 0,
    },
}

function checkboxClick(element) {
    let cold = document.getElementById('cold')
    let fastdelivery = document.getElementById('fast')
    if ((cold.checked==false) && (fastdelivery.checked)){
      x = 0;
    };
    if ((cold.checked) && (fastdelivery.checked==false)) {
      x = 1;
    }
    if ((cold.checked) && (fastdelivery.checked)) {
      x=2;
    }
    return x

}

function alertfunc() {
  console.log(checkboxClick())
  if (checkboxClick() == 0){
    x=0
    let f = updatePrice(x)
    let priceElem = document.getElementById('allPrice');
    priceElem.innerHTML = `<h1>Итого к оплате: <span style="color:black;" class="badge badge-success">${Math.trunc(allPrice*1.2)+300} Руб.</span></h1>;`
    let choosed = document.getElementById('choosed');
    choosed.innerHTML = `<li style="color:black;">Быстрая доставка </li>`
   }
  if (checkboxClick() == 1){
    x=1
    let f = updatePrice(x)
    let priceElem = document.getElementById('allPrice');
    priceElem.innerHTML = `<h1>Итого к оплате: <span style="color:black;" class="badge badge-success">${Math.trunc(allPrice+300)} Руб.(Если будет холодным:${Math.trunc(allPrice*0.7)+300} Руб)</span></h1>;`
    let choosed = document.getElementById('choosed');
    choosed.innerHTML = `<li style="color:black;">Только горячим </li>`
  }
  if (checkboxClick() == 2){
    x=2
    let f = updatePrice(x)
  }
};

function getAll() {
    let url = new URL('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=cf8e77bf-df9c-4883-a510-ea50d2da9df7');

    fetch(url, {
        method: 'get',
    }).then(response => response.json())
        .then(result => {
            currentPage = 0;
            allRestaraunts = chunkArray(result.sort((a, b) => b.rate - a.rate), 12);
            loadOptions(result);
            createCards(allRestaraunts[currentPage], 'allRest')
            createNavigation(allRestaraunts);

        });
}


function loadOptions(data) {
    Array.from(new Set(data.map(area => area.admArea))).forEach(element => {
            let districtOption = document.createElement('option');
            districtOption.innerHTML = `${String(element)}`;
            document.getElementById('inputAdm').append(districtOption);
        }
    );
    Array.from(new Set(data.map(area => area.district))).forEach(element => {
            let districtOption = document.createElement('option');
            districtOption.innerHTML = `${String(element)}`;
            document.getElementById('inputDistrict').append(districtOption);
        }
    );
    Array.from(new Set(data.map(area => area.typeObject))).forEach(element => {
            let districtOption = document.createElement('option');
            districtOption.innerHTML = `${String(element)}`;
            document.getElementById('inputTypeObject').append(districtOption);
        }
    );
}




function createCards(data, insertEl) {
    let allRest = document.getElementById(insertEl);
    removeAllElementsInParentElement(allRest);

    data.forEach(data => {
        let col = document.createElement('div');
        col.className = 'col-md-3 card-group'

        let card = document.createElement('div');
        card.className = 'card text-center m-2 bg-light shadow-sm';

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body pt-0 pb-2';


        let cardTitle = document.createElement('p');
        cardTitle.className = 'card-header bg-transparent border-dark p-1 mb-1';
        cardTitle.innerHTML = `<h5>${data.name}</h5>`;


        let cardType = document.createElement('h6');
        cardType.className = 'card-subtitle mb-2 text-muted';
        cardType.innerText = data.typeObject;
        cardBody.append(cardType);

        let cardAdress = document.createElement('p');
        cardAdress.innerText = data.address;
        cardBody.append(cardAdress);


        let cardFooter = document.createElement('div');
        cardFooter.className = 'd-flex justify-content-between align-items-center card-footer';
        cardFooter.style.background = 'orange'


        let cardButton = document.createElement('a');
        cardButton.innerText = 'Выбрать';
        cardButton.className = 'btn btn-outline-success';
        cardButton.style.background = '#fff'
        cardButton.style.color = 'green'
        cardFooter.append(cardButton);
        cardButton.onclick = function (event) {
            document.getElementById('modal_name').innerText = data.name;
            document.getElementById('modal_admArea').innerText = data.admArea;
            document.getElementById('modal_district').innerText = data.district;
            document.getElementById('modal_address').innerText = data.address;
            document.getElementById('modal_rate').innerText = data.rate;
            fillDishes(data);
        };


        let cardRate = document.createElement('span');
        let tmpStr = 'badge badge-pill'
        cardRate.innerText = `Рейтинг: ${data.rate}`;
        cardRate.style.color = '#000'
        cardRate.className = tmpStr;
        cardFooter.append(cardRate);

        card.append(cardTitle);
        card.append(cardBody);
        card.append(cardFooter);
        col.append(card)
        allRest.append(col);
    });
}


function findByFilter() {
    let adm = document.getElementById('inputAdm').value;
    let dist = document.getElementById('inputDistrict').value;
    let type = document.getElementById('inputTypeObject').value;
    let soc = document.getElementById('isSocial').checked;
    let url = new URL('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=cf8e77bf-df9c-4883-a510-ea50d2da9df7');
    fetch(url, {
        method: 'get',
    }).then(response => response.json())
        .then(result => {
            let filterRes = result.sort((a, b) => b.rate - a.rate);
            if (adm !== 'любой') {
                filterRes = filterRes.filter(r => r.admArea === adm);
            }
            if (dist !== 'любой')  {
                filterRes = filterRes.filter(r => r.district === dist);
            }
            if (type !== 'любой')  {
                filterRes = filterRes.filter(r => r.typeObject === type);
            }

            if (soc) {
                filterRes = filterRes.filter(r => r.socialPrivileges == true);
            }
            currentPage = 0;
            allRestaraunts = chunkArray(filterRes, 12);
            loadOptions(result);
            createCards(allRestaraunts[currentPage], 'allRest')
            createNavigation(allRestaraunts);
        });
}

function fillDishes(rest) {
    let allDishes = document.getElementById('dishes')
    removeAllElementsInParentElement(allDishes);

    for (let item in dishesList) {
        let base = document.createElement('div');
        base.className = 'col-md-4 card-group';
        allDishes.appendChild(base);

        let card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm';
        base.appendChild(card);

        let img = document.createElement('img');
        img.src = dishesList[item].img;
        img.className = 'bd-placeholder-img card-img-top';
        img.style = 'width = 100%; height = 100%';
        card.appendChild(img);


        let cardTitle = document.createElement('div');
        cardTitle.className = 'card-header'
        cardTitle.style.background="orange"
        cardTitle.innerText = dishesList[item].title;
        card.appendChild(cardTitle);

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        card.appendChild(cardBody);

        let text = document.createElement('p');
        text.className = 'card-text';
        text.innerText = dishesList[item].text;
        cardBody.appendChild(text);


        let cardFooter = document.createElement('div');
        cardFooter.style.background="orange"
        cardFooter.className = 'd-flex justify-content-between align-items-center card-footer'
        card.appendChild(cardFooter);

        let cardInputGroup = document.createElement('div');
        cardInputGroup.className = 'input-group input-group-sm';
        cardFooter.appendChild(cardInputGroup);

        let cardInputGroup1 = document.createElement('div');
        cardInputGroup1.className = 'input-group-prepend';
        cardInputGroup.appendChild(cardInputGroup1);

        let cardButtonMinus = document.createElement('button');
        cardButtonMinus.className = 'decrease btn btn-sm btn-outline-secondary';
        cardButtonMinus.innerText = '-'
        cardButtonMinus.onclick = ev => {
            let elem = document.getElementById('dishCount' + item);
            let number = parseInt(elem.value);
            if (number > 0)
                elem.value = number - 1;
            updatePrice();
        };
        cardInputGroup1.appendChild(cardButtonMinus);

        let inputCount = document.createElement('input');
        inputCount.id = 'dishCount' + item;
        inputCount.className = 'form-control dish-count-input';
        inputCount.style = "background: white; border: 1px solid #6b6a6a;";
        inputCount.size = 2;
        inputCount.value = '0';
        inputCount.readOnly = true;
        cardInputGroup.appendChild(inputCount);

        let cardInputGroup2 = document.createElement('div');
        cardInputGroup2.className = 'input-group-append';
        cardInputGroup.appendChild(cardInputGroup2);

        let cardButtonPlus = document.createElement('button',);
        cardButtonPlus.className = 'increase btn btn-sm btn-outline-secondary';
        cardButtonPlus.innerText = '+'
        cardButtonPlus.onclick = ev => {
            let elem = document.getElementById('dishCount' + item);
            elem.value = parseInt(elem.value) + 1;
            updatePrice();
        };
        cardInputGroup2.appendChild(cardButtonPlus);

        let price = document.createElement('p');
        price.className = 'm-0 p-0 w-75';
        let priceItem = rest['set_' + item];
        dishesList[item].price = priceItem;


        price.innerHTML = priceItem;
        cardFooter.appendChild(price);


    }
}

function removeAllElementsInParentElement(element) {
    while (element.firstChild)
        element.removeChild(element.firstChild);
}

function updatePrice(element) {
    allPrice = 0;
    let positionTable = document.getElementById('modal_positions');
    removeAllElementsInParentElement(positionTable);
    let countItems = 1;
    let countDish = 0;
    for (let item in dishesList) {
        let element = document.getElementById('dishCount' + item);
        let number = parseInt(element.value);
        let price = 0;
        if (number !== 0) {
            price = dishesList[item].price * number;
            allPrice += price;
            countDish = countDish + number;
            let row = document.createElement('tr');
            let idCol = document.createElement('th');
            idCol.innerText = countItems;
            countItems++;
            row.appendChild(idCol);
            let name = document.createElement('th');
            name.innerText = dishesList[item].title;
            row.appendChild(name);
            let tprice = document.createElement('th');
            tprice.innerText = dishesList[item].price;
            row.appendChild(tprice);
            let count = document.createElement('th');
            count.innerText = number;
            row.appendChild(count);
            let summ = document.createElement('th');
            summ.innerText = price;
            row.appendChild(summ);
            positionTable.appendChild(row);

        }
    }
    let row = document.createElement('tr');
    row.className = 'table-success';
    let blank = document.createElement('th');
    blank.colSpan = 3;
    blank.innerText = 'Итого';
    row.appendChild(blank);
    let countEl = document.createElement('th');
    countEl.innerText = countDish;
    row.appendChild(countEl);
    let summ = document.createElement('th');
    let check_fast = document.getElementById('fastdelivery')
    if (element==2) {
      let priceElem = document.getElementById('allPrice');
      priceElem.innerHTML = `<h1>Итого к оплате: <span style="color:black;" class="badge badge-success">${Math.trunc(allPrice*1.2)+300} Руб.(Если будет холодным:${Math.trunc(allPrice*0.7)+300} Руб)</span></h1>;`
      let choosed = document.getElementById('choosed');
      choosed.innerHTML = `<li style="color:black;">Быстрая доставка </li><li style="color:black;">Только горячим </li>`
      summ.innerText = Math.trunc(allPrice)
    }
    else {
      summ.innerText= allPrice
    }
    row.appendChild(summ);
    positionTable.appendChild(row);
    return allPrice

}


function createNavigation() {
    let element = document.getElementById('navigation');
    removeAllElementsInParentElement(element);
    let prevPage = document.createElement('li');
    prevPage.className = 'page-item'
    let pageLink = document.createElement('a');
    pageLink.className = 'page-link';
    pageLink.innerText = 'Previous';
    prevPage.appendChild(pageLink);
    element.appendChild(prevPage);

    if (allRestaraunts.length < 15) {
        for (let i = 0; i < allRestaraunts.length; i++) {
            element.appendChild(createPageLink(i));
        }
    } else {
        if (currentPage < 4) {
            for (let i = 0; i < 7; i++) {
                element.appendChild(createPageLink(i));
            }
        } else {
            for (let i = currentPage - 3; i < currentPage + 4; i++) {
                element.appendChild(createPageLink(i));
            }
        }

    }
    let nextPage = document.createElement('li');
    nextPage.className = 'page-item'
    let nextLink = document.createElement('a');
    nextLink.innerText = 'Next';
    nextLink.className = 'page-link'
    nextPage.appendChild(nextLink);
    element.appendChild(nextPage);
}

function createPageLink(id) {
    let itemPage = document.createElement('li');
    itemPage.className = 'page-item'
    if (id === currentPage) {
        itemPage.classList.add('disabled')

    }

    let itemLink = document.createElement('a');
    itemLink.innerText = id;
    itemLink.classList.add('page-link')
    itemLink.onclick = ev => {
        currentPage = id;
        createCards(allRestaraunts[id], 'allRest')
        createNavigation();
    };
    itemPage.appendChild(itemLink);

    return itemPage;
}

function chunkArray(arr, chunk) {
    let i, j, tmp = [];
    for (i = 0, j = arr.length; i < j; i += chunk) {
        tmp.push(arr.slice(i, i + chunk));
    }
    return tmp;
}

window.onload = function () {
    getAll();
};
