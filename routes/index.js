/* Dependencies */
var express = require('express');
var router = express.Router();
var passport = require('passport');

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
})
/* Export */
module.exports = router;
