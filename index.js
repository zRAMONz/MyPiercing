  // Selecionar elementos da tabela
  const productRow = document.querySelector('.product-row');
  const colorSelect = document.querySelector('.color-select');
  const sizeInputs = document.querySelectorAll('.size-input');
  const quantityCell = document.querySelector('.quantity-cell');
  const priceCell = document.querySelector('.price-cell');
  const addRowButton = document.querySelector('.add-row');
  const removeRowButton = document.querySelector('.remove-row');

  // Selecionar elementos do resumo da compra
  const productList = document.querySelector('.product-list');
  const totalPrice = document.querySelector('.total-price');

  // Inicializar variáveis
  let totalQuantity = 0;
  let totalPriceValue = 0;

  // Calcular a quantidade total
  function calculateTotalQuantity() {
    totalQuantity = 0;
    sizeInputs.forEach(input => {
      totalQuantity += parseInt(input.value);
    });
    quantityCell.textContent = totalQuantity;
  }

  // Calcular o preço total
  function calculateTotalPrice() {
    totalPriceValue = 0;
    sizeInputs.forEach(input => {
      totalPriceValue += parseInt(input.value) * parseFloat(colorSelect.value);
    });
    priceCell.textContent = totalPriceValue.toFixed(2);
  }

// Adicionar o produto ao resumo da compra
function addProductToSummary() {
  const productName = productRow.querySelector('td:first-child').textContent;
  const productColor = colorSelect.options[colorSelect.selectedIndex].textContent;
  const productSize = [];
  const productQuantity = [];
  const productUnitPrice = colorSelect.value;

  sizeInputs.forEach(input => {
    if (input.value > 0) {
      productSize.push(input.parentElement.querySelector('label').textContent);
      productQuantity.push(input.value);
    }
  });

  let totalPriceValue = 0; // Variável para acumular o preço total de todos os itens

  productQuantity.forEach((quantity, index) => {
    const productTotalPrice = quantity * productUnitPrice; // Cálculo do preço total do item
    const productItem = document.createElement('li');
    productItem.innerHTML = `
      ${productName}, ${productColor}, ${productSize[index]}, 
      ${quantity}, ${productUnitPrice}R$, 
      ${productTotalPrice.toFixed(2)}R$ 
      <button class="remove-product">X</button>
    `;
    productList.appendChild(productItem);

    totalPriceValue += productTotalPrice; // Acumula o preço total do item na variável totalPriceValue
  });

  // Atualiza o preço total
  calculateSummaryTotalPrice(totalPriceValue);
}


  // Remover o produto do resumo da compra
  function removeProductFromSummary(event) {
    if (event.target.classList.contains('remove-product')) {
      const productItem = event.target.parentElement;
      productList.removeChild(productItem);
    }
  }

  // Limpar os campos da tabela
  function clearTableFields() {
    colorSelect.selectedIndex = 0;
    sizeInputs.forEach(input => {
      input.value = 0;
    });
    quantityCell.textContent = 0;
    priceCell.textContent = 0;
  }

// Calcular o preço total da lista do Resumo da compra
function calculateSummaryTotalPrice(totalPriceValue) {
  let summaryTotalPrice = totalPriceValue;
  const productItems = document.querySelectorAll('.product-list li');
  productItems.forEach(item => {
    const productTotalPrice = parseFloat(item.textContent.split(',')[5]);
    summaryTotalPrice += productTotalPrice;
  });
  totalPrice.textContent = `Total: ${summaryTotalPrice.toFixed(2)}R$`;
}



// Adicionar eventos
colorSelect.addEventListener('change', calculateTotalPrice);
sizeInputs.forEach(input => input.addEventListener('input', calculateTotalQuantity));
sizeInputs.forEach(input => input.addEventListener('input', calculateTotalPrice));
addRowButton.addEventListener('click', addProductToSummary);
productList.addEventListener('click', removeProductFromSummary);
productList.addEventListener('click', calculateSummaryTotalPrice);
removeRowButton.addEventListener('click', clearTableFields);
addRowButton.classList.add('large-button');
removeRowButton.classList.add('large-button');
