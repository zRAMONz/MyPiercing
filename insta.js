// Armazenar elementos em variáveis
const categories = document.querySelectorAll('.category');
const productsContainer = document.querySelectorAll('.products');
const products = document.querySelectorAll('.product');
const modalCloseButtons = document.querySelectorAll('.modal-close');

// Adicionar listeners de clique aos elementos
categories.forEach((category) => {
  category.addEventListener('click', () => {
    const categoryData = category.dataset.category;

    productsContainer.forEach((products) => {
      if (products.getAttribute('id') === categoryData) {
        products.classList.toggle('active');
      } else {
        products.classList.remove('active');
      }
    });

    products.forEach((product) => {
        product.addEventListener('click', () => {
          showColorModal(product);
        });
      });

    
    products.forEach((product) => {
      if (product.getAttribute('data-category') === categoryData) {
        product.classList.toggle('active');
      } else {
        product.classList.remove('active');
      }
    });
  });
});

modalCloseButtons.forEach((modalCloseButton) => {
  modalCloseButton.addEventListener('click', () => {
    closeModal();
  });
});

// Função para fechar o modal
function closeModal() {
  colorModal.style.display = 'none';
  sizeModal.style.display = 'none';
}
// Debugging code
categories.forEach((category) => {
    category.addEventListener('click', () => {
      console.log('Category clicked:', category.dataset.category);
    });
  });
  
  


// Função para mostrar o modal de cores
function showColorModal(product) {
  const colorModal = document.getElementById('color-modal');
  const colorModalContent = document.querySelector('#color-modal .modal-body');
  colorModal.style.display = 'block';
  colorModalContent.innerHTML = '';

  const colors = product.querySelectorAll('.color');

  colors.forEach((color) => {
    const colorName = color.querySelector('.color-name').textContent;
    const colorOption = document.createElement('option');
    colorOption.value = colorName;
    colorOption.dataset.color = color.dataset.color;
    colorOption.addEventListener('click', () => {
        showSizeModal(product, color.dataset.color);
      });
      
      colorModalContent.appendChild(colorOption);
    });
}

function showSizeModal(product, selectedColor) {
const sizeModal = document.getElementById('size-modal');
const sizeModalContent = document.querySelector('#size-modal .modal-body');
sizeModal.style.display = 'block';
sizeModalContent.innerHTML = '';

const sizes = product.querySelectorAll(`.size[data-color="${selectedColor}"]`);

sizes.forEach((size) => {
const sizeElement = document.createElement('div');
sizeElement.classList.add('size-option');
sizeElement.textContent = size.dataset.size;
sizeElement.addEventListener('click', () => {
    const quantity = 1;
    const colorPrice = parseFloat(product.querySelector(`.price[data-color="${selectedColor}"]`).textContent.slice(2));
    addToCart(product.dataset.product, selectedColor, size.dataset.size, quantity, colorPrice);
    closeModal();
  });
  
  sizeModalContent.appendChild(sizeElement);
});
}

// Função para fechar o modal
function closeModal() {
const colorModal = document.getElementById('color-modal');
const sizeModal = document.getElementById('size-modal');
colorModal.style.display = 'none';
sizeModal.style.display = 'none';
}

function addToCart(product, color, size, quantity, price) {
// Cria uma nova linha na tabela de resumo da compra
let table = document.querySelector('table tbody');
let row = table.insertRow();

// Preenche as células da linha com as informações do produto adicionado
let productCell = row.insertCell(0);
productCell.innerHTML = product;

let colorCell = row.insertCell(1);
colorCell.innerHTML = color;

let sizeCell = row.insertCell(2);
sizeCell.innerHTML = size;

let quantityCell = row.insertCell(3);
quantityCell.innerHTML = quantity;

let unitPriceCell = row.insertCell(4);
unitPriceCell.innerHTML = price.toFixed(2);

let totalPriceCell = row.insertCell(5);
let totalPrice = price * quantity;
totalPriceCell.innerHTML = totalPrice.toFixed(2);

// Atualiza o subtotal
let subTotal = document.querySelector('#subtotal');
let currentSubTotal = parseFloat(subTotal.textContent.slice(3));
subTotal.textContent = 'R$ ' + (currentSubTotal + totalPrice).toFixed(2);
}

// Debugging code
products.forEach((product) => {
    console.log('Product category:', product.dataset.category);
  });
  
