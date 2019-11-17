var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function (err, items) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < items.length; i += chunkSize) {
      productChunks.push(items.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  });
});

module.exports = router;
