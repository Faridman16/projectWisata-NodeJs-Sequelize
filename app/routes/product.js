'use strict'

var productController = require('../controllers/productcontroller');
var wisataController = require('../controllers/wisatacontroller');



module.exports = (app)=>{
    app.get('/product',productController.productAll);
    app.get('/product/:kategori',productController.findOneProduct);
    app.get('/product/detailproduct/:idproduct',isLoggedIn, productController.findOneDetailProduct);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }
}



