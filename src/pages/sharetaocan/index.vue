<template>
  <div class="wrap">
    <div class="inner">
      <div class="desc">套餐共享</div>
      <input type="text" placeholder="请输入车牌号" v-model="number">
      <div class="btn" @click="submit">确认领取</div>
      <div class="line"></div>
      <div class="code" id="code">
        <span style="color:red;">扫码获取共享套餐</span>
      </div>
      <div class="line"></div>
    </div>
    <footer>爱义行，让洗车变得简单快乐</footer>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      couponNum: '',
      appids: '',
      number: '',
      openId: ''
    }
  },
  methods: {
    wxInit(res) {
      let that = this
      let url = location.href.split('#')[0] //获取锚点之前的链接
      wx.config({
        debug: false,
        appId: that.appids,
        timestamp: res.timestamp,
        nonceStr: res.noncestr,
        signature: res.signature,
        jsApiList: ['scanQRCode']
      });
      wx.ready(function () {
        document.getElementById('code').onclick = function () {
          wx.scanQRCode({
            needResult: 1,
            desc: 'scanQRCode desc',
            success: function (res) {
              Toast('已成功获取套餐信息')
              that.couponNum = res.resultStr
            }
          })
        }

      });
      wx.error(function (err) {
        alert(err.errMsg);
      });
    },
    getConfig() {
      let url = location.href.split('#')[0] //获取锚点之前的链接
      let that = this
      this.$ajax({
        method: 'post',
        url: 'wx/getJsapiSignature',
        data: this.$qs.stringify({ url })
      }).then((res) => {
        that.wxInit(res.data.data);
      }).catch(err => {

      });
    },
    submit() {
      let that = this
      if (!this.number) {
        Toast('车牌号不能为空')
        return;
      }
      if (!this.couponNum) {
        Toast('扫码获取')
        return;
      }
      this.$ajax({
        method: 'post',
        url: 'combo/shareComboOrder',
        data: this.$qs.stringify({ orderId: that.couponNum, carNumber: that.number.toUpperCase(), openId: that.openId })
      }).then((res) => {
        console.log(res)
        if (res.data.code == '0000') {
          Toast('兑换成功')
        } else {
          Toast(res.data.msg)
        }

      }).catch(err => {
        Toast(err.response.data.msg)
      });
    }
  },
  created() {
    this.appids = this.appid
    this.openId = localStorage.getItem('openid')
    if (!this.openId) {
      Toast("未登录,3秒后跳转");
      setTimeout(() => {
        this.$router.replace({ name: 'myindex' })
      }, 3000)
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.getConfig()
    })
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
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/common.scss";
.code {
  height: px2rem(26px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.duihuanma {
  margin-top: px2rem(8px);
}
.wrap {
  height: 100%;
  background: #f5f5f5;
}
.inner {
  height: px2rem(427px);
  font-size: px2rem(14px);
  background: #fff;
}
.desc {
  width: px2rem(349px);
  margin: 0 auto;
  padding-top: px2rem(25px);
  padding-bottom: px2rem(23px);
}
input {
  display: block;
  width: px2rem(347px);
  margin: 0 auto;
  height: px2rem(40px);
  border: px2rem(1px) solid #e7e7e7;
  outline: none;
  margin: 0 auto;
  padding: 0;
  font-size: px2rem(14px);
  padding-left: px2rem(12px);
}
.btn {
  height: px2rem(39px);
  background: -moz-linear-gradient( top,#FF8586,#D81618);
  background:  -webkit-linear-gradient( top,#FF8586,#D81618);
  background: -o-linear-gradient( top,#FF8586,#D81618);
  background: linear-gradient( top,#FF8586,#D81618);
  width: px2rem(347px);
  margin: 0 auto;
  border-radius: px2rem(4px);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: px2rem(15px);
  margin-top: px2rem(24px);
}
.line {
  border-top: px2rem(1px) solid #e7e7e7;
  width: px2rem(350px);
  margin: 0 auto;
  margin-top: px2rem(16px);
  margin-bottom: px2rem(20px);
}
.title {
  line-height: px2rem(22px);
  width: px2rem(336px);
  margin: 0 auto;
}
.item {
  width: px2rem(336px);
  margin: 0 auto;
  line-height: px2rem(20px);
}
footer {
  margin-top: px2rem(30px);
  width: 100%;
  height: px2rem(15px);
  font-size: px2rem(13px);
  text-align: center;
  font-weight: 500;
  color: #6d6d6d;
}
</style>
