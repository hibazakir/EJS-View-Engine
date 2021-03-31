const Product = require('../models/product.model');

exports.test = ((req, res) => {
    res.send("Hello from test");
});

exports.product_create = ((req, res) => {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save((err) => {
        if (err) {
            return next(err);
        }
        res.send("Product created");
    });
});

exports.product_details = ((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            return next(err);
        }
        res.send(product);
    });
});

exports.product_update = ((req, res) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, product) => {
        if (err) {
            return next(err);
        }
        res.send("Product Updated");
    });
});

exports.product_delete = ((req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) {
            return next(err);
        }
        res.send("Product Deleted");
    });
});

exports.list = (req, res) => {
    Product.find((err, products) => {
        if (!err) { res.render('product', { pagetitle: 'Product List', menuId: 'list', products: products }) }
        else { console.log('Error in retreiving products: ' + JSON.stringify(err, undefined, 2)); }
    })
}