<template>
  <div class="wrap">
    <div class="desc">
      <div class="huiyuan">
        <div class="left">会员余额</div>
        <div class="right" @click="entermingxi">资金明细</div>
      </div>
      <div class="num">
        <div class="left">{{yue}}</div>
        <!--<div class="right">-->
        <!--退款-->
        <!--</div>-->
      </div>
      <div class="desc-content">余额永久有效，可随充随退</div>
    </div>
    <div class="bottom-wrap">
      <div class="title">充值金额</div>
      <div class="jine-wrap">
        <mt-field label placeholder="输入充值金额" type="number" v-model="number"></mt-field>
      </div>
      <div class="btn-group">
        <div v-bind:class="{ active: isA }" class="left" @click="jinePick(100)">充100</div>
        <div v-bind:class="{ active: isB }" class="left" @click="jinePick(300)">充300</div>
        <div v-bind:class="{ active: isC }" class="left" @click="jinePick(500)">充500</div>
      </div>
    </div>
    <div class="type">充值方式</div>
    <div class="zhifuType">
      <div class="zhifu" @click="weixinPay">
        <div class="left">
          <img src="../../assets/zhifu.png" alt>
          <span class="descs">微信支付</span>
        </div>
        <div class="right" v-if="weixingo">
          <img src="../../assets/dui.png" alt>
        </div>
      </div>
      <!-- <div class="zhifubao" @click="zhifubaoPay">
        <div class="left">
          <img src="../../assets/支付宝大支付@3x.png" alt>
          <span class="descs">支付宝支付</span>
        </div>
        <div class="right" v-if="zhifubaogo">
          <img src="../../assets/dui.png" alt>
        </div>
      </div> -->
    </div>

    <div class="bottom-btn" @click="chongzhi">立即充值</div>
    <div class="xieyi">
      点击立即充值，即表示同意
      <span style="color:#3a90fe;">《充值协议》</span>
    </div>
    <footer>客服热线：400-885-6600</footer>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      yue: "",
      amount: 100,
      openId: "",
      isA: true,
      isB: false,
      isC: false,
      number: "",
      popupVisible: false,
      username: "",
      code: "",
      orderId: "",
      weixingo:false,
      zhifubaogo:false,
      payType:'',
      wxopenid:'',
      env:''
    };
  },
  methods: {
    getinfo() {
      let that = this;
      this.$ajax
        .get("member/getInfo", {
          params: {
            openId: that.openId
          }
        })
        .then(res => {
          that.yue = res.data.data.balance;
        });
    },
    // getOpenId() {
    //   let that = this;
    //   this.$ajax
    //     .get("wx/getOpenId", {
    //       params: {
    //         code: that.code
    //       }
    //     })
    //     .then(res => {
    //       console.log(res, "res获取openid");

    //     //   that.pay(that.orderId);
    //     });
    // },
    // 判断是否为微信环境
     is_weixin(){
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
        this.env = 1
      } else {
        this.env = 3
      }
     },
    jinePick(val) {
      this.isA = false;
      this.isB = false;
      this.isC = false;
      this.amount = val;
      switch (val) {
        case 100:
          this.isA = true;
          break;
        case 300:
          this.isB = true;
          break;
        case 500:
          this.isC = true;
          break;
      }
    },
    alertpay(args) {
      let that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: args.appid, //公众号名称，由商户传入
          timeStamp: args.time_stamp, //时间戳，自1970年以来的秒数
          nonceStr: args.nonce_str, //随机串
          package: args.packageStr,
          signType: "MD5", //微信签名方式：
          paySign: args.sign //微信签名
        },
        function(res) {
          // alert(JSON.stringify(res))
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //     that.$router.push({name:'qingxizhong',params: {
            //     id: that.$route.params.id
            // }})
            alert("成功");
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            alert("已取消支付");
          } else {
            alert("支付异常");
          }
        }
      );
    },
    entermingxi() {
      this.$router.push({ name: "allzijin" });
    },
    weixinPay() {
        this.weixingo = true;
          this.zhifubaogo = false;
          localStorage.setItem('paytype','1')
    //   let data = { openId: this.openId, orderId, env: 1 };
    //   if (this.number) {
    //     data.amount = this.number;
    //   } else {
    //     data.amount = this.amount;
    //   }
    //   //number
    //   let that = this;
    //   this.$ajax({
    //     method: "post",
    //     url: "wx/payment",
    //     data: this.$qs.stringify(data)
    //   })
    //     .then(res => {
    //       that.alertpay(res.data.data);
    //       //that.$router.push({name:'qingxizhong'})
    //     })
    //     .catch(err => {});
    },
    zhifubaoPay(){
           localStorage.setItem('paytype','2')
        this.zhifubaogo = true;
        this.weixingo = false;
    },
    chongzhi() {
      let that = this;
      let amount = "";
      if (this.number) {
        amount = this.number;
         localStorage.setItem('amount',amount)
      } else {
        amount = this.amount;
        localStorage.setItem('amount',amount)
      }
      // payType: localStorage.getItem('paytype')
      this.$ajax
        .get("member/rechargeRecord", {
          params: {
            openId: that.openId,
            amount,
            payType: 1
          }
        })
        .then(res => {
          // that.code = res.data.code;
          that.orderId = res.data.data;
          this.weixinjiekou(res);
          // if(localStorage.getItem('paytype') == '1'){
          //     this.weixinjiekou(res);
          // }else{
          //     this.zhifubaojiekou(res)
          // }
         
        })
        .catch(response => {
          console.log(response);
        });
    },
    // 微信支付
    weixinjiekou(res){
      console.log(res)
        // this.getOpenId()
        //   this.alertpay(res.data.data);
      // 判断环境
      if(this.env == 1){
         var data = {openId2:this.wxopenid,openId:this.openId, orderId:res.data.data, env: this.env,amount: localStorage.getItem('amount')};
      }else if(this.env == 3){
        var data = {openId2:'',openId:this.openId, orderId:res.data.data, env: this.env,amount: localStorage.getItem('amount')};
      }
      let that = this;
      this.$ajax({
        method: "post",
        url: "wx/payment",
        data: this.$qs.stringify(data)
      })
        .then(res => {
          // alert(JSON.stringify(res))
          //that.$router.push({name:'qingxizhong'})
          if(that.env == 1){
            // 微信内支付
            that.alertpay(res.data.data);
          }else if(that.env == 3){
            // 外部浏览器支付
            window.location.href=res.data.data.mweb_url
          }
        })
        .catch(err => {});

    },
    // 支付宝支付
    zhifubaojiekou(res){
      this.env=2;
      let data = {orderId:res.data.data,openId:this.openId,amount:localStorage.getItem('amount'),env:2}
       this.$ajax({
          method:'post',
          url: "alipay/payment",
          data:this.$qs.stringify(data)
       }).then(res=>{
         console.log(res.data.data)
         const div = document.createElement('div');
         div.innerHTML = res.data.data;
         document.body.appendChild(div);
         document.forms[0].submit();
       }).catch(err=>{
         console.log(err)
       })
    }
  },
  created() {
    this.openId = localStorage.getItem("openid"); //sessionId
    this.wxopenid = localStorage.getItem('wxopenid');//openid
    this.is_weixin()
    if (!this.openId) {
      Toast("未登录,3秒后跳转");
      setTimeout(()=>{
        this.$router.replace({name:'myindex'})
      },3000)
    } else {
      this.getinfo();
    }
  },
  mounted() {
    if (this.openId != null) {
      this.$ajax({
        method: 'post',
        url: "member/isLogin",
        data: this.$qs.stringify({ openId: this.openId })
      }).then(res => {
        console.log(res)
        if (res.data.code == '0000') {
          if (res.data.data == false) {
            Toast('未登录,3秒后跳转')
            setTimeout(() => {
              this.$router.replace({ name: 'myindex' })
            }, 3000)
          }
        } else {
          Toast(res.data.msg)
          setTimeout(() => {
            this.$router.replace({ name: 'myindex' })
          }, 3000)
        }
      }).catch(err => {
        setTimeout(() => {
          this.$router.replace({ name: 'myindex' })
        }, 3000)
      })
    }
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
footer {
  font-size: px2rem(10px);
  margin-top: px2rem(90px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  color: #D81618 !important;
  border-color: #D81618 !important;
}
.zhifu .right {
  width: px2rem(16px);
}
.zhifu .right img {
  margin: 0;
  height: 100%;
}
.tuijian {
  width: px2rem(33px);
  height: px2rem(17px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: px2rem(9px);
  color: #4ace69;
  border: #4ace69 px2rem(1px) solid;
  border-radius: px2rem(14px);
}

.zhifubao  .right {
  width: px2rem(16px);
}
.zhifubao .right img {
  margin: 0;
  height: 100%;
}
.wrap {
  background: #f5f5f5;
  height: 100%;
}
.bottom-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: px2rem(348px);
  background: -moz-linear-gradient( top,#FF8586,#D81618);
  background:  -webkit-linear-gradient( top,#FF8586,#D81618);
  background: -o-linear-gradient( top,#FF8586,#D81618);
  background: linear-gradient( top,#FF8586,#D81618);
  font-size: px2rem(15px);
  color: #fff;
  height: px2rem(40px);
  border-radius: px2rem(8px);
  margin: px2rem(20px) auto 0 auto;
}
.desc {
  box-sizing: border-box;
  padding: px2rem(26px) px2rem(14px) 0 px2rem(14px);
  height: px2rem(148px);
  background:  url(../../assets/yuebg.png) no-repeat;
  background-size: contain;
}
.num {
  padding-top: px2rem(13px);
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: px2rem(36px);
}
.num .right,
.huiyuan .right {
  font-size: px2rem(12px);
}
.num .right {
  border: px2rem(1px) solid #fff;
  display: flex;
  align-items: center;
  height: px2rem(20px);
  border-radius: px2rem(8px);
  width: px2rem(69px);
  justify-content: center;
}
.huiyuan .right {
  display: flex;
  align-items: center;
  height: px2rem(20px);
  border-radius: px2rem(8px);
  width: px2rem(69px);
  justify-content: center;
  border: px2rem(1px) solid #fff;
}
.desc-content {
  color: #fff;
  font-size: px2rem(13px);
  display: flex;
  align-items: center;
}
.huiyuan .left {
  height: px2rem(21px);
}
.huiyuan {
  color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: px2rem(14px);
}
.desc-content {
  padding-top: px2rem(8px);
}
.title {
  display: flex;
  padding-left: px2rem(14px);
  align-items: center;
  height: px2rem(37px);
  font-size: px2rem(13px);
}
.jine-wrap {
  background: #f0f0f0;
  border-radius: px2rem(6px);
}
.bottom-wrap {
  background: #fff;
  padding: 0 px2rem(14px);
}
.mint-cell:last-child {
  background: none;
}
.mint-cell-wrapper {
  background: none;
}
.btn-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: px2rem(14px);
  height: px2rem(74px);
  background: #fff;
}
.btn-group div {
  display: flex;
  color: #979797;
  border-radius: px2rem(6px);
  border: px2rem(1px) solid #979797;
  width: px2rem(108px);
  justify-content: space-around;
  align-items: center;
  font-size: px2rem(14px);
  height: px2rem(40px);
  background: #fff;
}
.type {
  display: flex;
  height: px2rem(38px);
  align-items: center;
  font-size: px2rem(14px);
  padding: 0 px2rem(14px);
}
.zhifu {
  align-items: center;
  display: flex;
  box-sizing: border-box;
  padding-right: px2rem(16px);
  justify-content: space-between;
  font-size: px2rem(9px);
  height: px2rem(46px);
  background: #fff;
}
.zhifu img {
  width: px2rem(20px);
  margin-right: px2rem(12px);
  height: px2rem(20px);
  margin-left: px2rem(14px);
}
.zhifu .descs {
  font-size: px2rem(14px);
  margin-right: px2rem(14px);
}
.zhifu .left {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.xieyi {
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: px2rem(9px);
  height: px2rem(33px);
}

.zhifubao {
  align-items: center;
  display: flex;
  box-sizing: border-box;
  padding-right: px2rem(16px);
  justify-content: space-between;
  font-size: px2rem(9px);
  height: px2rem(46px);
  background: #fff;
}
.zhifubao img {
  width: px2rem(20px);
  margin-right: px2rem(12px);
  height: px2rem(20px);
  margin-left: px2rem(14px);
}
.zhifubao .descs {
  font-size: px2rem(14px);
  margin-right: px2rem(14px);
}
.zhifubao .left {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
<style>
.jine-wrap input {
  background: #f0f0f0;
}
</style>



