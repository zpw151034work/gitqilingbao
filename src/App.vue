<template>
  <div id="app">
    <TabHead v-if="isShow"/>
    <router-view />
  </div>
</template>

<script>
  import TabHead from "./components/tabHead.vue"
  
  export default({
  components: {
    TabHead
  },
  data () {
    return {
      isShow: true
    }
  },
   beforeRouteEnter(to, from, next) {
    next(_this=>{
      if (from.name == 'Home') {
        next.isShow = false;
      } else {
        next.isShow = true;
      }
    })
  },
})
</script>


<style>
  @import './assets/css/iconfont.css';
</style>
<style lang="scss">
html{
  font-size: 20px;

  &,body,#app{
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
  }

  #sign,
  #account,
  #pay,
  #payment,
  #protocol,
  #share {
    position: relative;
    height: 100%;
    padding: 3rem 0.5rem 1rem 0.5rem;
    box-sizing: border-box;
  
    .vessel {
      position: absolute;
      top: 4.5rem;
      height: calc( 100vh - 7rem );
      width: calc( 100% - 1rem );
      box-sizing: border-box;
      margin: auto;
      padding: 1.25rem 0.75rem;
      background-color: rgba(242,242,242,0.4);
    }
  }

  #sign,
  #account,
  #pay {
    background-image: url('../static/icon/background.png');
    background-size: cover;
  }

  #qrcode img {
    margin: auto;
  }
  .el-message-box {
    width: 90% !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .el-message {
    min-width: 100%;
    width: 100%;
  }

  #sign {
    .el-form-item__label {
      padding: 0rem;
      text-align: left;
      font-size: 0.7rem;
      letter-spacing: 0.02rem;
    }
    .el-input__inner {
      border: none;
      padding-left: 0.5rem;
      height: 2.3rem;
      border: solid 0.05rem #fff;
      border-radius: 2.3rem;
      background: none;
      color: #fff;

      &::-webkit-input-placeholder {
        color: #fff;
      }
      &::-moz-placeholder {
        color: #fff;
      }
      &::-ms-input-placeholder {
        color: #fff;
      }
    }
    .el-checkbox__inner {
      border-radius: 50%;
      background: none;
    }
    .el-form-item__content {
      margin-left: 0rem !important;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-color: red;
      background: red !important;
    }
    .el-input .el-input__count .el-input__count-inner {
      background: none;
      color: #fff;
    }
    .el-input__count-inner {
      color: #999999;
    }
    .el-checkbox__label {
      font-size: 0.5rem;
      color: #fff;
    }
  }

  #account {
    .el-radio__input {
      display: none;
    }
    .el-input__inner {
      border: none;
      padding-left: 0.5rem;
      height: 2.3rem;
      border: solid 0.05rem #fff;
      border-radius: 2.3rem;
      background: none;
      color: #fff;

      &::-webkit-input-placeholder {
        color: #fff;
      }
      &::-moz-placeholder {
        color: #fff;
      }
      &::-ms-input-placeholder {
        color: #fff;
      }
    }
    .el-radio.is-bordered {
      width: 31%;
      margin: 0rem;
      margin-bottom: 0.5rem;
      height: 2.4rem;
      line-height: 2.3rem;
      float: left;
      padding: 0rem;
      background: #fff;

      &:not(:last-child) {
        margin-right: 3.33%;
      }
      &.is-checked {
        background: #5E43FA !important;
        border-color: #5E43FA !important;

        .el-radio__label {
          color: #fff;
        }
      }

      .el-radio__label {
        padding: 0rem;
      }
    }
    .el-radio.is-bordered.is-checked {
      background:rgba(236,243,255, .5);
    }
  }
}
</style>
