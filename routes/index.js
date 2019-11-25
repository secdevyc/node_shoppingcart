/* Dependencies */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Cart = require('../models/cart.js');

var Product = require("../models/product.js");

/* GET home page. */
router.get("/", function(req, res, next) {
  Product.find(function(error, items) {
    var productChunk = [];
    var chunkSize = 3;
    for (var i = 0; i < items.length; i += chunkSize) {
      productChunk.push(items.slice(i, i + chunkSize));
    };
    res.render("shop/index", { title: "Shopping Cart", products: productChunk });
  });
});

router.get('/add-to-cart/:id', (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/shopping-cart', (req, res, next) => {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null});
  }
   var cart = new Cart(req.session.cart);
   res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});

router.get('/checkout', (req, res, next) => {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout', { total: cart.totalPrice })
});

/* Export */
module.exports = router;
