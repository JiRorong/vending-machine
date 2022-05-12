function loadItems() {
  return fetch('data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const container = document.querySelector('.main__item');
  container.innerHTML = items
    .map((item) => createHTMLItem(item))
    .join('');
}

function createHTMLItem(item) {
  return `
  <li class="drink"
  data-name="${item.dataset}"
  data-class="${item.class}"
  data-plus="${item.plus}"
  data-minus="${item.minus}"
  data-cancel="${item.cancel}"
  data-amount="${item.amount}"
  data-drinkvalue="${item.drinkValue}"
  data-price="${item.price}">
    <button class="btns">
    <img
      src="${item.img}"
      alt="${item.type}"
      class="drink__img"/>
      <span class="drink__name">${item.name}</span>
      <span class="drink__price">${item.price}원</span>
    </button>
</li>`;
}

function onButtonCilck(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  if (key == null || value == null) {
    return;
  }
  if (key === '*' && value === '*') {
    displayItems(items);
  } else {
    displayItems(items.filter((item) => item[key] === value));
  }
}

function setEventListeners(items) {
  const bar = document.querySelector('.bar');
  bar.addEventListener('click', (event) =>
    onButtonCilck(event, items)
  );
}

loadItems() //
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  });

// 충전
const chargingBtn = document.querySelector('.chargingBtn');
chargingBtn.addEventListener('click', () => {
  const getValue = prompt('충전할 금액을 입력하세요.');
  const value = document.querySelector('.value');
  if (getValue == null) {
    return;
  } else if (isNaN(getValue)) {
    alert('숫자를 입력하세요.');
    return;
  } else if (getValue === '') {
    alert('금액을 입력하세요.');
    return;
  } else {
    value.innerHTML =
      parseInt(value.textContent) + parseInt(getValue);
    alert('충전이 완료되었습니다.');
    return;
  }
});

// 선택 아이템
function plusBtnClick(amount, drinkValue, price, sum) {
  amount.value++;
  drinkValue.textContent =
    parseInt(drinkValue.textContent) + parseInt(price);
  sum.textContent = parseInt(sum.textContent) + parseInt(price);
}

function minusBtnClick(amount, drinkValue, price, sum) {
  if (amount.value === '1') {
    return;
  }
  amount.value--;
  drinkValue.textContent =
    parseInt(drinkValue.textContent) - parseInt(price);
  sum.textContent = parseInt(sum.textContent) - parseInt(price);
}

function cancelBtnClick(
  selectItems,
  amount,
  e,
  price,
  drinkValue,
  sum,
  plusBtn,
  minusBtn,
  cancelBtn
) {
  sum.textContent =
    parseInt(sum.textContent) - parseInt(drinkValue.textContent);
  amount.value = 1;
  drinkValue.textContent = price;
  selectItems.style.display = 'none';
  e.target.style.pointerEvents = 'auto';
  // 중복된 이벤트 리스너 제거
  const old_element1 = plusBtn;
  const new_element1 = plusBtn.cloneNode(true);
  old_element1.parentNode.replaceChild(
    new_element1,
    old_element1
  );

  const old_element2 = minusBtn;
  const new_element2 = minusBtn.cloneNode(true);
  old_element2.parentNode.replaceChild(
    new_element2,
    old_element2
  );

  const old_element3 = cancelBtn;
  const new_element3 = cancelBtn.cloneNode(true);
  old_element3.parentNode.replaceChild(
    new_element3,
    old_element3
  );
}

const mainItemList = document.querySelector('.main__item');
mainItemList.addEventListener('click', (e) => {
  const dataset = e.target.dataset;
  const classs = dataset.class;

  if (classs == null) {
    return;
  }
  // 이벤트 중복 제거
  e.target.style.pointerEvents = 'none';

  const selectItems = document.querySelector(classs);
  selectItems.style.display = 'flex';

  const plus = dataset.plus;
  const minus = dataset.minus;
  const cancel = dataset.cancel;
  const amountText = dataset.amount;
  const drinkValueText = dataset.drinkvalue;
  const price = dataset.price;

  const plusBtn = document.querySelector(plus);
  const minusBtn = document.querySelector(minus);
  const cancelBtn = document.querySelector(cancel);
  const amount = document.querySelector(amountText);
  const drinkValue = document.querySelector(drinkValueText);

  amount.value = '1';
  drinkValue.textContent = price;

  const sum = document.querySelector('.sum');
  sum.textContent =
    parseInt(sum.textContent) + parseInt(drinkValue.textContent);

  plusBtn.addEventListener('click', () =>
    plusBtnClick(amount, drinkValue, price, sum)
  );

  minusBtn.addEventListener('click', () =>
    minusBtnClick(amount, drinkValue, price, sum)
  );

  cancelBtn.addEventListener('click', () =>
    cancelBtnClick(
      selectItems,
      amount,
      e,
      price,
      drinkValue,
      sum,
      plusBtn,
      minusBtn,
      cancelBtn
    )
  );
});

// 결제하기버튼
const value = document.querySelector('.value');
const sum = document.querySelector('.sum');
const pay = document.querySelector('.count__pay');
pay.addEventListener('click', () => {
  if (sum.textContent === '0') {
    alert('상품을 선택하세요.');
    return;
  }

  const fd = confirm('결제하시겠습니까?');
  if (fd === true) {
    if (
      parseInt(value.textContent) >= parseInt(sum.textContent)
    ) {
      alert(`${sum.textContent}원이 결제되었습니다.`);
      value.textContent =
        parseInt(value.textContent) - parseInt(sum.textContent);
      sum.textContent = '0';

      const list = document.querySelectorAll('.list');
      const drink = document.querySelectorAll('.drink');

      list.forEach((list) => {
        if (list.style.display === 'flex') {
          list.style.display = 'none';
          var old_element = list;
          var new_element = old_element.cloneNode(true);
          old_element.parentNode.replaceChild(
            new_element,
            old_element
          );

          drink.forEach((drink) => {
            if (drink.style.pointerEvents === 'none') {
              drink.style.pointerEvents = 'auto';
            }
          });
        }
      });
    } else {
      alert('잔액이 부족합니다.');
    }
  }
});
