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
    <button class="btns">
    <img
      src="${item.img}"
      alt="${item.type}"
      class="drink__img"/>
      <span class="drink__name">${item.name}</span>
      <span class="drink__price">${item.price}</span>
    </button>
</li>`;
}

function onButtonCilck(event, items) {
  const key = event.target.dataset.key;
  const value = event.target.dataset.value;
  if (key == null || value == null) {
    return;
  }
  displayItems(items.filter((item) => item[key] === value));
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
