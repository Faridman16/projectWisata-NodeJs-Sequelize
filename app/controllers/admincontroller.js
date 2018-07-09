var exports = module.exports = {}
const models = require('../models/');
let Sequelize = require('sequelize');
let bCrypt = require('bcrypt-nodejs')
let Op = Sequelize.Op;


exports.index = (req, res)=>{
  models.sequelize.query("SELECT * FROM tbl_products", {type: Sequelize.QueryTypes.SELECT}).then((results)=>{
    res.render('admin/index',
        {
          menu:'index',
          kategori:results,
          // user:req.user,
          user:'admin',
          alert:req.flash('alert')[0],
          message:req.flash('message')[0],                
        }
      );
  });
}

//=============================CONTROLER USER====================================
exports.user = (req, res)=>{
  models.sequelize.query("SELECT * FROM users", {type: Sequelize.QueryTypes.SELECT}).then((results)=>{
    console.log('======================================================================================================');
    console.log(results);
    res.render('admin/index',
        {
          menu:'user',      
          table:results,       
        }
      );
  });
}

exports.addUser = (req, res)=>{
  res.render('admin/index',
  {
    menu:'addUser',    
  }
);
}


exports.proses_addUser = (req, res)=>{

  let generateCrypt = (password)=>{
    return bCrypt.hashSync(password,bCrypt.genSaltSync(4),null);
  }
  let userPassword = generateCrypt(req.body.password)

  var photoProfile = 'Anonymous.jpg';
  if(req.files.photoProfile){
    photoProfile = req.files.photoProfile.name;
    var path = 'public/images/profile/' +photoProfile;
    req.files.photoProfile.mv(path, function(err){
      if(err){
        return res.status(500).send(err);
      }else{
        var data = {
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          username:req.body.username,
          about:req.body.about,
          email:req.body.email,
          password:userPassword,
          last_login:null,
          role:'superadmin',
          image:photoProfile,
          status:'Active',
      
        }
        models.user.create(data).then((newUser, created)=>{
          res.redirect('/admin/user');
        })
      }
    });
  }
}

//=============================CONTROLER PRODUCT====================================
exports.product = (req, res)=>{
  models.sequelize.query("SELECT * FROM tbl_products", {type: Sequelize.QueryTypes.SELECT}).then((results)=>{
    res.render('admin/index',
        {
          menu:'product',      
          table:results,       
        }
      );
  });
}

exports.addProduct = (req, res)=>{
  res.render('admin/index',
  {
    menu:'addProduct',    
  }
);
}

exports.proses_addProduct = (req, res)=>{
  var cover_image = 'no-image.png';
  var images = [];  
  cover_product = req.files.cover_image;
  image_product = req.files.image;

  images[0] = ("no-image.png");
  images[1] = ("no-image.png");
  images[2] = ("no-image.png");
  images[3] = ("no-image.png");

  if(cover_product){    
    var path = 'public/images/product/' +cover_product.name;
    cover_product.mv(path);
  }

  if(image_product){
    var i =0;
    image_product.forEach((image)=>{
      if(i<=3){
        var path = 'public/images/product/' +image.name;
        image.mv(path);
        images[i]=image.name;
        i++; 
      }else{
        i=0;
      }
    });
  }
  
  var data = {
    nama_wisata:req.body.nama_wisata,
    lokasi:req.body.lokasi,
    deskripsi:req.body.deskripsi,
    cover_images:cover_product.name,
    url_images1:images[0],
    url_images2:images[1],
    url_images3:images[2],
    url_images4:images[3],
    harga:req.body.harga,
    id_kategori:req.body.kategori,
  }  
  models.tbl_products.create(data).then((newProduct, created)=>{
    res.redirect('/admin/product');
  })
}

//=============================CONTROLER PURCHASE====================================
exports.purchase = (req, res)=>{
  models.sequelize.query("SELECT * FROM tbl_products", {type: Sequelize.QueryTypes.SELECT}).then((results)=>{
    res.render('admin/index',
        {
          menu:'purchase',      
          table:results,       
        }
      );
  });
}

exports.addPurchase = (req, res)=>{
  res.render('admin/index',
  {
    menu:'addProduct',    
  }
);
}

exports.addToChart = (req, res)=>{
  var session = req.session;
  var id_product = req.params.id_purchase;
  var nama_product = req.params.nama_purchase;
  var purchaseObj = {};

  models.tbl_products.findById(id_product).then(product => {
    purchaseObj = {
      id:id_product,
      nama:nama_product,
      harga:product.harga,
    };

    if(session.chart!=null){
      session.chart.push(purchaseObj);
    }else{
      session.chart = [purchaseObj];
    }

    res.redirect('/admin/bayar');    
  }).catch((err)=>{
    console.log("Error ",err)
    return done(null, false, {message: 'Something went wrong with your signin'})
  })
}

exports.bayar = (req, res)=>{
  res.render('admin/index',
  {
    menu:'bayar',
    chart:req.session.chart,
  }  
);
}

exports.proses_addPurchase = (req, res)=>{
  var cover_image = 'no-image.png';
  var images = [];  
  cover_product = req.files.cover_image;
  image_product = req.files.image;

  images[0] = ("no-image.png");
  images[1] = ("no-image.png");
  images[2] = ("no-image.png");
  images[3] = ("no-image.png");

  if(cover_product){    
    var path = 'public/images/product/' +cover_product.name;
    cover_product.mv(path);
  }

  if(image_product){
    var i =0;
    image_product.forEach((image)=>{
      if(i<=3){
        var path = 'public/images/product/' +image.name;
        image.mv(path);
        images[i]=image.name;
        i++; 
      }else{
        i=0;
      }
    });
  }
  
  var data = {
    nama_wisata:req.body.nama_wisata,
    lokasi:req.body.lokasi,
    deskripsi:req.body.deskripsi,
    cover_images:cover_product.name,
    url_images1:images[0],
    url_images2:images[1],
    url_images3:images[2],
    url_images4:images[3],
    harga:req.body.harga,
    id_kategori:req.body.kategori,
  }  
  models.tbl_products.create(data).then((newProduct, created)=>{
    res.redirect('/admin/product');
  })
}

