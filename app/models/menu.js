'use strict'
module.exports = function(sequelize, Sequelize){
    var Menu = sequelize.define('tbl_menu',{
        id: {autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER},
        menu_name: {type: Sequelize.STRING(50),notEmpty:true},
        icon: {type: Sequelize.STRING(50),notEmpty:true},
        href: {type: Sequelize.STRING(50),notEmpty:true},
        active: {type: Sequelize.STRING(50),notEmpty:true},

    })

    return Menu;
}
