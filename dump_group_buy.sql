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

var shopbuy = sequelize.define(
    'shopbuy',
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
        comment : '工作室团购信息表',
        timestamps : true,
        paranoid : true,
        deleted_at : 'deleted_at', //删除字段deletedAt别名
        updated_at : 'updated_at',
        created_at : 'created_at',
        freezeTableName : true,   //是否自定义表名
        tableName : 'shopbuy', //自定义表名
        underscored : true    //使用驼峰命名法
    }
);


shopbuy.sync({force: true}).then(function () {
  // 表创建完成
  return shopbuy.create({
        "shop_name":"LIKE FITNESS乐健身工作室",
        "shop_href":"/shop/67027725",
        "shop_rank_stars":"五星商户",
        "shop_comment_num":"38￥232",
        "shop_comment_href":"/shop/67027725#comment",
        "shop_tag":"",
        "shop_add_tag":"",
        "shop_add":"27号院华纺新天地4号楼309"
  });
});




