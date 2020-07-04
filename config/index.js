var HTTP,
		WXHTTP;

// 服务器地址
if (process.env.NODE_ENV === "development") {
  HTTP = 'http://testapi.cailing.meisheapp.com/';
	WXHTTP = 'api';
}else {
  HTTP = 'http://testapi.cailing.meisheapp.com/';
	WXHTTP = 'http://test.api.meisheapp.com';
}

module.exports = {
	HTTP: HTTP,
	WXHTTP: WXHTTP,
	SHARE: 'http://cailing.meisheapp.com/qlb'
}