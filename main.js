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
  <li class="drink">
    <button class="btns" data-name="${item.dataset}">
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

function displaySelect(items) {
  const mainItem = document.querySelector('.main__item');
  const SelectList = document.querySelector('.order__list');
  mainItem.addEventListener('click', (event) => {
    const drinkName = event.target.dataset.name;
    if (drinkName == null) {
      return;
    }
    const filter = items.filter(
      (item) => item.name === drinkName
    );
    SelectList.innerHTML += filter
      .map((item) => asdf(item))
      .join('');
  });
}

function asdf(item) {
  return `<li class="list">
  <img
    src="${item.img}"
    alt="${item.type}"
    class="list__img"
  />
  <span>${item.name}</span>
  <span class="drinkValue">${item.price}<span>원</span></span>
  <div class="option">
    <input
      type="text"
      name="amount"
      id="amount"
      class="amount"
      value="1"
    />
    <div class="buttons">
      <button class="plusBtn">+</button>
      <button class="minusBtn">-</button>
    </div>
    <button class="cancelBtn">x</button>
  </div>
</li>`;
}

loadItems() //
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
    displaySelect(items);
  });

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

// ----------------------------
// const plusBtn = document.querySelector('.plusBtn');
// const minusBtn = document.querySelector('.minusBtn');
// const cancelBtn = document.querySelector('.cancelBtn');
// const drinkValue = document.querySelector('.drinkValue');
// const amount = document.querySelector('.amount');

// plusBtn.addEventListener('click', () => {
//   amount.value++;
// });
