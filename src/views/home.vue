<template>

  <div id="home" :autoresize="true">
   <div class="background_top"></div>
   <div class="background_center"></div>
   <div class="background_bottom">
    <div class="infoBox">
      <van-swipe class="my-swipe" indicator-color="white" @change="onChange">
        <van-swipe-item >
          <div class="box-item">
            <p class="iphoneNum">158****3456</p>
            <p class="text">对方已振铃</p>
            <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer1"
            :playsinline="true"
            :options="playerOptions"
            ></video-player>
          </div>
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">
        </div>
        <van-swipe-item>
          <div class="box-item">
            <p class="iphoneNum">158****3456</p>
            <p class="text">对方已振铃</p>
            <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer2"
            :playsinline="true"
            :options="playerOptions"
            ></video-player>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="box-item">
            <p class="iphoneNum">158****3456</p>
            <p class="text">对方已振铃</p>
            <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer2"
            :playsinline="true"
            :options="playerOptions"
            ></video-player>
          </div>
          <div class="custom-indicator" slot="indicator">

          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="box-item">
            <p class="iphoneNum">158****3456</p>
            <p class="text">对方已振铃</p>
            <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer2"
            :playsinline="true"
            :options="playerOptions"
            ></video-player>
          </div>

        </van-swipe-item>

      </van-swipe>
    </div>
  </div>

  <div class="footer">
    <div class="item">
     <div class="view" @click="viewNumber" v-if="btnType == 2">查看号码</div>  
   </div>
   <div class="item">
     <div class="open" @click="openNow" v-if="btnType == 0">立即开通</div>
   </div>
   <div class="item">
    <div class="continue" @click="continueOpen" v-if="btnType == 1" >继续开通</div>
  </div>
  <div>
  </div>
</div>
    <iframe :src="src" frameborder="0"></iframe>
</div>

</template>

<script>
  import TOOL from '../tools.js'
  import CONFIG from "../../config/index.js";
  import axios from 'axios';

    export default {
      name: "Video",

      data() {
        return {
         banner:["1","2","3"],
         paystate:"",
         userIp :'',
         userId:'',
         usertype:'',
         order_id:'',
         playerOptions: {
          playbackRates:false, //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: "zh-CN",
          aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [
          {
            type: "video/mp4",
            type: "video/ogg",
              src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //url地址
            }
            ],
            poster:
            "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg", //你的封面地址
            width: document.documentElement.clientWidth,
          notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            fullscreenToggle: true,//全屏按钮
          }
        },

        // ip or openid
        codeType: 'ip',
         // 显示按钮
         btnType: 0,
         src: ''
       };
     },
     beforeRouteEnter(to, from, next) {
      next(_this=>{
        _this.getAccessToken(() => {
          //判断是否为微信环境
          if(TOOL.getFacility() == 'Weixin'){
            _this.codeType = 'openid';
            _this.$root.browser = 'openid';
          }else{
            _this.codeType = 'ip'
            _this.$root.browser = 'ip'
          }
        });
      })
    },
    created(){
      let agent_id = this.getUrlKey("agent_id");
      this.$root.agent_id = agent_id;

      if (this.codeType == 'ip') {
        this.getIp();
      } else {
        let openid = this.getUrlKey("openid");

        if(openid){
            that.$root.parm = openid;
            that.$root.browser = 'ip';

            if (process.env.NODE_ENV === "debug") {
              alert('openid = ', openid)
            }
         }else{
            this.accredit();
         }
      }
    },
    methods:{
      //获取url参数
      getUrlKey(name){   
         return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
      },
     //获取IP
      getIp () {
        let that = this,
         params = {
            }
        this.$http.fetch('TmpUser/getip')
          .then(res => {
            this.userIp = res.data.ip;
            that.$root.parm = res.data.ip;
            that.$root.browser = 'ip';
            this.getId();
          })
      },
    //获取id
        getId () {
            let that = this,
                params = {
                   parm:this.userIp,
                   type:"ip"
                }
            this.$http.fetch('TmpUser/getTmpUserId',params)
              .then(res => {
       this.userId =res.data.tmp_uid

       this.inquireSign(() => {
        that.orderStatus();
       });

       this.$root.tmp_uid = this.userId;
     })
        },

    // 查询用户注册状态
    inquireSign(fn) {
      let that = this;
      console.log(that.$root.browser, that.$root.parm)
      that.$http.fetch('TmpUser/getTmpUserId', {
        parm: that.$root.parm,
        type: that.$root.browser
      })
      .then(res => {
        if (res.errNo == 0) {
          if (res.data && !!fn) {
            that.btnType = 1;
            that.$root.tmp_uid = res.data.tmp_uid;
            that.$root.company_pid = res.data.company_id;
            fn();
          } else {
            // 初次开通
            this.btnType = 0;
          }
        }
      })
    },
    //根据临时用户ID查询订单
    orderStatus() {
      let that = this,
          params = { tmp_uid:this.userId };

      this.$http.fetch('Order/stateus',params)
      .then(res => {
        if (res.errNo == 0) {
          let data = res.data;

          if (data) {
            this.order_id = data.id;

            switch(data.state) {
              // 未支付
              case 0:
              this.btnType = 1;
              break;
              // 已完成支付
              case 1 || 2 || 3 || 4:
              this.btnType = 2;
              break;
            }
          }
        }
      }) 
    },
    // 获取access_token
    getAccessToken (fn) {
      let that = this;

      that.$http.fetch('/accessToken', {
        client_id: that.$root.client_id,
        secret: that.$root.secret
      }, that, true).then(res => {
        if (res.errNo == 0) {
          localStorage.setItem('access_token', res.access_token);
          fn()
        }
      })
    },
    // 微信授权
    accredit () {
      let that = this;

      that.src = `http://api.meisheapp.com/v1/weixin/authorize?access_token=${localStorage.getItem('access_token')}&redirect=${encodeURIComponent(location.href.split('#')[0])}`;
    },

  onTouchStart (e) {
        // this.clickIndex = 0; // 为了兼容安卓部分情况而加，如果不需要可忽略
        this.clickFlag = false;
      },
      // 用于判断滑动还是点击
      onTouchMove (e) {
        this.clickFlag = true;
      },
      onTouchEnd (position) {
        if (this.clickFlag) { // 滑动
          // console.log('滑动');
        } else { // 点击
          // console.log('点击');
          this.handleShowPic(position);
        }
      },

      //页面滑动视频停止播放
      onChange(index){
       this.$refs.videoPlayer1.player.pause()
     },  
     viewNumber() {
      this.$router.push({ path: "/payment" ,query:{
       order_id:this.order_id
     } });
    },
    openNow() {
     this.$router.push({ path: "/sign" });
   },
   continueOpen() {
    let that = this;

    this.$router.push({ path: "/account" });
  },

  }
  };
</script>

<style lang="scss" scoped>
#home {
 box-sizing: border-box;
 width:100%;
 margin: 0 auto;
 position: relative;
  background: url(../assets/img/background.png) no-repeat center;
  background-size: cover;

  iframe {
    display: none;
  }

 .background_top {
  height: 25.8rem;
  width: 100%;
  // background: url(../assets/img/background_top.png) no-repeat center;
  background-size: cover;
}
.background_center {
  background-color: #29224e;
  height: 4.35rem;
  width: 100%;
}
.background_bottom {
  // background: url(../assets/img/background_botom.png) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 28.25rem;
  position: relative;
  .infoBox {
    position: absolute;
    top: -3.6rem;
    left: 0;
    width: 100%;
    height: 25.75rem;
    overflow: hidden;
  }
}
/deep/.van-swipe__indicators{
  background: #29224e !important;
}
.footer {
  width: 14rem;
  position: absolute;
  left: 50%;
  bottom: 2rem;
  transform: translate(-50%, 0);
  .open{
    background: #FD3B44;
  }
  .view{
    background: #FE772D;
  }
  .continue{
    background: -webkit-linear-gradient(left, #FE772D 0%,#FD3B44 100%);
  }
}
}
.footer .item div{
 width: 100%;
 height: 2rem;
 line-height: 2rem;
 font-size: 0.8rem;
 color: #fff;
 border-radius: 1rem;
 text-align: center;
}
.van-swipe-item {
  width: 100%;
  height: 25.75rem;
  float: left;
}
.van-swipe-item .box-item {
  margin: 0 auto;
  width: 14.4rem;
  height: 25.75rem;
  background: url(../assets/img/phone.png) no-repeat center;
  background-size: cover;
  border-radius: 2rem;
  position: relative;
}
/deep/.van-swipe__indicators{
  position: absolute;
  left: 50%;
  bottom:-1rem;
  transform: translate(-50%,0);
  height:0.4rem;
  width: 100%;
}
/deep/.van-swipe__indicator{
 height:1rem;
 width: 1rem;
 background: #29224e;
}
.van-swipe-item .box-item .iphoneNum {
  position: absolute;
  left: 50%;
  top: 2.5rem;
  transform: translate(-50%);
  color: #ffff;
  font-size: 1.1rem;
}

.van-swipe-item .box-item .text {
  position: absolute;
  top: 4.5rem;
  left: 50%;
  transform: translate(-50%);
  color: #cacaca;
  font-size: 0.75rem;
}
.van-swipe-item .box-item .video-player {
  position: absolute;
  top: 7.7rem;
  left: 0.2rem;
  width: 14rem;
  height: 7.9rem;
  margin: 0 auto;
  .vjs_video_3 {
    width: 14rem;
    height: 7.9rem;
  }
}
/deep/.video-js .vjs-big-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width:4rem;
  height: 4rem;
  border:none;
  border-radius:2rem;
  line-height: 4rem;
}
/deep/.vjs_video_3 {
  width: 14rem;
  height: 7.9rem;
}
/deep/.vjs-custom-skin > .video-js {
  width: 14rem;
  height: 7.9rem;
}
</style>