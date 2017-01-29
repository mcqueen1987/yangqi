"use strict";

module.exports = function(sequelize,Sequelize){
    var mytable = sequelize.define(
        'mytable',
        {
            'firstName' : {     
                'field': 'first_name', // 数据库字段名，即：数据库字段名为'first_name'，而对象属性名为'firstName'
                'type' : Sequelize.STRING(64),
                'allowNull': true,
                'comment' : 'firstName'
            },
            'lastName' : {
                'type' : Sequelize.STRING(64),
                'allowNull': true,
                'field' : 'lastName',
                'comment' : 'lastName'
            }
        },{
            comment : '知乎中的回答表',
            timestamps : true,
            paranoid : true,
            deletedAt : 'deleted_at', //删除字段deletedAt别名
            freezeTableName : true,   //是否自定义表名
            tableName : 'mytable', //自定义表名
            underscored : true    //使用驼峰命名法
        }
    );
    return mytable;
}
