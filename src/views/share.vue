<template>
  <div id="share">
  	<div class="text">
  		请长按图片保存，分享给好友
  	</div>
  	<div class="img">
      <div class="info">
        <p>{{company}}</p>
        <p>{{name}}</p>
      </div>
      <a href="javascript:void(0);" v-if="isIOS">
        <div id="qrcode" ref="qrcode"></div>
      </a>
      <div id="img" v-if="!isIOS">
        <img :src="img" style="width: 100%;">
      </div>
  	</div>
  	<div class="buttons">
  		<el-button type="primary" round>把二维码分享给员工填写号码</el-button>
  	</div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import CONFIG from "../../config/index.js";
import IMG from '../../public/code.jpg'
import TOOLS from '../tools';
import bus from '../bus.js';

const wx = require("weixin-js-sdk");

export default {
  name: 'share',
  props: {
    
  },
  created() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

    if (isAndroid) {
      this.isIOS = false;
    }
    this.getCompanyInfo()
  },
  mounted() {
    this.$nextTick(() => {
      this.custom();
      this.qrcode();
    });
    bus.$on('onShare', () => {
      // this.onShare()
    })
  },
  data () {
  	return {
      img: IMG,
  		code: '',
      isIOS: true,
      name: '',
      company: ''
  	}
  },
  methods: {
    // 自定义分享配置
    custom () {
      console.log('share')
      let that = this;
      let share = {
        imgUrl: '',
        title: '我的邀请卡',
        desc: '我的邀请卡',
        link: CONFIG.SHARE + "/sign.html?company_pid=" + that.$root.company_pid
      };

      that.$http.fetch('/v1/weixin/getShareInfo/', {
        access_token: localStorage.getItem('access_token'),
        url: location.href.split('#')[0],
        type: 2
      }, that, true).then(res => {
        that.$wx.config({
          debug: process.env.NODE_ENV === "debug",
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
          ]
        });


        wx.ready(function () {
          wx.onMenuShareAppMessage(share) // 分享给好友
          wx.onMenuShareTimeline(share) // 分享到朋友圈
        })
      })
  	},
    // 生成二维码参数
    qrcode () {
      let that = this;
      let clientWidth = document.body.clientWidth,
          width = 85;

      let qrcode = new QRCode("qrcode", {
          width: width, // 二维码宽度，单位像素
          height: width, // 二维码高度，单位像素
          text: CONFIG.SHARE + "/sign.html?company_pid=" + that.$root.company_pid
        });
      console.log('分享链接： ' + CONFIG.SHARE + "/sign.html?company_pid=" + this.$root.company_pid)
    },
    // 获取企业信息
    getCompanyInfo () {
      let that = this;

      that.$http.fetch('Company/getCompanyInfo', {
        company_id: that.$distributorId
      })
      .then(res => {
        if (res.errNo == 0) {
          that.company = res.data.company_name;
          that.name = res.data.contact_name;
        }
      }) 
    }
  }
}
</script>

<style lang="scss" scoped>
#share {
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;

  .text {
  	text-align: center;
    font-size: 0.9rem;
  }
  .img {
  	position: relative;
  	text-align: center;
  	height: 21.2rem;
  	width: 11.95rem;
    margin: auto;
    margin-top: 0.75rem;
    margin-bottom: 1rem;
    background-image: url('../../static/icon/share_bg.png');
    background-size: cover;

    .info {
      position: absolute;
      top: 50%;
      left: 1rem;
      right: 1rem;
      transform: translate(0, -70%);
      color: #fff;
      font-size: 0.9rem;
      text-align: left;
    }

  	#qrcode {
  		position: absolute;
      bottom: 0.75rem;
      width: 100%;
  	}
  }
  .buttons {
  	button {
  		display: block;
  		margin: auto;
  		margin-bottom: 1rem;
      border: none;
      padding: 0.45rem 1.25rem;
      background: linear-gradient( 270deg, rgba(253,59,68,1) 0%, rgba(254,119,45,1) 100%);
  	}
  }
}
</style>
