const productList = document.getElementById("product-list");
const cartDisplay = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartSection = document.getElementById("cart-section");

let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];


fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    displayProducts();
    updateCart();
  });


function displayProducts() {
  productList.innerHTML = "";
  allProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="">
      <h3>${product.title}</h3>
      <p>₹${(product.price * 83).toFixed(0)}</p>
      <button class="add-btn">Add to Cart</button>
      <button class="details-btn">View Details</button>
    `;
    div.querySelector(".add-btn").onclick = () => addToCart(product);
    div.querySelector(".details-btn").onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };
    productList.appendChild(div);
  });
}
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}


function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cart.forEach((item, index) => {
      const price = item.price * 83;
      total += price;

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.title} - ₹${price.toFixed(0)}
        <button class="remove-btn">Remove</button>
      `;
      li.querySelector(".remove-btn").onclick = () => removeFromCart(index);
      cartItems.appendChild(li);
    });
  }

  totalPrice.textContent = total.toFixed(0);
  cartDisplay.textContent = `Cart (${cart.length}) - ₹${total.toFixed(0)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}


cartDisplay.addEventListener("click", () => {
  cartSection.classList.toggle("hidden");
});
