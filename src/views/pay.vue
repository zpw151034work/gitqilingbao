<template>
  <div id="pay">
  	<div class="footer">
      <div class="text">请选择支付方式</div>
      <div class="item">
        <div class="payBtn weixinColor" :class="form.pay_mode == 2 ? 'active' : ''" @click="onWeiXin">
          <!-- <i class="iconfont">&#xe607;</i>
          <span>微信支付</span> -->
        </div>
      </div>
      <div class="item">
        <div class="payBtn alipayColor" :class="form.pay_mode == 1 ? 'active' : ''" @click="onAliPay">
          <!-- <i class="iconfont">&#xe629;</i>
          <span>支付宝</span> -->
        </div>
      </div>
      <div class="item">
        <div class="payBtn duifongColor" :class="form.pay_mode == 3 ? 'active' : ''" @click="onDuiGong">
          <!-- <img :src="ICONdg"/>
          <span>对公转账</span> -->
        </div>
      </div>
      <div class="infoBox">
        <div v-for="item in bank" :key="item.id" class="duigong" v-show="form.pay_mode == 3">
          <p>开户行：{{item.bank_name}}</p>
          <p>账  号：{{item.card_number}}</p>
          <p>名  称：{{item.account_name}}</p>
          <p>税  号：{{item.address}}</p>
          <p>地  址：{{item.address}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ICONdg from '../../static/icon/duigong.png'
export default {
  name: 'pay',
  props: {
    
  },
  created() {
    this.form.price_id = this.$route.query.price_id;
    this.form.level_name = this.$route.query.level_name;
    this.form.price = this.$route.query.price;
    this.form.user_number = this.$route.query.user_number;
    this.form.total_price = this.$route.query.total_price;
    this.isAdd = this.$route.query.add;

    this.getOrder()
    this.getBank()
  },
  data() {
    let tmp_uid = this.$root.tmp_uid;

    return {
      ICONdg: ICONdg,
      active: 0,
      isAdd: false,
      order_id: '',
      form: {
        // user_id: '',
        price_id: '',
        level_name: '',
        price: '',
        user_number: '',
        total_price: '',
        pay_mode: '',
        tmp_uid: tmp_uid,
      },
      bank: [
        {
          id: '',
          bank: '',
          bank_name: '',
          account_name: '',
          card_number: '',
          tax_num: '',
          address: ''
        }
      ]
    }
  },
  methods: {
    // 获取对公转账信息
    getBank () {
      let that = this;
      this.$http.fetch('BankAccount/getList')
        .then(res => {
          that.bank = res.data
        })
    },
  	onWeiXin () {
      this.form.pay_mode = 2;

      if (this.isAdd) {
        this.setOrder();
        return
      }
      this.createOrder()
  	},
  	onAliPay () {
      this.form.pay_mode = 1;

      if (this.isAdd) {
        this.setOrder();
        return
      }
      this.createOrder()
  	},
  	onDuiGong () {
      this.form.pay_mode = 3;

      // if (this.isAdd) {
      //   this.setOrder();
      //   return
      // }
      // this.createOrder()
  	},
    // 根据临时用户id查询订单
    getOrder () {
      let that = this;

      that.$http.fetch('/Order/stateus', {
        tmp_uid: that.$root.tmp_uid
      })
        .then(res => {
          if (res.errNo == 0 && res.data) {
            that.order_id = res.data.id;
          }
        })
    },
    // 创建订单
    createOrder () {
      let company_pid = this.$root.company_pid;
      let form = this.form;
      let that = this;
      console.log(this.$root)

      this.$http.post('/Order/create', {
        ...form,
        company_id: company_pid
      }, that)
        .then(res => {
          if (res.errNo == 0) {
            this.$message({
              message: '创建订单成功',
              type: 'success'
            });
            this.$router.replace({path: '/payment', query: {
              order_id: res.data.order_id,
              order_code: res.data.order_code
            }});
          }
        })
    },
    // 修改订单
    setOrder () {
      let company_pid = this.$root.company_pid;
      let form = this.form;
      let that = this;

      this.$http.post('/Order/update', {
        ...form,
        company_id: company_pid,
        order_id: that.order_id
      }, that)
        .then(res => {
          if (res.errNo == 0) {
            this.$message({
              message: '修改订单成功',
              type: 'success'
            });
            this.$router.replace({path: '/payment', query: {
              order_id: that.order_id
            }});
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#pay {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .text {
    font-size: 0.7rem;
    padding: 1.5rem 0rem;
    font-family:PingFang-SC-Bold,PingFang-SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
  }
  .infoBox {
    min-height: 4rem;

    .duigong{
      font-size: .6rem;
      padding: 0.25rem 0.75rem;
      line-height:0.85rem;
      border-bottom: solid 0.02rem #F2F2F2;
      text-align: left;
      font-family:PingFang-SC-Regular,PingFang-SC;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
  }
  .payBtn {
    // padding: 0.4rem 0rem;
    border: solid 0.05rem #CDCDCD;
    border-radius: 0.3rem;
    font-size: 0.7rem;
    width: 12.05rem;
    text-align: center;
    margin: auto;
    margin-bottom: 1rem;
    height: 2.7rem;
    box-sizing: border-box;
    position: relative;

    &.active.duifongColor::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -0.2rem;
      left: 5.6rem;
      width: 0.4rem;
      height: 0.4rem;
      transform: rotate(45deg);
      z-index: 1;
      background-color: #fff;
    }
  }
  .weixinColor,.alipayColor,.duifongColor {
    span {
      position: relative;
      top: -0.3rem;
      left: 0.5rem;
    }
  }
  .weixinColor {
    background-image: url("../../static/icon/weixin.png");
    background-size: cover;
    .iconfont {
      color: #00C901;
      font-size: 1.7rem;
    }
  }
  .alipayColor {
    background-image: url("../../static/icon/alipay.png");
    background-size: cover;
    .iconfont {
      color: #00A2E9;
      font-size: 1.7rem;
    }
  }
  .duifongColor {
    background-image: url("../../static/icon/accounts.png");
    background-size: cover;
    img {
      width: 1.7rem;
      height: 1.7rem;
    }
    span {
      top: -0.5rem;
    }
  }
  .footer {
    width: 100%;
    height: 25rem;
    margin: auto;
    background:rgba(242,242,242,0.4);
    text-align: center;
    overflow: scroll;

    button {
      margin-top: 0.5rem;
      width: 100%;
    }
  }
}
</style>
