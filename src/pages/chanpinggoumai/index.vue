<template>
  <div class="wrap">
    <div class="money">
      <div class="left">{{taocanname}}</div>
      <div class="right">￥{{price}}</div>
    </div>
    <mt-field label="车牌号" placeholder="请输入车牌号，如粤QQ1234" v-model="number"></mt-field>
    <div class="tip">
      <!--注：如果绑定多个车牌号，请用逗号分隔-->
      {{comboType==1?'注：如果绑定多个车牌号，请用逗号分隔':'注：最多只能绑定一个车牌号'}}
    </div>
    <div class="desc">
      <!--<div class="cika">{{comboType==1?'次卡':'月卡'}}</div>-->
      <div class="youxiao">有效时间：{{effectDays}}天</div>

      <div class="cishu">
        <div v-if="comboType==1">可洗次数：{{washNum}}</div>
        <div v-if="comboType==2"></div>
      </div>
      <!--<div class="yika">{{introduction}}</div>-->
    </div>
    <div class="yue-zhifu">
      <!--<div @click="changePic(3)" class="item-wrap top-wrap">-->
      <!--<div class="left">-->
      <!--<img  src="../../assets/zhifubg.png" width="24" height="24">-->
      <!--<span class="label">余额支付</span>-->
      <!--</div>-->
      <!--<div class="right">-->
      <!--<img v-if="type==='yue'" src="http://yima.52shuzhe.cn/dist/select.png" alt=""  class="radio">-->
      <!--<img v-if="type!=='yue'" src="http://yima.52shuzhe.cn/dist/nosel.png" alt="" class="radio">-->
      <!--</div>-->
      <!--</div>-->
      <div class="line"></div>
      <div @click="changePic(1)" class="item-wrap bottom-wrap">
        <div class="left">
          <img src="../../assets/weixinzhifu.png" width="24" height="24">
          <span class="label">微信支付</span>
        </div>
        <div class="right">
          <img
            v-if="type==='weixin'"
            src="http://yima.52shuzhe.cn/dist/select.png"
            alt
            class="radio"
          >

          <!--<img v-if="type!=='weixin'" src="http://yima.52shuzhe.cn/dist/nosel.png" alt="" class="radio">-->
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <!--<div class="left">总和：￥<span style="color:red">{{price}}</span></div>-->
      <div class="right" @click="goumai">提交订单</div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {

      money: '',
      number: '',
      price: '',
      taocanname: '',
      comboType: '',
      introduction: '',
      effectDays: '',
      payType: 1,
      washNum: '',
      washedNum: '',
      type: 'weixin',
      openId: '',
      //            url1:'../../dist/nosel.png',
      url2: '../../dist/select.png',
      env: '',
      wxopenid: ''
    }
  },
  methods: {
    getData() {
      let that = this
      this.$ajax.get('combo/get', {
        params: {
          id: that.$route.params.id
        }
      }).then((res) => {
        console.log(res)
        that.taocanname = res.data.data.name
        that.price = res.data.data.price
        that.introduction = res.data.data.introduction
        that.effectDays = res.data.data.effectDays
        that.comboType = res.data.data.comboType
        that.washNum = res.data.data.washNum
        that.washedNum = res.data.data.washedNum


      }).catch(err => {

      })
      //          this.$ajax.get('combo/listAll').then((res)=>{
      //            let data=res.data
      //           if(data.data.comboType==1){
      //              that.zhushi="注：如果绑定多个车牌号，请用逗号分隔"
      //           }
      //           else {
      //             that.zhushi="注：最多只能绑定一个车牌号"
      //           }
      //          }).catch(err=>{
      //
      //          })

    },

    alertpay(args) {
      let that = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": args.appid,     //公众号名称，由商户传入
          "timeStamp": args.time_stamp,         //时间戳，自1970年以来的秒数
          "nonceStr": args.nonce_str, //随机串
          "package": args.packageStr,
          "signType": "MD5",         //微信签名方式：
          "paySign": args.sign //微信签名
        },
        function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            that.$router.back(-1)
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            alert('已取消支付');
          } else {
            alert('支付异常');
          }
        }
      );
    },
    pay(orderId) {
      let data = { openId: this.openId, orderId }
      if (this.number) {
        data.amount = this.number
      } else {
        data.amount = this.amount
      }

      if (this.env == 1) {
        data.openId2 = this.wxopenid
        data.env = this.env

      } else if (this.env == 3) {
        data.openId2 = ''
        data.env = this.env

      }
      //number
      let that = this
      this.$ajax({
        method: 'post',
        url: 'wx/payment',
        data: this.$qs.stringify(data)
      }).then((res) => {
        // that.alertpay(res.data.data)
        //that.$router.push({name:'qingxizhong'})
        if (that.env == 1) {
          // 微信内支付
          that.alertpay(res.data.data);
        } else if (that.env == 3) {
          // 外部浏览器支付
          window.location.href = res.data.data.mweb_url
        }
      }).catch(err => {

      });
    },
    goumai() {
      if (!this.number) {
        Toast('车牌不能为空')
        return false
      }
      if (this.comboType != 1) {
        if (this.number.split('，').length > 1) {
          Toast('月卡只能输入一个车牌号')
          return false
        }
      }
      let that = this
      // 目前只支付微信
      this.$ajax.get('combo/buyCombo', {
        params: {
          number: that.number.toUpperCase(),
          comboId: that.$route.params.id,
          openId: that.openId,
          payType: this.payType
        }
      }).then((res) => {
        that.pay(res.data.data)
      }).catch(err => {

      });;
    },
    changePic(val) {
      this.payType = val
      switch (val) {
        case 1:
          this.type = "weixin"
          break;
        //                case 3:
        //                this.type="yue"
        //                break;
      }
    },
    is_weixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.env = 1
      } else {
        this.env = 3
      }
    },
  },
  created() {
    this.openId = localStorage.getItem('openid')//sessionid
    this.wxopenid = localStorage.getItem('wxopenid');//openid
    this.is_weixin()
    if (!this.openId) {
      Toast("未登录,3秒后跳转");
      setTimeout(() => {
        this.$router.replace({ name: 'myindex' })
      }, 3000)
    } else {
      this.getData()
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
}
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
.btn-wrap {
  height: px2rem(49px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.btn-wrap .left {
  box-sizing: border-box;
  display: flex;
  padding-left: px2rem(13px);
  align-items: center;
  background: #333;
  width: 68%;
  height: 100%;
  color: #fff;
}
.btn-wrap .right {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  width: 100%;
  background: #db1e30;
}
.wrap {
  height: 100%;
  background: #f5f5f5;
  font-size: px2rem(16px);
}
.money {
  display: flex;
  padding-left: px2rem(14px);
  background: #fff;
  height: px2rem(45px);
  align-items: center;
  margin-bottom: px2rem(10px);
}
.money .left {
  padding-right: px2rem(16px);
}
.money .right {
  color: red;
}
.tip {
  padding-left: px2rem(14px);
  color: red;
  font-size: px2rem(12px);
  height: px2rem(20px);
  display: flex;
  align-items: center;
}
.desc {
  margin-bottom: px2rem(10px);
  height: px2rem(100px);
  background: #fff;
  color: red;
  font-size: px2rem(16px);
}
.cika {
  margin-left: px2rem(14px);
}
.yika {
  margin-left: px2rem(14px);
}
.youxiao {
  margin-left: px2rem(14px);
  padding-top: px2rem(20px);
}
.cishu {
  margin-left: px2rem(14px);
}

.label {
  padding-left: px2rem(10px);
}
.line {
  height: px2rem(1px);
  background: #e0e0e0;
  width: 99%;
  margin: 0 auto;
}
.top-wrap {
  border-top-left-radius: px2rem(6px);
  border-top-right-radius: px2rem(6px);
}
.bottom-wrap {
  border-bottom-left-radius: px2rem(6px);
  border-bottom-right-radius: px2rem(6px);
}
.item-wrap .left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-wrap {
  padding: 0 px2rem(2px);
  height: px2rem(43px);
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: px2rem(16px);
}
.radio {
  width: px2rem(18px);
  height: px2rem(18px);
}
.yue-zhifu .left,
.yue-zhifu .right {
  padding-left: px2rem(10px);
}
</style>
