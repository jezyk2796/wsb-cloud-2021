const Product = require('../models/product');

exports.getProduct = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('products', {
                products: products,
                pageTitle: 'Produkty',
                hasProducts: products.length > 0
            });
        })
        .catch(err => {
            console.log(err);
        });

};

exports.postProduct = (req, res, next) => {
    const product = new Product(req.body.productname, req.body.productprice, req.body.productdescription);
    product.save();
    res.redirect('/admin/products');
};

exports.indexProduct = (req, res, next) => {
    res.render('index', { pageTitle: 'Add Product' });
}

exports.getDeleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.deleteById(prodId)
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};
