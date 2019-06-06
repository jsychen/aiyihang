<template>
  <div class="wrap">
    <div class="phone">手机号登录</div>
    <mt-field label="手机号" type="tel" placeholder="请输入新的手机号" v-model="phone"></mt-field>
    <mt-field label="验证码" type="number" v-model="code" placeholder="请输入验证码" class="getcode">
      <span class="btn-code" @click="codeClick">{{tip}}</span>
    </mt-field>
    <div class="bottom-btn" @click="login">登录</div>
    <!-- <footer>爱义行，让洗车变得简单快乐</footer> -->
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      tip: '获取验证码',
      yanzhengcode: '',
      code: '',
      sessionId: '',
      openId: '',
      onoff: false,
      phone: '',
      newusername: '',
      isWeixin: false
    }
  },
  methods: {
    login() {
      if (!this.phone) {
        Toast('手机号码不能为空');
        return;
      }
      if (!this.code) {
        Toast('验证码不能为空');
        return;
      }
      Indicator.open('登录中...');
      let that = this
      this.$ajax.get('member/login', {
        params: { openId: that.sessionId, phone: that.phone, smsCode: that.code }
      }).then((res) => {
        console.log(res)
        let data = res.data
        switch (data.code) {
          case '2001':
            Indicator.close();
            Toast(data.msg);
            break;
          case '0000':
            Indicator.close();
            that.refreshToken(that.phone, data.data.refreshToken, that.sessionId);
            break;
        }
      }).catch(err => {
        
      });;
      //this.$router.push({ name: 'myindex'}) // -> /user
    },
    refreshToken(phone, refreshToken, sessionId) {
      this.$ajax.get('member/refreshToken', {
        params: { openId: sessionId, phone: phone, refreshToken: refreshToken }
      }).then((res) => {

        let data = res.data
        localStorage.setItem('openid', data.data.openId)
        localStorage.setItem('user', JSON.stringify(data.data))
        this.$router.push({ name: 'myindex' }) // -> /user
        // switch(data.code){
        //     case '2001':
        //     Toast(data.msg);
        //     break;
        //     case '0000':
        //     Indicator.close();
        //     that.refreshToken(that.phone,data.data.refreshToken,that.sessionId);
        //     localStorage.setItem('openid',that.sessionId)
        //     that.$router.push({ name: 'myindex'}) // -> /user
        //     break;
        // }
      }).catch(err => {

      });
    },
    // 判断是否为微信环境
    is_weixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWeixin = true;
      } else {
        // 微信外
        this.isWeixin = false;
      }
    },
    //获取sessionId
    getsessionId() {
      let that = this
      Indicator.open({
        text: '登录初始化...',
        spinnerType: 'fading-circle'
      });
      this.$ajax({
        method: 'get',
        url: '/member/getSessionId',
      }).then((res) => {
        console.log(res, 'sessionId')
        that.sessionId = res.data.data
        // 获取的sessionid
        // localStorage.setItem('sessionId',res.data.data)
        // localStorage.setItem('openid',res.data.data)
        Indicator.close();
      }).catch(err => {
        Indicator.close();

      });
    },

    codeClick() {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

      if (!this.phone) {
        Toast('手机号码不能为空');
        return;
      }
      if (!reg.test(this.phone)) {
        Toast('手机号码格式错误');
        return;
      }
      if (this.onoff) {
        return;
      }
      this.onoff = true
      let that = this
      this.$ajax({
        method: 'post',
        url: 'captcha/sendSms',
        data: this.$qs.stringify({ openId: that.sessionId, phone: that.phone })
      }).then((res) => {

        console.log(res, '获取验证码')
        let i = 60
        let timer = setInterval(function () {
          if (i == 1) {
            that.tip = "获取验证码"
            that.onoff = false
            clearInterval(timer)
            return;
          }
          that.tip = --i + '秒后重新获取'
        }, 1000)
      });
    },
    // 获取微信的openid
    getopenid() {
      let that = this
      Indicator.open({
        text: '登录初始化...',
        spinnerType: 'fading-circle'
      });
      this.$ajax({
        method: 'post',
        url: 'wx/getOpenId',
        data: this.$qs.stringify({ code: that.yanzhengcode })
      }).then((res) => {
        // that.openId = res.data.data
        localStorage.setItem('wxopenid', res.data.data)
        Indicator.close();
      }).catch(err => {
        Indicator.close();
      });
    },
  },
  created() {
    this.getsessionId()
    var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWeixin = true;
        var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        this.yanzhengcode = r[2]
        this.getopenid()
      } else {
        // 微信外
        this.isWeixin = false;
      }
      
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
.wrap {
  height: 100%;
  background: #f5f5f5;
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
  margin: px2rem(30px) auto 0 auto;
}
.phone {
  height: px2rem(78px);
  font-size: px2rem(17px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-code {
  color: #7a7979;
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
