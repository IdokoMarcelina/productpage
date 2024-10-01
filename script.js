
const addToCartButtons = document.querySelectorAll('.addToCartContainer');
const cartItemsContainer = document.getElementById('cart-items');
const cartHeader = document.querySelector('#cart h3');
const totalAmountElement = document.getElementById('totalAmountElement'); 
const cartImage = document.getElementById('cartImage')
const cartMessage = document.getElementById('cartMessage')
const confirmOrder = document.getElementById('confirmOrder')

let cart = [];



addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        let product = button.parentElement; 
        let productName = product.querySelector('.productname').innerText;
        let productPrice = parseFloat(product.querySelector('.productPrice').innerText.replace('$', ''));

       
        let existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
        
            existingProduct.quantity += 1;
        } else {
            
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        
        button.style.display = 'none';
        product.querySelector('#addAndSub').style.display = 'flex';

       
        product.querySelector('#num').innerText = existingProduct ? existingProduct.quantity : 1;

     
        updateCartUI();
    });
});


function updateCartUI() {
    
    cartItemsContainer.innerHTML = ''; 

    
    cart.forEach(item => {
        let cartItem = document.createElement('li');
        cartItem.innerHTML = `<h4>${item.name} :   $${item.price} x ${item.quantity} </h4>`;
        cartItemsContainer.appendChild(cartItem);
    });

    
    let totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    if (totalAmount > 0) {
        
        totalAmountElement.innerHTML = `<h5>Total : $${totalAmount.toFixed(2)}</h5>`;
        
        
        totalAmountElement.style.display = 'block';
    } else {
        
        totalAmountElement.style.display = 'none';
    }


    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartHeader.textContent = `Your cart (${totalItems} items)`;

    
    if (cart.length === 0) {
        cartImage.style.display = 'block';
        cartMessage.style.display = 'block';
        confirmOrder.style.display = 'none'; 
    } else {
        cartImage.style.display = 'none';
        cartMessage.style.display = 'none';
        confirmOrder.style.display = 'block';
    }
}




document.body.addEventListener('click', (event) => {
    if (event.target.matches('#add')) {
        updateQuantity(event.target, 1);
    } else if (event.target.matches('#sub')) {
        updateQuantity(event.target, -1);
    }
});


function updateQuantity(button, change) {
    let productDiv = button.parentElement.parentElement; 
    let productName = productDiv.querySelector('.productname').innerText; 

    let cartItem = cart.find(item => item.name === productName);
    if (cartItem) {
    
        cartItem.quantity += change;

        
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.name !== productName);

            
            let addToCartButton = productDiv.querySelector('.addToCartContainer');
            addToCartButton.style.display = 'block';
            let quantityControls = productDiv.querySelector('#addAndSub');
            quantityControls.style.display = 'none';
        } else {
            
            productDiv.querySelector('#num').innerText = cartItem.quantity;
        }

        
        updateCartUI();
    }
}
