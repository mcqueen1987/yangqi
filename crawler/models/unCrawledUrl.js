"use strict";
module.exports = function(sequelize,Sequelize){
    var un_crawled_url = sequelize.define(
        'un_crawled_url',
        {
            'city' : {
                'type' : Sequelize.STRING(16),
                'allowNull': true,
                'field' : 'city',
                'comment' : 'city'
            },
            'crawl_id' : {
                'type' : Sequelize.INTEGER(),
                'allowNull': true,
                'field' : 'crawl_id',
                'comment' : 'date+city+search_key作为该关键字在某天是否抓取的唯一id'
            },
            'search_key' : {
                'type' : Sequelize.STRING(16),
                'allowNull': true,
                'field' : 'search_key',
                'comment' : 'search_key 搜索关键字'
            },
            'search_url' : {
                'type' : Sequelize.STRING(128),
                'allowNull': true,
                'field' : 'search_url',
                'comment' : 'search_url 搜索原始url，搜索结果列表翻页作为需要下载页'
            },
            'page_number' : {
                'type' : Sequelize.INTEGER(),
                'allowNull': true,
                'field' : 'page_number',
                'comment' : '搜索结果页面数，用于翻页'
            },
            'url' : {
                'type' : Sequelize.STRING(128),
                'allowNull': true,
                'field' : 'url',
                'comment' : ''
            },
            'is_crawled' : {
                'type' : Sequelize.INTEGER(),
                'allowNull': true,
                'field' : 'is_crawled',
                'comment' : '该url是否已被抓取'
            }
        },{
            comment : '存储需要抓取的url',
            timestamps : true,
            paranoid : false,
            updated_at : 'updated_at',
            created_at : 'created_at', 
            freezeTableName : true,   //是否自定义表名
            tableName : 'un_crawled_url', //自定义表名
            underscored : true    //使用驼峰命名法
        }
    );
    
    return un_crawled_url;
}

