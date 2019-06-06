<template>
  <div class="wrap">
    <div class="inner">
      <div class="state">
        <div class="one">√</div>
        <div class="two"></div>
        <div class="tree">√</div>
        <div class="four"></div>
        <div class="five"></div>
        <div class="six">3</div>
      </div>
      <div class="tip-title">确认支付开启洗车机</div>
      <div class="tip-title-bottom">24小时智能洗车</div>
      <div class="dingdan-info">
        <div class="leftpay">
          <div class="top">{{message}}</div>
          <div class="place">{{name}}</div>
        </div>
        <div class="rightpay">{{payfee}}</div>
      </div>
      <div class="my-content-list" @click="ShouPup">
        <div>洗车类型:</div>
        <div>{{message}}</div>
        <img class="photo-go" src="../../assets/go.png" alt>
      </div>
      <mt-popup
        class="popfont"
        v-model="popupVisible"
        popup-transition="popup-fade"
        closeOnClickModal="true"
        position="bottom"
      >
        <mt-picker :slots="slots" @change="onValuesChange" showToolbar>
          <div class="picker-toolbar-title">
            <div class="left" @click="popupVisible = !popupVisible">取消</div>
            <div class="right" @click="popupVisible = !popupVisible">确定</div>
          </div>
        </mt-picker>
      </mt-popup>
      <div class="type">支付方式</div>
      <div class="yue-zhifu">
        <!-- <div @click="changePic(2)" class="item-wrap bottom-wrap">
          <div class="left">
            <img src="../../assets/vipbg.png" width="24" height="24">
            <span class="label">支付宝</span>
          </div>
          <div class="right">
            <img
              v-if="type==='zhifu'"
              src="http://yima.52shuzhe.cn/dist/select.png"
              alt
              class="radio"
            >
            <img
              v-if="type!=='zhifu'"
              src="http://yima.52shuzhe.cn/dist/nosel.png"
              alt
              class="radio"
            >
          </div>
        </div>
        <div class="line"></div> -->
       

        <!-- <div class="line"></div>
        <div @click="changePic(6)" class="item-wrap bottom-wrap">
          <div class="left">
            <img src="../../assets/youhuiquanbg.png" width="24" height="24">
            <span class="label">洗车券</span>
          </div>
          <div class="right">
            <img
              v-if="type==='youhuiquan'"
              src="http://yima.52shuzhe.cn/dist/select.png"
              alt
              class="radio"
            >
            <img
              v-if="type!=='youhuiquan'"
              src="http://yima.52shuzhe.cn/dist/nosel.png"
              alt
              class="radio"
            >
          </div>
        </div> -->
       
        <div @click="changePic(1)" class="item-wrap bottom-wrap">
          <div class="left">
            <img src="../../assets/zhifubg.png" width="24" height="24">
            <span class="label">微信支付</span>
          </div>
          <div class="right">
            <img
              v-if="type==='weixin'"
              src="http://yima.52shuzhe.cn/dist/select.png"
              alt
              class="radio"
            >
            <img
              v-if="type!=='weixin'"
              src="http://yima.52shuzhe.cn/dist/nosel.png"
              alt
              class="radio"
            >
          </div>
        </div>
         <div class="line"></div>
          <div @click="changePic(5)" class="item-wrap bottom-wrap">
            <div class="left">
               <img src="../../assets/vipbg.png" width="24" height="24">
               <span class="label">会员卡</span>
            </div>
            <div class="right">
               <img
               v-if="type==='huiyuan'"
               src="http://yima.52shuzhe.cn/dist/select.png"
               alt
               class="radio"
               >
               <img
               v-if="type!=='huiyuan'"
               src="http://yima.52shuzhe.cn/dist/nosel.png"
               alt
               class="radio"
               >
            </div>
        </div>
        <!-- <div class="line"></div>
        <div @click="changePic(3)" class="item-wrap top-wrap">
          <div class="left">
            <img src="../../assets/zhifubg.png" width="24" height="24">
            <span class="label">余额支付</span>
          </div>
          <div class="right">
            <img
              v-if="type==='yue'"
              src="http://yima.52shuzhe.cn/dist/select.png"
              alt
              class="radio"
            >
            <img v-if="type!=='yue'" src="http://yima.52shuzhe.cn/dist/nosel.png" alt class="radio">
          </div>
        </div> -->
      </div>
      <div v-if="false" class="title">请选择会员卡</div>
      <img v-if="false" class="youhui-img" src="../../assets/5yuanyong.png" alt>
      <router-link class="bottom-btn" tag="div" :to="{name: 'vipLogin', params:{ id: this.$route.params.id , washType: this.washType}}" v-if="showNextBtn">下一步</router-link>
      <div v-if="showbtn" class="bottom-btn" @click="next">马上启动</div>
      <div class="zhifuid" v-if="showhuiyuan">
        <div class="wraps" v-for="item in datalist3" :key="item.id" @click="clickid(item.id)">
          <div class="top-desc">
            <div class="desc-name">{{item.name}}</div>
            <div class="desc-date">
              <div class="left">
                <div class="top" v-if="item.comboType==1">可洗次数：{{item.washNum-item.washedNum}}</div>
                <div class="top" v-if="item.comboType==2">{{item.effectDays}}天</div>
              </div>
              <div class="right">有效期：{{item.dtCreate | timeparse}}-{{item.expireTime | timeparse}}</div>
            </div>
          </div>
          <div class="logo-bg"></div>
          <div class="chepaihao">
            <div class="text">
              <span class="yima-desc">爱义行，让洗车变得简单快乐！</span>
            </div>
            <div class="class-number">车牌号：{{item.number}}</div>
            <div class="class-number">请点击选择会员卡</div>
          </div>
        </div>
      </div>
    </div>
    <div class="zhifuid" v-if="showquan">
      <div class="wraps" v-for="item in datalist2" :key="item.id" @click="clickid(item.id)">
        <div class="top-desc1">
          <div class="desc-name">{{item.name}}</div>
          <div class="desc-date">
            <div class="left">可洗{{item.washNum-item.washedNum}}次</div>
            <div class="right">有效期：{{item.takeTime | timeparse}}-{{item.expireTime | timeparse}}</div>
          </div>
        </div>
        <div class="logo-bg"></div>
        <div class="chepaihao1">
          <div class="text">
            <span class="yima-desc">爱义行，让洗车变得简单快乐！</span>
          </div>
          <div class="class-number">车牌号：{{item.number}}</div>
          <div class="class-number">请点击选择洗车券</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      isshow: false,
      hasquan: true,
      hashuiyuan: true,
      showbtn: true,
      showhuiyuan: false,
      showquan: false,
      popupVisible: true,
      nowid: '',
      showToolbar: true,
      message: "爱义行标准洗",
      datalist: [],
      datalist2: [],
      datalist3: [],
      slots: [{
        values: [],
      }],
      popupVisible: false,
      payType: 6,
      name: '',
      payfee: '',
      wasDes: '',
      value: '',
      type: 'youhuiquan',
      openId: '',
      url1: '../../dist/nosel.png',
      url2: '../../dist/select.png',
      wxopenid: '',
      env: 0,
      washType:1,
      // chen
      showNextBtn: false
    }
  },
  methods: {
    clickid(val) {
      this.nowid = val
      this.showhuiyuan = false
      this.showquan = false
      this.showbtn = true
    },
   //  获取洗车类型
    gettype() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'box/listWashType',
        // data:this.$qs.stringify({fboxUid:that.$route.params.id})
      }).then((res) => {
        that.datalist = res.data.data;
        console.log(res)
        for (let i = 0; i < that.datalist.length; i++) {
          that.slots[0].values.push(that.datalist[i].name)
          
        }
      }).catch(err => {

      });
    },
    ShouPup() {
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      // console.log(picker, values)
      this.message = values[0];
      this.payfee = '';
      for (let i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].name === values[0]) {
          this.payfee = this.datalist[i].amount;
          this.washType = this.datalist[i].washType
        }
      }
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
      });
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
          Indicator.close();
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            that.$router.push({              name: 'qingxizhong', params: {
                id: that.$route.params.id
              }            })
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            Toast('已取消支付');
          } else {

          }
        }
      );
    },
    wxInit(res) {
      let that = this
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.noncestr,
        signature: res.signature,
        jsApiList: ['chooseWXPay']
      });
      wx.ready(function () {

      });
      wx.error(function (err) {

      });
    },
    pay(orderId) {
      let that = this
      console.log(that.env == 1,that.env == 3,that.env, typeof that.env)
      if (that.env == 1) {
        var data = { openId2: that.wxopenid, openId: that.openId, orderId: orderId, env: that.env, amount: that.payfee };
      } else if (that.env == 3) {
        var data = { openId2: '', openId: that.openId, orderId: orderId, env: that.env, amount: that.payfee };
      }
      this.$ajax({
        method: 'post',
        url: 'wx/payment',
        data: this.$qs.stringify(data)
      }).then((res) => {
        if (that.env == 1) {
          // 微信内支付
          if (that.payType === 1) {
            that.alertpay(res.data.data)
          } else {
            Indicator.close();
          }
        } else if (that.env == 3) {
          // 外部浏览器支付
          window.location.href = res.data.data.mweb_url
          Indicator.close();
        }

        //that.$router.push({name:'qingxizhong'})
      }).catch(err => {
        Indicator.close();

      });
    },
    getboxinfo() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'box/getInfo',
        data: this.$qs.stringify({ fboxUid: that.$route.params.id })
      }).then((res) => {
        that.wasDes = res.data.data.wasDes
        that.name = res.data.data.name
      });
    },
    next() {
      let washType = 1;
      for (let i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].name === this.message) {
          washType = this.datalist[i].washType
        }
      }
      let that = this
      Indicator.open();
      this.$ajax({
        method: 'post',
        url: 'washRecord/submitWashRecord',
        data: this.$qs.stringify({ 
            boxUid: that.$route.params.id, 
            payType: that.payType, 
            washType,
            openId: that.openId,
            comboOrderId: that.nowid, 
            couponDetailId: that.nowid,
            amount: this.payfee, 
         })
      }).then((res) => {
        if (that.payType == 5 || that.payType == 6 || that.payType == 3) {
          Indicator.close();
          that.$router.push({            name: 'qingxizhong', params: {
              id: that.$route.params.id
            }          })
          return;
        }
        that.pay(res.data.data)
      }).catch(err => {
        Indicator.close();
        Toast(err.response.data.msg);
      });
    },
    gethuiyuan2() {
      Indicator.open();
      let that = this
      this.$ajax({
        method: 'post',
        url: 'combo/listUsable',
        data: this.$qs.stringify({ fboxUid: that.$route.params.id, openId: that.openId })
      }).then((res) => {
        Indicator.close();
        let data = res.data.data
        if (!data.length) {
          that.hashuiyuan = false

        } else {
          that.hashuiyuan = true

        }
        that.datalist3 = data
      }).catch(err => {

      });
    },
    gethuiyuan() {
      Indicator.open();
      let that = this
      this.$ajax({
        method: 'post',
        url: 'combo/listUsable',
        data: this.$qs.stringify({ fboxUid: that.$route.params.id, openId: that.openId})
      }).then((res) => {
        Indicator.close();
        let data = res.data.data
        if (!data.length) {
          that.hashuiyuan = false
          that.type = 'weixin'
          that.payType = 1

        } else {
          that.hashuiyuan = true
          that.nowid = data[0].id
        }
        that.datalist3 = data
      }).catch(err => {

      });
    },
    getchequan() {
      Indicator.open();
      let that = this
      this.$ajax({
        method: 'post',
        url: 'coupon/listUsable',
        data: this.$qs.stringify({ fboxUid: that.$route.params.id, openId: that.openId})
      }).then((res) => {
        Indicator.close();
        let data = res.data.data

        if (!data.length) {
          //Toast('没有查询到信息，请换其他支付方式');
          that.hasquan = false
          that.type = 'huiyuan'
          that.payType = 5
          that.gethuiyuan()
        } else {
          that.hasquan = true
          that.nowid = data[0].id
        }

        that.datalist2 = data

      }).catch(err => {

      });
    },
    changePic(val) {
      this.payType = val
      switch (val) {
        case 1:
          this.type = "weixin";
          break;
        case 2:
          this.type = 'zhifu';
          break;
        case 3:
          this.type = "yue";
          break;
        case 5:
        this.type = 'huiyuan';
         this.showNextBtn = true;
         this.showbtn = false;
           // -> /user
          // if (!this.hashuiyuan) {
          //   MessageBox.confirm('无可用会员卡，现在去购买？').then(action => {
          //     if (action === 'confirm') {
          //       this.$router.push({ name: 'chanpin' }) // -> /user
          //     } else {
          //       Toast('没有可用会员卡，请换其他支付方式');
          //     }
          //   })
          //   return
          // }
          // this.type = "huiyuan"
          // this.showhuiyuan = true
          // this.showbtn = false
          // this.gethuiyuan()
          break;
        case 6:
          if (!this.hasquan) {
            MessageBox.confirm('没有可用洗车券，现在去领取？').then(action => {
              if (action === 'confirm') {
                this.$router.push({ name: 'duihuan' }) // -> /user
              } else {
                Toast('没有可用洗车券，请换其他支付方式');
              }
            })
            return
          }
          this.type = "youhuiquan"
          this.showquan = true
          this.showbtn = false
          //this.getchequan()
          break;
      }
    },
  },

  created() {
    this.openId = localStorage.getItem("openid"); //sessionId
    this.wxopenid = localStorage.getItem('wxopenid');//openid
    this.getboxinfo()
    this.gettype()
    this.gethuiyuan2()
    this.getchequan()
  },
  mounted() {
    this.$nextTick(function () {
      this.getConfig()
    })
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWeixin = true;
        this.env = 1
      } else {
        // 微信外
        this.isWeixin = false;
        this.env = 3
        console.log(this.env)
      }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
.chepaihao1 {
  color: #4c4c4cff;
  padding-top: px2rem(10px);
  text-align: center;
  font-size: px2rem(12px);
  background: url(../../assets/bottombg.png) no-repeat;
  background-size: cover;
}
.chepaihao {
  color: #4c4c4cff;
  padding-top: px2rem(10px);
  text-align: center;
  font-size: px2rem(12px);
  background: url(../../assets/bottom2bg.png) no-repeat;
  background-size: cover;
}
.class-number {
  padding-top: px2rem(10px);
  padding-bottom: px2rem(10px);
}
.desc-name {
  font-weight: 900;
  padding: px2rem(10px);
  color: #000;
  font-size: px2rem(16px);
}
.yima-desc {
  text-decoration: underline;
  font-weight: 900;
  color: #000;
  font-size: px2rem(16px);
}
.text {
  display: flex;
  justify-content: center;
}
.top-desc1 {
  background: url(../../assets/topbg.png) no-repeat;
  background-size: cover;
}
.top-desc {
  background: url(../../assets/top2bg.png) no-repeat;
  background-size: cover;
}
.desc-date {
  display: flex;
  justify-content: space-around;
  font-size: px2rem(14px);
}
.logo-bg {
  height: px2rem(50px);
  background: url(../../assets/logo.png) no-repeat #000 center;
  background-size: contain;
}
.popfont {
  width: 100%;
}
.my-content-list,
.popfont {
  font-size: px2rem(14px);
}
.picker-toolbar-title {
  font-size: px2rem(14px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.picker-toolbar-title .left,
.picker-toolbar-title .right {
  padding: px2rem(8px);
  font-size: px2rem(14px) !important;
}
.my-content-list {
  padding: 0 px2rem(10px);
  margin-top: px2rem(14px);
  height: 48px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border: px2rem(1px) solid #e0e0e0;
  border-radius: px2rem(4px);
  background: #fff;
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
.youhui-img {
  width: px2rem(335px);
  display: block;
  margin: 0 auto;
  margin-top: px2rem(10px);
}
.title {
  font-size: px2rem(14px);
  padding-top: px2rem(10px);
  color: #999;
}
.radio {
  width: px2rem(18px);
  height: px2rem(18px);
}
.yue-zhifu .left,
.yue-zhifu .right {
  padding-left: px2rem(10px);
}
.wrap {
  padding-bottom: px2rem(40px);
  background: #f5f5f5;
}

.tip-title {
  font-size: px2rem(16px);
  text-align: center;
}
.tip-title-bottom {
  font-size: px2rem(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: px2rem(37px);
}
.inner {
  width: px2rem(355px);
  margin: 0 auto;
}
.bottom-btn {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background: -moz-linear-gradient( top,#FF8586,#D81618);
  background:  -webkit-linear-gradient( top,#FF8586,#D81618);
  background: -o-linear-gradient( top,#FF8586,#D81618);
  background: linear-gradient( top,#FF8586,#D81618);
  font-size: px2rem(15px);
  color: #fff;
  height: px2rem(40px);
}
.state {
  display: flex;
  margin: 0 auto;
  width: px2rem(220px);
  height: px2rem(68px);
  font-size: px2rem(14px);
  justify-content: space-around;
  align-items: center;
}
.one {
  width: px2rem(20px);
  height: px2rem(20px);
  background: #00ce27;
  border-radius: 50%;
  line-height: px2rem(20px);
  text-align: center;
  color: #fff;
}
.two {
  width: px2rem(80px);
  height: px2rem(5px);
  background: #00ce27;
}
.tree {
  width: px2rem(20px);
  height: px2rem(20px);
  background: #00ce27;
  border-radius: 50%;
  line-height: px2rem(20px);
  text-align: center;
  color: #fff;
}
.four {
  width: px2rem(40px);
  height: px2rem(5px);
  background: #00ce27;
}
.five {
  width: px2rem(40px);
  height: px2rem(5px);
  background:#D81618;
}
.six {
  display: flex;
  justify-content: center;
  align-items: center;
  width: px2rem(20px);
  height: px2rem(20px);
  background:#D81618;
  border-radius: 50%;
}
.yue-zhifu {
  border-radius: px2rem(6px);
  border: px2rem(1px) solid #e0e0e0;
}
.dingdan-info {
  border: px2rem(1px) solid #e0e0e0;
  border-radius: px2rem(6px);
  padding: 0 px2rem(12px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: px2rem(60px);
  background: #fff;
  margin-top: px2rem(17px);
}

.dingdan-info .top {
  font-size: px2rem(15px);
}
.dingdan-info .place {
  font-size: px2rem(13px);
}
.rightpay {
  font-size: px2rem(28px);
  color: #ff0000;
}
.type {
  display: flex;
  color: #999;
  align-items: center;
  height: px2rem(55px);
  font-size: px2rem(14px);
}
.xia {
  width: 100%;
  height: px2rem(32px);
  overflow: hidden;
}
.wrap {
  padding-top: px2rem(10px);
}
.wraps {
  border-radius: px2rem(6px);
  box-sizing: border-box;
  padding-top: px2rem(16px);
  margin: 0 auto;
  font-size: px2rem(18px);
  color: black;
  background-size: 100%;
  width: px2rem(355px);
}
.wraps1 {
  padding-left: px2rem(30px);
  border-radius: px2rem(6px);
  box-sizing: border-box;
  padding-top: px2rem(16px);
  margin: 0 auto;
  margin-bottom: px2rem(10px);
  font-size: px2rem(18px);
  color: black;
  background: url(../../assets/zhifu@2x.png) no-repeat;
  background-size: 100%;
  width: px2rem(355px);
  height: px2rem(200px);
}
.item {
  justify-content: space-around;
  /*align-items: center;*/
}
.cishu {
  font-size: px2rem(12px);
  width: px2rem(80px);
  /*margin-left: px2rem(2px);*/
}
.item .center {
  /*margin:0 px2rem(10px);*/
  flex: 1;
  display: flex;
  font-size: px2rem(13px);
  font-weight: 400;
}
.item .right {
  width: px2rem(200px);

  font-weight: bold;
}
.left {
  padding-left: px2rem(30px);
  display: flex;
}
.top {
  font-size: px2rem(12px);
  width: px2rem(100px);
  /*margin-left: px2rem(2px);*/
}
.item .center1 {
  /*margin:0 px2rem(10px);*/
  flex: 1;
  display: flex;
  font-size: px2rem(12px);
  /*font-weight: 400;*/
}
.item .right1 {
  /*width:px2rem(100px);*/

  font-weight: bold;
}
.left1 {
  padding-left: px2rem(15px);
}
</style>
<style>
@import "../../assets/common.scss";
.radio img {
  width: px2rem(18px);
  height: px2rem(18px);
}
.zhifuid {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 10;
  padding-bottom: px2rem(140px);
}
</style>
