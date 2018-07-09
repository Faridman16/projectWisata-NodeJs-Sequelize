var memberController = require('../controllers/membercontroller')

module.exports = (app)=>{

app.get('/members', memberController.member)

}