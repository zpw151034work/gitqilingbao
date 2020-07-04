# standard

> A Vue.js project

## Build Setup

``` bash
# 安装依赖
npm install

# 本地运行测试环境
npm run serve

# 本地运行正式环境
npm run start

# 正式环境带debug提示
npm run build-debug

# 打包正式环境
npm run build

```

## 注意

	以下配置都在 main.js 文件下
	1、分销商ID存为全局变量 this.$root.company_pid
	2、$http.fetch('',{}, that) $http请求传入最后一个参数传入 this 表示关闭loading
	3、临时用户id存为全局变量  this.$root.tmp_uid
	4、临时用户ip 或 openid 存为全局变量  this.$root.parm

## 页面 query 传参
	
	1、 /pay   	
						price_id 				价格id
						level_name			代理价名称
		        price						代理价
		        user_number 		开通用户数量
		        total_price 		总价
	2、 /payment
						order_id				订单id
	3、 /account
						order_id				订单id
						add 						是否为追加订单

## 配置

	1、config 文件 HTTP 属性为服务器地址
	2、http.js 文件为axios请求二次封装
