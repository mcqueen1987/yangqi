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
        }
    },{
        comment : '工作室团购信息',
        timestamps : true,
        paranoid : true,
        deleted_at : 'deleted_at', //删除字段deletedAt别名
        updated_at : 'updated_at',
        created_at : 'created_at',
        freezeTableName : true,   //是否自定义表名
        tableName : 'group_buy', //自定义表名
        underscored : true    //使用驼峰命名法
    }
);

shopbuy.sync({force: true}).then(function () {
  return shopbuy.create({
        "shop_name":"LIKE FITNESS乐健身工作室",
        "shop_href":"/shop/67027725",
        "shop_add_tag":"朝阳 健身 私教",
        "shop_price_new":"4552",
        "shop_price_old":"4577",
        "shop_sold":"254",
  });
});




