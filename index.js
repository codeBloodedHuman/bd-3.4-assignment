const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require('cors');

app.use(cors());


let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addToCart(cart, productId, name, price, quantity) {
  cart.push({ productId, name, price, quantity });
  return cart;
}
app.get('/cart/add', (req, res) => {
  let cartCopy = cart.slice();
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addToCart(cartCopy, productId, name, price, quantity);
  res.json({ cartItems: result });
});

function editCart(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      return cart;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let cartCopy = cart.slice();
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editCart(cartCopy, productId, quantity);
  res.json({ cartItems: result });
});

function deleteCart(ele, productId) {
  return ele.productId !== productId;
}
app.get('/cart/delete', (req, res) => {
  let cartCopy = cart.slice();
  let productId = parseInt(req.query.productId);
  let result = cartCopy.filter((ele) => deleteCart(ele, productId));
  res.json({ cartItems: result });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

function totalQuantity(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum = sum + cart[i].quantity;
  }
  return sum;
}
app.get('/cart/total-quantity', (req, res) => {
  let result = totalQuantity(cart);
  res.json({ totalQuantity: result });
});

function totalPrice(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].price;
  }
  return sum;
}
app.get('/cart/total-price', (req, res) => {
  let result = totalPrice(cart);
  res.json({ totalPrice: result });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
