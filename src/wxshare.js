import {http} from './http.js';
const wx = require("weixin-js-sdk");
// export const wxshare = {
// 	install: (Vue, msg) => {
// 		Vue.prototype.$wxshare = (msg) => {
// 			let formDate = {
// 				url: location.href.split('#')[0]
// 			};
// 			console.log(formDate)
// 			http.fetch({
// 				url: location.href.split('#')[0]
// 			}).then((response) => {
// 				// 通过config接口注入权限验证配置
// 				wx.config({
// 					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，
// 					appId: 'wx34fe3945400696ad', // 必填，公众号的唯一标识
// 					timestamp: response.timestamp, // 必填，生成签名的时间戳
// 					nonceStr: response.nonceStr, // 必填，生成签名的随机串
// 					signature: response.signature, // 必填，签名，见附录1
// 					jsApiList: response.jsApiList// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
// 				})
// 				/*eslint-disable */
// 				let share_config = {
// 					'share': {
// 						'imgUrl': msg.imgUrl, // 分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
// 						'desc': msg.desc, // 摘要,如果分享到朋友圈的话，不显示摘要。
// 						'title': msg.title, // 分享卡片标题
// 						'link': msg.link, // 分享出去后的链接，这里可以将链接设置为另一个页面。
// 						'success': function () {},
// 						'cancel': function () {}
// 					}
// 				}
// 				wx.ready(function () {
// 					wx.onMenuShareAppMessage(share_config.share) // 分享给好友
// 					wx.onMenuShareTimeline(share_config.share) // 分享到朋友圈
// 				})
// 				wx.error(function (res) {
// 				})
// 			}).catch((rej) => {
// 			})
// 		}
// 	}
// }

export const wxshare = {
	install: (Vue, msg) => {
		Vue.prototype.$wxshare = (msg) => {
			let formDate = {
				url: location.href.split('#')[0]
			};
			console.log(formDate)
			http.fetch({
				url: location.href.split('#')[0]
			}).then((response) => {
				// 通过config接口注入权限验证配置
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，
					appId: 'wx34fe3945400696ad', // 必填，公众号的唯一标识
					timestamp: response.timestamp, // 必填，生成签名的时间戳
					nonceStr: response.nonceStr, // 必填，生成签名的随机串
					signature: response.signature, // 必填，签名，见附录1
					jsApiList: response.jsApiList// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				})
				/*eslint-disable */
				let share_config = {
					'share': {
						'imgUrl': msg.imgUrl, // 分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
						'desc': msg.desc, // 摘要,如果分享到朋友圈的话，不显示摘要。
						'title': msg.title, // 分享卡片标题
						'link': msg.link, // 分享出去后的链接，这里可以将链接设置为另一个页面。
						'success': function () {},
						'cancel': function () {}
					}
				}
				wx.ready(function () {
					wx.onMenuShareAppMessage(share_config.share) // 分享给好友
					wx.onMenuShareTimeline(share_config.share) // 分享到朋友圈
				})
				wx.error(function (res) {
				})
			}).catch((rej) => {
			})
		}
	}
}