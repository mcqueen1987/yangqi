"use strict";

module.exports = function(sequelize,Sequelize){
	var _systemConfig = sequelize.define(
		'_systemConfig',
		{
			'firstName' : {
				'field': 'first_name', // 数据库字段名，即：数据库字段名为'first_name'，而对象属性名为'firstName'
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : 'first_name'
			},
			'lastName' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'field' : 'last_name',
				'comment' : 'last_name'
			}
		},{
			comment : '知乎中的回答表',
			timestamps : true,
			paranoid : true,
			deleted_at : 'deleted_at', //删除字段deletedAt别名
			updated_at : 'updated_at',
			created_at : 'created_at',
			freezeTableName : true,   //是否自定义表名
			tableName : '_systemConfig', //自定义表名
			underscored : true    //使用驼峰命名法
		}
	);
	return _systemConfig;
}


// "use strict";
//
// module.exports = function(sequelize,Sequelize){
// 	var _systemConfig = sequelize.define(
// 		'_systemConfig',
// 		{
// 			'id' : {
// 				'type' : Sequelize.UUID,
// 				'primaryKey' : true,		//主键
// 				'unique' : true,				//是否唯一
// 				'allowNull': false,
// 				'defaultValue' : Sequelize.UUIDV4,
// 				'comment' : '系统配置表id'
// 			},
// 			'name' : {
// 				'type' : Sequelize.STRING(100),
// 				'allowNull': true,
// 				'comment' : '说明'
// 			},
// 			'type' : {
// 				'type' : Sequelize.STRING(32),
// 				'allowNull': true,
// 				'comment' : '该记录类型'
// 			},
// 			'val' : {
// 				'type' : Sequelize.STRING(500),
// 				'allowNull': true,
// 				'comment' : '值'
// 			},
// 			'code' : {
// 				'type' : Sequelize.STRING(64),
// 				'allowNull': false,
// 				'comment' : '编码'
// 			},
// 			'remark' : {
// 				'type' : Sequelize.STRING(500),
// 				'allowNull': true,
// 				'comment' : '备注'
// 			},
// 			'app_id' : {
// 				'type' : Sequelize.STRING(32),
// 				'allowNull': true,
// 				'comment' : '应用id'
// 			}
// 		},{
// 			comment : '系统配置表',
// 			timestamps : true,
// 			paranoid : true,
// 			deletedAt : 'deleted_at', //删除字段deletedAt别名
// 			freezeTableName : true,   //是否自定义表名
// 			tableName : '_system_config', //自定义表名
// 			underscored : true    //使用驼峰命名法
// 		}
// 	);
// 	return _systemConfig;
// }

