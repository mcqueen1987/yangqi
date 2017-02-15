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

var group_buy = sequelize.define(
        'group_buy',
        {
            'shop_id' : {
                'field': 'shop_id',
                'type' : Sequelize.STRING(64),
                'allowNull': true,
                'comment' : 'shop_id, 自定义唯一id'
            },
            'deal_id' : {
                'field': 'deal_id',
                'type' : Sequelize.INTEGER (),
                'allowNull': true,
                'comment' : 'deal_id, 抓下来的deal_id'
            },
            'shop_name' : {
                'field': 'shop_name',
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
                'type' : Sequelize.DATE,
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

group_buy.sync({force: true}).then(function () {
  return group_buy.create({
        "shop_id":222,
        "deal_id":2366,
        "shop_name":"LIKE FITNESS乐健身工作室",
        "shop_href":"/shop/67027725",
        "shop_add_tag":"青年路",
        "shop_price_new":"4552",
        "shop_price_old":"4577",
        "shop_sold":"254",
        "city":"beijing",
        "search_key":"北京 朝阳 亲年路 健身 私教",
        "date":"2017-2-13",
        "deleted_at":"2017-2-13",
  });
});




