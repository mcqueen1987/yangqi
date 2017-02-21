var Sequelize = require('sequelize');

var sequelize = new Sequelize(
  'dianping',   // 数据库名
  'root',   // 用户名
  'rong', // 用户密码
  {
    'dialect': 'mysql',  // 数据库使用mysql
    'host': '123.57.80.7', // 数据库服务器ip
    'port': 3306         // 数据库服务器端口
  }
);

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
            delete_at : false,
            updated_at : 'updated_at',
            created_at : 'created_at',
            freezeTableName : true,   //是否自定义表名
            tableName : 'un_crawled_url', //自定义表名
            underscored : true    //使用驼峰命名法
        }
    );

un_crawled_url.sync({force: true}).then(function () {
  return un_crawled_url.create({
        "city":"beijing",
        "crawl_id":"2017_02_19_beijing_sijiaojianshen",
        "search_key":"北京 朝阳 亲年路 健身 私教",
        "search_url":"/shop/67027725?beijing",
        "page_number":"12",
        "url":"/shop/67027725",
        "is_crawled":0,
        "created_at":"2017-2-13",
  });
});




