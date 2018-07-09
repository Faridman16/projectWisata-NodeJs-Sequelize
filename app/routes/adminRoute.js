
let adminController = require('../controllers/admincontroller');

module.exports = (app,passport)=>{
    
    app.get('/admin', adminController.index);
    //USER
    app.get('/admin/user', adminController.user);
    app.get('/admin/addUser', adminController.addUser);
    app.post('/admin/addUser', adminController.proses_addUser);

    //PRODUCT
    app.get('/admin/product', adminController.product);
    app.get('/admin/addProduct', adminController.addProduct);
    app.post('/admin/addProduct', adminController.proses_addProduct);

    //Purchase
    app.get('/admin/purchase', adminController.purchase);
    app.get('/admin/addPurchase', adminController.addPurchase);
    app.get('/admin/addToChart/:id_purchase/:nama_purchase', adminController.addToChart);
    app.get('/admin/bayar', adminController.bayar);
    app.post('/admin/addPurchase', adminController.proses_addPurchase);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
    
        res.redirect('/signin');
    }
}