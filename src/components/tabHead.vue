<template>
  <div id="tabHead">
  	<div class="left">
  		<div class="back" @click="toBack">
	  		<img :src="ICONback"/>
	  	</div>
	  	<div class="close" v-if="isClose" @click="toClose">
	  		<img :src="ICONcha"/>
	  	</div>
  	</div>
  	<div class="title">{{title}}</div>
  	<div class="right">
  		<div v-if="isShare" class="share" @click="toShare">
	  		<img :src="ICONshare">
	  	</div>
  	</div>
  </div>
</template>

<script>
import TOOL from '../tools.js'
import bus from '../bus.js'
import ICONback from '../../static/icon/back.png'
import ICONcha from '../../static/icon/cha.png'
import ICONshare from '../../static/icon/share.png'
import CONFIG from "../../config/index.js"

export default {
  name: 'tabHead',
  created() {
  	this.isShare = this.$route.meta.isShare;

  	if (TOOL.getFacility() == "Weixin") {
  		this.isClose = false;
  	} 
  },
  data () {
  	var title = this.$route.meta.title
  	return {
  		title: title,
  		isShare: false,
  		isClose: true,
  		ICONback: ICONback,
  		ICONcha: ICONcha,
  		ICONshare: ICONshare
  	}
  },
  watch: {
	  $route: {
	    handler: function(val, oldVal){
	      this.title = val.meta.title;
	      this.isShare = this.$route.meta.isShare;
	      this.isBack = this.$route.meta.isBack;
	    },
	    deep: true
	  }
	},
	methods: {
		// 返回
		toBack () {
			this.$router.go(-1);
		},
		// 关闭
		toClose () {
			window.open("about:blank","_self").close()
		},
  	// 分享微信好友
  	toShare () {
  		bus.$emit('onShare')
  	},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#tabHead{
	height: 2rem;
	box-sizing: border-box;
	width: 100%;
	padding: 0.25rem 0rem;
	font-size: 1rem;
	position: relative;
	overflow: hidden;
	line-height: 1.5rem;
	-webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  border-bottom: solid 0.05rem #F2F2F2;
  position: fixed;
  left: 0rem;
  right: 0rem;
  background: #fff;
  z-index: 100;

	.left,.right {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		z-index: 1;
		height: 100%;
	}
	.left {
		left: 0rem;
	}
	.right {
		right: 0rem;
	}
	.back,.close,.share {
		display: inline-block;
		padding: 0rem 0.2rem 0rem 0.2rem;
		cursor: pointer;
		transform: all 300ms;

		&:hover {
			// background-color: rgba(173,225,245,.6);
		}

		img {
			width: 1.3rem;
			height: 1.3rem;
			margin-top: 0.4rem;
		}
	}
	.share{
		padding: 0rem 0.5rem 0rem 0.25rem;
	}
	.title {
		width: 100%;
		font-size: 0.9rem;
		text-align: center;
	}
}
</style>
