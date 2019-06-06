<template>
  <div class="wrap"></div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      couponNum: '',
      appids: '',
      number: '',
      openId: '',
      loginurls: '',
      fboxUid: '',
      redirecturl: '',
      isWeixin:false
    }
  },
  methods: {
    usestate() {
      let that = this
      this.$ajax.get('box/canWash', {
        params: { openId: that.openId, fboxUid: that.fboxUid }
      }).then((res) => {
        window.location.href = that.redirecturl + that.fboxUid
      }).catch(err => {
        Toast(JSON.stringify(err.response.data.msg))
      });
    },
    getpermit() {
      var pageUrl = this.loginurls
        .replace(/[/]/g, "%2f")
        .replace(/[:]/g, "%3a")
        .replace(/[#]/g, "%23")
        .replace(/[&]/g, "%26")
        .replace(/[=]/g, "%3d");
      var url =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        this.appids +
        "&redirect_uri=" +
        pageUrl + //这里放当前页面的地址
        "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
      window.location.href = url
    },
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
        Indicator.close();
        wx.scanQRCode({
          needResult: 1,
          desc: 'scanQRCode desc',
          success: function (res) {
            console.log(res)
            // alert(JSON.stringify(res))
            // that.fboxUid = res.resultStr.split('#')[1].split('/')[2]
              // res.resultStr
              window.location.href = res.resultStr
            // that.fboxUid = res.resultStr
            // that.usestate()
          }
        })
      });
      wx.error(function (err) {
        //alert(err.errMsg);
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
          if(that.isWeixin){
            that.wxInit(res.data.data);
          }else{
            Toast("请在微信内使用");
          }
      }).catch(err => {
        Toast(err.response.data.msg)
      });
    }
  },
  created() {
    // Indicator.open({
    //     text: '初始化...',
    //     spinnerType: 'fading-circle'
    // });
    this.redirecturl = this.saomaurl
    this.appids = this.appid
    this.openId = localStorage.getItem('openid')
    // localStorage.getItem('wxopenid')
    // if(!localStorage.getItem('openid')){
    //     MessageBox.confirm('登录使用,现在登录？').then(action => {
    //         if(action==='confirm'){
    //             that.getpermit()
    //         }else{
    //         }
    //     })
    //     return;
    // }
    this.loginurls = this.loginurl

  },
  mounted() {
    var ua = navigator.userAgent.toLowerCase();
    this.$nextTick(function () {
      if (!localStorage.getItem('openid')) {
        Indicator.close();
        MessageBox.alert('未登录，请先登录').then(action => {
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            this.isWeixin = true;
            this.getpermit()
          } else {
            // 微信外
            this.isWeixin = false;
            this.$router.push({ name: 'login' }) // -> /user
          }
        });
      } else {
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            this.isWeixin = true;
          } else {
            // 微信外
            this.isWeixin = false;
          }
        this.getConfig()
      }
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
