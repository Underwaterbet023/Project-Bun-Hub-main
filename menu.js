let cartCount = 0;
const cartItems = [];
const cartSidebar = document.getElementById('cart-sidebar');
const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('total-price');
const gstElement = document.getElementById('gst-amount');
const totalWithGstElement = document.getElementById('total-with-gst');

const GST_PERCENTAGE = 18;

function updateCartNotification() {
  cartCountElement.textContent = cartCount;
}


function getImageUrlForItem(itemClass) {
  const images = {
    'burger1': 'image/af9983862e8e85462b781cf17b2668e5.png',
    'burger2': 'image/D-K789.png',
    'burger3': 'image/D-K912.png',
    'burger4': 'image/D-K540.png',
    'burger5': 'image/D-K439.png',
    'burger6': 'image/34d0efdb48b9890e381f1f985d3bd63d.png',
    'burger7': 'image/D-K696.png',
    'burger8': 'image/D-K815.png',
    'burger9': 'image/c9252e6c6cd289c588c3381bc77b1dfc (1).png',
    'burger10': 'image/50446f64f31cbefe66558fc47f50a9d6.png',
    'burger11': 'image/D-K787.png',
    'pizza1': 'image/fb86662148be855d931b37d6c1e5fcbe.png',
    'pizza2': 'image/fb86662148be855d931b37d6c1e5fcbe11.png',
    'drink1': 'image/D-PR00002416.png',
    'drink2': 'image/2x_web_20240406172110807785_482x264jpg.png',
    'drink3': 'image/2x_web_20240406172204734414_482x264jpg.png',
    'drink4': 'image/2x_web_20240826074238426780_482x264jpg.jpeg.jpg',
    'drink5': 'image/2x_web_20240406172149632873_482x264jpg.png',
    'combo1': 'image/D-PR00002437.png',
    'cake': 'image/2x_web_20240425112313492395_482x264jpg.png'
  };  

  return images[itemClass] || 'images/default.jpg';
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const itemName = button.closest('.grid-product').querySelector('.des').textContent;
    const itemPrice = parseInt(button.getAttribute('data-price'));
    const itemClass = button.closest('.grid-product').querySelector('.img-name').classList[1];
    const itemImageUrl = getImageUrlForItem(itemClass);

    cartItems.push({ name: itemName, price: itemPrice, image: itemImageUrl });
    cartCount += 1;

    updateCartNotification();
    updateCartSidebar();
  });
});


function updateCartSidebar() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cartItems.forEach((item, index) => {
    const itemElement = document.createElement('li');
    itemElement.className = 'cart-item';

    itemElement.innerHTML = `
      <img src="${item.image}" class="cart-item-image" alt="${item.name}">
      <span>${item.name}</span>
      <span>₹${item.price}</span>
      <button class="remove-item" data-index="${index}">×</button>
    `;

    cartItemsContainer.appendChild(itemElement);
    total += item.price;
  });

  const gstAmount = (total * GST_PERCENTAGE) / 100;
  const totalWithGst = total + gstAmount;

  gstElement.textContent = `GST (${GST_PERCENTAGE}%): ₹${gstAmount.toFixed(2)}`;
  totalWithGstElement.textContent = `Total (incl. GST): ₹${totalWithGst.toFixed(2)}`;


  cartTotalElement.textContent = total;


  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', (e) => {
      const itemIndex = e.target.dataset.index;
      removeItemFromCart(itemIndex);
    });
  });
}

function removeItemFromCart(index) {
  cartItems.splice(index, 1);
  cartCount -= 1;
  updateCartNotification();
  updateCartSidebar();
}

function openCartSidebar() {
  cartSidebar.classList.add('cart-sidebar-open');
  cartSidebar.style.display = 'block'; 
}

function closeCartSidebar() {
  cartSidebar.classList.remove('cart-sidebar-open');
  setTimeout(() => {
    cartSidebar.style.display = 'none'; 
  }, 300);
}


document.getElementById('cart-icon').addEventListener('click', openCartSidebar);


document.querySelector('#cart-sidebar button').addEventListener('click', closeCartSidebar);

document.getElementById('place-order').addEventListener('click', function() {
  alert('Your order has been placed successfully 😎');
});
