"use strict";
module.exports = function(sequelize,Sequelize){
    var group_buy = sequelize.define(
        'group_buy',
        {
            'shop_name' : {
                'field': 'shop_name', // 数据库字段名，即：数据库字段名为'first_name'，而对象属性名为'firstName'
                'type' : Sequelize.STRING(64),
                'allowNull': true,
                'comment' : 'shop_name'
            },
            'shop_href' : {
                'type' : Sequelize.STRING(256),
                'allowNull': true,
                'field' : 'shop_href',
                'comment' : 'shop_href'
            },
            'shop_add_tag' : {
                'type' : Sequelize.STRING(32),
                'allowNull': true,
                'field' : 'shop_add_tag',
                'comment' : 'shop_add_tag'
            },
            'shop_price_new' : {
                'type' : Sequelize.STRING(16),
                'allowNull': true,
                'field' : 'shop_price_new',
                'comment' : 'shop_price_new'
            },
            'shop_price_old' : {
                'type' : Sequelize.STRING(16),
                'allowNull': true,
                'field' : 'shop_price_old',
                'comment' : 'shop_price_old'
            },
            'shop_sold' : {
                'type' : Sequelize.STRING(16),
                'allowNull': true,
                'field' : 'shop_sold',
                'comment' : 'shop_sold'
            },
            'city' : {
                'type' : Sequelize.STRING(16),
                'allowNull': true,
                'field' : 'city',
                'comment' : 'city'
            },
            'search_key' : {
                'type' : Sequelize.STRING(16),
                'allowNull': true,
                'field' : 'search_key',
                'comment' : 'search_key 搜索关键字'
            },
            'date' : {
                'type' : Sequelize.DATEONLY,
                'allowNull': true,
                'field' : 'date',
                'comment' : 'date抓取日期，以天为单位去重'
            },
            'deleted_at' : {
                'type' : Sequelize.DATE,
                'allowNull': true,
                'field' : 'deleted_at',
                'comment' : 'deleted_at'
            }
        },{
            comment : '工作室团购信息',
            timestamps : true,
            paranoid : true,
            updated_at : 'updated_at',
            created_at : 'created_at',
            freezeTableName : true,   //是否自定义表名
            tableName : 'group_buy', //自定义表名
            underscored : true    //使用驼峰命名法
        }
    );
    return group_buy;
}

