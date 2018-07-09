'use strict'
module.exports = function(sequelize, Sequelize){
    var User = sequelize.define('user',{
        id: {autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER},
        firstname: {type: Sequelize.STRING(50),notEmpty:true},
        lastname: {type: Sequelize.STRING(50),notEmpty:true},
        username: {type: Sequelize.TEXT},
        about: {type: Sequelize.TEXT},
        email: {type: Sequelize.STRING, validate:{isEmail: true}},
        password: {type: Sequelize.STRING, allowNull: false},
        last_login: {type: Sequelize.DATE},
        role: {type: Sequelize.STRING, allowNull: true},
        image:{type: Sequelize.STRING, allowNull: true},
        status: {type: Sequelize.ENUM('active','inactive'),defaultValue: 'active'}

    })

    return User;
}
