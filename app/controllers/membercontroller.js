var exports = module.exports = {}
const models = require('../models/')
exports.member = (req,res)=>{
    
    models.member.findAll().then((results)=>{
        if(results==null){
            res.status(300).json({message:'Data is Null',Author:'Dian Setiyadi',DataTable:results})
        }
        res.render('member',{'member':results,'title':'Menu Member'})
    })

  }

