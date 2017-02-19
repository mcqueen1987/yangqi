"use strict";
module.exports = function(sequelize,Sequelize){
    var mytable = sequelize.define(
        'mytable',
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
            'shop_rank_stars' : {
                'type' : Sequelize.STRING(32),
                'allowNull': true,
                'field' : 'shop_rank_stars',
                'comment' : 'shop_rank_stars'
            },
            'shop_comment_num' : {
                'type' : Sequelize.STRING(16),
                'allowNull': true,
                'field' : 'shop_comment_num',
                'comment' : 'shop_comment_num'
            },
            'shop_comment_href' : {
                'type' : Sequelize.STRING(512),
                'allowNull': true,
                'field' : 'shop_comment_href',
                'comment' : 'shop_comment_href'
            },
            'shop_tag' : {
                'type' : Sequelize.STRING(64),
                'allowNull': true,
                'field' : 'shop_tag',
                'comment' : 'shop_tag'
            },
            'shop_add_tag' : {
                'type' : Sequelize.STRING(64),
                'allowNull': true,
                'field' : 'shop_add_tag',
                'comment' : 'shop_add_tag'
            },
            'shop_add' : {
                'type' : Sequelize.STRING(128),
                'allowNull': true,
                'field' : 'shop_add',
                'comment' : 'shop_add'
            },
        },{
            comment : '工作室列表页信息',
            timestamps : true,
            paranoid : true,
            updated_at : 'updated_at',
            created_at : 'created_at',
            freezeTableName : true,   //是否自定义表名
            tableName : 'mytable', //自定义表名
            underscored : true    //使用驼峰命名法
        }
    );
    return mytable;
}

